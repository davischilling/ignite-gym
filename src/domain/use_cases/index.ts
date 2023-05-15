export type StateCallback = () => void;
export type SetState<T = any> = (newState: Partial<T>, cb?: StateCallback) => void;

export class StatefulUseCase<State> {
  protected state: State;
  protected setState: SetState<State>;
  public dependency: any;

  constructor(state: State, setStateCb: SetState<State>, dependency?: any) {
    this.state = state;
    this.setState = (newState, cb) => {
      this.state = Object.assign({}, this.state, newState);
      setStateCb(newState, cb);
    };
    this.dependency = dependency;
  }

  public getState(): State {
    return this.state;
  }

  public async init(): Promise<void> {}

  public async dispose(): Promise<void> {}

  public async onFocus(): Promise<void> {}
  public updateDependency(dependency: any): void {
    this.dependency = dependency;
  }
}