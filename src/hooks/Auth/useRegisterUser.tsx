import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { saveUserToDatabase } from "../../firebase/firestoreService";

interface registerUserInput {
  email: string;
  password: string;
  displayName: string;
}

const auth = getAuth();

const registerUser = async (userInput: registerUserInput): Promise<any> => {
  // Firebase Authentication 사용자 생성
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userInput.email,
    userInput.password
  );
  const user = userCredential.user;

  // Firebase Authentication에 displayName 설정
  await updateProfile(user, { displayName: userInput.displayName });

  // Firestore에 사용자 정보 저장 (업데이트된 displayName 사용)
  await saveUserToDatabase(user.uid, userInput.displayName);

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
      navigate("/login");
      // console.log("회원가입데이터", data);
    },
    // onError: (error) => {},
  });
};

export default useRegisterUser;
