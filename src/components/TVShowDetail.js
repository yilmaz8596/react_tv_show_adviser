import styled from "styled-components";
import { Rating } from "./Rating";
export const TVShowDetail = ({ title, rating, subrating, description }) => {
  return (
    <Wrapper>
      <div className="row d-flex flex-column">
        <h1 className="title">{title}</h1>
        <div className="d-flex ">
          <Rating rating={rating} />
          <p className="subrating">{subrating} / 5</p>
        </div>
        <p className="description">{description}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .title {
    color: white;
    font-family: var(--font-one);
    font-size: calc(1rem + 0.6vw);
  }

  .subrating {
    color: white;
    font-family: var(--font-one);
    font-size: calc(0.7rem + 0.5vw);
    margin-top: 0.18rem;
    margin-left: 0.5rem;
  }

  .description {
    color: white;
    font-family: var(--font-two);
    font-size: calc(0.7rem + 0.5vw);
  }
`;
