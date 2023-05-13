import { Wrapper } from "./StyledComponents";
type LoginData = {
  email: string;
  password: string;
};

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void;
};
const LoginForm = () => {
  return (
    <Wrapper>
      <h2>Login</h2>
      <form>
        <div className="form-wrapper">
          <label>Email</label>
          <input type="text" autoFocus required />
          <label>Password</label>
          <input type="text" required />
        </div>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
