import styled from "styled-components";

const TextLoader = ({ text = "Loging in" }: { text?: string }) => {
  return <StyledSpan className="loader-text">{text}</StyledSpan>;
};
export default TextLoader;
const StyledSpan = styled.span`
  min-width: 4.4rem;

  &::after {
    content: "";
    animation: loaderText 2s infinite;
  }

  @keyframes loaderText {
    0% {
      content: "";
    }
    33% {
      content: ".";
    }
    66% {
      content: "..";
    }
    100% {
      content: "...";
    }
  }
`;
