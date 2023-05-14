import { Heading, HStack, Text } from "native-base";

type Props = {
  title: string;
  counter: number;
};

export const ExerciseCounter = ({ title, counter }: Props) => (
  <HStack justifyContent="space-between" mb={5}>
    <Heading color="gray.200" fontSize="md" fontFamily="heading">
      {title}
    </Heading>
    <Text color="gray.200" fontSize="sm">
      {counter}
    </Text>
  </HStack>
);
