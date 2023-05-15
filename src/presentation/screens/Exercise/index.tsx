import { useStatefulUseCase } from "@/domain/hooks/use_stateful_uc";
import { ExerciseModel } from "@/domain/models/exercise";
import {
  AppNavigatorRoutesProps,
  AppBottomTabParamList,
} from "@/presentation/navigation/app.routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, useToast, VStack } from "native-base";
import { BoxSeries } from "./components/BoxSeries";
import { Header } from "./components/Header";
import { ExerciseImage } from "./components/Image";
import {
  DEFAULT_STATE,
  ExerciseUseCase,
  State,
} from "@/domain/use_cases/screens/exercise";
import { Loading } from "../../components";
import { useEffect } from "react";

export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const {
    params: { exerciseId },
  } = useRoute<RouteProp<AppBottomTabParamList, "Exercise">>();

  const { state, useCase } = useStatefulUseCase<State, ExerciseUseCase>({
    UseCase: ExerciseUseCase,
    DEFAULT_STATE,
    INITIAL_STATE: {
      toast,
      exerciseId,
    },
    dependency: exerciseId,
  });

  const { group, name, demo, series, repetitions } = state.exercise;

  return (
    <VStack flex={1}>
      {state.isLoading ? (
        <Loading />
      ) : (
        <>
          <Header onPress={navigation.goBack} group={group} name={name} />
          <ScrollView>
            <VStack p={8}>
              <ExerciseImage demo={demo} />
              <BoxSeries
                series={series}
                repetitions={repetitions}
                isRegisterLoading={state.isRegisterLoading}
                onPress={() =>
                  useCase?.handleExerciseHistoryRegister(() =>
                    navigation.navigate("History")
                  )!
                }
              />
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
};
