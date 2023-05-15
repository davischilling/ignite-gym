import {
  StatefulUseCase,
  SetState,
  StateCallback,
} from "@/domain/use_cases/index";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStatefulContextUseCase } from "./use_stateful_context_uc";

type StateFulUseCaseProps<
  State,
  UseCaseClass extends StatefulUseCase<State>
> = {
  UseCase: new (state: State, setStateCb: SetState<State>) => UseCaseClass;
  DEFAULT_STATE: State;
  INITIAL_STATE?: Partial<State>;
  dependency?: any;
};

export function useStatefulUseCase<
  State,
  UseCaseClass extends StatefulUseCase<State>
>({
  UseCase,
  DEFAULT_STATE,
  INITIAL_STATE,
  dependency,
}: StateFulUseCaseProps<State, UseCaseClass>) {
  const { state, useCase } = useStatefulContextUseCase<
    State,
    UseCaseClass
  >({
    UseCase,
    DEFAULT_STATE,
    INITIAL_STATE,
  });

  useEffect(() => {
    if (dependency && dependency !== useCase?.dependency) {
      useCase?.updateDependency(dependency);
    }
  }, [dependency])

  useFocusEffect(
    useCallback(() => {
      useCase?.onFocus();
    }, [useCase?.dependency])
  );

  return { state, useCase };
}
