import { AuthNavigatorRoutesProps } from "@/navigation/auth.routes";
import { useNavigation } from "@react-navigation/native";
import { Center, ScrollView, Text, VStack } from "native-base";

import { Button } from "@/components/Button";
import { FormValidation } from "@/contexts/Validation";
import { useAuth } from "@/hooks/useAuth";
import {
  SignInDefaultValues,
  signInSchema,
  SignInValidationContext,
} from "@/validations/signIn";
import { FormInputs } from "./components/FormInputs";
import { Header } from "./components/Header";

export const SignIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { isLoading, handleSignInSubmit } = useAuth();

  const handleNavigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

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
            onPress={handleNavigateToSignUp}
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
