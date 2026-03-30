/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  OncologyIT — Dose Clearance Safety Engine                         ║
 * ║  IEC 62304 Class B · FHIR R4 Aligned · Medical-Grade Validation    ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║  PURPOSE: Validate that a patient's hematologic parameters meet     ║
 * ║  minimum thresholds before proceeding with cytotoxic chemotherapy.  ║
 * ║                                                                     ║
 * ║  CLINICAL LOGIC:                                                    ║
 * ║  • HARD STOP if ANC < 1,500/mm³ (Grade 2+ neutropenia)            ║
 * ║  • HARD STOP if Platelets < 100,000/mm³ (Grade 1+ TCP)            ║
 * ║  • WARNING if Hemoglobin < 10.0 g/dL (advisory only)              ║
 * ║                                                                     ║
 * ║  REFERENCES:                                                        ║
 * ║  • CTCAE v5.0 Grading Criteria                                     ║
 * ║  • NCCN Guidelines — Myeloid Growth Factors                         ║
 * ║  • ASCO/ONS Chemotherapy Administration Safety Standards            ║
 * ║                                                                     ║
 * ║  REGULATORY: This module is demonstration software only.            ║
 * ║  NOT approved for clinical use. Requires 510(k) clearance.         ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import type { LabResult, DoseClearanceResult } from "@/types";

// ─── Clinical Thresholds (CTCAE v5.0) ───

/**
 * Minimum Absolute Neutrophil Count for treatment clearance.
 * Below this = Grade 2 neutropenia → HOLD chemotherapy.
 * Unit: cells/mm³
 */
const ANC_THRESHOLD = 1500;

/**
 * Minimum platelet count for treatment clearance.
 * Below this = Grade 1 thrombocytopenia → HOLD chemotherapy.
 * Unit: cells/mm³
 */
const PLATELET_THRESHOLD = 100000;

/**
 * Advisory hemoglobin threshold.
 * Below this = Grade 1 anemia → Warning, not a hard stop.
 * Unit: g/dL
 */
const HEMOGLOBIN_ADVISORY = 10.0;

// ─── Input Validation ───

/**
 * Validates that lab values are within physiologically plausible ranges.
 * IEC 62304 — Input boundary validation for safety-critical data.
 *
 * @throws Error if values are outside plausible physiologic ranges
 */
function validateLabInput(labs: LabResult): void {
  if (typeof labs.anc !== "number" || isNaN(labs.anc)) {
    throw new Error("VALIDATION_ERROR: ANC must be a valid number");
  }
  if (typeof labs.platelets !== "number" || isNaN(labs.platelets)) {
    throw new Error("VALIDATION_ERROR: Platelets must be a valid number");
  }
  if (labs.anc < 0 || labs.anc > 50000) {
    throw new Error(
      `VALIDATION_ERROR: ANC value ${labs.anc} outside plausible range (0–50,000/mm³)`
    );
  }
  if (labs.platelets < 0 || labs.platelets > 1000000) {
    throw new Error(
      `VALIDATION_ERROR: Platelet value ${labs.platelets} outside plausible range (0–1,000,000/mm³)`
    );
  }
  if (
    labs.hemoglobin !== undefined &&
    (labs.hemoglobin < 0 || labs.hemoglobin > 25)
  ) {
    throw new Error(
      `VALIDATION_ERROR: Hemoglobin value ${labs.hemoglobin} outside plausible range (0–25 g/dL)`
    );
  }
  if (!labs.patientId || typeof labs.patientId !== "string") {
    throw new Error("VALIDATION_ERROR: patientId is required");
  }
  if (!labs.collectionDate || isNaN(Date.parse(labs.collectionDate))) {
    throw new Error("VALIDATION_ERROR: collectionDate must be a valid ISO date");
  }
}

// ─── Core Validation Function ───

/**
 * Validates whether a patient's hematologic lab results meet minimum
 * safety thresholds for cytotoxic chemotherapy administration.
 *
 * IEC 62304 Class B — Safety function.
 * FHIR R4 — Accepts Observation-aligned lab data.
 *
 * @param labs - Patient lab results (ANC, Platelets, optional Hemoglobin)
 * @param validatedBy - ID of the clinician or system performing validation
 * @returns DoseClearanceResult with clearance status and clinical rationale
 *
 * @example
 * ```ts
 * const result = validateDoseClearance({
 *   anc: 2100,
 *   platelets: 155000,
 *   hemoglobin: 11.2,
 *   collectionDate: "2026-03-28",
 *   patientId: "FHIR-PAT-001"
 * }, "DR-SHARMA-001");
 * // result.status === "CLEARED"
 * ```
 */
export function validateDoseClearance(
  labs: LabResult,
  validatedBy: string = "SYSTEM"
): DoseClearanceResult {
  // Step 1: Validate input ranges
  validateLabInput(labs);

  const reasons: string[] = [];
  const triggeringValues: DoseClearanceResult["triggeringValues"] = [];
  let status: DoseClearanceResult["status"] = "CLEARED";

  // Step 2: Check ANC (HARD STOP criterion)
  if (labs.anc < ANC_THRESHOLD) {
    status = "HARD_STOP";
    reasons.push(
      `HARD STOP: ANC ${labs.anc}/mm³ is below minimum threshold of ${ANC_THRESHOLD}/mm³. ` +
        `Grade ${labs.anc < 500 ? "4 (severe)" : labs.anc < 1000 ? "3 (moderate)" : "2"} neutropenia. ` +
        `Defer chemotherapy until ANC recovery. Consider G-CSF per NCCN guidelines.`
    );
    triggeringValues.push({
      parameter: "ANC",
      value: labs.anc,
      threshold: ANC_THRESHOLD,
      unit: "cells/mm³",
    });
  }

  // Step 3: Check Platelets (HARD STOP criterion)
  if (labs.platelets < PLATELET_THRESHOLD) {
    status = "HARD_STOP";
    reasons.push(
      `HARD STOP: Platelets ${labs.platelets.toLocaleString()}/mm³ below minimum threshold of ${PLATELET_THRESHOLD.toLocaleString()}/mm³. ` +
        `Grade ${labs.platelets < 25000 ? "4 (severe)" : labs.platelets < 50000 ? "3 (moderate)" : labs.platelets < 75000 ? "2" : "1"} thrombocytopenia. ` +
        `Defer chemotherapy. Assess for dose reduction per protocol.`
    );
    triggeringValues.push({
      parameter: "Platelets",
      value: labs.platelets,
      threshold: PLATELET_THRESHOLD,
      unit: "cells/mm³",
    });
  }

  // Step 4: Advisory — Hemoglobin (not a hard stop)
  if (
    labs.hemoglobin !== undefined &&
    labs.hemoglobin < HEMOGLOBIN_ADVISORY
  ) {
    if (status === "CLEARED") status = "HOLD";
    reasons.push(
      `ADVISORY: Hemoglobin ${labs.hemoglobin} g/dL below advisory threshold of ${HEMOGLOBIN_ADVISORY} g/dL. ` +
        `Consider transfusion or ESA per institutional protocol. Not a hard stop.`
    );
    triggeringValues.push({
      parameter: "Hemoglobin",
      value: labs.hemoglobin,
      threshold: HEMOGLOBIN_ADVISORY,
      unit: "g/dL",
    });
  }

  // Step 5: All clear
  if (reasons.length === 0) {
    reasons.push(
      `All hematologic parameters within acceptable limits. ` +
        `ANC: ${labs.anc}/mm³ (≥${ANC_THRESHOLD}), ` +
        `Platelets: ${labs.platelets.toLocaleString()}/mm³ (≥${PLATELET_THRESHOLD.toLocaleString()}).` +
        (labs.hemoglobin !== undefined ? ` Hgb: ${labs.hemoglobin} g/dL.` : "") +
        ` Treatment may proceed.`
    );
  }

  return {
    cleared: status === "CLEARED",
    status,
    reasons,
    triggeringValues,
    validatedAt: new Date().toISOString(),
    validatedBy,
  };
}

// ─── Exported Constants for Testing ───

export const THRESHOLDS = {
  ANC: ANC_THRESHOLD,
  PLATELETS: PLATELET_THRESHOLD,
  HEMOGLOBIN_ADVISORY,
} as const;
