import { useState } from "react";
import styled from "styled-components";
import { Wrapper } from "./StyledComponents";
import TextLoader from "../loader/TextLoader";
type LoginData = {
  email: string;
  password: string;
  loading: boolean;
  error: string;
};

type LoginFormProps = {
  closeLogin: () => void;
  setMuseumId: (id: string | number) => void;
};

const LoginForm = ({ closeLogin, setMuseumId }: LoginFormProps) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "nrm@test.se",
    password: "test123",
    loading: false,
    error: "",
  });
  const udpateFields = (fields: Partial<LoginData>) => {
    setLoginData((prev) => ({ ...prev, ...fields }));
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoginData((prev) => ({ ...prev, loading: true, error: "" }));
    console.log("logging in", loginData);
    try {
      // await login(loginData.email, loginData.password)
      // closeLogin()
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await res.json();
      if ("error" in data) {
        setLoginData((prev) => ({ ...prev, error: data.error }));
      } else {
        setMuseumId(data.museumId);
        closeLogin();
      }
      console.log("data from login", data);
    } catch (error) {
      setLoginData((prev) => ({
        ...prev,
        loading: true,
        error: "Something went wrong!",
      }));
    } finally {
      console.log("stop loader", loginData);
      setLoginData((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };
  return (
    <Wrapper>
      <h2>Login</h2>
      {loginData.error && <Error>Error: {loginData.error}</Error>}
      <form onSubmit={handleLogin}>
        <div className="form-wrapper">
          <label>Email</label>
          <input
            type="text"
            autoFocus
            required
            value={loginData.email}
            onChange={(e) => udpateFields({ email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            required
            value={loginData.password}
            onChange={(e) => udpateFields({ password: e.target.value })}
          />
        </div>
        <StyledBtnsWrapper>
          <button type="submit" disabled={loginData.loading}>
            {loginData.loading ? <TextLoader text="Loging in" /> : "Login"}
          </button>
          <button type="button" onClick={closeLogin}>
            Cancel
          </button>
        </StyledBtnsWrapper>
      </form>
    </Wrapper>
  );
};

export default LoginForm;

const Error = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: red;
  margin: 0.5rem 0;
`;
const StyledBtnsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  button {
    padding: 0.6rem 1rem;
    border-radius: 8px;
  }
`;
