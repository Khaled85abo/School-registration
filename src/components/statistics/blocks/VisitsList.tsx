import styled from "styled-components";
import { getRelativeDateIntl } from "@/utils/relativeTime";
import { DatabaseSingleVisit, SingleVisit } from "@/pages";

const VisitsList = ({ visits }: { visits: DatabaseSingleVisit[] }) => {
  console.log("visits from visitslist: ", visits);

  return (
    <StyledVisits>
      <div className="visitsContainer">
        <div className="innerContainer">
          {visits.map((visit: DatabaseSingleVisit, index: any) => {
            const {
              createdAt,
              grade,
              school,
              teacher,
              phone,
              country,
              municipality,
            } = visit;

            return (
              <div className="visit" key={index}>
                <div className="date">
                  {getRelativeDateIntl(new Date(createdAt))}
                </div>
                <div>{country}</div>
                <div>{municipality}</div>
                <div className="name">
                  <span className="bold">{grade}</span>
                </div>
                <div className="name">
                  <span className="bold">{school}</span>
                </div>

                <div>
                  <p>Name: {teacher}</p>
                  <p>Phone: {phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StyledVisits>
  );
};

const StyledVisits = styled.div`
  // height: calc(90vh - 8vh);
  margin-top: 4vh;

  .visitsContainer {
    height: fit-content;
    padding: 5px 100px;
    padding-bottom: 63px;
  }

  .visit {
    background: linear-gradient(
      101.88deg,
      rgba(255, 255, 255, 0.76) 0%,
      rgba(253, 253, 253, 0.76) 100.21%
    );
    width: 100%;
    margin-bottom: 35px;
    padding: 1.8vh 3%;
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 20% 20%;
    align-items: center;
    border-radius: 3vh;

    &:last-child {
      margin-bottom: 0;
    }

    div {
      font-size: 1.9vh;
      letter-spacing: -0.005em;
    }

    .bold {
      font-weight: 600;
    }

    .name {
      padding-right: 35px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333333;
    }

    .date {
      font-size: 1.9vh;
    }

    .currency {
      font-size: 1.3vh;
    }
  }
`;

export default VisitsList;
