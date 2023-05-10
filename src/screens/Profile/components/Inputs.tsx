import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Heading } from "native-base";

export const FormInputs = () => (
  <>
    <Input bg="gray.600" placeholder="Nome" />
    <Input bg="gray.600" placeholder="E-mail" isDisabled />
    <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={8} fontFamily="heading">
      Alterar senha
    </Heading>
    <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />
    <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />
    <Input bg="gray.600" placeholder="Confirme a nova senha" secureTextEntry />
    <Button title="Atualizar" mt={4} />
  </>
);
