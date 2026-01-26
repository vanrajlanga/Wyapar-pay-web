/**
 * Educational Content Components
 * Reusable components for FAQs, security tips, and how-to guides
 */

import { useState } from 'react';
import { Card } from '@/components/ui';
import {
  MdExpandMore,
  MdExpandLess,
  MdCheckCircle,
  MdShield,
  MdInfo,
} from 'react-icons/md';

// FAQ Component
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  items,
  className = '',
}: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={className}>
      <h3 className="text-2xl font-bold text-text-primary mb-6">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-background transition-colors"
            >
              <span className="font-semibold text-text-primary">
                {item.question}
              </span>
              {expandedIndex === index ? (
                <MdExpandLess
                  size={24}
                  className="text-primary flex-shrink-0 ml-4"
                />
              ) : (
                <MdExpandMore
                  size={24}
                  className="text-text-secondary flex-shrink-0 ml-4"
                />
              )}
            </button>
            {expandedIndex === index && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-text-secondary leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// Security Tips Component
interface SecurityTip {
  title: string;
  description: string;
}

interface SecurityTipsSectionProps {
  title?: string;
  tips: SecurityTip[];
  className?: string;
}

export function SecurityTipsSection({
  title = 'Security Tips',
  tips,
  className = '',
}: SecurityTipsSectionProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-accent-success/10 rounded-lg">
            <MdShield size={32} className="text-accent-success" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
        </div>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-background rounded-lg border-l-4 border-accent-success"
            >
              <MdCheckCircle
                className="text-accent-success flex-shrink-0 mt-1"
                size={20}
              />
              <div>
                <p className="font-semibold text-text-primary mb-1">
                  {tip.title}
                </p>
                <p className="text-sm text-text-secondary">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// How-To Guide Component
interface HowToStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HowToGuideProps {
  title: string;
  description?: string;
  steps: HowToStep[];
  className?: string;
}

export function HowToGuide({
  title,
  description,
  steps,
  className = '',
}: HowToGuideProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <MdInfo size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
            {description && (
              <p className="text-sm text-text-secondary mt-1">{description}</p>
            )}
          </div>
        </div>

        <div className="space-y-6 mt-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h4 className="font-semibold text-text-primary mb-2">
                  {step.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Info Banner Component
interface InfoBannerProps {
  title: string;
  description: string;
  variant?: 'info' | 'warning' | 'success' | 'error';
  className?: string;
}

export function InfoBanner({
  title,
  description,
  variant = 'info',
  className = '',
}: InfoBannerProps) {
  const variants = {
    info: {
      bg: 'bg-primary/10',
      border: 'border-primary',
      icon: 'text-primary',
    },
    warning: {
      bg: 'bg-accent-warning/10',
      border: 'border-accent-warning',
      icon: 'text-accent-warning',
    },
    success: {
      bg: 'bg-accent-success/10',
      border: 'border-accent-success',
      icon: 'text-accent-success',
    },
    error: {
      bg: 'bg-accent-error/10',
      border: 'border-accent-error',
      icon: 'text-accent-error',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`${style.bg} border-l-4 ${style.border} p-4 rounded-lg ${className}`}
    >
      <div className="flex items-start gap-3">
        <MdInfo className={`${style.icon} flex-shrink-0 mt-1`} size={24} />
        <div>
          <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Quick Stats Component (for displaying statistics)
interface QuickStat {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

interface QuickStatsProps {
  stats: QuickStat[];
  className?: string;
}

export function QuickStats({ stats, className = '' }: QuickStatsProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary">
                {stat.value}
              </p>
            </div>
            {stat.icon && (
              <div className="p-3 bg-primary/10 rounded-lg">{stat.icon}</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
