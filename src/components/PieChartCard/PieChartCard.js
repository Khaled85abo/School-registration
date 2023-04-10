import styled from "styled-components";
import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PieChartCard = ({ orders, view }) => {
  const [stats, setStats] = useState([]);
  const [width, setWidth] = useState(0);

  const groupOrders = () => {
    // Combine the orders by "OrdLevAdr1" and sum the value of "OhOrdSumInklMoms".
    var groups = [];
    orders.reduce(function (res, value) {
      if (!res[value.OrdLevAdr1]) {
        res[value.OrdLevAdr1] = {
          OrdLevAdr1: value.OrdLevAdr1,
          OhOrdSumInklMoms: 0,
          OrdDatum: value.OrdDatum,
        };
        groups.push(res[value.OrdLevAdr1]);
      }
      res[value.OrdLevAdr1].OhOrdSumInklMoms += value.OhOrdSumInklMoms;
      return res;
    }, {});
    // console.log("groups", groups);

    // Sort the combined orders by the "OhOrdSumInklMoms" total.
    const sorted = groups.sort(
      (a, b) => b.OhOrdSumInklMoms - a.OhOrdSumInklMoms
    );
    // console.log("sorted", sorted);

    // Filter the objects by "OrdDatum".
    const filtered = [];
    for (const item of sorted) {
      // if (item.OrdDatum.includes("18T")) filtered.push(item);
      filtered.push(item);
    }
    // console.log("filtered", filtered);

    // Get the first 3 objects without the object with "OrdLevAdr1" that's equal to null
    const first3 = [];
    for (const [index, item] of filtered.entries()) {
      const maxIndex = filtered[0]?.OrdLevAdr1 === null ? 3 : 2;
      if (
        (filtered[0]?.OrdLevAdr1 !== null || index !== 0) &&
        index <= maxIndex
      )
        first3.push(item);
    }
    // console.log("first3", first3);

    // Get all the objects except for the objects in "first3".
    const rest = [];
    for (const [index, item] of filtered.entries()) {
      const startIndex = filtered[0]?.OrdLevAdr1 === null ? 3 : 2;
      if (index > startIndex) rest.push(item);
    }
    // console.log("rest", rest);

    // Calculat the sum of the "OhOrdSumInklMoms" for the "rest" array.
    const sum = rest.reduce((accumulator, object) => {
      return accumulator + object.OhOrdSumInklMoms;
    }, 0);
    // console.log(sum);

    // Put together the "first3" array with the "sum" value.
    const done = [...first3, { OrdLevAdr1: "Other", OhOrdSumInklMoms: sum }];
    // console.log(done);

    // Calculat the sum of the "OhOrdSumInklMoms" for the "done" array.
    const total = done.reduce((accumulator, item) => {
      return accumulator + item.OhOrdSumInklMoms;
    }, 0);
    // console.log(total);

    // Transform the "OhOrdSumInkl Moms" to a percentage number based on the "total".
    const colors = ["#E0B1B3", "#E0BB75", "#98A1D1", "#B8CAC2"];
    const array = [];
    for (const [index, item] of done.entries()) {
      const percentage = (item.OhOrdSumInklMoms / total) * 100;
      array.push({
        name: item.OrdLevAdr1,
        value: Math.round(percentage),
        color: colors[index],
      });
    }
    // console.log(array);

    setStats(array);
  };

  useEffect(() => {
    if (orders) groupOrders();

    const chartWrapper = document.querySelector(".chartContainer");
    const chartWrapperWidth = chartWrapper.offsetWidth;
    setWidth(chartWrapperWidth);
  }, [orders]);

  const gap = view === 2 ? "1.7vh" : "0.5vh";
  const size = view === 2 ? "2.5vh" : "1.7vh";

  const gradientColors = [
    { start: "#E0B1B3", end: "#F3D2D5" },
    { start: "#E0BB75", end: "#FBE4BC" },
    { start: "#98A1D1", end: "#D3DCFD" },
    { start: "#B8CAC2", end: "#E8FBEB" },
  ];

  return (
    <StyledPieChartCard width={width} gap={gap} size={size}>
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
                      <linearGradient id={`myGradient${index}`}>
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
                stroke="none"
                data={stats}
                innerRadius={(width / 2) * 0.65}
                outerRadius={width / 2}
              >
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
        <div className="chartTitle">{view !== 2 && "Order Status"}</div>
        <div className="itemsContainer">
          {Array.isArray(stats) &&
            stats.length > 0 &&
            stats.map((item, index) => {
              const { name, value, color } = item;
              return (
                <div className="statItem" key={index}>
                  <div
                    className="color"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="text">
                    <span>{value}%</span> • {name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </StyledPieChartCard>
  );
};

const StyledPieChartCard = styled.div`
  height: ${(props) => props.width}px;
  width: 100%;
  display: grid;
  grid-template-columns: 40% 60%;

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
        font-size: 2.109vw;
        line-height: 25px;
        font-weight: 500;
        letter-spacing: 0.07em;
        color: #666666;
      }
    }
  }

  .statsContainer {
    width: 100%;
    padding-left: 13%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .chartTitle {
      font-weight: 500;
      font-size: 2vh;
      line-height: 20px;
      letter-spacing: 0.02em;
      color: #4d5057;
      margin-bottom: 1.3vh;
    }

    .itemsContainer {
      display: flex;
      flex-direction: column;
      padding-bottom: 1vh;
      justify-content: end;
      gap: ${(props) => props.gap || "0.5vh"};

      .statItem {
        display: flex;
        align-items: center;

        .color {
          width: 1.745vw;
          height: 2.419vh;
          border-radius: 100%;
        }

        .text {
          word-spacing: 1px;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 1.09vw;
          padding-left: 0.945vw;

          span {
            font-weight: 600;
          }
        }
      }
    }
  }
`;

export default PieChartCard;
