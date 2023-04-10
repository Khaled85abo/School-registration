import styled from "styled-components";

// Components
import SaleStats from "@/components/SaleStats/SaleStats";
import BarChart from "@/components/BarChart/BarChart";
import PieChartCard from "@/components/PieChartCard/PieChartCard";

const Sales = ({ view, data }) => {
  const saleStatsData = [
    {
      title: "This year",
      amount: data.thisYearSum,
      color: "#A4BDB2",
    },
    {
      title: "This month",
      amount: data.thisMonthSum,
      color: "#DDABAD",
    },
    {
      title: "This week",
      amount: data.thisWeekSum,
      color: "#C1A470",
    },
    {
      title: "This month last year",
      amount: data.thisMonthLastYearSum,
      color: "#899AA6",
    },
  ];

  return (
    <StyledSales>
      <SaleStats data={saleStatsData} view={view} />

      <div className="bottomSection">
        <div
          style={{
            maxHeight: "31.636vw",
          }}>
          <BarChart data={data.monthlyValues} view={view} />
        </div>

        <div className="pieChartContainer">
          <div className="title">In division</div>
          <div className="pieChartCardContainer">
            <PieChartCard orders={data.orders} view={view} />
          </div>
        </div>
      </div>
    </StyledSales>
  );
};

const StyledSales = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 26vh 52vh;
  gap: 4vh;
  position: relative;
  overflow: hidden;

  .bottomSection {
    max-width: 100%;
    display: grid;
    grid-template-columns: 50% 1fr;
    gap: 3.636vw;
    flex-grow: 1;
    /*   position: relative;
    overflow: hidden; */

    .pieChartContainer {
      background: linear-gradient(
        102.01deg,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(245, 246, 247, 0.8) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.52);
      box-shadow: 0px 10px 29px rgba(0, 0, 0, 0.06);
      border-radius: 1.454vw;
      width: 100%;
      height: 100%;
      max-height: 31.636vw;
      padding: 6% 8%;
      display: flex;
      flex-direction: column;
      width: 100%;

      .title {
        font-size: 3vh;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: #2f2f2f;
      }

      .pieChartCardContainer {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
`;

export default Sales;
