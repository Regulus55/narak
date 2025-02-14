import useGetProfileInfo from "../../hooks/Auth/useGetProfileInfo";
import { auth } from "../../firebase/firebaseConfig";
import { useEffect } from "react";

const EditProfile = () => {
  const { data: profileInfo, isLoading, isError, error } = useGetProfileInfo();
  const user = auth.currentUser;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>Error: {error instanceof Error ? error.message : "알 수 없는 에러"}</p>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <div className="flex justify-center">
          프로필 업뎃 하는 페이지임
          <img
            src="/images/nouser.png"
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>

        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">
            <strong>Name:</strong> {user?.displayName}
          </h2>
          <p className="text-gray-500">
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div className="mt-6">
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition">
            프로필 업데이트
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
