import React from "react";
import { useForm } from "react-hook-form";
import useRegisterUser from "../../hooks/Auth/useRegisterUser";
import { registerErrorMessage } from "../../utils/firebaseErrors";
import { FormInput } from "../../components/common";
import {
  ConfirmPasswordValidation,
  EmailValidation,
  PasswordValidation,
} from "../../utils/validationRules";

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
      const userCredential = await registerUserMutate({
        email: userInput.email,
        password: userInput.password,
        displayName: userInput.displayName,
      });
      // alert("회원가입 성공");
    } catch (error) {}
  };

  // 회원가입 에러 메세지
  const firebaseErrorMessage = registerUserError
    ? registerErrorMessage(registerUserError)
    : null;

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md p-6 mx-4 my-6 md:mt-12">
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
            register={register("email", EmailValidation)}
            errorMessage={errors.email?.message}
          />

          <FormInput
            id="password"
            type="password"
            label="비밀번호"
            register={register("password", PasswordValidation)}
            errorMessage={errors.password?.message}
          />

          <FormInput
            id="password"
            type="password"
            label="비밀번호확인"
            register={register(
              "confirmPassword",
              ConfirmPasswordValidation(getValues)
            )}
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
