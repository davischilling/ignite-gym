import { useNavigation } from "@react-navigation/native";
import { Heading, ScrollView, VStack } from "native-base";

import { Button } from "@/components/Button";
import { Header } from "./components/Header";
import { FormValidation } from "./FormValidation";
import { SignUpFormData } from "@/validations/signUp";

export const SignUp = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = (data: SignUpFormData) => {
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
        <FormValidation onSubmit={handleSignUp} />
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
