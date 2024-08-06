import type { IGeneralErrors } from "@/interfaces/authErrors";

export default function useClearErrors(generalErrors: IGeneralErrors): void {
  if (
      generalErrors.emailError ||
      generalErrors.passwordError ||
      generalErrors.unknownUserError ||
      generalErrors.repeatedPasswordError ||
      generalErrors.fullnameError ||
      generalErrors.guardLoginError
    ) {
    setTimeout(() => {
      generalErrors.emailError = null;
      generalErrors.passwordError = null;
      generalErrors.unknownUserError = null;
      generalErrors.fullnameError = null;
      generalErrors.repeatedPasswordError = null;
      generalErrors.guardLoginError = null;
    }, 3000);
  }
}
