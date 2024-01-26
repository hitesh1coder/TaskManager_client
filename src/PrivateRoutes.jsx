import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./Context/userContext";

const PrivateRouts = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);

  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRouts;
