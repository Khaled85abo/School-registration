import styled from "styled-components";
import { useState, useEffect } from "react";

// Fake data
import { fakeData } from "../../public/data";
// Components
import Header from "@/components/Header/Header";

// Blocks
import Orders from "@/components/blocks/Orders/Orders";
import Sales from "@/components/blocks/Sales/Sales";
import SalesRef from "@/components/blocks/SalesRef/SalesRef";
import SalesCapstone from "@/components/blocks/SalesCapstone/SalesCapstone";
import Budget from "@/components/blocks/Budget/Budget";
const Statistics = () => {
  const [view, setView] = useState(1);
  const [numberOfViews, setNumberOfViews] = useState(4);
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
      title = "Orders";
      break;
    case 2:
      title = "Sales";
      break;
    case 3:
      title = "Sales REF";
      break;
    case 4:
      title = "Sales Capstone";
      break;
    default:
      title = data?.sellersMonthlySales[view - 5]?.name;
  }

  return (
    <StyledIndex>
      <Header title={title} view={view} />
      <div className="viewContainer">
        {data ? (
          <>
            {view === 1 && <Orders data={data.ref} />}
            {view === 2 && <Sales view={view} data={data.allOrders} />}
            {view === 3 && <SalesRef view={view} data={data.ref} />}
            {view === 4 && <SalesCapstone view={view} data={data.capstone} />}
            {view > 4 && (
              <Budget
                view={view}
                data={data.allOrders}
                seller={data.sellersMonthlySales[view - 5]}
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
  .viewContainer {
    height: 90vh;
    padding: 4vh;
  }
`;
const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
