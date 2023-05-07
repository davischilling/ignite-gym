import { Center, Image, Text } from "native-base";

import BGImg from "@/assets/background.png";
import LogoSVG from "@/assets/logo.svg";

export const Header = () => (
  <>
    <Image
      source={BGImg}
      defaultSource={BGImg}
      alt="Pessoas treinando"
      resizeMode="contain"
      position="absolute"
    />
    <Center my={24}>
      <LogoSVG />
      <Text color="gray.100" fontSize="sm">
        Treine a sua mente e o seu corpo
      </Text>
    </Center>
  </>
);
