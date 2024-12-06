import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

const getProfileInfo = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }
  return {
    displayName: user.displayName || "Not set",
    email: user.email || "No email available",
    uid: user.uid,
  };
};

const useGetProfileInfo = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      try {
        return await getProfileInfo();
      } catch (error) {
        // navigate("/register");
        throw error;
      }
    },

    staleTime: 5 * 60 * 1000,
  });
};

export default useGetProfileInfo;
