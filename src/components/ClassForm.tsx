import { Class, CLASSES } from "@/pages";
import styled from "styled-components";
import { Wrapper } from "./StyledComponents";
type ClassData = {
  classGrade: Class | null;
  studentsCount: number;
  teachersCount: number;
  havePayedTour: boolean;
  school: string;
};
type ClassFormProps = ClassData & {
  updateFields: (fields: Partial<ClassData>) => void;
};

const ClassForm = ({
  studentsCount,
  teachersCount,
  havePayedTour,
  updateFields,
  classGrade,
  school,
}: ClassFormProps) => {
  return (
    <>
      <Wrapper>
        <h2>Class's Details</h2>
        <div className="form-wrapper">
          <label>School*</label>
          <input
            value={school}
            onChange={(e) => {
              updateFields({ school: e.target.value });
            }}
            type="text"
            autoFocus
            required
          />
          <label>Class Grade*</label>
          {/* <input
            value={classGrade}
            onChange={(e) => {
              updateFields({ classGrade: e.target.value });
            }}
            type="text"
            autoFocus
            required
          /> */}
          <select
            onChange={(e) => {
              updateFields({ classGrade: e.target.value });
            }}>
            {Object.keys(CLASSES).map((key, index) => (
              <option key={index}>{CLASSES[key]}</option>
            ))}
          </select>
          <div className="">
            <div>
              <label>Total Students*</label>
              <input
                min={1}
                value={studentsCount}
                onChange={(e) => {
                  updateFields({ studentsCount: +e.target.value });
                }}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div>
            <div>
              <label>Total Teachers*</label>
              <input
                min={1}
                required
                value={teachersCount}
                onChange={(e) => {
                  updateFields({ teachersCount: +e.target.value });
                }}
                type="number"
              />
            </div>
          </div>
        </div>
        <CheckboxDiv>
          <label htmlFor="checkbox">Have a payed tour?</label>
          <input
            id="checkbox"
            checked={havePayedTour}
            onChange={(e) => {
              updateFields({ havePayedTour: e.target.checked });
            }}
            type="checkbox"
          />
        </CheckboxDiv>
      </Wrapper>
    </>
  );
};

export default ClassForm;

const CheckboxDiv = styled.div`
  display: flex;
  align-items: center;
  //   justify-content: center;
  margin-top: 0.5rem;
  input {
    margin-left: 1rem;
    height: 1.3rem;
    width: 1.3rem;
    border-radius: 8px;
  }
  label {
    font-size: 18px;
  }
`;
