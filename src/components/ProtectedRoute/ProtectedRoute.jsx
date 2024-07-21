import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <div className="protectedRouteNotif">
          <p>you can not access to this page before login</p>
          <button className="btn btn--primary">
            <Link to="/login">go to login page</Link>
          </button>
        </div>
      )}
    </>
  );
}

export default ProtectedRoute;
