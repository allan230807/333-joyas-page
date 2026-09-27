"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CraftStep } from "@/types";

interface CraftTimelineProps {
  steps: CraftStep[];
}

export default function CraftTimeline({ steps }: CraftTimelineProps) {
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center my-16 md:my-24`}
          >
            <div className={isEven ? "md:order-1" : "md:order-2"}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className={isEven ? "md:order-2" : "md:order-1"}>
              <span className="text-accent text-small tracking-widest font-body uppercase">
                Paso {index + 1}
              </span>
              <h2 className="text-h3 font-heading text-primary mt-2">
                {step.title}
              </h2>
              <p className="text-muted text-body mt-4">
                {step.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
