import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { kFormatter } from "./amounFormatter";

const SellerBarChart = ({ data, view }) => {
  const [customBarSize, setCustomBarSize] = useState(window.innerWidth / 55);
  const [customRadius, setCustomRadius] = useState(window.innerWidth / 200);
  const [customYwidth, setCustomYwidth] = useState(window.innerWidth / 30);

  const modifiedData = data?.sales.map((el) => {
    const result = el.budget - el.sales;
    const shortenBy = el.budget > 1000000 ? 1000 : 1;
    return {
      ...el,
      budget: result < 0 ? 0 : result,
      sales: el.sales,
    };
  });
  console.log("modifiedData", modifiedData);
  const padding = view === 3 || view === 4 ? "3%" : "5%";
  const background =
    view > 4
      ? "linear-gradient(102.01deg, #C8D3DC 0%, #EFEFEF 100%)"
      : "linear-gradient(102.01deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 246, 247, 0.8) 100%)";
  const salesColor = view > 4 ? "#808287" : "#A4AFB7";
  const budgetColor = view > 4 ? "#A4AFB7" : "#C1A470";

  function resizingFunc() {
    setCustomBarSize(window.innerWidth / 55);
    setCustomRadius(window.innerWidth / 200);
    setCustomYwidth(window.innerWidth / 10);
  }

  useEffect(() => {
    window.addEventListener("resize", resizingFunc);

    return () => {
      window.removeEventListener("resize", resizingFunc);
    };
  }, []);

  return (
    <StyledBarChart
      padding={padding}
      background={background}
      salesColor={salesColor}
      budgetColor={budgetColor}
    >
      <div className="title">Last 12 month</div>
      <div className="chartWrapper">
        <ResponsiveContainer>
          <ComposedChart
            data={modifiedData}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              dy={15}
              height={60}
              dataKey="month"
              stroke="#6a6a6a"
              tick={{ fontSize: "0.872vw" }}
            />
            <YAxis
              stroke="#6a6a6a"
              width={customYwidth}
              tick={{ fontSize: "0.872vw" }}
              tickFormatter={kFormatter}
            />

            <Bar
              barSize={customBarSize}
              dataKey="sales"
              stackId="a"
              fill="#808287"
            />
            <Bar
              dataKey="budget"
              stackId="a"
              fill="#A4AFB7"
              barSize={customBarSize}
              radius={[customRadius, customRadius, 0, 0]}
            />
            <CartesianGrid
              strokeDasharray="10"
              horizontal={true}
              vertical={false}
              stroke="#fff"
            />
            <Line
              type="monotone"
              dataKey="prevYearSales"
              stroke="#E0BB75"
              strokeWidth={"0.17vh"}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="dots">
        <div className="item">
          <div className="dot budget"></div>
          <div className="text">Budget</div>
        </div>
        <div className="item">
          <div className="dot sales"></div>
          <div className="text">Sales</div>
        </div>
        <div className="item">
          <div className="dot prevYear"></div>
          <div className="text">Previous year sales</div>
        </div>
      </div>
    </StyledBarChart>
  );
};

const StyledBarChart = styled.div`
  background: ${(props) =>
    props.background ||
    "linear-gradient(102.01deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 246, 247, 0.8) 100%)"};
  box-shadow: 0px 10px 29px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 1.454vw;
  padding: ${(props) => props.padding || "5%"};
  display: flex;
  flex-direction: column;
  gap: 2.8vh;

  .title {
    font-size: 3.4vh;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #575a61;
    margin-bottom: 40px;
  }

  .chartWrapper {
    flex-grow: 1;

    .recharts-cartesian-axis-line[type="number"] {
      stroke-opacity: 0;
    }
    .recharts-cartesian-axis-line[type="category"] {
      stroke: #8e8e8e !important;
      stroke-width: 2px !important;
    }
    .recharts-cartesian-axis-tick-line {
      stroke-opacity: 0;
    }

    .recharts-cartesian-grid-horizontal line:first-child {
      stroke-opacity: 0 !important;
    }
  }

  .dots {
    display: flex;
    padding-left: 3.5vw;

    .item {
      display: flex;
      align-items: center;
      margin-right: 1.8vw;

      .dot {
        height: 2vh;
        width: 2vh;
        border-radius: 1vh;
      }

      .sales {
        background-color: ${(props) => props.salesColor || "#A4AFB7"};
      }

      .budget {
        background-color: ${(props) => props.budgetColor || "#C1A470"};
      }

      .average {
        background-color: #487d5d;
      }
      .prevYear {
        background-color: #c1a470;
      }
      .text {
        padding-left: 0.4vw;
        font-size: 1.3vh;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        color: #333333;
      }
    }
  }
`;

export default SellerBarChart;
