import { PrismaClient } from "@prisma/client";
import {
  getMonthlySums,
  organizeByYear,
  months,
  getBarChart,
} from "../../../functions";
import { visits } from "../../assets/lists/visits";
import { NextApiRequest, NextApiResponse } from "next";
import { SingleVisit } from "..";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   try {
  //     res.send(visits);
  //   } catch (error) {
  //     res.send(error);
  //   }

  try {
    if (visits.length > 0) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = months[today.getMonth()];
      const allVisitsOrganized = organizeByYear(visits);
      const monthlyVisits = getMonthlySums(allVisitsOrganized);
      const thisYearVisitsSum = monthlyVisits
        .filter((sum) => Number(sum.year) == currentYear)
        .reduce((prev, curr) => prev + curr.total, 0);
      const lastYearVisitsSum = monthlyVisits
        .filter((sum) => Number(sum.year) == currentYear - 1)
        .reduce((prev, curr) => prev + curr.total, 0);
      const thisMonthVisitsSum = monthlyVisits.filter(
        (sum) => Number(sum.year) == currentYear && sum.month == currentMonth
      )[0].total;
      const thisMonthLastYearVisitsSum = monthlyVisits.filter(
        (sum) =>
          Number(sum.year) == currentYear - 1 && sum.month == currentMonth
      )[0].total;

      const barChart = getBarChart(allVisitsOrganized);
      return res.send({
        visits,
        monthlyVisits,
        organizedByYear: allVisitsOrganized,
        thisYearVisitsSum,
        thisMonthVisitsSum,
        thisMonthLastYearVisitsSum,
        lastYearVisitsSum,
        barChart,
      });
    } else {
      return res.send({ message: "No data in database." });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Something went wrong, please contact your admin",
    });
  }
}
