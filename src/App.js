import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import "./styles.css";
import firebaseAuth from "./firebase-config";

const ErrorMessage = (props) => {
  if (props.message.length < 1) return null;
  return <h2 className="error-message">{props.message}</h2>;
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setEmail(user.email);
        setIsLoggedIn(true);
        setIsEmailVerified(user.emailVerified);
        return;
      }
      setIsLoggedIn(false);
    });
  }, []);

  const login = () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoggedIn(false);
        setIsLoggingIn(false);
        setErrorMessage(errorMessage);
      });
  };

  const signup = () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoggedIn(false);
        setIsLoggingIn(false);
        setErrorMessage(errorMessage);
      });
  };

  const signout = () => {
    setErrorMessage("");
    signOut(firebaseAuth)
      .then(() => {
        setIsLoggedIn(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoggedIn(true);
        setErrorMessage(errorMessage);
      });
  };

  if (isLoggingIn) {
    return <h1>Authenticating...</h1>;
  }

  return (
    <div className="App">
      <ErrorMessage message={errorMessage} />
      {isLoggedIn ? (
        <div>
          <h1>Welcome, {email}!</h1>
          {!isEmailVerified ? (
            <p>Please check your email for verification</p>
          ) : null}
          <button onClick={signout}>Sign Out</button>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => {
                const isKeyPressEnter = event.key === "Enter";
                if (!isKeyPressEnter) return;
                login();
              }}
            />
          </div>

          <div>
            <button onClick={login}>Login</button>
            <button onClick={signup}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
}
