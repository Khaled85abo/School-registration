import styled from "styled-components";

import Logo from "../../../public/logo.svg";
import Image from "next/image";
interface HeaderProps {
  title: string;
}

interface Props {
  fontSize: string;
  height: string;
}
const Header = ({ title }: HeaderProps) => {
  const fontSize = title === "Visits" ? "3.6vh" : "4.7vh";
  const height = "8vh";

  return (
    <StyledHeader fontSize={fontSize} height={height}>
      <div className="headerContainer">
        <div>{title}</div>
        <div>
          <Image src={Logo} alt="nrm" height={85} />
        </div>
        <div></div>
      </div>
      {title === "Visits" && (
        <div className="ordersTitles">
          <div className="container">
            <div>Date</div>
            <div>Country</div>
            <div>Municipality</div>
            <div>School</div>
            <div>Grade</div>

            <div>Teacher</div>
          </div>
        </div>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div<Props>`
  height: 10vh;
  position: relative;

  .headerContainer {
    height: 100%;
    padding: 0 63px;
    display: flex;
    align-items: end;

    div {
      width: 33.3333%;
      font-weight: 600;
      font-size: ${(props) => props.fontSize || "4.7vh"};
      letter-spacing: 0.045em;

      &:nth-child(2) {
        text-align: center;
        height: ${(props) => props.height};
      }

      // .ref {
      //   width: 13vw;
      //   height: 8.2vh;
      //   margin-top: 2vh;
      // }

      // .capstone {
      //   width: 13vw;
      //   height: 12.5vh;
      //   margin-top: 4vh;
      // }
    }
  }

  .ordersTitles {
    width: 100%;
    padding: 0 calc(4vh + 100px);
    position: absolute;
    bottom: -7.5vh;
    font-size: 20px;
    .container {
      padding: 0 3%;
      display: grid;
      grid-template-columns: 15% 15% 15% 15% 20% 20%;
    }
  }

  @media (max-width: 768px) {
    .ordersTitles {
      display: none;
    }
  }
`;

export default Header;
