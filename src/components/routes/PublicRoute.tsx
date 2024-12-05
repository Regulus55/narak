import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";

const PublicRoute: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;
