import { StatefulUseCase } from "@/domain/use_cases/index";
import { ExerciseModel } from "@/domain/models/exercise";
import { GroupModel } from "@/domain/models/group";
import { getExercisesByGroupService } from "@/domain/services/exercise/get_by_group";
import { getAllGroupsService } from "@/domain/services/group/get_all";
import { errorHandler } from "@/domain/utils/error_handler";
import { ToastProps } from "presentation/@types/toast";

export type State = {
  groups: GroupModel[];
  groupSelected: string;
  exercises: ExerciseModel[];
  isLoading: boolean;
  isExercisesLoading: boolean;
  toast: ToastProps;
};

export const DEFAULT_STATE: State = {
  groups: [],
  groupSelected: "",
  exercises: [],
  isLoading: false,
  isExercisesLoading: false,
  toast: {} as ToastProps,
};

export class HomeScreenUseCase extends StatefulUseCase<State> {
  init = async () => {
    await this.loadInitialState();
  };

  onFocus = async () => {
    const { exercises } = await getExercisesByGroupService.handle(this.state.groupSelected);
    this.updateExercises(exercises);
  };

  loadInitialState = async () => {
    await errorHandler({
      mainCb: async () => {
        this.startLoading();
        const { groups } = await getAllGroupsService.handle();
        this.updateGroups(groups);
        const groupSelected = groups[0];
        this.updateGroupSelected(groupSelected);
        this.updateDependency(groupSelected);
      },
      errorMessage: "Erro ao carregar os grupos.",
      finallyCb: async () => this.stopLoading(),
      toast: this.state.toast,
    });
  };

  public updateGroupSelected(groupSelected: string) {
    if (groupSelected === this.state.groupSelected) return;
    this.setState({ groupSelected }, async () => {
      this.startExercisesLoading();
      const { exercises } = await getExercisesByGroupService.handle(groupSelected);
      this.updateExercises(exercises);
      this.updateDependency(groupSelected);
      this.stopExercisesLoading();
    });
  }

  private updateGroups(groups: GroupModel[], cb?: () => Promise<void>) {
    this.setState({ groups }, cb);
  }

  private updateExercises(exercises: ExerciseModel[], cb?: () => Promise<void>) {
    this.setState({ exercises }, cb);
  }

  private startExercisesLoading = () => {
    this.setState({ isExercisesLoading: true });
  };

  private stopExercisesLoading = () => {
    this.setState({ isExercisesLoading: false });
  };

  private startLoading = () => {
    this.setState({ isLoading: true });
  };

  private stopLoading = () => {
    this.setState({ isLoading: false });
  };
}
