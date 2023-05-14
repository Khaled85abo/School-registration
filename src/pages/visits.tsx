import styled from "styled-components";
import { useState, useEffect } from "react";

// Fake data
import { fakeData } from "../../public/data";
// Components

// Blocks
import Header from "@/components/statistics/Header";
import VisitsList from "@/components/statistics/blocks/VisitsList";
import Status from "@/components/statistics/blocks/Status";

const Visits = () => {
  const refetchVisits = 3000000;

  const [data, setData] = useState<any>(null);
  const getVisits = async () => {
    try {
      const res = await fetch("api/visits");
      const resData = await res.json();
      if (resData.visits) {
        setData(resData.visits);
        console.log("data from backend: ", resData);
      }
    } catch (err) {
      console.log("Server is down!", err);
      console.log("fakeData: ", fakeData);
      setData(fakeData);
    }
  };

  useEffect(() => {
    getVisits();
    const interval = setInterval(() => {
      getVisits();
    }, refetchVisits);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledIndex>
      <Header title="Visits" />
      <div className="viewContainer">
        {data ? (
          <VisitsList visits={data} />
        ) : (
          <LoadingContainer>
            <h3>Loading...</h3>
          </LoadingContainer>
        )}
      </div>
    </StyledIndex>
  );
};

export default Visits;

const StyledIndex = styled.div`
  background: linear-gradient(109.8deg, #eceef2 0%, #f6f9f8 100%);
  font-family: "Arimo", sans-serif;
  .viewContainer {
    // height: 90vh;
    padding: 4vh;
  }
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;
const LoadingContainer = styled.div`
  height: 100%;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
