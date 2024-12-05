// 회원가입시 에러
export const registerErrorMessage = (error: any): string => {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "이미 사용중인 이메일입니다.";
    case "auth/invalid-email":
      return "잘못된 이메일 형식입니다.";
    case "auth/weak-password":
      return "비밀번호를 강하게 만들어주세요.";
    case "auth/operation-not-allowed":
      return "이메일 회원가입이 비활성화되어 있습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};

export const loginErrorMessage = (error: any): any => {
  switch (error?.code) {
    case "auth/invalid-credential":
      return "회원정보가 일치하지 않습니다";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};
