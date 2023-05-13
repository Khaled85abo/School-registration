import styled from "styled-components";
import { useState, useEffect } from "react";
import { getRelativeDateIntl } from "@/utils/relativeTime";

const VisitsList = ({ data }: { data: any }) => {
  return (
    <StyledOrders className="ordersBlock">
      <div className="ordersContainer">
        <div className="innerContainer">
          {Array.isArray(data.uninvoicedOrders) &&
            data.uninvoicedOrders.length > 0 &&
            data.uninvoicedOrders.map((data: any, index: any) => {
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
                  <div className="date">
                    {dateArray && getRelativeDateIntl(new Date(dateArray[0]))}
                  </div>
                  <div className="orderNum"># {OrderNr}</div>
                  <div className="status">
                    <div
                      className="indicator"
                      style={{ backgroundColor: "#E5C68E" }}></div>
                    {OrdStat.status}
                  </div>
                  <div className="name">
                    School
                    <span className="bold">{OrdLevAdr1 || "N/A"}</span>
                  </div>

                  <div>
                    <p>Name:</p>
                    <p>Phone Number:</p>
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
  // height: calc(90vh - 8vh);
  margin-top: 4vh;

  .ordersContainer {
    height: fit-content;
    padding: 5px 100px;
    padding-bottom: 63px;
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
    grid-template-columns: 15% 15% auto 30% 20%;
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
      font-size: 1.9vh;
    }

    .currency {
      font-size: 1.3vh;
    }
  }
`;

export default VisitsList;
