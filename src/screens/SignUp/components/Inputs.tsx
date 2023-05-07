import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

import { Input } from "@/components/Input";
import { SignUpFormData } from "../validation";

type Props = {
  control: Control<SignUpFormData, any>;
  errors: FieldErrors<SignUpFormData>;
  handleSubmit: UseFormHandleSubmit<SignUpFormData>;
  onSubmit: (data: SignUpFormData) => void;
};

export const Inputs = ({ control, errors, handleSubmit, onSubmit }: Props) => {
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Nome"
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Senha"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password_confirm"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme a senha"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            onSubmitEditing={handleSubmit(onSubmit)}
            returnKeyType="send"
            error={errors.password_confirm?.message}
          />
        )}
      />
    </>
  );
};
