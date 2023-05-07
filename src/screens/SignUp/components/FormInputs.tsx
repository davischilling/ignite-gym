import { useContext } from "react";
import { Controller } from "react-hook-form";

import { SignUpFormData, SignUpValidationContext } from "@/validations/signUp";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export type Props = {
  onSubmit: (data: SignUpFormData) => void;
};

export const FormInputs = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit } = useContext(SignUpValidationContext);

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
      <Button title="Criar e acessar" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
