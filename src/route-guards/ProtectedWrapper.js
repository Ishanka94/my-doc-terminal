import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedWrapper(props) {
  const authenticatedUser = useSelector(state => state.auth.user);
  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
export default ProtectedWrapper;
