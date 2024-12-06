export const EmailValidation = {
  required: "이메일을 입력하세요",
  pattern: {
    value:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    message: "이메일 양식을 맞춰주세요",
  },
};

export const PasswordValidation = {
  required: "비밀번호를 입력하세요",
  minLength: {
    value: 6,
    message: "비밀번호는 최소 6자리 이상이어야 합니다",
  },
  maxLength: {
    value: 20,
    message: "비밀번호는 최대 20자리 이상이어야 합니다",
  },
};

// Register.tsx 에서 useForm에서 생성된 함수와 상태를 여기서 사용함
export const ConfirmPasswordValidation = (getValues: any) => ({
  required: "동일한 비밀번호를 입력하세요",
  validate: (value: any) =>
    value === getValues("password") || "비밀번호가 일치하지 않습니다",
});
