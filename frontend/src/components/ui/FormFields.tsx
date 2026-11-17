import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldWrapper({ label, htmlFor, error, hint, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="label-base" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({ label, error, hint, id, className = '', ...rest }: TextFieldProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldWrapper label={label} htmlFor={fieldId} error={error} hint={hint}>
      <input
        id={fieldId}
        className={`input-base ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        {...rest}
      />
    </FieldWrapper>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextAreaField({ label, error, id, className = '', ...rest }: TextAreaFieldProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldWrapper label={label} htmlFor={fieldId} error={error}>
      <textarea
        id={fieldId}
        rows={3}
        className={`input-base resize-y ${error ? 'border-red-400' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        {...rest}
      />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField({
  label,
  error,
  options,
  placeholder,
  id,
  className = '',
  ...rest
}: SelectFieldProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldWrapper label={label} htmlFor={fieldId} error={error}>
      <select
        id={fieldId}
        className={`input-base ${error ? 'border-red-400' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
