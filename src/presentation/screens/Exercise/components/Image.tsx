import { api } from "@/domain/services/api";
import { Box, Image } from "native-base";

type Props = {
  demo: string;
};

export const ExerciseImage = ({ demo }: Props) => (
  <Box rounded="lg" overflow="hidden">
    <Image
      w="full"
      h={80}
      source={{
        uri: `${api.defaults.baseURL}/exercise/demo/${demo}`,
      }}
      alt="Nome do exercício"
      mb={3}
      resizeMode="cover"
      rounded="lg"
    />
  </Box>
);
