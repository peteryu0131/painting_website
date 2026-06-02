"use client";

import { useState } from "react";

type TrainingProgram = {
  title: string;
  summary: string;
  details: string[];
};

type TrainingTabsProps = {
  programs: TrainingProgram[];
};

export function TrainingTabs({ programs }: TrainingTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProgram = programs[activeIndex];

  return (
    <div className="rounded-[8px] border border-gold/25 bg-oliveCard p-4 shadow-premium">
      <div
        role="tablist"
        aria-label="Training programs"
        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
      >
        {programs.map((program, index) => {
          const selected = activeIndex === index;

          return (
            <button
              key={program.title}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveIndex(index)}
              className={`rounded-[8px] border px-4 py-3 text-left text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold ${
                selected
                  ? "border-gold bg-gold text-oliveMain"
                  : "border-gold/20 bg-oliveSection text-textMain hover:border-gold/45 hover:bg-oliveMain/35"
              }`}
            >
              {program.title}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[8px] border border-gold/20 bg-oliveSection p-6">
        <p className="text-sm font-semibold text-gold">Training focus</p>
        <h3 className="mt-3 font-serifDisplay text-3xl text-textMain">
          {activeProgram.title}
        </h3>
        <p className="mt-4 max-w-3xl leading-7 text-textMuted">
          {activeProgram.summary}
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {activeProgram.details.map((detail) => (
            <div
              key={detail}
              className="rounded-[8px] border border-gold/15 bg-white/[0.05] px-4 py-3 text-sm text-textMain"
            >
              {detail}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
