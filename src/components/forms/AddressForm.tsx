import { Wrapper } from "./StyledComponents";
import Image from "next/image";
import sweden from "../../assets/svg/sweden.svg";
import world from "../../assets/svg/world.svg";
import styled from "styled-components";
import municipalities from "@/assets/lists/municipalities";
import countries from "@/assets/lists/countries";
type AddressData = {
  country: string;
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
          {/* <input
            type="text"
            placeholder="Vilken Kommun?"
            required
            value={municipality}
            onChange={(e) => updateFields({ municipality: e.target.value })}
          /> */}
          <select
            value={municipality}
            onChange={(e) => {
              updateFields({ municipality: e.target.value });
            }}>
            <option value="">--Please choose an option--</option>
            {municipalities.map((municipality) => (
              <option key={municipality.code} value={municipality.name}>
                {municipality.name}
              </option>
            ))}
          </select>
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
          <select
            value={country}
            onChange={(e) => {
              updateFields({ country: e.target.value });
            }}>
            <option value="">--Please choose an option--</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
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
