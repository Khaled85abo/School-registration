"use client";
import Image from "next/image";
import styled from "styled-components";
import sweden from "../assets/svg/sweden.svg";
import world from "../assets/svg/world.svg";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/windowWidth";

type Location = {
  country: string | null;
};

type ChooseLocationProps = Location & {
  updateFields: (fields: Location) => void;
};
const ChooseLocation = ({ country, updateFields }: ChooseLocationProps) => {
  const [active, setActive] = useState<number>(0);
  const windowSize = useWindowSize();

  return (
    <>
      <StyledApp>
        <StyledButton
          className={active === 1 || country === "World" ? "active" : ""}
          onClick={() => {
            setActive((active: number) => (active = 1));
            updateFields({ country: "World" });
          }}>
          <Image src={world} alt="World map" width={windowSize.width / 5} />
        </StyledButton>
        <StyledButton
          className={active === 2 || country === "Sweden" ? "active" : ""}
          onClick={() => {
            setActive((active: number) => (active = 2));
            updateFields({ country: "Sweden" });
          }}>
          <Image src={sweden} alt="Sweden" width={windowSize.width / 12} />
        </StyledButton>
      </StyledApp>
    </>
  );
};

export default ChooseLocation;
const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 2px dotted yellow;
`;

const StyledButton = styled.div`
  display: grid;
  place-items: center;
  -webkit-transform: scale(1.25);
  margin: 6vw;
  width: 22vw;
  //   height: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  line-height: 2.6;
  font-size: 24px;
  color: #e1dada;
  // text-shadow: 0px -1px 1px rgba(0, 0, 0, 0.2);
  // text-decoration: none;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #f4f4f4),
    color-stop(100%, #5f584a)
  );
  background-image: -moz-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #f4f4f4),
    color-stop(100%, #5f584a)
  );

  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25), 10px 10px 15px #e3e3e3,
    -10px 10px 15px #e3e3e3, -15px -15px 15px rgba(255, 255, 255, 0.4),
    15px -15px 15px rgba(255, 255, 255, 0.4), inset 0px 2px 0px #fff;

  -webkit-transition: box-shadow 0.3s ease-in-out,
    background-image 0.3s ease-in-out, text-shadow 0.5s linear,
    color 0.5s linear;
  -moz-transition: box-shadow 0.3s ease-in-out,
    background-image 0.3s ease-in-out, text-shadow 0.5s linear,
    color 0.5s linear;

  &.active {
    color: #00d0b0;
    text-shadow: 0px 0px 7px lighten(#00d07f, 20%);

    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #e3e3e3),
      color-stop(100%, #f4f4f4)
    );
    background-image: -moz-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #e3e3e3),
      color-stop(100%, #f4f4f4)
    );

    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15),
      10px 10px 15px rgba(255, 255, 255, 0.4),
      -10px 10px 15px rgba(255, 255, 255, 0.4), -10px -10px 15px #e3e3e3,
      10px -10px 15px #e3e3e3, inset 0px -3px 0px rgba(255, 255, 255, 0.4),
      inset 0px 3px 3px rgba(0, 0, 0, 0.04);
  }
`;
