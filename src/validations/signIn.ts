import * as yup from "yup";
import { createContext } from "react";
import { ValidationContextType } from "@/contexts/Validation";

export type SignInFormData = {
  email: string;
  password: string;
};

export const SignInValidationContext = createContext(
  {} as ValidationContextType<SignInFormData>
);

export const SignInDefaultValues = {
  email: "",
  password: "",
};

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("Informe um e-mail válido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});
