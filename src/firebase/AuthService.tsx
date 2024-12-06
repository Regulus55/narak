import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

/**
 * 회원가입 후 이메일 인증을 요청하고 자동 로그인을 방지합니다.
 * @param email 사용자 이메일
 * @param password 사용자 비밀번호
 * @throws 에러 발생 시 호출자에게 전달됩니다.
 */
export const registerUserWithVerification = async (
  email: string,
  password: string
): Promise<void> => {
  const auth = getAuth();

  try {
    // 1. 회원가입 수행
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2. 이메일 인증 요청
    await sendEmailVerification(userCredential.user);
    console.log("이메일 인증 요청 완료");

    // 3. 자동 로그아웃 처리
    await signOut(auth);
    console.log("자동 로그아웃 처리 완료");
  } catch (error) {
    console.error("회원가입 또는 이메일 인증 중 오류:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
