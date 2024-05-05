import React, { useEffect, useState } from "react";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";
// import { useGeneral } from "../../contexts/GeneralContext";

interface ILoginProps {
  onLoggedIn: () => void
}

const Login: React.FC<ILoginProps> = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setAuthToken } = useAuth();
  // const {email} = useGeneral();


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

  useEffect(() => {
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';

    return () => {
      document.body.style.display = ''
      document.body.style.justifyContent = '';
      document.body.style.alignItems = '';
      document.body.style.height = '';
    }
  }, []);

  return (
    <div className="container">
      {/* <h1 className="Login">Pagina de login</h1> */}
      <div className="primeira-coluna">
        TaskWave 
        <p>Sua nova onda de produtividade</p>
      </div>
      <div className="segunda-coluna">
        <label className="label-input">
          Email
          <input type="text" onChange={handleInputEmail} />
        </label>
        <label className="label-input">
          Senha
          <input type="password" onChange={handleInputPassword} id="input-password" />
        </label>
        <div className="container-button">
          <button className="button" onClick={handleClickLoginButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
