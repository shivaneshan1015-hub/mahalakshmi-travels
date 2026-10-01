import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import { getAEOQuestionsForPath } from '@/config/aeo-registry';

interface VisibleAEOAnswerBlockProps {
  canonicalPath: string;
  className?: string;
}

export function VisibleAEOAnswerBlock({ canonicalPath, className = '' }: VisibleAEOAnswerBlockProps) {
  const aeoItems = getAEOQuestionsForPath(canonicalPath);

  if (!aeoItems || aeoItems.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 my-8 ${className}`}>
      {aeoItems.map((aeo) => (
        <div
          key={aeo.id}
          data-aeo-id={aeo.id}
          className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] shadow-editorial-xs"
        >
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-[var(--color-terracotta-500)] shrink-0" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)]">
              Verified Travel Information
            </span>
          </div>
          <h3 className="type-h4 text-[var(--color-ink-950)] mb-2">
            {aeo.question}
          </h3>
          <div className="flex items-start gap-2.5 pt-1">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-terracotta-500)] shrink-0 mt-0.5" />
            <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
              {aeo.answerText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
