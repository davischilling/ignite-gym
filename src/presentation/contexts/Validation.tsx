import { useValidation } from "@/domain/hooks/useValidation";
import { ReactNode } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import * as yup from "yup";

export interface ValidationContextDataProps<T extends FieldValues> {
  control: Control<T, any>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
}

interface ValidationProviderProps<T extends FieldValues> {
  children: ReactNode;
  defaultValues?: any;
  schema: yup.ObjectSchema<any>;
  ValidationContext: React.Context<ValidationContextDataProps<T>>;
}

function ValidationProvider<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  ValidationContext,
}: ValidationProviderProps<T>) {
  const { control, errors, handleSubmit } = useValidation<T>({
    defaultValues,
    schema,
  });

  return (
    <ValidationContext.Provider
      value={{
        control,
        errors,
        handleSubmit,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
}

export function FormValidation<T extends FieldValues>({
  ValidationContext,
  schema,
  defaultValues,
  children,
}: ValidationProviderProps<T>) {
  return (
    <ValidationProvider
      ValidationContext={ValidationContext}
      schema={schema}
      defaultValues={defaultValues}
    >
      {children}
    </ValidationProvider>
  );
}
