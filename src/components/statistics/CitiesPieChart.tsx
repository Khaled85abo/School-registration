import styled from "styled-components";
import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { SingleVisit } from "@/pages";

type Groups = {
  totalVisits: number;
  municipality: string;
};
const CitiesPieChart = ({ visits, title }: { visits: any; title: string }) => {
  const [stats, setStats] = useState<
    {
      name: string;
      value: number;
      color: string;
    }[]
  >([]);
  const [width, setWidth] = useState(0);

  const groupCities = () => {
    const spreadVisits = [];
    for (let [key, value] of Object.entries(visits[new Date().getFullYear()])) {
      for (let visit of value as SingleVisit[]) {
        spreadVisits.push(visit);
      }
    }
    const groups: Groups[] = spreadVisits
      .reduce(function (prev: any, curr: any) {
        const index = prev.findIndex(
          (el: Groups) => el.municipality == curr.municipality
        );
        if (index > -1) {
          prev[index].totalVisits += 1;
        } else {
          prev.push({
            municipality: curr.municipality,
            totalVisits: 1,
          });
        }
        return prev;
      }, [])
      .sort(
        (a: Groups, b: Groups) =>
          b.totalVisits - a.totalVisits && a.municipality
      );
    const firstFive = groups.slice(0, 4);
    const rest = groups.slice(4, groups.length);
    const restSum = rest.reduce((prev, curr) => (prev += curr.totalVisits), 0);
    const done = [
      ...firstFive,
      { municipality: "Others", totalVisits: restSum },
    ];

    const total = done.reduce((accumulator, item) => {
      return accumulator + item.totalVisits;
    }, 0);

    const colors = ["#E0B1B3", "#E0BB75", "#98A1D1", "#B8CAC2", "#98A1D1"];
    const array = [];

    for (let i = 0; i < done.length; i++) {
      const percentage = (done[i].totalVisits / total) * 100;
      array.push({
        name: done[i].municipality,
        value: Math.round(percentage),
        color: colors[i],
      });
    }
    // console.log(array);

    setStats(array);
  };

  useEffect(() => {
    groupCities();
    const chartWrapper = document.querySelector(
      ".chartContainer"
    ) as HTMLElement;
    if (chartWrapper) {
      const chartWrapperWidth = chartWrapper.offsetWidth;
      setWidth(chartWrapperWidth);
    }
  }, []);

  const gradientColors = [
    { start: "#E0B1B3", end: "#F3D2D5" },
    { start: "#E0BB75", end: "#FBE4BC" },
    { start: "#98A1D1", end: "#D3DCFD" },
    { start: "#B8CAC2", end: "#E8FBEB" },
    { start: "#98A1D1", end: "#D3DCFD" },
  ];
  return (
    <StyledCitiesPieChart width={width}>
      <div className="chartContainer">
        <div className="chartWrapper">
          <div className="oneHundred">100%</div>
          <ResponsiveContainer>
            <PieChart>
              <defs>
                {Array.isArray(stats) &&
                  stats.map((item, index) => {
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
                data={stats}
                innerRadius={(width / 2) * 0.7}
                outerRadius={width / 2}>
                {stats.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#myGradient${index})`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="statsContainer">
        <div className="chartTitle">{title}</div>
        {Array.isArray(stats) &&
          stats.length > 0 &&
          stats.map((item, index) => {
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
    </StyledCitiesPieChart>
  );
};

const StyledCitiesPieChart = styled.div<{ width: number }>`
  /* height: 100%; */
  width: 100%;
  display: grid;
  grid-template-columns: 35% 65%;

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

export default CitiesPieChart;
