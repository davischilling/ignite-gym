import { StatefulUseCase } from "@/domain/hooks/use_stateful_uc";
import { GroupModel } from "@/domain/models/group";
import { getAllGroupsService } from "@/domain/services/group/get_all";
import { errorHandler } from "@/domain/utils/error_handler";
import { ToastProps } from "presentation/@types/toast";

export type State = {
  groups: GroupModel[];
  isLoading: boolean;
  toast: ToastProps;
};

export const DEFAULT_STATE: State = {
  groups: [],
  isLoading: false,
  toast: {} as ToastProps,
};

export class HomeScreenUseCase extends StatefulUseCase<State> {
  init = async () => {
    await this.loadInitialState();
  };

  loadInitialState = async () => {
    await errorHandler({
      mainCb: async () => {
        this.startLoading();
        const { groups } = await getAllGroupsService.handle();
        this.updateGroups(groups);
      },
      errorMessage: "Erro ao carregar os grupos.",
      finallyCb: async () => this.stopLoading(),
      toast: this.state.toast,
    });
  };

  private updateGroups(groups: GroupModel[], cb?: () => void) {
    this.setState({ groups }, cb);
  }

  private startLoading = () => {
    this.setState({ isLoading: true });
  };

  private stopLoading = () => {
    this.setState({ isLoading: false });
  };
}
