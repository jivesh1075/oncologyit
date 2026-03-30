/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  OncologyIT — HIPAA-Compliant Audit Logger                         ║
 * ║  45 CFR § 164.312(b) — Audit Controls                              ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║  PURPOSE: Log all access events involving PHI/PII to an immutable  ║
 * ║  audit trail. Supports decorator pattern for wrapping functions.    ║
 * ║                                                                     ║
 * ║  STORAGE: In production, logs should be written to an append-only  ║
 * ║  store (e.g., Supabase table with RLS, AWS CloudTrail, or a        ║
 * ║  dedicated SIEM). This implementation logs to console + optional    ║
 * ║  callback for integration flexibility.                              ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import type { HipaaAuditEntry } from "@/types";

// ─── Audit Log Store ───

type AuditSink = (entry: HipaaAuditEntry) => void | Promise<void>;

/**
 * In-memory audit buffer for development/testing.
 * In production, replace with persistent store.
 */
const auditBuffer: HipaaAuditEntry[] = [];
let externalSink: AuditSink | null = null;

/**
 * Register an external sink for audit entries.
 * Use this to connect to Supabase, SIEM, or CloudTrail in production.
 */
export function registerAuditSink(sink: AuditSink): void {
  externalSink = sink;
}

/**
 * Core audit logging function.
 * Writes to console (structured JSON) and optional external sink.
 */
export async function logAuditEvent(
  entry: Omit<HipaaAuditEntry, "timestamp">
): Promise<void> {
  const fullEntry: HipaaAuditEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  // Always buffer in-memory for testing
  auditBuffer.push(fullEntry);

  // Structured console output (machine-parseable)
  console.log(
    JSON.stringify({
      level: "AUDIT",
      hipaa: true,
      ...fullEntry,
    })
  );

  // Forward to external sink if registered
  if (externalSink) {
    try {
      await externalSink(fullEntry);
    } catch (err) {
      console.error("[HIPAA_AUDIT] Failed to write to external sink:", err);
    }
  }
}

/**
 * Get all buffered audit entries (for testing/admin review).
 * In production, query the persistent audit table instead.
 */
export function getAuditBuffer(): readonly HipaaAuditEntry[] {
  return Object.freeze([...auditBuffer]);
}

/**
 * Clear the audit buffer (testing only).
 * @internal
 */
export function _clearAuditBuffer(): void {
  auditBuffer.length = 0;
}

// ─── Decorator Pattern ───

/**
 * HIPAA audit decorator. Wraps any async function to log PHI access events.
 *
 * @param action - The type of access being performed
 * @param resourceType - The FHIR resource type being accessed
 * @param extractResourceId - Function to extract resource ID from args
 * @param extractPatientId - Function to extract patient ID from args
 *
 * @example
 * ```ts
 * const auditedGetPatient = withHipaaAudit(
 *   getPatient,
 *   "VIEW",
 *   "Patient",
 *   (patientId) => patientId,
 *   (patientId) => patientId
 * );
 * ```
 */
export function withHipaaAudit<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn | Promise<TReturn>,
  action: HipaaAuditEntry["action"],
  resourceType: string,
  extractResourceId: (...args: TArgs) => string,
  extractPatientId?: (...args: TArgs) => string | undefined
) {
  return async function auditedFunction(
    userId: string,
    ...args: TArgs
  ): Promise<TReturn> {
    const resourceId = extractResourceId(...args);
    const patientId = extractPatientId?.(...args);

    try {
      const result = await fn(...args);

      await logAuditEvent({
        userId,
        action,
        resourceType,
        resourceId,
        patientId,
        outcome: "SUCCESS",
      });

      return result;
    } catch (error) {
      await logAuditEvent({
        userId,
        action,
        resourceType,
        resourceId,
        patientId,
        outcome: "FAILURE",
        details:
          error instanceof Error ? error.message : "Unknown error",
      });

      throw error;
    }
  };
}
