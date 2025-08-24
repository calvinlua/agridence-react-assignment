import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../data/store/store";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.ReactElement | null => {
  const isLoggedIn = useSelector((state: RootState) => state.account.loggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
