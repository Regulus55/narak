import useGetProfileInfo from "../../hooks/Auth/useGetProfileInfo";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { data: profileInfo, isLoading, isError, error } = useGetProfileInfo();
  const user = auth.currentUser;

  useEffect(() => {
    // window.location.reload();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>Error: {error instanceof Error ? error.message : "알 수 없는 에러"}</p>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Profile Page</h1>
      <div>
        <strong>Name:</strong> {user?.displayName}
      </div>
      <div>
        <strong>Email:</strong> {user?.email}
      </div>
    </div>
  );
};

export default Profile;
