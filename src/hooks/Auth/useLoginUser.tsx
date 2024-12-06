import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface loginUserInput {
  email: string;
  password: string;
}

const loginUser = async (userInput: loginUserInput): Promise<any> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    userInput.email,
    userInput.password
  );
  return userCredential.user;
};

const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<unknown, unknown, loginUserInput>({
    mutationFn: (userInput) => loginUser(userInput),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/profile");
      console.log("로그인데이터", data);
    },
    // onError: (error) => {},
  });
};

export default useLoginUser;
