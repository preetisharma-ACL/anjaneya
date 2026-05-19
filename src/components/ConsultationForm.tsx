import { useState } from "react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConsultationFormProps {
  className?: string;
}

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  requirements: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  mobile: "",
  email: "",
  requirements: "",
};

// Replace this with your actual POST endpoint when available.
const API_ENDPOINT = "/api/consultations";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!data.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\+?[\d\s\-()]{7,15}$/.test(data.mobile.trim())) {
    errors.mobile = "Enter a valid mobile number.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ConsultationForm({ className = "" }: ConsultationFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the field-level error as the user types.
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Run client-side validation before hitting the network.
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName.trim(),
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          requirements: formData.requirements.trim(),
        }),
      });

      if (!response.ok) {
        // Attempt to surface a server-provided error message.
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message ?? `Request failed (${response.status})`);
      }

      setSubmitStatus("success");

      // Auto-reset after 3 s so the user can submit another enquiry.
      setTimeout(resetForm, 3000);
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  // ── Shared input class ───────────────────────────────────────────────────────

  const inputBase =
    "w-full bg-[#FDFAF6] p-16 rounded-m-8 text-xs font-extralight text-[#888888] outline-none focus:ring-1 transition-all";

  function inputClass(field: keyof FormErrors) {
    return `${inputBase} ${
      errors[field]
        ? "ring-1 ring-red-400 focus:ring-red-400"
        : "focus:ring-surface-primary/20"
    }`;
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className={`w-full lg:w-[464px] bg-surface-white p-24 rounded-[26px] shadow-[0px_20px_13px_0px_rgba(0,0,0,0.01),0px_100px_80px_0px_rgba(0,0,0,0.02)] ${className}`}
    >
      <div className="flex flex-col gap-24">
        {/* Header */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-surface-primary font-semibold uppercase tracking-[0.15em]">
              Get Expert Advice
            </span>
            <h3 className="font-headline text-xl font-normal text-primary">
              Schedule a Free Consultation
            </h3>
          </div>
          <p className="text-tertiary text-xs font-extralight leading-relaxed">
            Our advisor will contact you within 24 hours with a personalised
            property briefing.
          </p>
        </div>

        {/* Success state */}
        {submitStatus === "success" ? (
          <div className="flex flex-col items-center gap-12 py-16 text-center">
            <div className="text-3xl">✅</div>
            <p className="text-surface-primary font-semibold text-sm">
              Consultation Booked!
            </p>
            <p className="text-tertiary text-xs font-extralight leading-relaxed">
              Thank you! Our advisor will reach out to you within 24 hours.
            </p>
          </div>
        ) : (
          /* Form */
          <form className="flex flex-col gap-12" onSubmit={handleSubmit} noValidate>
            {/* Full name */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={submitStatus === "loading"}
                className={inputClass("fullName")}
              />
              {errors.fullName && (
                <span className="text-red-400 text-[10px] font-extralight pl-2">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleChange}
                disabled={submitStatus === "loading"}
                className={inputClass("mobile")}
              />
              {errors.mobile && (
                <span className="text-red-400 text-[10px] font-extralight pl-2">
                  {errors.mobile}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email id"
                value={formData.email}
                onChange={handleChange}
                disabled={submitStatus === "loading"}
                className={inputClass("email")}
              />
              {errors.email && (
                <span className="text-red-400 text-[10px] font-extralight pl-2">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Requirements */}
            <textarea
              name="requirements"
              placeholder="Any specific requirements?"
              rows={2}
              value={formData.requirements}
              onChange={handleChange}
              disabled={submitStatus === "loading"}
              className={`${inputBase} focus:ring-surface-primary/20 resize-none`}
            />

            {/* API / network error */}
            {submitStatus === "error" && errorMessage && (
              <p className="text-red-400 text-[10px] font-extralight text-center">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="xl"
              disabled={submitStatus === "loading"}
              className="w-full rounded-full mt-12 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitStatus === "loading"
                ? "Booking…"
                : "Book My Free Consultation"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}