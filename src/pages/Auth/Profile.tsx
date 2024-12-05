import useGetProfileInfo from "../../hooks/Auth/useGetProfileInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data: profileInfo, isLoading, isError, error } = useGetProfileInfo();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </p>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Profile Page</h1>
      <div>
        <strong>Name:</strong> {profileInfo?.displayName}
      </div>
      <div>
        <strong>Email:</strong> {profileInfo?.email}
      </div>
    </div>
  );
};

export default Profile;
