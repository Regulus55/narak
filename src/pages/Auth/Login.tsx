import React from "react";

import { useForm } from "react-hook-form";
import useloginUser from "../../hooks/Auth/useLoginUser";
import { FormInput, WhiteContentBox } from "../../components/common";
import { loginErrorMessage } from "../../utils/firebaseErrors";
import { useNavigate } from "react-router-dom";

interface loginUserInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="flex items-center justify-center bg-gray-100">
      <WhiteContentBox className="shadow-xl rounded-none w-full h-full md:max-w-md p-6 mx-4 mt-28">
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

        <div className="flex justify-center border-t border-gray-200 mt-4 pt-4">
          <div className="text-gray-700">아직 아이디가 없나요?</div>
          <div
            className="ml-2 font-bold text-blue-800 hover:text-gray-500 underline hover:cursor-pointer"
            onClick={() => navigate("/register")}
          >
            회원가입
          </div>
        </div>
      </WhiteContentBox>
    </div>
  );
};

export default Login;
