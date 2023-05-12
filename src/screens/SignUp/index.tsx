import { useNavigation } from "@react-navigation/native";
import { ScrollView, VStack } from "native-base";

import { Button } from "@/components/Button";
import { FormValidation } from "@/contexts/Validation";
import { useAuth } from "@/hooks/useAuth";
import {
  SignUpDefaultValues,
  signUpSchema,
  SignUpValidationContext,
} from "@/validations/signUp";
import { FormInputs } from "./components/FormInputs";
import { Header } from "./components/Header";

export const SignUp = () => {
  const navigation = useNavigation();
  const { isLoading, handleSignUpSubmit } = useAuth();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={5} pb={16}>
        <Header />
        <FormValidation
          ValidationContext={SignUpValidationContext}
          schema={signUpSchema}
          defaultValues={SignUpDefaultValues}
        >
          <FormInputs onSubmit={handleSignUpSubmit} isLoading={isLoading} />
        </FormValidation>
        <Button
          title="Voltar para o login"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />
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
