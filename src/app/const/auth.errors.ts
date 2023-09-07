export enum AuthErrors {
  EMAIL_EXISTS = "EMAIL_EXISTS",
  OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED",
  TOO_MANY_ATTEMPTS_TRY_LATER = "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  USER_DISABLED = "USER_DISABLED"
}

