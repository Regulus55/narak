import React from "react";

import { useForm } from "react-hook-form";
import useloginUser from "../../hooks/Auth/useLoginUser";

interface loginUserInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<loginUserInput>({
    defaultValues: {
      email: "test@test.com",
      password: "test1234",
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
    await loginUserMutate({
      email: userInput.email,
      password: userInput.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
        <form onSubmit={handleSubmit(loginUserHandler)} className="space-y-4">
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
              {...register("email", { required: "이메일을 입력해주세요" })}
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
              {...register("password", { required: "비밀번호를 입력해주세요" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
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
