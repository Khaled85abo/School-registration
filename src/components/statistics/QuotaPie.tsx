import styled from "styled-components";
import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { SingleVisit } from "@/pages";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const getPercentage = (sales: number, budget: number) => {
  return (sales * 100) / budget;
};
const QuotaPie = ({ visits }: { visits: any }) => {
  console.log("obj: ", visits);
  const [width, setWidth] = useState(0);
  const [data, setData] = useState<
    | {
        name: string;
        value: number;
        color: string;
      }[]
  >([]);
  const currDate = new Date();
  const currentYear = currDate.getFullYear();
  // ******* Quota for previous month *********
  const currMonth = months[currDate.getMonth() - 1];
  const thisYearVisits = visits[currentYear];

  const getData = () => {
    if (!thisYearVisits) {
      return;
    }
    let payedVisits = 0;
    let noPayedVisits = 0;
    for (let [key, value] of Object.entries(thisYearVisits)) {
      let noPayedVisitsInner = 0;
      let payedVisitsInner = 0;
      for (let visit of value as SingleVisit[]) {
        if (visit.havePayedTour) {
          payedVisitsInner += 1;
        } else {
          noPayedVisitsInner += 1;
        }
      }

      payedVisits += payedVisitsInner;
      noPayedVisits += noPayedVisitsInner;
    }

    const percentage = getPercentage(payedVisits, noPayedVisits);
    const left = 100 - percentage > 0 ? 100 - percentage : 0;
    setData([
      { name: "Payed Vists", value: +percentage.toFixed(0), color: "#B8CAC2" },
      { name: "Not Payed Visits", value: +left.toFixed(0), color: "#9FB5AB" },
    ]);
  };

  useEffect(() => {
    getData();

    const chartWrapper = document.querySelector(
      ".chartContainer"
    ) as HTMLElement;
    if (chartWrapper) {
      const chartWrapperWidth = chartWrapper.offsetWidth;
      setWidth(chartWrapperWidth);
    }
  }, []);

  const gradientColors = [
    { start: "#B8CAC2", end: "#C2D6CD" },
    { start: "#9FB5AB", end: "#87938D" },
  ];

  return (
    <StyledPieChartCard2 width={width}>
      <div className="chartContainer">
        <div className="chartWrapper">
          <div className="oneHundred">
            {" "}
            {data.length > 0 ? data[0].value : "0"}%
          </div>

          <ResponsiveContainer>
            <PieChart>
              <defs>
                {Array.isArray(data) &&
                  data.map((item, index) => {
                    const { name, value, color } = item;
                    return (
                      <linearGradient id={`myGradient${index}`} key={index}>
                        <stop
                          offset="0%"
                          stopColor={
                            gradientColors[index % gradientColors.length].start
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            gradientColors[index % gradientColors.length].end
                          }
                        />
                      </linearGradient>
                    );
                  })}
              </defs>

              <Pie
                dataKey="value"
                stroke="none"
                data={data}
                innerRadius={(width / 2) * 0.7}
                outerRadius={width / 2}>
                {data &&
                  data.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.color} />
                  ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="statsContainer">
        <div className="chartTitle"></div>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item, index) => {
            const { name, value, color } = item;
            return (
              <div className="statItem" key={index}>
                <div className="color" style={{ backgroundColor: color }}></div>
                <div className="text">
                  <span>{value}%</span> • <span>{name}</span>
                </div>
              </div>
            );
          })}
      </div>
    </StyledPieChartCard2>
  );
};

const StyledPieChartCard2 = styled.div<{ width: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: 36% 64%;

  .chartContainer {
    height: 100%;
    min-height: ${(props) => props.width}px;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .chartWrapper {
      max-height: ${(props) => props.width}px;
      height: 100%;
      position: relative;

      .oneHundred {
        font-family: "GraphikWide", sans-serif;
        width: 100%;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 0;
        text-align: center;
        font-size: ${(props) => props.width * 0.15}px;
        font-weight: 500;
        letter-spacing: 0.07em;
        color: #4d5057;
      }
    }
  }

  .statsContainer {
    width: 100%;
    padding-left: 10%;
    display: flex;
    flex-direction: column;
    padding-bottom: 1vh;
    justify-content: end;
    gap: 7px;

    .chartTitle {
      font-weight: 500;
      font-size: 2vh;
      line-height: 20px;
      letter-spacing: 0.02em;
      color: #4d5057;
      margin-bottom: 1.3vh;
    }

    .statItem {
      display: flex;
      align-items: center;

      .color {
        width: 1.7vh;
        min-width: 1.7vh;
        height: 1.7vh;
        border-radius: 0.872vw;
      }

      .text {
        word-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.5vh;
        padding-left: 2.5vh;
        color: #636363;

        span {
          margin: 0 0.5vh;
        }
      }
    }
  }
`;

export default QuotaPie;
