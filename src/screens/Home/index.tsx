import { useState } from "react";
import { VStack } from "native-base";

import { ExerciseCounter, GroupList, Header } from "./components";
import { ExerciseCardList } from "./components/ExerciseCardList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigation/app.routes";
import { UserPhoto } from "@/components/UserPhoto";
import { useAuth } from "@/hooks/useAuth";

import defaultUserAvatar from "@/assets/userPhotoDefault.png";

const GROUPS = ["Costas", "Ombros", "Pernas", "Braços", "Peito"];
const EXERCISES = ["Remada", "Puxada", "Ombrada", "Sarrada"];

export const Home = () => {
  const { user, handleSignOut } = useAuth();
  const [groupSelected, setGroupSelected] = useState("costas");

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const handleNavigateToExerciseDetails = () => {
    navigation.navigate("Exercise");
  };

  return (
    <VStack flex={1}>
      <Header greetings="Olá" name={user.name} onPress={handleSignOut}>
        <UserPhoto
          size={14}
          source={
            user.avatar
              ? {
                  uri: user.avatar,
                }
              : defaultUserAvatar
          }
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
          onPress={handleNavigateToExerciseDetails}
        />
      </VStack>
    </VStack>
  );
};
