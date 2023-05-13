import styled from "styled-components";

// Components
import VisitsBarChart from "@/components/statistics/VisitsBarChart";
import CustomPieChart from "@/components/statistics/CustomPieChart";
import QuotaPie from "@/components/statistics/QuotaPie";
import VisitsCount from "@/components/statistics/VisitsCount";
interface StatusProps {
  data: any;
  seller: any;
}
const Status = ({ data, seller }: StatusProps) => {
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
    <StyledBudget>
      <div className="leftContainer">
        <VisitsCount data={saleStatsData} />
        <VisitsBarChart data={seller} />
      </div>

      <div className="wrapper">
        <div className="pieChartContainer">
          <div className="title">This Year</div>
          <div className="pieChartCardContainer">
            <CustomPieChart title="Local/international" orders={data.orders} />
            <CustomPieChart title="Grades" orders={data.orders} />
          </div>
        </div>

        <div className="pieChartContainer budget">
          <div className="title">Payed Visits</div>
          <div className="pieChartCardContainer">
            <QuotaPie seller={seller.sales} />
          </div>
        </div>
      </div>
    </StyledBudget>
  );
};

const StyledBudget = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: calc(70% - 2vh) calc(30% - 2vh);
  gap: 4vh;

  .leftContainer {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 24vh 54vh;
    gap: 4vh;
  }

  .wrapper {
    display: grid;
    grid-template-rows: 56vh 30vh;
    gap: 4vh;
    height: 90vh;
    margin-top: -8vh;
    position: relative;

    .pieChartContainer {
      background: linear-gradient(
        102.01deg,
        rgba(255, 255, 255, 0.48) 0%,
        rgba(253, 253, 253, 0.48) 100%
      );
      border: 1px solid #ffffff;
      box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
      border-radius: 33px;
      width: 100%;
      height: 100%;
      padding: 9% 8%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;

      .title {
        padding-bottom: 25px;
        font-size: 3vh;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: #4d5057;
      }

      .pieChartCardContainer {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }

    .pieChartContainer.budget {
      background: linear-gradient(123.33deg, #ebf0ee 5.27%, #f1f1f1 104.93%);
    }
  }
`;

export default Status;
