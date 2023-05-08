import { FlatList } from "native-base";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  exercises: string[];
  onPress: () => void;
};

export const ExerciseCardList = ({ exercises, onPress }: Props) => (
  <FlatList
    data={exercises}
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <ExerciseCard
        heading={item}
        description="3 séries de 10 repetições"
        uri="https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg"
        onPress={onPress}
      />
    )}
    showsVerticalScrollIndicator={false}
    _contentContainerStyle={{ pb: 4 }}
  />
);
