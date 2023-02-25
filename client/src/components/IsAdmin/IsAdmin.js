

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import Loading from "../Loading/Loading";

function IsAdmin({ children }) {
  const { isAdmin, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (!isAdmin) {
    // If the user is not logged in navigate to the login page ❌
    return "Your are not admin"
  }
  // If the user is logged in, allow to see the page ✅
  return children;
}

export default IsAdmin;