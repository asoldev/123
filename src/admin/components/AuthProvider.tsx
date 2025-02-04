import { jwtDecode } from "jwt-decode";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ROLE } from "../types/enum";
import { getAccountDetail } from "../apis/accountService";
interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  token: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: any;
  login: (token: string, role: string, id: number) => void;
  logout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserData: (data: any) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>();

  // Initialize state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storeId = localStorage.getItem("authId");

    if (storedToken) {
      const isValid = validateToken(storedToken);
      
      if (isValid) {
        const decodedToken: { roles: string[]; sub: string } =
          jwtDecode(storedToken);
        if (storeId) {
          getAccountDetail(storeId)
            .then((res) => {
              setUserData({
                sub: decodedToken.sub,
                info: res,
              });
            })
            .catch(() => {
              setUserData({
                sub: decodedToken.sub,
                info: undefined,
              });
            });
        } else {
          setUserData({
            sub: decodedToken.sub,
            info: undefined,
          });
        }

        setToken(storedToken);
        setRole(decodedToken.roles[0]);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (authToken: string, userRole: string, userId: number) => {
    setToken(authToken);
    setRole(userRole);
    setIsAuthenticated(true);

    // Save to localStorage
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("authId", userId.toString());
    localStorage.setItem("authRole", userRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("authId");
    localStorage.removeItem("authRole");
  };

  const validateToken = (authToken: string) => {
    try {
      // Decode the token to get its payload
      const decodedToken: { exp: number; roles: string[] } =
        jwtDecode(authToken);

      // Check if the token is expired
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        logout(); // Token is expired, log out the user
        return false;
      }
      
      const [role] = decodedToken.roles;

      // Ensure the role is valid (matches one of the ROLE enum values)
      const roles = Object.values(ROLE);
      if (!roles.includes(role as ROLE)) {
        logout(); // Log out if the role is invalid
        return null;
      }

      // Return the valid role
      return role as ROLE;
    } catch (error) {
      console.error("Invalid token", error);
      logout(); // Token is invalid, log out the user
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        token,
        userData,
        login,
        logout,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
