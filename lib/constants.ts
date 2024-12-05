export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "비밀 번호는 반드시 대문자, 소문자, 숫자, 특수 문자(#?!@$%^&*-)를 포함해야합니다.";
