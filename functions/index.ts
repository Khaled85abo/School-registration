import { SingleVisit } from "@/pages";
export type VisitsOrganizedByYear = Record<
  string,
  Record<string, SingleVisit[]>
>;

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

export function getBarChart(organized: VisitsOrganizedByYear) {
  const output = [];
  const date = new Date();
  const currentYear = date.getFullYear();
  if (organized[currentYear]) {
    for (let [month, visits] of Object.entries(organized[currentYear])) {
      const obj = {
        month,
        totalVisits: visits.length,
        internationalVisits: visits.filter(
          (visit) =>
            visit.country.toLocaleLowerCase() !== "Sweden".toLocaleLowerCase()
        ).length,
        prevYearVisits: 0,
      };
      output.push(obj);
    }
  }
  if (organized[currentYear - 1]) {
    for (let [month, visits] of Object.entries(organized[currentYear - 1])) {
      const prevYearVisits = month.length;
      const monthIndex = output.findIndex((obj) => obj.month == month);
      if (monthIndex > -1) {
        output[monthIndex].prevYearVisits = prevYearVisits;
      } else {
        output.push({
          month,
          totalVisits: 0,
          internationalVisits: 0,
          prevYearVisits: prevYearVisits,
        });
      }
      // for (let visit of visits) {
      //   const orderPrice = 1;
      //    const monthIndex = output[sellerIndex].sales.findIndex(
      //      (el) => el.month == month
      //    );
      //   if (monthIndex > -1) {
      //     const monthIndex = output[sellerIndex].sales.findIndex(
      //       (el) => el.month == month
      //     );
      //     if (monthIndex > -1) {
      //       output[sellerIndex].sales[monthIndex].prevYearSales += orderPrice;
      //     } else {
      //       output[sellerIndex].sales.push({
      //         month,
      //         sales: 0,
      //         prevYearSales: orderPrice,
      //         budget: getBudget(order.VRef, month, sellersBudgets),
      //       });
      //     }
      //   } else {
      //     output.push({
      //       month,
      //       totalVisits: 0,
      //       internationalVisits: 0,
      //       prevYearVisits: 0,
      //     });
      //   }
      // }
    }
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
