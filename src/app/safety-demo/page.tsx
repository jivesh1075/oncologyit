import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { SafetyDemoClient } from "./safety-demo-client";

export const metadata = genMeta({
  title: "Clinical Safety Demo — Dose Clearance Engine",
  description: "Interactive demo of the FHIR R4-aligned dose clearance safety engine for chemotherapy treatment validation.",
  path: "/safety-demo",
});

export default function SafetyDemoPage() {
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
            Clinical Safety Engine
          </p>
          <h1 className="font-serif text-4xl font-bold">
            Dose Clearance Validation Demo
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Interactive demonstration of the FHIR R4-aligned hematologic safety
            engine. Enter lab values to see real-time treatment clearance
            validation with CTCAE v5.0 grading.
          </p>
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800" role="alert">
            <strong>Demonstration Only:</strong> This is educational software.
            It is NOT approved for clinical decision-making. Always consult
            institutional protocols and treating physicians for patient care decisions.
          </div>
        </div>

        <SafetyDemoClient />
      </div>
    </section>
  );
}
