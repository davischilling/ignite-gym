import { TouchableOpacity } from "react-native";
import { Heading, HStack, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  greetings: string;
  name: string;
  children: React.ReactNode;
};

export const Header = ({ greetings, name, children }: Props) => (
  <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
    {children}
    <VStack flex={1}>
      <Text color="gray.100" fontSize="md">
        {greetings},
      </Text>
      <Heading color="gray.100" fontSize="md">
        {name}
      </Heading>
    </VStack>
    <TouchableOpacity>
      <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
    </TouchableOpacity>
  </HStack>
);
