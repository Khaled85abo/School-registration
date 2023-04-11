import { Wrapper } from "./StyledComponents";
type AccountData = {
  email: string;
  password: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};
const AccountForm = () => {
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

export default AccountForm;
