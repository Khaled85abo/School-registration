import { Wrapper } from "./StyledComponents";
import Image from "next/image";
import sweden from "../assets/svg/sweden.svg";
import world from "../assets/svg/world.svg";
import styled from "styled-components";
type AddressData = {
  country: string | null;
  municipality: string | undefined;
};
type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};
const AddressForm = ({
  municipality,
  country,
  updateFields,
}: AddressFormProps) => {
  if (country == "Sweden") {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <h2>Sweden</h2>
        <div className="form-wrapper">
          <input
            type="text"
            placeholder="Vilken Kommun?"
            required
            value={municipality}
            onChange={(e) => updateFields({ municipality: e.target.value })}
          />
        </div>
        <Image src={sweden} alt="" height="400" />
      </Wrapper>
    );
  }

  if (country !== "Sweden") {
    return (
      <Wrapper>
        <h2>World</h2>
        <div className="form-wrapper">
          <input
            type="text"
            placeholder="From which Country?"
            required
            value={country!}
            onChange={(e) => updateFields({ country: e.target.value })}
          />
        </div>
        <Image src={world} alt="" height="400" />
      </Wrapper>
    );
  }
  return <div>Address Form</div>;
};

export default AddressForm;

const InputDiv = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;
