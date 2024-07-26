import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedWrapper(props) {
  // const auth = useContext(AuthContext);
  const authenticatedUser = useSelector(state => state.auth.user);
  // console.log(authenticatedUser);
  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
export default ProtectedWrapper;
