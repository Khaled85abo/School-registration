import styled from "styled-components";

// Components
import SaleStats from "@/components/SaleStats/SaleStats";
import PieChartCard from "@/components/PieChartCard/PieChartCard";
import BarChart from "@/components/BarChart/BarChart";

const SalesRef = ({ view, data }) => {
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
    <StyledSalesRef>
      <div className="leftContainer">
        <SaleStats className="stats" data={saleStatsData} view={view} />
        <BarChart data={data.monthlyValues} view={view} />
      </div>

      {/* Bort kommenterat pie graf pga order från beställare */}
      {/* <div className="pieChartContainer">
        <div className="title">In division</div>
        <div className="pieChartCardContainer">
          <PieChartCard orders={data.orders} />
          <PieChartCard orders={data.orders} />
          <PieChartCard orders={data.orders} />
        </div>
      </div> */}
    </StyledSalesRef>
  );
};

const StyledSalesRef = styled.div`
  height: 100%;
  width: 100%;
  /* display: grid;
  grid-template-columns: calc(67% - 2vh) calc(33% - 2vh);
  gap: 4vh; */

  .leftContainer {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 26vh 52vh;
    gap: 4vh;
  }

  .pieChartContainer {
    background: linear-gradient(
      102.01deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(245, 246, 247, 0.8) 100%
    );
    box-shadow: 0px 10px 29px rgba(0, 0, 0, 0.06);
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.52);
    border-radius: 20px;
    padding: 5% 12% 12%;
    display: flex;
    flex-direction: column;

    .title {
      padding-bottom: 25px;
      font-size: 3.4vh;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .pieChartCardContainer {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

export default SalesRef;
