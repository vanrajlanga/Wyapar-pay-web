import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * PageHeader - Consistent page header component
 *
 * @example
 * <PageHeader
 *   title="Dashboard"
 *   subtitle="Manage your account"
 *   action={<Button>Add New</Button>}
 * />
 */
export function PageHeader({
  title,
  subtitle,
  action,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-6 ${className}`}>
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          {title}
        </h1>
        {subtitle && <p className="text-text-secondary">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  );
}
