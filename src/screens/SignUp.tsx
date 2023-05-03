import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import BGImg from "@/assets/background.png";
import LogoSVG from "@/assets/logo.svg";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const IGText = ({ text }: { text: string }) => (
  <Text color="gray.100" fontSize="sm">
    {text}
  </Text>
);

export const SignUp = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={5} pb={16}>
        <Image
          source={BGImg}
          defaultSource={BGImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSVG />
          <IGText text="Treine a sua mente e o seu corpo" />
        </Center>
        <Heading
          color="gray.100"
          fontSize="xl"
          mb={6}
          textAlign="center"
          fontFamily="heading"
        >
          Crie sua conta
        </Heading>
        <Input placeholder="Nome" />
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />
        <Button title="Criar e acessar" />

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
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
