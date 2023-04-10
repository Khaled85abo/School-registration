import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { Inter } from "next/font/google";
import AddressForm from "@/components/AddressForm";
import TeacherForm from "@/components/TeacherForm";
import ClassForm from "@/components/ClassForm";
import ChooseLocation from "@/components/ChooseLocation";
import { useMultistepForm } from "@/hooks/useMulitstepForm";
import backSvg from "@/assets/svg/back.svg";
import nextSvg from "@/assets/svg/next.svg";

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
  country: string | null;
  municipality?: string;
  school: string;
  classGrade: Class | null;
  studentsCount: number;
  teachersCount: number;
  havePayedTour: boolean;
  fullName: string;
  phone?: string;
  email?: string;
};
const INITIAL_DATA: FormData = {
  country: null,
  school: "Test school",
  classGrade: null,
  municipality: "Stockholm",
  studentsCount: 15,
  teachersCount: 3,
  havePayedTour: false,
  fullName: "Khaled Abo",
  phone: "0762440447",
  email: "",
};
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState(INITIAL_DATA);

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
      fullName={data.fullName}
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
      classGrade={data.classGrade}
    />,
  ]);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (currentStepIndex == steps.length - 1) {
      console.log("submitting Data to be saved: ", data);
    } else {
      next();
    }
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
            <button type="submit" disabled={data.country == null}>
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
