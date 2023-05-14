import { SingleVisit } from "@/pages";
export type VisitsOrganizedByYear = Record<
  string,
  Record<string, SingleVisit[]>
>;
export const orderStatus = {
  0: "Offererad",
  10: "In progress",
  12: "Kreditspärrad",
  13: "Sent to warehouse",
  15: "Frisläppt till Astro",
  20: "Backorder/Planned",
  40: "Leverans påbörjad",
  50: "Frisläppt för fakt",
  70: "Invoiced",
  90: "Cancelled",
};
const KundKategoriKod = {
  0: "Inhemska kunder",
  1: "Utländska EU",
  2: "Utländska, Ej EU",
  3: "HoS Distribution",
  4: "Swedish Haircare - US (kto 3013)",
  5: "Norge (kto 3014)",
};
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

export function organizeByYear(data: SingleVisit[]): VisitsOrganizedByYear {
  const organized: VisitsOrganizedByYear = {};
  for (let visit of data) {
    const testDate = visit.testCreateAt as Date;
    const datum = new Date(testDate);
    const year = datum.getFullYear();
    const month = months[datum.getMonth()];

    if (!organized[year]) {
      organized[year] = {};
      organized[year][month] = [visit];
    } else {
      if (!organized[year][month]) {
        organized[year][month] = [visit];
      } else {
        organized[year][month].push(visit);
      }
    }
  }
  return organized;
}

export function getThisWeekOrdersSum(organized: VisitsOrganizedByYear) {
  const curr = new Date();
  const currentdayMonth = months[curr.getMonth()];
  const currentdayYear = curr.getFullYear();
  let getday = curr.getDay();
  if (getday == 0) {
    getday = 7;
  }
  const first = curr.getDate() - getday + 1;
  const firstday = new Date(curr.setDate(first));
  const firstdayYear = firstday.getFullYear();
  const firstdayMonth = months[firstday.getMonth()];
  let ordersArray = [];
  if (currentdayMonth == firstdayMonth) {
    if (
      organized[currentdayYear] &&
      organized[currentdayYear][currentdayMonth]
    ) {
      ordersArray = organized[currentdayYear][currentdayMonth];
    }
  } else if (
    currentdayMonth !== firstdayMonth &&
    currentdayYear == firstdayYear
  ) {
    if (
      organized[currentdayYear] &&
      organized[currentdayYear][currentdayMonth] &&
      organized[currentdayYear][firstdayMonth]
    ) {
      // currentMonth should always be Jan and firstdayMonth should be Dec
      ordersArray = [
        ...organized[currentdayYear][currentdayMonth],
        ...organized[currentdayYear][firstdayMonth],
      ];
    }
  } else {
    if (
      organized[currentdayYear] &&
      organized[currentdayYear][currentdayMonth] &&
      organized[firstdayYear] &&
      organized[currentdayYear][firstdayMonth]
    ) {
      ordersArray = [
        ...organized[currentdayYear][currentdayMonth],
        ...organized[currentdayYear][firstdayMonth],
      ];
    }
  }

  const weekOrders = ordersArray.filter((order) => {
    var orderDate = new Date(order.OrdDatum);
    return orderDate.getTime() >= firstday.getTime();
  });

  return weekOrders;
}

/**
 *
 * @param {*} organized obj organized data into years and months
 * @param {*} year string optional
 * @returns [{},{}] if year provided the funtion returns and array of objects for that specific year, each object
 * contains month's name and orders total values in that month { month: 'jan', total: 5500, year: '2022' }
 * else the function will return the monthly value of every month in the database
 */
export function getMonthlySums(organized: VisitsOrganizedByYear) {
  const totalPerMonth = [];
  for (let [year, months] of Object.entries(organized)) {
    for (let [month, orders] of Object.entries(months)) {
      const obj = { month, total: orders.length, year };
      totalPerMonth.push(obj);
    }
  }
  totalPerMonth.sort(function (order1, order2) {
    if (order1.year > order2.year) return -1;
    if (order1.year < order2.year) return 1;

    if (months.indexOf(order1.month) < months.indexOf(order2.month)) return -1;
    if (months.indexOf(order2.month) > months.indexOf(order2.month)) return 1;
  });

  return totalPerMonth;
}

/**
 *
 * @param {*} organized {} An object with years and months nested objects
 * @param {*} year number That year of which the total sum will be calculated from
 * @returns number
 */
export function getSpecificYearOrMonthSum(
  organized: VisitsOrganizedByYear,
  year: string,
  month: string
) {
  let total = 0;
  if (year && month && organized[year] && organized[year][month]) {
    for (let order of Object.values(organized[year][month])) {
      total += 1;
    }
  } else {
    if (year && organized[year]) {
      for (let [month, orders] of Object.entries(organized[year])) {
        let tot = 0;
        for (let order of orders) {
          total += 1;
        }
        total += tot;
      }
    }
  }
  return Math.ceil(total);
}

function getBudget(seller, month, sellBudgets) {
  const arrIndex = sellBudgets.findIndex(
    (arr) => arr[0].toLowerCase() == seller.toLowerCase()
  );
  if (arrIndex == -1) return 0;
  const budgets = sellBudgets[arrIndex];
  const monthIndex = months.indexOf(month);
  const monthBudget = budgets[monthIndex + 1];
  return +monthBudget;
}

function getSellersSales(organizedOrders, sellersBudgets) {
  const output = [];
  const date = new Date();
  const currentYear = date.getFullYear();
  if (organizedOrders[currentYear]) {
    for (let [month, orders] of Object.entries(organizedOrders[currentYear])) {
      for (let order of orders) {
        const orderPrice = 1;
        const sellerIndex = output.findIndex((arr) => arr.name == order.VRef);
        if (sellerIndex > -1) {
          const monthIndex = output[sellerIndex].sales.findIndex(
            (el) => el.month == month
          );
          sellerIndex;
          monthIndex;
          if (monthIndex > -1) {
            output[sellerIndex].sales[monthIndex].sales += orderPrice;
          } else {
            output[sellerIndex].sales.push({
              month,
              sales: orderPrice,
              prevYearSales: 0,
              budget: getBudget(order.VRef, month, sellersBudgets),
            });
          }
        } else {
          output.push({
            name: order.VRef,
            sales: [
              {
                month,
                sales: orderPrice,
                prevYearSales: 0,
                budget: getBudget(order.VRef, month, sellersBudgets),
              },
            ],
          });
        }
      }
    }
  }
  if (organizedOrders[currentYear - 1]) {
    for (let [month, orders] of Object.entries(
      organizedOrders[currentYear - 1]
    )) {
      for (let order of orders) {
        const orderPrice = 1;
        const sellerIndex = output.findIndex((arr) => arr.name == order.VRef);
        if (sellerIndex > -1) {
          const monthIndex = output[sellerIndex].sales.findIndex(
            (el) => el.month == month
          );
          if (monthIndex > -1) {
            output[sellerIndex].sales[monthIndex].prevYearSales += orderPrice;
          } else {
            output[sellerIndex].sales.push({
              month,
              sales: 0,
              prevYearSales: orderPrice,
              budget: getBudget(order.VRef, month, sellersBudgets),
            });
          }
        } else {
          output.push({
            name: order.VRef,
            sales: [
              {
                month,
                sales: 0,
                prevYearSales: orderPrice,
                budget: getBudget(order.VRef, month, sellersBudgets),
              },
            ],
          });
        }
      }
    }
  }

  for (let sellerArray of output) {
    for (let month of months) {
      const index = sellerArray.sales.findIndex((arr) => arr.month == month);
      if (index == -1) {
        sellerArray.sales.push({
          month,
          sales: 0,
          prevYearSales: 0,
          budget: getBudget(sellerArray.name, month, sellersBudgets),
        });
      }
    }
  }

  for (let sellers of output) {
    for (let month of sellers.sales) {
      month.sales = Math.floor(month.sales);
    }
    sellers.sales.sort(function (order1, order2) {
      if (months.indexOf(order1.month) < months.indexOf(order2.month))
        return -1;
      if (months.indexOf(order2.month) > months.indexOf(order2.month)) return 1;
    });
  }

  return output;
}
// export function getSellersSales(organizedOrders, sellersBudgets) {
//   const output = {};
//   const date = new Date();
//   const currentYear = date.getFullYear();
//   if (organizedOrders[currentYear]) {
//     for (let [month, orders] of Object.entries(organizedOrders[currentYear])) {
//       for (let order of orders) {
//         const orderPrice = 1;
//         if (output[order.VRef]) {
//           const monthIndex = output[order.VRef].findIndex(
//             (el) => el.month == month
//           );
//           if (monthIndex > -1) {
//             output[order.VRef][monthIndex].sales += orderPrice;
//           } else {
//             output[order.VRef].push({
//               month,
//               sales: orderPrice,
//               prevYearSales: 0,
//               budget: getBudget(order.VRef, month, sellersBudgets),
//             });
//           }
//         } else {
//           output[order.VRef] = [
//             {
//               month,
//               sales: orderPrice,
//               prevYearSales: 0,
//               budget: getBudget(order.VRef, month, sellersBudgets),
//             },
//           ];
//         }
//       }
//     }
//   }
//   if (organizedOrders[currentYear - 1]) {
//     for (let [month, orders] of Object.entries(
//       organizedOrders[currentYear - 1]
//     )) {
//       for (let order of orders) {
//         const orderPrice = 1;
//         if (output[order.VRef]) {
//           const monthIndex = output[order.VRef].findIndex(
//             (el) => el.month == month
//           );
//           if (monthIndex > -1) {
//             output[order.VRef][monthIndex].prevYearSales += orderPrice;
//           } else {
//             output[order.VRef].push({
//               month,
//               sales: 0,
//               prevYearSales: orderPrice,
//               budget: getBudget(order.VRef, month, sellersBudgets),
//             });
//           }
//         } else {
//           output[order.VRef] = [
//             {
//               month,
//               sales: 0,
//               prevYearSales: orderPrice,
//               budget: getBudget(order.VRef, month, sellersBudgets),
//             },
//           ];
//         }
//       }
//     }
//   }

//   for (let [seller, array] of Object.entries(output)) {
//     for (let month of months) {
//       const index = output[seller].findIndex((arr) => arr.month == month);
//       if (index == -1) {
//         output[seller].push({
//           month,
//           sales: 0,
//           prevYearSales: 0,
//           budget: getBudget(seller, month, sellersBudgets),
//         });
//       }
//     }
//   }

//   for (let values of Object.values(output)) {
//     for (let obj of values) {
//       obj.sales = Math.floor(obj.sales);
//     }
//     values.sort(function (order1, order2) {
//       if (months.indexOf(order1.month) < months.indexOf(order2.month))
//         return -1;
//       if (months.indexOf(order2.month) > months.indexOf(order2.month)) return 1;
//     });
//   }
//   const array = [];
//   for (let [seller, arr] of Object.entries(output)) {
//     array.push({
//       name: seller,
//       sales: arr,
//     });
//   }
//   return array;
// }
