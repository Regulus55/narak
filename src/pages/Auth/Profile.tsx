import useGetProfileInfo from "../../hooks/Auth/useGetProfileInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data: user, isLoading, isError, error } = useGetProfileInfo();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

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
        <strong>Name:</strong> {user?.displayName}
      </div>
      <div>
        <strong>Email:</strong> {user?.email}
      </div>
      <div>
        <strong>UID:</strong> {user?.uid}
      </div>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
