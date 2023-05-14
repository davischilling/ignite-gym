import { useEffect, useRef, useState } from "react";

type StateCallback = () => void;
type SetState<T = any> = (newState: Partial<T>, cb?: StateCallback) => void;

export class StatefulUseCase<State> {
  protected state: State;
  protected setState: SetState<State>;

  constructor(state: State, setStateCb: SetState<State>) {
    this.state = state;
    this.setState = (newState, cb) => {
      this.state = Object.assign({}, this.state, newState);
      setStateCb(newState, cb);
    };
  }

  public getState(): State {
    return this.state;
  }

  public async init(): Promise<void> {}

  public async dispose(): Promise<void> {}
}

type StateFulUseCaseProps<
  State,
  UseCaseClass extends StatefulUseCase<State>
> = {
  UseCase: new (state: State, setStateCb: SetState<State>) => UseCaseClass;
  DEFAULT_STATE: State;
  INITIAL_STATE?: Partial<State>;
};

export function useStatefulUseCase<
  State,
  UseCaseClass extends StatefulUseCase<State>
>({
  UseCase,
  DEFAULT_STATE,
  INITIAL_STATE,
}: StateFulUseCaseProps<State, UseCaseClass>) {
  const [logicState, setLogicState] = useState<State>(Object.assign({}, DEFAULT_STATE, INITIAL_STATE));
  const useCaseLogicRef = useRef<UseCaseClass>();

  useEffect(() => {
    const setState = (newState: any, cb?: StateCallback) => {
      setLogicState(oldState => Object.assign({}, oldState, newState));
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

  return {state: logicState, useCase: useCaseLogicRef.current};
}
