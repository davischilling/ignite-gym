import {
  SetState,
  StateCallback,
  StatefulUseCase,
} from "@/domain/use_cases/index";
import { useEffect, useRef, useState } from "react";

type StateFulContextUseCaseProps<
  State,
  UseCaseClass extends StatefulUseCase<State>
> = {
  UseCase: new (
    state: State,
    setStateCb: SetState<State>,
    dependency?: any
  ) => UseCaseClass;
  DEFAULT_STATE: State;
  INITIAL_STATE?: Partial<State>;
};

export function useStatefulContextUseCase<
  State,
  UseCaseClass extends StatefulUseCase<State>
>({
  UseCase,
  DEFAULT_STATE,
  INITIAL_STATE,
}: StateFulContextUseCaseProps<State, UseCaseClass>) {
  const [logicState, setLogicState] = useState<State>(
    Object.assign({}, DEFAULT_STATE, INITIAL_STATE)
  );
  const useCaseLogicRef = useRef<UseCaseClass>();

  useEffect(() => {
    const setState = (newState: any, cb?: StateCallback) => {
      setLogicState((oldState) => Object.assign({}, oldState, newState));
      cb && cb();
    };

    useCaseLogicRef.current = new UseCase(logicState, (newState, cb) => {
      setState(newState, cb);
    });
    useCaseLogicRef.current.init();

    return () => {
      useCaseLogicRef.current?.dispose();
    };
  }, []);

  return { state: logicState, useCase: useCaseLogicRef.current };
}
