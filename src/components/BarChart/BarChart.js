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
  BarChart,
} from "recharts";
import { kFormatter } from "./amounFormatter";

const renderBarChart = ({ data, view }) => {
  const [customBarSize, setCustomBarSize] = useState(window.innerWidth / 55);
  const [customRadius, setCustomRadius] = useState(window.innerWidth / 200);
  const [customYwidth, setCustomYwidth] = useState(window.innerWidth / 30);

  const padding = view === 3 || view === 4 ? "3%" : "5%";
  const background =
    view === 5
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

  const modifiedData = data.map((month) => {
    return { ...month, budget: null };
  });
  return (
    <StyledBarChart
      padding={padding}
      background={background}
      salesColor={salesColor}
      budgetColor={budgetColor}
    >
      <div className="title">Average Sales 12m</div>
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
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="5%" stopColor="#B0BDC6" stopOpacity={1} />
                <stop offset="95%" stopColor="#D1DAE0" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <XAxis
              dy={20}
              height={65}
              dataKey="month"
              stroke="#6a6a6a"
              tick={{ fontSize: "1.072vw" }}
            />
            <YAxis
              stroke="#6a6a6a"
              width={customYwidth}
              tick={{ fontSize: "0.872vw" }}
              tickFormatter={kFormatter}
            />
            <Bar
              dataKey="total"
              barSize={customBarSize}
              fill="url(#colorUv)"
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
              dataKey="average"
              stroke="#487D5D"
              strokeWidth={"0.17vh"}
            />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#E0BB75"
              strokeWidth={"0.17vh"}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="dots">
        <div className="item">
          <div className="dot sales"></div>
          <div className="text">Sales</div>
        </div>
        <div className="item">
          <div className="dot budget"></div>
          <div className="text">Budget</div>
        </div>
        {view < 5 && (
          <div className="item">
            <div className="dot average"></div>
            <div className="text">Average</div>
          </div>
        )}
      </div>
    </StyledBarChart>
  );
};

const StyledBarChart = styled.div`
  background: ${(props) =>
    props.background
      ? "linear-gradient(102.01deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 246, 247, 0.8) 100%)"
      : "#fff"};
  box-shadow: 0px 10px 29px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 1.454vw;
  padding: ${(props) => props.padding || "5%"};
  display: flex;
  gap: 2.8vh;
  flex-direction: column;

  .title {
    font-size: 3.4vh;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #2f2f2f;
    margin-bottom: 40px;
  }

  .chartWrapper {
    flex-grow: 1;

    .recharts-cartesian-axis-line[type="number"] {
      stroke-opacity: 0;
    }
    .recharts-cartesian-axis-line[type="category"] {
      stroke: #8397ff !important;
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

export default renderBarChart;
