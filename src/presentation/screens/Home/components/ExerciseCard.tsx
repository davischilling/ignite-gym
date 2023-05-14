import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  uri: string;
  heading: string;
  description: string;
};

export const ExerciseCard = ({ uri, heading, description, ...rest }: Props) => (
  <TouchableOpacity {...rest}>
    <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
      <Image
        alt="Imagem do exercício"
        w={16}
        h={16}
        rounded="md"
        mr={4}
        resizeMode="cover"
        source={{
          uri,
        }}
      />

      <VStack flex={1}>
        <Heading color="white" fontSize="lg" fontFamily="heading">
          {heading}
        </Heading>
        <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
          {description}
        </Text>
      </VStack>

      <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
    </HStack>
  </TouchableOpacity>
);
