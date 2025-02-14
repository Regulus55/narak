import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // 사용자의 로그인 상태를 실시간으로 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigate("/profile");
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
        {!isLoggedIn ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome to Our Website!
            </h2>
            <p className="text-lg text-gray-700">
              Here is a brief introduction to our site. We offer a variety of
              amazing products and services that you can explore. Enjoy your
              time browsing!
            </p>
            <p className="text-lg text-gray-700 mt-4">
              You can log in or sign up to access your account and manage your
              orders.
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
