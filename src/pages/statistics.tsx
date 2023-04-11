import styled from "styled-components";
import { useState, useEffect } from "react";

// Fake data
import { fakeData } from "../../public/data";
// Components

// Blocks
import Header from "@/components/statistics/Header";
import VisitsList from "@/components/statistics/blocks/VisitsList";
import Status from "@/components/statistics/blocks/Status";

const Statistics = () => {
  const [view, setView] = useState(2);
  const [numberOfViews, setNumberOfViews] = useState(2);
  // Change view time here
  // const changeViewTime = 5000;
  const changeViewTime = 3000000;
  const getBackendOrders = 10 * 60 * 1000;

  const changeView = () => {
    setView((view) => view + 1);
    if (view >= numberOfViews) {
      setView(1);
    }
  };

  const [data, setData] = useState<any>(null);
  const getOrders = async () => {
    try {
      const res = await fetch("api/orders");
      const resData = await res.json();
      if (resData.message) {
        throw new Error();
      }
      setNumberOfViews(4 + resData.sellersMonthlySales?.length);
      console.log("data from backend: ", resData);
      setData(resData);
    } catch (err) {
      console.log("Server is down!", err);
      setNumberOfViews(4 + fakeData.sellersMonthlySales?.length);
      console.log("fakeData: ", fakeData);
      setData(fakeData);
    }
  };

  useEffect(() => {
    getOrders();
  }, [view]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeView();
    }, changeViewTime);
    return () => clearInterval(interval);
  }, [numberOfViews, view]);

  var title;
  switch (view) {
    case 1:
      title = "Visits";
      break;
    default:
      title = "Statistics";
  }

  return (
    <StyledIndex>
      <Header title={title} view={view} />
      <div className="viewContainer">
        {data ? (
          <>
            {view === 1 && <VisitsList data={data.ref} />}
            {view === 2 && (
              <Status
                view={view}
                data={data.allOrders}
                seller={data.sellersMonthlySales[view - 1]}
              />
            )}
          </>
        ) : (
          <LoadingContainer>
            <h3>Loading...</h3>
          </LoadingContainer>
        )}
      </div>
    </StyledIndex>
  );
};

export default Statistics;

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
  display: flex;
  justify-content: center;
  align-items: center;
`;
