import { Button } from "@/components/ui/button";

interface ConsultationFormProps {
  className?: string;
}

export function ConsultationForm({ className = "" }: ConsultationFormProps) {
  return (
    <div className={`w-full lg:w-[464px] bg-surface-white p-24 rounded-[26px] shadow-[0px_20px_13px_0px_rgba(0,0,0,0.01),0px_100px_80px_0px_rgba(0,0,0,0.02)] ${className}`}>
      <div className="flex flex-col gap-24">
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
            Our advisor will contact you within 24 hours with a personalised property briefing.
          </p>
        </div>

        <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full bg-[#FDFAF6] p-16 rounded-m-8 text-xs font-extralight text-[#888888] outline-none focus:ring-1 focus:ring-surface-primary/20 transition-all"
          />
          <input
            type="tel"
            placeholder="Mobile number"
            className="w-full bg-[#FDFAF6] p-16 rounded-m-8 text-xs font-extralight text-[#888888] outline-none focus:ring-1 focus:ring-surface-primary/20 transition-all"
          />
          <input
            type="email"
            placeholder="Email id"
            className="w-full bg-[#FDFAF6] p-16 rounded-m-8 text-xs font-extralight text-[#888888] outline-none focus:ring-1 focus:ring-surface-primary/20 transition-all"
          />
          <textarea
            placeholder="Any specific requirements?"
            rows={2}
            className="w-full bg-[#FDFAF6] p-16 rounded-m-8 text-xs font-extralight text-[#888888] outline-none focus:ring-1 focus:ring-surface-primary/20 transition-all resize-none"
          />
          <Button variant="primary" size="xl" className="w-full rounded-full mt-12">
            Book My Free Consultation
          </Button>
        </form>
      </div>
    </div>
  );
}
