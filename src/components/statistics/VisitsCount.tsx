import styled from "styled-components";
import { FiHeart, FiAward, FiLoader, FiLogOut } from "react-icons/fi";

export function getAmount(num: number) {
  if (num > 999999) {
    return parseFloat((num / 1000000).toFixed(2)).toString() + "M";
  }
  if (num > 999) {
    return parseFloat((num / 1000).toFixed(1)).toString() + "K";
  }
  return "0";
}

interface Props {
  view: number;
}
interface VisitsStatusProps {
  data: any;
  view: number;
}

const VisitsCount = ({ data, view }: VisitsStatusProps) => {
  return (
    <StyledSaleStats view={view}>
      <div className="inverted_radius"></div>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((data, index) => {
          const { title, amount, color } = data;

          var icon;
          switch (index) {
            case 0:
              icon = <FiHeart color="#A4BDB2" />;
              break;
            case 1:
              icon = <FiAward color="#DDABAD" />;
              break;
            case 2:
              icon = <FiLoader color="#C1A470" />;
              break;
            case 3:
              icon = <FiLogOut color="#899AA6" />;
              break;

            default:
              icon = <FiHeart color="#A4BDB2" />;
              break;
          }
          return (
            <div className="saleBox" key={index}>
              <div className="iconBoxWrapper">
                <div className="iconBox">{icon}</div>
                <div className="cartTitle">{title}</div>
              </div>

              <AmountStyle
                view={view}
                style={{
                  color: color,
                }}>
                {getAmount(amount)}
              </AmountStyle>
            </div>
          );
        })}
    </StyledSaleStats>
  );
};

const StyledSaleStats = styled.div<Props>`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    108.03deg,
    rgba(255, 255, 255, 0.37) 0%,
    rgba(253, 253, 253, 0.37) 141.62%
  );
  border-radius: 1.454vw;
  padding: 3.7225vh 1.762vw;
  overflow: hidden;
  position: relative;
  border-color: #fff;
  border-width: 0 0.0727vw 0.0727vw;
  border-style: solid;

  &::before {
    content: "";
    position: absolute;
    top: 0%;
    border-top: 0.0727vw solid #fff;
    width: 100%;
    z-index: 0;
  }

  .saleBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(102.01deg, #ffffff 0%, #ffffff 100%);
    box-shadow: 0px 10px 33px rgba(0, 0, 0, 0.06);
    border-radius: 1.454vw;
    margin-right: 2.937vw;
    padding: 0.987vw 1.097vw 1.901vw 2vw;
    max-width: 25%;
    width: 100%;
    max-height: 20vh;
    height: 100%;

    &:last-child {
      margin-right: 0;
    }

    .iconBoxWrapper {
      display: flex;
      align-items: center;

      .iconBox {
        min-height: 3.024vh;
        min-width: 2.181vw;
        font-size: 1.454vw;
        display: flex;
        justify-content: center;
        background-color: #fff;
        padding: 0.604vh 0.436vw;
        border-radius: 10px;
        margin-right: 1.0188vw;
      }

      .cartTitle {
        font-size: 0.957vw;
        color: #333333;
      }
    }
  }

  .inverted_radius {
    position: absolute;
    top: -20.5vh;
    max-height: 23vh;
    max-width: 23vw;
    height: 100%;
    width: 100%;
    background-color: #f0f3f5;
    border-radius: 100%;
    box-shadow: 0px 0px 0px 0.0727vw #fff;
    ${(props) =>
      props.view > 1 &&
      `
    right: 6vw;
    `}
  }
`;

const AmountStyle = styled.div<Props>`
  font-family: "GraphikWide", sans-serif;
  padding-left: ${(props) =>
    props.view < 4 || props.view === 4 ? " 3.5vw" : "0vw"};
  text-align: ${(props) => props.view > 4 && "center"};
  font-size: 2.135vw;
`;

export default VisitsCount;
