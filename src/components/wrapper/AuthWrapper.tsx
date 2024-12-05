import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

// 로그인시 로그인 갔을때 프로파일로, 비로그인시 프로파일 갔을때 로그인으로
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // 비로그인 상태에서 로그인 페이지로 리디렉션
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Firebase 인증 상태 확인 중
  }

  return <>{children}</>; // 인증 상태 확인 완료 후 라우터 렌더링
};

export default AuthWrapper;
