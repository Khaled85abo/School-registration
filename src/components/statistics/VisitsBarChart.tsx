import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { kFormatter } from "@/utils/amounFormatter";

interface Props {
  background: string;
  internationalVisitsColor: string;
  totalVisitsColor: string;
}
const SellerBarChart = ({ data }: { data: any }) => {
  const [customBarSize, setCustomBarSize] = useState(window.innerWidth / 55);
  const [customRadius, setCustomRadius] = useState(window.innerWidth / 200);
  const [customYwidth, setCustomYwidth] = useState(window.innerWidth / 30);

  const modifiedData = data.map((el: any) => {
    const result = el.totalVisits - el.internationalVisits;
    return {
      ...el,
      totalVisits: result < 0 ? 0 : result,
      internationalVisits: el.internationalVisits,
    };
  });
  console.log("modifiedData", modifiedData);
  const background = "linear-gradient(102.01deg, #C8D3DC 0%, #EFEFEF 100%)";
  const internationalVisitsColor = "#808287";
  const totalVisitsColor = "#A4AFB7";

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
      background={background}
      internationalVisitsColor={internationalVisitsColor}
      totalVisitsColor={totalVisitsColor}>
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
            }}>
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
              dataKey="internationalVisits"
              stackId="a"
              fill="#808287"
            />
            <Bar
              dataKey="totalVisits"
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
              dataKey="prevYearVisits"
              stroke="#E0BB75"
              strokeWidth={"0.17vh"}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="dots">
        <div className="item">
          <div className="dot budget"></div>
          <div className="text">local</div>
        </div>
        <div className="item">
          <div className="dot sales"></div>
          <div className="text">international</div>
        </div>
        <div className="item">
          <div className="dot prevYear"></div>
          <div className="text">Previous year visits</div>
        </div>
      </div>
    </StyledBarChart>
  );
};

const StyledBarChart = styled.div<Props>`
  background: ${(props) =>
    props.background ||
    "linear-gradient(102.01deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 246, 247, 0.8) 100%)"};
  box-shadow: 0px 10px 29px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 1.454vw;
  padding: 3%;
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
        background-color: ${(props) =>
          props.internationalVisitsColor || "#A4AFB7"};
      }

      .budget {
        background-color: ${(props) => props.totalVisitsColor || "#C1A470"};
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
