import React from 'react';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * EmptyState - Consistent empty state display
 *
 * @example
 * <EmptyState
 *   icon={<MdInbox size={48} />}
 *   title="No transactions yet"
 *   description="Start by making your first recharge"
 *   action={{
 *     label: "Make Recharge",
 *     onClick: () => router.push('/recharge')
 *   }}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="flex justify-center mb-4 text-text-tertiary opacity-50">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
