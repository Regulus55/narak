import { useQuery } from "@tanstack/react-query";
import { auth } from "../../firebaseConfig";

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
  return useQuery({
    queryKey: ["profileInfo"],
    queryFn: getProfileInfo,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetProfileInfo;
