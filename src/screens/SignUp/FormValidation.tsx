import { ValidationProvider } from "@/contexts/Validation";
import {
  SignUpFormProps,
  signUpSchema,
  SignUpValidationContext,
} from "@/validations/signUp";
import { FormInputs } from "./components/FormInputs";

export const FormValidation = ({ onSubmit }: SignUpFormProps) => {
  return (
    <ValidationProvider
      ValidationContext={SignUpValidationContext}
      schema={signUpSchema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        password_confirm: "",
      }}
    >
      <FormInputs onSubmit={onSubmit} />
    </ValidationProvider>
  );
};
