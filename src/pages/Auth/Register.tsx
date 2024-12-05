import React from "react";
import { useForm } from "react-hook-form";
import useRegisterUser from "../../hooks/Auth/useRegisterUser";

interface registerUserInput {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<registerUserInput>();

  const {
    mutateAsync: registerUserMutate,
    status: registerUserStatus,
    isSuccess: registerUserSuccess,
    data: registerUserData,
    error: registerUserError,
  } = useRegisterUser();
  const isLoading = registerUserStatus === "pending";

  const registerUserHandler = async (userInput: registerUserInput) => {
    await registerUserMutate({
      email: userInput.email,
      password: userInput.password,
    });
    alert("회원가입 성공");
  };

  // 회원가입 에러 메세지
  const getFirebaseErrorMessage = (error: any): string => {
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
  const firebaseErrorMessage = registerUserError
    ? getFirebaseErrorMessage(registerUserError)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>

        <form
          onSubmit={handleSubmit(registerUserHandler)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "이메일을 입력하세요" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호를 입력하세요",
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* 에러메세지 */}
          {firebaseErrorMessage && (
            <p className="text-red-500 text-sm mb-4">{firebaseErrorMessage}</p>
          )}

          <button
            type="submit"
            className={
              "w-full py-2 text-white bg-gray-400 font-semibold rounded"
            }
          >
            {isLoading ? "제출중..." : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
