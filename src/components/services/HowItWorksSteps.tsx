/**
 * MAHALAKSHMI TOUR & TRAVEL — HOW IT WORKS STEPS
 * 4-Step collaborative journey coordination workflow.
 */

import React from 'react';

export function HowItWorksSteps() {
  const steps = [
    {
      num: '01',
      title: 'Tell Us Where',
      desc: 'Share your starting point in Madurai, destination, and approximate travel dates.',
    },
    {
      num: '02',
      title: 'Tell Us Who',
      desc: 'Let us know how many are travelling and whether you need a van or private sedan.',
    },
    {
      num: '03',
      title: 'We Plan & Allocate',
      desc: 'Our Madurai travel desk confirms the vehicle, route halts, and dedicated driver.',
    },
    {
      num: '04',
      title: 'Travel With Care',
      desc: 'Door-to-door pickup in Madurai and unhurried travel across South India.',
    },
  ];

  return (
    <section className="mb-16">
      <div className="max-w-2xl mb-10">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          THE COORDINATION PROCESS
        </span>
        <h2 className="type-h2 text-[var(--text-primary)] mb-2">
          How It Works
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Four clear steps from initial enquiry to reaching your destination.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] relative flex flex-col justify-between"
          >
            <div>
              <span className="type-data-number text-2xl text-[var(--color-terracotta-500)] block mb-3">
                {step.num}
              </span>
              <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
                {step.title}
              </h3>
              <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </div>
            {idx < 3 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                <span className="w-6 h-6 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center text-[10px] text-[var(--color-terracotta-500)]">
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
