import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface WhyChooseUsCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export function WhyChooseUsCard({ icon, title, description, index }: WhyChooseUsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-surface-white rounded-xl-24 p-24 flex flex-col gap-16 w-[304px] shrink-0 min-h-[199px]"
      style={{
        boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center gap-16">
        <div className="w-48 h-48 flex items-center justify-center">
          <img src={icon} alt="" className="w-full h-full object-contain" />
        </div>
        <h3 className="text-xl font-sans font-light leading-tight text-primary">
          {title}
        </h3>
      </div>
      
      <Separator className="bg-border-default" />
      
      <p className="text-sm font-sans font-light leading-relaxed text-secondary">
        {description}
      </p>
    </motion.div>
  );
}
