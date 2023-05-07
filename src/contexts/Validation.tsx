import { createContext, ReactNode } from "react";
import { useValidation } from "@/hooks/useValidation";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import * as yup from "yup";

export interface ValidationContextType<T extends FieldValues> {
  control: Control<T, any>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
}

interface ValidationProviderProps<T extends FieldValues> {
  children: ReactNode;
  defaultValues?: any;
  schema: yup.ObjectSchema<any>;
  ValidationContext: React.Context<ValidationContextType<T>>
}

export function ValidationProvider<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  ValidationContext
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
