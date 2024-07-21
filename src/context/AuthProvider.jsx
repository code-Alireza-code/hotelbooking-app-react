import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, { type, payload }) {
  switch (type) {
    case "login":
      return {
        user: payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown action type");
  }
}

const FAKE_USER_DATA = {
  name: "example",
  email: "example.com",
  password: "1234",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email == FAKE_USER_DATA.email && password == FAKE_USER_DATA.password)
      dispatch({ type: "login", payload: FAKE_USER_DATA });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
