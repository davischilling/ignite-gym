import { Image } from "native-base";

export const ExerciseImage = () => (
  <Image
    w="full"
    h={80}
    source={{
      uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
    }}
    alt="Nome do exercício"
    mb={3}
    resizeMode="cover"
    rounded="lg"
  />
);
