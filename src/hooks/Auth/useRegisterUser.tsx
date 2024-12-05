import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface registerUserInput {
  email: string;
  password: string;
  displayName: string;
}

const registerUser = async (userInput: registerUserInput): Promise<any> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userInput.email,
    userInput.password
  );
  const user = userCredential.user;
  await updateProfile(user, { displayName: userInput.displayName });
  return user;
};

const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<unknown, unknown, registerUserInput>({
    mutationFn: (userInput) => registerUser(userInput),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      // navigate("/login");
      console.log("회원가입데이터", data);
    },
    // onError: (error) => {},
  });
};

export default useRegisterUser;
