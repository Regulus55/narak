import React from "react";

import { useForm } from "react-hook-form";
import useloginUser from "../../hooks/Auth/useLoginUser";
import { FormInput } from "../../components/common";
import { loginErrorMessage } from "../../utils/firebaseErrors";

interface loginUserInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginUserInput>({
    defaultValues: {
      email: "test@narak.com",
      password: "test123",
    },
  });

  const {
    mutateAsync: loginUserMutate,
    status: loginUserStatus,
    isSuccess: loginUserSuccess,
    data: loginUserData,
    error: loginUserError,
  } = useloginUser();
  const isLoading = loginUserStatus === "pending";

  const loginUserHandler = async (userInput: loginUserInput) => {
    try {
      await loginUserMutate({
        email: userInput.email,
        password: userInput.password,
      });

      reset({
        email: "test@test.com",
        password: "test1234",
      });
    } catch (error) {}
  };

  // 로그인 에러 메세지
  const firebaseErrorMessage = loginUserError
    ? loginErrorMessage(loginUserError)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
        <form onSubmit={handleSubmit(loginUserHandler)} className="space-y-4">
          <FormInput
            id="email"
            type="email"
            label="이메일"
            register={register("email", {
              required: "이메일을 입력하세요",
            })}
            errorMessage={errors.email?.message}
          />

          <FormInput
            id="password"
            type="password"
            label="비밀번호"
            register={register("password", {
              required: "비밀번호를 입력하세요",
            })}
            errorMessage={errors.password && "비밀번호를 입력하세요"}
          />

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
            {isLoading ? "로딩..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
