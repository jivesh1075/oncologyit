import { NextRequest, NextResponse } from "next/server";
import { validateDoseClearance } from "@/lib/safety/dose-clearance";
import { logAuditEvent } from "@/lib/hipaa/audit-logger";
import type { LabResult } from "@/types";

/**
 * POST /api/dose-clearance
 * Validates hematologic lab values for chemotherapy clearance.
 * HIPAA audit-logged. IEC 62304 Class B.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LabResult;

    // Validate and compute clearance
    const result = validateDoseClearance(body, "DEMO-USER");

    // HIPAA audit log
    await logAuditEvent({
      userId: "DEMO-USER",
      action: "VALIDATE",
      resourceType: "DoseClearance",
      resourceId: body.patientId,
      patientId: body.patientId,
      outcome: "SUCCESS",
      details: `Status: ${result.status}`,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
