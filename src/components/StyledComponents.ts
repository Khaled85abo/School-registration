import styled from "styled-components";

export const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 15px;
  h2 {
    text-align: center;
    margin: 0;
    margin-bottom: 2rem;
  }
  .form-wrapper {
    font-size: 18px;
    min-width: 400px;
    // display: grid;
    // gap: 1rem 0.5rem;
    // justify-content: center;
    // grid-template-columns: auto minmax(auto, 400px);
    text-align: left;

    input,
    select {
      width: 100%;
      padding: 0.4rem;
      margin: 0.2rem 0;
      display: block;
      font-size: 18px;
      border-radius: 8px;
    }
    label {
      font-weight: bold;
    }
    .flex {
      display: flex;
      gap: 0.5rem;
    }
    @media (max-width: 500px) {
      font-size: 16px;
      min-width: 250px;
      input {
        font-size: 15px;
      }
    }
  }
`;
