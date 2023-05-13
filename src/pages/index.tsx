import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Inter } from "next/font/google";
import { useMultistepForm } from "@/hooks/useMulitstepForm";
import backSvg from "@/assets/svg/back.svg";
import nextSvg from "@/assets/svg/next.svg";
import ChooseLocation from "@/components/forms/ChooseLocation";
import AddressForm from "@/components/forms/AddressForm";
import TeacherForm from "@/components/forms/TeacherForm";
import ClassForm from "@/components/forms/ClassForm";
import LoginForm from "@/components/forms/LoginForm";

export const CLASSES = {
  kinderGarden: "Kinder Garden",
  preSchool: "Pre-school",
  elementarySchool: "Elementary-school",
  intermediateSchool: "Intermediate-school",
  highSchool: "High-school",
} as const;

type ObjectType<T> = T[keyof T];
export type Class = ObjectType<typeof CLASSES>;

export type School = {
  name: string;
  email: string;
  phone: string;
};

export type Teacher = {
  name: string;
  email: string;
  phone: string;
};

export type Visit = {
  local: boolean | null;
  country: string;
  municipality?: string;
  classGrade: string;
  studentsCount: number;
  teachersCount: number;
  havePayedTour: boolean;
};
export type FormData = {
  country: string;
  municipality?: string;
  school: string;
  grade: Class;
  studentsCount: number;
  teachersCount: number;
  havePayedTour: boolean;
  teacher: string;
  phone?: string;
  email?: string;
  museumId: number | null;
};
const INITIAL_DATA: FormData = {
  country: "",
  school: "Test school",
  grade: CLASSES.kinderGarden,
  municipality: "Stockholm",
  studentsCount: 15,
  teachersCount: 3,
  havePayedTour: false,
  teacher: "Khaled Abo",
  phone: "0762440447",
  email: "",
  museumId: 12313,
};
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState(INITIAL_DATA);
  const [showLogin, setShowLogin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    step,
    goTo,
    back,
    next,
    currentStepIndex,
    isFirstStep,
    isLastStep,
  } = useMultistepForm([
    <ChooseLocation country={data.country} updateFields={updateFields} />,
    // data.local === true ? (
    //   <MunicipalityForm />
    // ) : data.local === false ? (
    //   <CountryForm country={data.country} updateFields={updateFields} />
    // ) : (
    //   <ChooseLocation local={data.local} updateFields={updateFields} />
    // ),
    <AddressForm
      country={data.country}
      municipality={data.municipality}
      updateFields={updateFields}
    />,
    <TeacherForm
      teacher={data.teacher}
      phone={data.phone}
      email={data.email}
      updateFields={updateFields}
    />,
    <ClassForm
      updateFields={updateFields}
      school={data.school}
      studentsCount={data.studentsCount}
      teachersCount={data.teachersCount}
      havePayedTour={data.havePayedTour}
      grade={data.grade}
    />,
  ]);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (currentStepIndex == steps.length - 1) {
      setDisabled(true);
      console.log("submitting Data to be saved: ", data);
      const res = await fetch("/api/register", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      goTo(0);
      setDisabled(false);
    } else {
      next();
    }
  }

  const toggleLgoinListner = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key == "l") {
      setShowLogin((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", toggleLgoinListner);

    return () => window.removeEventListener("keydown", toggleLgoinListner);
  }, []);

  if (showLogin) {
    return (
      <AppWrapper className="bg-img">
        <LoginForm />
      </AppWrapper>
    );
  }
  return (
    <AppWrapper className="bg-img">
      <form onSubmit={onSubmit}>
        {!isFirstStep && (
          <PageIndicator>
            {currentStepIndex + 1}/{steps.length}
          </PageIndicator>
        )}
        {step}

        <PrevButton>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              <Image src={backSvg} height="50" width={50} alt="backward" />
            </button>
          )}
        </PrevButton>
        <NextButton>
          {
            <button type="submit" disabled={!data.country || disabled}>
              {isLastStep ? (
                <span>Send</span>
              ) : (
                <Image src={nextSvg} height="50" width={50} alt="next" />
              )}
            </button>
          }
        </NextButton>
      </form>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  // border: 2px dotted red;
`;
const PageIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-weight: bold;
  // border: 2px solid lime;
`;

const NextButton = styled.div`
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  right: 0.5rem;
  background-color: none;
  button {
    background-color: none;
    border: none;
    border-radius: 8px;
  }
  span {
    border-radius: 8px;
    padding: 0.8rem 1rem;
    font-size: 22px;
    font-weight: bold;
    background-color: #fff;
  }
`;
const PrevButton = styled.div`
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  left: 0.5rem;
  button {
    border-radius: 8px;

    background-color: none;
    border: none;
  }
`;
