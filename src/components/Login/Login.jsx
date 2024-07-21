import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="loginContainer">
      <h2>login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn--primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
