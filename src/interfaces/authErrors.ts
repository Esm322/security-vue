export interface IEmailError {
  emailError: string,
}

export interface IPasswordError {
  passwordError: string,
}

export interface IUserError {
  unknownUserError: string,
}

export interface IFullnameError {
  fullnameError: string,
}

export interface IRepeatedPasswordError {
  repeatedPasswordError: string,
}

export interface IGuardLoginError {
  guardLoginError: string,
}

export interface IGeneralErrors {
  emailError?: string | null | IEmailError,
  passwordError: string | null | IPasswordError,
  repeatedPasswordError?: string | null | IRepeatedPasswordError,
  fullnameError?: string | null | IFullnameError,
  unknownUserError?: string | null | IUserError,
  guardLoginError?: string | null | IGuardLoginError,
}
