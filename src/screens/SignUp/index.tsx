import { useNavigation } from "@react-navigation/native";
import { Heading, ScrollView, VStack } from "native-base";

import { Button } from "@/components/Button";
import { FormValidation } from "@/contexts/Validation";
import {
  SignUpDefaultValues,
  SignUpFormData,
  signUpSchema,
  SignUpValidationContext,
} from "@/validations/signUp";
import { Header } from "./components/Header";
import { FormInputs } from "./components/FormInputs";


export const SignUp = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUpSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={5} pb={16}>
        <Header />
        <Heading
          color="gray.100"
          fontSize="xl"
          mb={6}
          textAlign="center"
          fontFamily="heading"
        >
          Crie sua conta
        </Heading>
        <FormValidation
          ValidationContext={SignUpValidationContext}
          schema={signUpSchema}
          defaultValues={SignUpDefaultValues}
        >
          <FormInputs onSubmit={handleSignUpSubmit} />
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
