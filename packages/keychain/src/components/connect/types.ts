import Controller from "utils/controller";

export type FormValues = {
  username: string;
};

export type AuthProps = SignupProps | LoginProps;

type AuthBaseProps = {
  prefilledName?: string;
  isSlot?: boolean;
  onSuccess: (controller: Controller) => void;
};

export type SignupProps = AuthBaseProps & {
  onLogin: (username: string) => void;
};

export type LoginProps = AuthBaseProps & {
  onSignup: (username: string) => void;
};
