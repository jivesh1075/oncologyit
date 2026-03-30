/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  Dose Clearance Safety Engine — Unit Tests                         ║
 * ║  IEC 62304 Class B · Verification & Validation Test Suite          ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║  Tests cover:                                                       ║
 * ║  • Normal clearance path                                            ║
 * ║  • ANC hard stop (< 1,500/mm³)                                     ║
 * ║  • Platelet hard stop (< 100,000/mm³)                              ║
 * ║  • Hemoglobin advisory (< 10.0 g/dL)                               ║
 * ║  • Combined failures                                                ║
 * ║  • Input validation (boundary, type, range)                         ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { describe, it, expect } from "vitest";
import { validateDoseClearance, THRESHOLDS } from "@/lib/safety/dose-clearance";
import type { LabResult } from "@/types";

const baseLabs: LabResult = {
  anc: 2500,
  platelets: 180000,
  hemoglobin: 12.5,
  collectionDate: "2026-03-28",
  patientId: "TEST-PAT-001",
};

describe("validateDoseClearance", () => {
  // ─── Clearance Path ───

  it("should CLEAR when all values are within normal limits", () => {
    const result = validateDoseClearance(baseLabs);
    expect(result.cleared).toBe(true);
    expect(result.status).toBe("CLEARED");
    expect(result.triggeringValues).toHaveLength(0);
  });

  it("should CLEAR at exact ANC threshold (1500)", () => {
    const result = validateDoseClearance({ ...baseLabs, anc: 1500 });
    expect(result.cleared).toBe(true);
    expect(result.status).toBe("CLEARED");
  });

  it("should CLEAR at exact platelet threshold (100000)", () => {
    const result = validateDoseClearance({ ...baseLabs, platelets: 100000 });
    expect(result.cleared).toBe(true);
    expect(result.status).toBe("CLEARED");
  });

  // ─── ANC Hard Stop ───

  it("should HARD_STOP when ANC < 1500", () => {
    const result = validateDoseClearance({ ...baseLabs, anc: 1499 });
    expect(result.cleared).toBe(false);
    expect(result.status).toBe("HARD_STOP");
    expect(result.triggeringValues).toContainEqual(
      expect.objectContaining({ parameter: "ANC", value: 1499, threshold: THRESHOLDS.ANC })
    );
  });

  it("should HARD_STOP with Grade 4 neutropenia (ANC < 500)", () => {
    const result = validateDoseClearance({ ...baseLabs, anc: 200 });
    expect(result.status).toBe("HARD_STOP");
    expect(result.reasons[0]).toContain("Grade 4");
  });

  it("should HARD_STOP with Grade 3 neutropenia (ANC 500-999)", () => {
    const result = validateDoseClearance({ ...baseLabs, anc: 750 });
    expect(result.status).toBe("HARD_STOP");
    expect(result.reasons[0]).toContain("Grade 3");
  });

  // ─── Platelet Hard Stop ───

  it("should HARD_STOP when platelets < 100000", () => {
    const result = validateDoseClearance({ ...baseLabs, platelets: 99999 });
    expect(result.cleared).toBe(false);
    expect(result.status).toBe("HARD_STOP");
    expect(result.triggeringValues).toContainEqual(
      expect.objectContaining({ parameter: "Platelets", value: 99999 })
    );
  });

  it("should grade severe thrombocytopenia (platelets < 25000)", () => {
    const result = validateDoseClearance({ ...baseLabs, platelets: 15000 });
    expect(result.status).toBe("HARD_STOP");
    expect(result.reasons[0]).toContain("Grade 4");
  });

  // ─── Combined Failures ───

  it("should report BOTH ANC and Platelet failures", () => {
    const result = validateDoseClearance({ ...baseLabs, anc: 800, platelets: 45000 });
    expect(result.status).toBe("HARD_STOP");
    expect(result.triggeringValues).toHaveLength(2);
    expect(result.reasons).toHaveLength(2);
  });

  // ─── Hemoglobin Advisory ───

  it("should HOLD (not hard stop) for low hemoglobin only", () => {
    const result = validateDoseClearance({ ...baseLabs, hemoglobin: 9.0 });
    expect(result.status).toBe("HOLD");
    expect(result.cleared).toBe(false);
    expect(result.reasons[0]).toContain("ADVISORY");
  });

  it("should be CLEARED without hemoglobin value", () => {
    const { hemoglobin: _, ...noHgb } = baseLabs;
    const result = validateDoseClearance(noHgb as LabResult);
    expect(result.cleared).toBe(true);
  });

  // ─── Input Validation ───

  it("should reject negative ANC", () => {
    expect(() =>
      validateDoseClearance({ ...baseLabs, anc: -100 })
    ).toThrow("VALIDATION_ERROR");
  });

  it("should reject ANC > 50000", () => {
    expect(() =>
      validateDoseClearance({ ...baseLabs, anc: 60000 })
    ).toThrow("VALIDATION_ERROR");
  });

  it("should reject missing patientId", () => {
    expect(() =>
      validateDoseClearance({ ...baseLabs, patientId: "" })
    ).toThrow("VALIDATION_ERROR");
  });

  it("should reject invalid date", () => {
    expect(() =>
      validateDoseClearance({ ...baseLabs, collectionDate: "not-a-date" })
    ).toThrow("VALIDATION_ERROR");
  });

  it("should reject NaN ANC", () => {
    expect(() =>
      validateDoseClearance({ ...baseLabs, anc: NaN })
    ).toThrow("VALIDATION_ERROR");
  });

  // ─── Metadata ───

  it("should include validatedAt timestamp", () => {
    const result = validateDoseClearance(baseLabs);
    expect(result.validatedAt).toBeTruthy();
    expect(new Date(result.validatedAt).getTime()).not.toBeNaN();
  });

  it("should include validatedBy", () => {
    const result = validateDoseClearance(baseLabs, "DR-TEST-001");
    expect(result.validatedBy).toBe("DR-TEST-001");
  });
});
