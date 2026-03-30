"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";
import type { DoseClearanceResult } from "@/types";

export function SafetyDemoClient() {
  const [anc, setAnc] = useState("");
  const [platelets, setPlatelets] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [patientId, setPatientId] = useState("DEMO-PAT-001");
  const [result, setResult] = useState<DoseClearanceResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleValidate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/dose-clearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anc: Number(anc),
          platelets: Number(platelets),
          hemoglobin: hemoglobin ? Number(hemoglobin) : undefined,
          collectionDate: new Date().toISOString().split("T")[0],
          patientId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Validation failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function loadPreset(preset: "cleared" | "hold" | "hard-stop") {
    if (preset === "cleared") {
      setAnc("2500");
      setPlatelets("180000");
      setHemoglobin("12.5");
    } else if (preset === "hold") {
      setAnc("1800");
      setPlatelets("120000");
      setHemoglobin("9.2");
    } else {
      setAnc("800");
      setPlatelets("45000");
      setHemoglobin("7.8");
    }
    setResult(null);
  }

  const statusConfig = {
    CLEARED: {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      label: "Treatment Cleared",
    },
    HOLD: {
      icon: <AlertTriangle className="h-8 w-8 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      label: "Hold — Advisory Warning",
    },
    HARD_STOP: {
      icon: <XCircle className="h-8 w-8 text-red-600" />,
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      label: "HARD STOP — Do Not Treat",
    },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold">
          <Activity className="h-5 w-5 text-teal" aria-hidden="true" />
          Lab Values Input
        </h2>

        {/* Presets */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => loadPreset("cleared")}
            className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100"
          >
            Normal Labs
          </button>
          <button
            type="button"
            onClick={() => loadPreset("hold")}
            className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100"
          >
            Borderline
          </button>
          <button
            type="button"
            onClick={() => loadPreset("hard-stop")}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
          >
            Critical
          </button>
        </div>

        <form onSubmit={handleValidate} className="mt-6 space-y-4">
          <div>
            <label htmlFor="anc" className="block text-sm font-medium text-slate-700">
              ANC (cells/mm&sup3;) <span className="text-red-500">*</span>
            </label>
            <input
              id="anc"
              type="number"
              required
              min="0"
              max="50000"
              value={anc}
              onChange={(e) => setAnc(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="e.g., 2500"
            />
            <p className="mt-1 text-xs text-slate-500">
              Threshold: &ge;1,500/mm&sup3; (CTCAE v5.0)
            </p>
          </div>

          <div>
            <label htmlFor="platelets" className="block text-sm font-medium text-slate-700">
              Platelets (cells/mm&sup3;) <span className="text-red-500">*</span>
            </label>
            <input
              id="platelets"
              type="number"
              required
              min="0"
              max="1000000"
              value={platelets}
              onChange={(e) => setPlatelets(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="e.g., 180000"
            />
            <p className="mt-1 text-xs text-slate-500">
              Threshold: &ge;100,000/mm&sup3;
            </p>
          </div>

          <div>
            <label htmlFor="hemoglobin" className="block text-sm font-medium text-slate-700">
              Hemoglobin (g/dL) <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="hemoglobin"
              type="number"
              step="0.1"
              min="0"
              max="25"
              value={hemoglobin}
              onChange={(e) => setHemoglobin(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="e.g., 12.5"
            />
            <p className="mt-1 text-xs text-slate-500">
              Advisory: &lt;10.0 g/dL
            </p>
          </div>

          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-slate-700">
              Patient ID
            </label>
            <input
              id="patientId"
              type="text"
              required
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-navy px-4 py-3 font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
          >
            {loading ? "Validating..." : "Validate Dose Clearance"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Result Panel */}
      <div>
        {result ? (
          <div className={`rounded-xl border-2 p-6 ${statusConfig[result.status].bg}`}>
            <div className="flex items-center gap-3">
              {statusConfig[result.status].icon}
              <h2 className={`font-serif text-2xl font-bold ${statusConfig[result.status].text}`}>
                {statusConfig[result.status].label}
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {result.reasons.map((reason, i) => (
                <p key={i} className={`text-sm ${statusConfig[result.status].text}`}>
                  {reason}
                </p>
              ))}
            </div>

            {result.triggeringValues.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Triggering Values
                </h3>
                <table className="mt-2 w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Parameter</th>
                      <th className="py-2 text-right font-medium">Value</th>
                      <th className="py-2 text-right font-medium">Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.triggeringValues.map((tv, i) => (
                      <tr key={i} className="border-b border-slate-200/50">
                        <td className="py-2">{tv.parameter}</td>
                        <td className="py-2 text-right font-mono">
                          {tv.value.toLocaleString()} {tv.unit}
                        </td>
                        <td className="py-2 text-right font-mono text-slate-500">
                          {tv.threshold.toLocaleString()} {tv.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Validated: {new Date(result.validatedAt).toLocaleString()} · By: {result.validatedBy}
            </p>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
            <div>
              <Activity className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
              <p className="mt-4 text-lg font-medium text-slate-400">
                Enter lab values and click &ldquo;Validate&rdquo; to see results
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Try the preset buttons to see different scenarios
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
