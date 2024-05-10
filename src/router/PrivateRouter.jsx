import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from "../auth";

export const PrivateRouter = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const { pathname } = useLocation();

  localStorage.setItem('lastPath', pathname);

  return (logged) ? children : <Navigate to="/welcome" />
}