import React, { useContext, useState } from "react";
import "./Login.css";
import { useAuth,  AuthContext} from "../../Context/AuthContext";

interface ILoginProps {
    onLoggedIn: () => void
}

const Login: React.FC<ILoginProps> = ({onLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {token, setAuthToken} = useAuth();

  const handleInputEmail = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleInputPassword = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleClickLoginButton = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYW5kcm8zQGdtYWlsLmNvbSIsInVzZXJJZCI6MTQsImlhdCI6MTcwNjA1MzQ4NSwiZXhwIjoxNzA2MDU3MDg1fQ.Ge4ZjjiHN-u1379ks1okDNHn25lHVTSpbHhHEY1UD-s`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
   
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        setAuthToken(data.token)
        console.log('token => ', token)
        onLoggedIn()
    } else {
        console.log('Erro na requisição => ', response.statusText)
    }
  };

  return (
    <div className="container">
      {/* <h1 className="Login">Pagina de login</h1> */}
      <label className="label-input">
        Email:
        <input type="text" onChange={handleInputEmail} />
      </label>
      <label className="label-input">
        Senha:
        <input type="text" onChange={handleInputPassword} id="input-password" />
      </label>
      <div className="container-button">
        <button className="button" onClick={handleClickLoginButton}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
