import type { IValue } from "@/interfaces/registrationVar"

export default function useValidRegistartion(
  email: IValue,
  fullname: IValue,
  password: IValue,
  repeatedPassword: IValue,
) {
  if (email.value && fullname.value && password.value && repeatedPassword.value) {
    return true;
  } else {
    return false;
  }
}
