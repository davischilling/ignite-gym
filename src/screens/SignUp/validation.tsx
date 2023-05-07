import { Button } from "@/components/Button";
import { useValidation } from "@/hooks/useValidation";
import * as yup from "yup";
import { Inputs } from "./components/Inputs";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Informe o nome."),
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("Informe um e-mail válido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Informe a confirmação da senha.")
    .oneOf([yup.ref("password"), ""], "As senhas devem ser iguais."),
});

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

type Props = {
  onSubmit: (data: SignUpFormData) => void;
};

export const FormValidation = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit } = useValidation<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    schema: signUpSchema,
  });

  return (
    <>
      <Inputs
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
      <Button title="Criar e acessar" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
