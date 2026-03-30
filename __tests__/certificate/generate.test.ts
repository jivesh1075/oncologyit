import { describe, it, expect } from "vitest";
import { generateCertificate, gradeQuiz } from "@/lib/certificate/generate";

describe("gradeQuiz", () => {
  const answerKey: Record<string, number> = {
    q1: 0,
    q2: 1,
    q3: 2,
    q4: 3,
    q5: 0,
  };

  it("should calculate 100% for all correct answers", () => {
    const result = gradeQuiz({ q1: 0, q2: 1, q3: 2, q4: 3, q5: 0 }, answerKey);
    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.correctAnswers).toBe(5);
  });

  it("should calculate 0% for all wrong answers", () => {
    const result = gradeQuiz({ q1: 3, q2: 3, q3: 3, q4: 0, q5: 3 }, answerKey);
    expect(result.score).toBe(0);
    expect(result.passed).toBe(false);
  });

  it("should pass at exactly 80%", () => {
    const result = gradeQuiz({ q1: 0, q2: 1, q3: 2, q4: 3, q5: 3 }, answerKey);
    expect(result.score).toBe(80);
    expect(result.passed).toBe(true);
  });

  it("should fail at 60%", () => {
    const result = gradeQuiz({ q1: 0, q2: 1, q3: 2, q4: 0, q5: 3 }, answerKey);
    expect(result.score).toBe(60);
    expect(result.passed).toBe(false);
  });

  it("should handle missing answers as wrong", () => {
    const result = gradeQuiz({ q1: 0 }, answerKey);
    expect(result.score).toBe(20);
    expect(result.passed).toBe(false);
  });
});

describe("generateCertificate", () => {
  it("should generate certificate for passing score", async () => {
    const result = await generateCertificate({
      userId: "user-1",
      courseId: "ai-foundations",
      courseName: "Foundations of AI in Healthcare",
      userName: "Dr. Test User",
      overallScore: 85,
      passingScore: 80,
    });

    expect(result.success).toBe(true);
    expect(result.certificate).toBeDefined();
    expect(result.certificate!.nameOnCert).toBe("Dr. Test User");
    expect(result.certificate!.overallScore).toBe(85);
    expect(result.certificate!.certificateId).toBeTruthy();
    expect(result.pdfBuffer).toBeDefined();
  });

  it("should reject failing score", async () => {
    const result = await generateCertificate({
      userId: "user-1",
      courseId: "ai-foundations",
      courseName: "Foundations of AI in Healthcare",
      userName: "Dr. Test User",
      overallScore: 70,
      passingScore: 80,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("70%");
    expect(result.certificate).toBeUndefined();
  });
});
