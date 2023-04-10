import styled from "styled-components";

import Ref from "../../../public/Ref.svg";
import Capstone from "../../../public/Capstone.svg";

const Header = ({ title, view }) => {
  const fontSize = view > 4 ? "3.6vh" : "4.7vh";
  const height = view === 4 ? "12.5vh" : "8.2vh";

  return (
    <StyledHeader fontSize={fontSize} height={height}>
      <div className="headerContainer">
        <div>{title}</div>
        <div>
          {view === 4 ? (
            <Capstone className="capstone" />
          ) : (
            <Ref className="ref" />
          )}
        </div>
        <div></div>
      </div>
      {view === 1 && (
        <div className="ordersTitles">
          <div className="container">
            <div>ordernummer</div>
            <div>orderstatus</div>
            <div>kundnamn</div>
            <div>orderdatum</div>
            <div>ordervärde</div>
          </div>
        </div>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
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

      .ref {
        width: 13vw;
        height: 8.2vh;
        margin-top: 2vh;
      }

      .capstone {
        width: 13vw;
        height: 12.5vh;
        margin-top: 4vh;
      }
    }
  }

  .ordersTitles {
    width: 100%;
    padding: 0 calc(4vh + 100px);
    position: absolute;
    bottom: -6.5vh;

    .container {
      padding: 0 3%;
      display: grid;
      grid-template-columns: 15% 15% auto 20% 20%;
    }

    div {
      font-size: 1.4vh;
    }
  }
`;

export default Header;
