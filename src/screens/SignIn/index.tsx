import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/navigation/auth.routes";

import BGImg from "@/assets/background.png";
import LogoSVG from "@/assets/logo.svg";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Header } from "./components/Header";
import { FormValidation } from "@/contexts/Validation";
import {
  SignInDefaultValues,
  SignInFormData,
  signInSchema,
  SignInValidationContext,
} from "@/validations/signIn";
import { FormInputs } from "./components/FormInputs";

const IGText = ({ text }: { text: string }) => (
  <Text color="gray.100" fontSize="sm">
    {text}
  </Text>
);

export const SignIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNavigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleSignInSubmit = (data: SignInFormData) => {
    console.log(data);
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
          <FormInputs onSubmit={handleSignInSubmit} />
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
