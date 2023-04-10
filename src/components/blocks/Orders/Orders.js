import styled from "styled-components";
import { useState, useEffect } from "react";

const Orders = ({ data }) => {
  const [totTime, setTotTime] = useState(0);
  const [waitPercentage1, setWaitPercentage1] = useState(0);
  const [waitPercentage2, setWaitPercentage2] = useState(0);

  useEffect(() => {
    if (data.uninvoicedOrders.length > 0) {
      const ordersBlock = document.querySelector(".ordersBlock");
      const ordersBlockHeight = ordersBlock.offsetHeight;

      const innerContainer = document.querySelector(".innerContainer");
      const innerContainerHeight = innerContainer.offsetHeight;
      const ordersContainer = document.querySelector(".ordersContainer");

      const order = document.querySelector(".order");
      const orderHeight = order.offsetHeight + 35;

      const ordersOnScreen = ordersBlockHeight / orderHeight;

      const totTime =
        (data.orders.length - Math.floor(ordersOnScreen)) * 5 + 20;
      const waitPercentage = (10 / totTime) * 100;

      setTotTime(totTime);
      setWaitPercentage1(waitPercentage + "%");
      setWaitPercentage2(waitPercentage + 50 + "%");

      if (ordersBlockHeight < innerContainerHeight) {
        ordersContainer.classList.add("scroll");
      }
    }
  }, [data]);

  return (
    <StyledOrders
      totTime={totTime}
      wait1={waitPercentage1}
      wait2={waitPercentage2}
      className="ordersBlock"
    >
      <div className="ordersContainer">
        <div className="innerContainer">
          {Array.isArray(data.uninvoicedOrders) &&
            data.uninvoicedOrders.length > 0 &&
            data.uninvoicedOrders.map((data, index) => {
              const {
                OrderNr,
                OrdLevAdr1,
                OrdDatum,
                OhOrdSumInklMoms,
                OrdStat,
              } = data;

              const dateArray = OrdDatum?.split("T");

              // const status = "Pending";

              var statusColor = "";
              switch (status) {
                case "Pending":
                  statusColor = "#E5C68E";
                  break;
                case "Completed":
                  statusColor = "#A9CFA3";
                  break;
                default:
                  statusColor = "black";
              }

              return (
                <div className="order" key={index}>
                  <div className="orderNum"># {OrderNr}</div>
                  <div className="status">
                    <div
                      className="indicator"
                      style={{ backgroundColor: "#E5C68E" }}
                    ></div>
                    {OrdStat.status}
                  </div>
                  <div className="name">
                    Shipping to{" "}
                    <span className="bold">{OrdLevAdr1 || "N/A"}</span>
                  </div>
                  <div className="date">
                    Ordered: {dateArray && dateArray[0]}
                  </div>
                  <div>
                    Total value:{" "}
                    <span className="bold">
                      {Math.round(OhOrdSumInklMoms).toLocaleString()}
                    </span>
                    <span className="currency"> SEK</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </StyledOrders>
  );
};

const StyledOrders = styled.div`
  height: calc(90vh - 8vh);
  margin-top: 4vh;
  overflow: hidden;

  .ordersContainer {
    height: fit-content;
    padding: 5px 100px;
    padding-bottom: 63px;
  }

  .ordersContainer.scroll {
    animation: scroll ${(props) => props.totTime}s linear;
    animation-iteration-count: infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateY(0%);
    }

    ${(props) => props.wait1} {
      transform: translateY(0%);
    }

    50% {
      transform: translateY(calc(-100% + (90vh - 63px)));
    }

    ${(props) => props.wait2} {
      transform: translateY(calc(-100% + (90vh - 63px)));
    }

    100% {
      transform: translateY(0%);
    }
  }

  .order {
    background: linear-gradient(
      101.88deg,
      rgba(255, 255, 255, 0.76) 0%,
      rgba(253, 253, 253, 0.76) 100.21%
    );
    width: 100%;
    margin-bottom: 35px;
    padding: 1.8vh 3%;
    display: grid;
    grid-template-columns: 15% 15% auto 20% 20%;
    align-items: center;
    border-radius: 3vh;

    &:last-child {
      margin-bottom: 0;
    }

    div {
      font-size: 1.9vh;
      letter-spacing: -0.005em;
    }

    .orderNum {
      font-size: 1.4vh;
      letter-spacing: 0.1em;
      color: #333333;
    }

    .status {
      display: flex;
      gap: 15px;
      align-items: center;
      letter-spacing: 0.02em;
      font-size: 1.3vh;
      color: #333333;

      .indicator {
        height: 1.7vh;
        width: 1.7vh;
        border-radius: 1.7vh;
      }
    }

    .bold {
      font-weight: 600;
    }

    .name {
      padding-right: 35px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333333;
    }

    .date {
      color: rgba(51, 51, 51, 0.54);
      font-size: 1.9vh;
    }

    .currency {
      font-size: 1.3vh;
    }
  }
`;

export default Orders;
