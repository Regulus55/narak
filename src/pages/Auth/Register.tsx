import React from "react";
import { useForm } from "react-hook-form";
import useRegisterUser from "../../hooks/Auth/useRegisterUser";
import { registerErrorMessage } from "../../utils/firebaseErrors";
import { FormInput } from "../../components/common";

interface registerUserInput {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<registerUserInput>();

  const {
    mutateAsync: registerUserMutate,
    status: registerUserStatus,
    isSuccess: registerUserSuccess,
    data: registerUserData,
    error: registerUserError,
  } = useRegisterUser();
  const isLoading = registerUserStatus === "pending";

  const registerUserHandler = async (userInput: registerUserInput) => {
    try {
      await registerUserMutate({
        email: userInput.email,
        password: userInput.password,
        displayName: userInput.displayName,
      });

      alert("회원가입 성공");
    } catch (error) {}
  };

  // 회원가입 에러 메세지
  const firebaseErrorMessage = registerUserError
    ? registerErrorMessage(registerUserError)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>

        <form
          onSubmit={handleSubmit(registerUserHandler)}
          className="space-y-4"
        >
          <FormInput
            id="username"
            type="text"
            label="유저이름"
            register={register("displayName", {
              required: "유저이름을 입력하세요",
            })}
            errorMessage={errors.displayName?.message}
          />

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
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자리 이상이어야 합니다",
              },
            })}
            errorMessage={errors.password?.message}
          />

          <FormInput
            id="password"
            type="password"
            label="비밀번호확인"
            register={register("confirmPassword", {
              required: "동일한 비밀번호를 입력하세요",
              validate: (value) =>
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다",
            })}
            errorMessage={errors.confirmPassword?.message}
          />

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
