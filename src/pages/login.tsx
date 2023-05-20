import AccountForm from "@/components/forms/LoginForm";
import { Class, SingleVisit } from ".";

const countries = [
  "Finland",
  "Norway",
  "Germany",
  "Netherland",
  "England",
  "Spain",
  "Italy",
  "Greece",
  "France",
  "Ukraine",
];
const classes = [
  "Kinder Garden",
  "Pre-school",
  "Elementary-school",
  "Intermediate-school",
  "High-school",
];
const schools = [
  "Björkebyskolan",
  "Capellaskolan",
  "Carlssons skola",
  "Distra IRS",
  "Ebba Braheskolan",
  "Ekens skola",
  "Eklidens skola",
  "Engelbrektsskolan",
  "Europaskolan",
  "Glömstaskolan",
  "Grimstaskolan",
];
const municipalities = [
  "Stockholm",
  "Sollentuna",
  "Täby",
  "Solna",
  "Huddinge",
  "Botkyrka",
  "Södertälje",
  "Nacka",
  "Sundbyberg",
  "Lidingö",
  "Värmdö",
  "Järfälla",
  "Tyresö",
  "Salem",
  "Haninge",
  "Sigtuna",
  "Upplands Väsby",
  "Vallentuna",
  "Österåker",
  "Nykvarn",
  "Danderyd",
  "Ekerö",
  "Upplands-Bro",
];
const Login = () => {
  const allVisits: SingleVisit[] = [];

  const singleVisit = {
    country: "",
    school: "Test school",
    grade: "kinderGarden",
    municipality: "Stockholm",
    studentsCount: 15,
    teachersCount: 3,
    havePayedTour: false,
    teacher: "Johan Jonsson",
    phone: "0762344549",
    email: "",
    museumId: 12313,
    testCreateAt: "",
  };
  const thisYear = new Date();
  const prevYear = thisYear.getFullYear() - 1;
  const prevYearDate = new Date(`12-01-${prevYear}`);
  for (let month = 0; month < 12; month++) {
    // create visit for this year

    for (let i = 0; i < 500; i++) {
      const newInitialVisit = { ...singleVisit };
      const countryRandom = Math.floor(Math.random() * 10);
      const gradeRandom = Math.floor(Math.random() * 5);
      const schoolRandom = Math.floor(Math.random() * 10);
      const municipaltyRandom = Math.floor(Math.random() * 22);
      newInitialVisit.country = "Sweden";
      newInitialVisit.municipality = municipalities[municipaltyRandom];
      if (countryRandom === 4) {
        newInitialVisit.country = countries[countryRandom];
        newInitialVisit.municipality = "";
      }
      if (countryRandom === 1) {
        newInitialVisit.havePayedTour = true;
      }

      const visit = {
        ...newInitialVisit,
        testCreateAt: new Date(thisYear.setMonth(month)),
        grade: classes[gradeRandom] as Class,
        school: schools[schoolRandom],
      };
      allVisits.push(visit);
    }
    // create visit for previous year
    for (let i = 0; i < 400; i++) {
      const newInitialVisit = { ...singleVisit };
      const countryRandom = Math.floor(Math.random() * 10);
      const gradeRandom = Math.floor(Math.random() * 5);
      const schoolRandom = Math.floor(Math.random() * 10);
      const municipaltyRandom = Math.floor(Math.random() * 22);
      newInitialVisit.country = "Sweden";
      newInitialVisit.municipality = municipalities[municipaltyRandom];
      if (countryRandom === 4) {
        newInitialVisit.country = countries[countryRandom];
        newInitialVisit.municipality = "";
      }
      if (countryRandom === 1) {
        newInitialVisit.havePayedTour = true;
      }

      const visit = {
        ...newInitialVisit,
        testCreateAt: new Date(prevYearDate.setMonth(month)),
        grade: classes[gradeRandom] as Class,
        school: schools[schoolRandom],
      };
      allVisits.push(visit);
    }
  }

  console.log(allVisits);
  return <AccountForm closeLogin={() => {}} />;
};

export default Login;
