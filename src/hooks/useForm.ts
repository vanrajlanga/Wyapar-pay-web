import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  loading: boolean;
  handleChange: (field: keyof T, value: unknown) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldError: (field: keyof T, error: string) => void;
  clearError: (field: string) => void;
  reset: () => void;
}

/**
 * useForm - Custom hook for form state management and validation
 *
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors: Record<string, string> = {};
 *     if (!values.email) errors.email = 'Email is required';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await login(values);
 *   }
 * });
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (field: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field as string]: error }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setLoading(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate if validation function is provided
      if (validate) {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      setLoading(true);
      setErrors({});

      try {
        await onSubmit(values);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
        setErrors({
          general: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [values, validate, onSubmit]
  );

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setFieldError,
    clearError,
    reset,
  };
}
