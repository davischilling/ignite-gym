import { VStack } from "native-base";
import { useState } from "react";

import { UserPhoto } from "@/presentation/components/UserPhoto";
import { ExerciseCounter, GroupList, Header } from "./components";
import { ExerciseCardList } from "./components/ExerciseCardList";

import { useHooks } from "@/domain/hooks/use_hooks";
import { useStatefulUseCase } from "@/domain/hooks/use_stateful_uc";
import {
  DEFAULT_STATE,
  HomeScreenUseCase,
  State,
} from "@/domain/use_cases/screens/home";
import defaultUserAvatar from "@/presentation/assets/userPhotoDefault.png";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/presentation/navigation/app.routes";

const EXERCISES = ["Remada", "Puxada", "Ombrada", "Sarrada"];

export const Home = () => {
  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const {
    toast,
    auth: { user, handleSignOut },
  } = useHooks();

  const [groupSelected, setGroupSelected] = useState("costas");

  const { state, useCase } = useStatefulUseCase<State, HomeScreenUseCase>({
    UseCase: HomeScreenUseCase,
    DEFAULT_STATE,
    INITIAL_STATE: {
      toast,
    },
  });

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
        groups={state.groups}
        groupSelected={groupSelected}
        setGroupSelected={setGroupSelected}
      />
      <VStack flex={1} px={4}>
        <ExerciseCounter title="Exercícios" counter={EXERCISES.length} />
        <ExerciseCardList
          exercises={EXERCISES}
          onPress={() => appNavigation.navigate("Exercise")}
        />
      </VStack>
    </VStack>
  );
};
