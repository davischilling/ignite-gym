import { Center, ScrollView, Text, VStack } from "native-base";

import { useHooks } from "@/domain/hooks/use_hooks";
import {
  SignInDefaultValues,
  signInSchema,
  SignInValidationContext,
} from "@/domain/validations/signIn";
import { Button } from "@/presentation/components/Button";
import { FormValidation } from "@/presentation/contexts/validation";
import { FormInputs } from "./components/FormInputs";
import { Header } from "./components/Header";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/presentation/navigation/auth.routes";

export const SignIn = () => {
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    auth: { isLoading, handleSignInSubmit },
  } = useHooks();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={5} pb={16}>
        <Header />
        <FormValidation
          ValidationContext={SignInValidationContext}
          schema={signInSchema}
          defaultValues={SignInDefaultValues}
        >
          <FormInputs onSubmit={handleSignInSubmit} isLoading={isLoading} />
        </FormValidation>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => authNavigation.navigate("SignUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

// Text margin and padding props
// my: margin vertical
// mx: margin horizontal
// px: padding horizontal
// py: padding vertical
// mt: margin top
// mb: margin bottom
// pt: padding top
// pb: padding bottom
// ml: margin left
// mr: margin right
// pl: padding left
// pr: padding right
