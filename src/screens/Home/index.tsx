import { useState } from "react";
import { VStack } from "native-base";

import { ExerciseCounter, GroupList, Header, UserPhoto } from "./components";
import { ExerciseCard } from "./components/ExerciseCard";
import { ExerciseCardList } from "./components/ExerciseCardList";

const GROUPS = ["Costas", "Ombros", "Pernas", "Braços", "Peito"];
const EXERCISES = ["Remada", "Puxada", "Ombrada", "Sarrada"];

export const Home = () => {
  const [groupSelected, setGroupSelected] = useState("costas");

  return (
    <VStack flex={1}>
      <Header greetings="Olá" name="Davi Schilling">
        <UserPhoto
          size={14}
          source={{
            uri: "https://avatars.githubusercontent.com/u/60005589?v=4",
          }}
          alt="Imagem do usuário"
        />
      </Header>
      <GroupList
        groups={GROUPS}
        groupSelected={groupSelected}
        setGroupSelected={setGroupSelected}
      />
      <VStack flex={1} px={4}>
        <ExerciseCounter title="Exercícios" counter={EXERCISES.length} />
        <ExerciseCardList
          exercises={EXERCISES}
        />
      </VStack>
    </VStack>
  );
};
