import { ToastProps } from "@/domain/use_cases/contexts/auth";
import { AppError } from "./app_error";

type ErrorHandlerProps = {
  mainCb: () => Promise<void>;
  errorMessage: string;
  finallyCb?: () => Promise<void>;
  toast: ToastProps;
};

export const errorHandler = async ({
  mainCb,
  errorMessage,
  finallyCb,
  toast,
}: ErrorHandlerProps) => {
  try {
    await mainCb();
  } catch (e) {
    const isAppError = e instanceof AppError;
    const title = isAppError ? e.message : errorMessage;
    toast.show({
      title,
      placement: "top",
      bgColor: "red.500",
    });
  } finally {
    finallyCb && finallyCb();
  }
};
