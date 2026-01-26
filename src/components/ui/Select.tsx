'use client';

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  Children,
  isValidElement,
} from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  className?: string;
}

export function Select({
  value,
  onValueChange,
  children,
  placeholder = 'Select...',
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (val: string, label: ReactNode) => {
    setSelectedValue(val);
    onValueChange?.(val);
    setIsOpen(false);
    setSelectedLabel(label);
  };

  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(null);

  // Extract label from children
  useEffect(() => {
    if (selectedValue) {
      Children.forEach(children, (child) => {
        if (isValidElement(child) && child.props.value === selectedValue) {
          setSelectedLabel(child.props.children);
        }
      });
    } else {
      setSelectedLabel(null);
    }
  }, [selectedValue, children]);

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm',
          'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
        )}
      >
        <span className={selectedValue ? 'text-gray-900' : 'text-gray-500'}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-gray-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-1">
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                return (
                  <SelectItem
                    key={child.props.value}
                    value={child.props.value}
                    onSelect={() =>
                      handleSelect(child.props.value, child.props.children)
                    }
                    isSelected={selectedValue === child.props.value}
                  >
                    {child.props.children}
                  </SelectItem>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function SelectItem({
  value: _value,
  children,
  onSelect,
  isSelected,
}: SelectItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none',
        'hover:bg-gray-100 focus:bg-gray-100',
        isSelected && 'bg-blue-50 text-blue-900'
      )}
    >
      {children}
      {isSelected && <span className="ml-auto text-blue-600">✓</span>}
    </button>
  );
}
