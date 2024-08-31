import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FirebaseContext } from "./FirebaseContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { auth } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password }) => {
    const crads = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(crads);
  };

  const login = async ({ email, password }) => {
    const crads = await signInWithEmailAndPassword(auth, email, password);
    // console.log(crads);
  };

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
