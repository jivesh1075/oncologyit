import { NextRequest, NextResponse } from "next/server";
import { generateCertificate, gradeQuiz } from "@/lib/certificate/generate";
import { getCourseMetadata, getCourseQuiz } from "@/lib/mdx/content";
import type { QuizSubmission } from "@/types";

/**
 * POST /api/certificate
 * Grades a quiz submission and generates a certificate if the user passes.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuizSubmission & {
      userName: string;
      userId?: string;
    };

    const { courseId, answers, userName, userId } = body;

    // Load course metadata
    const course = getCourseMetadata(courseId);
    if (!course) {
      return NextResponse.json(
        { error: `Course '${courseId}' not found.` },
        { status: 404 }
      );
    }

    // Load quiz and build answer key
    const quiz = getCourseQuiz(courseId);
    if (quiz.length === 0) {
      return NextResponse.json(
        { error: "No quiz found for this course." },
        { status: 404 }
      );
    }

    const answerKey: Record<string, number> = {};
    quiz.forEach((q) => {
      answerKey[q.id] = q.correctIndex;
    });

    // Grade the quiz
    const gradingResult = gradeQuiz(answers, answerKey, course.passingScore);

    if (!gradingResult.passed) {
      return NextResponse.json({
        passed: false,
        score: gradingResult.score,
        passingScore: gradingResult.passingScore,
        message: `You scored ${gradingResult.score}%. The passing score is ${gradingResult.passingScore}%. Please review the material and try again.`,
        questionResults: gradingResult.questionResults,
      });
    }

    // Generate certificate
    const certResult = await generateCertificate({
      userId: userId || "anonymous",
      courseId,
      courseName: course.title,
      userName,
      overallScore: gradingResult.score,
      passingScore: course.passingScore,
    });

    if (!certResult.success) {
      return NextResponse.json(
        { error: certResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      passed: true,
      score: gradingResult.score,
      certificate: {
        id: certResult.certificate!.certificateId,
        issuedAt: certResult.certificate!.issuedAt,
        downloadUrl: `/api/certificate/${certResult.certificate!.certificateId}`,
      },
      questionResults: gradingResult.questionResults,
    });
  } catch (error) {
    console.error("[CERTIFICATE] Error:", error);
    return NextResponse.json(
      { error: "Failed to process quiz submission." },
      { status: 500 }
    );
  }
}
