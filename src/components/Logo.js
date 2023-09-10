import logo from "../assets/tv.png";
import styled from "styled-components";
export const Logo = () => {
  return (
    <Wrapper>
      <div className="row">
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" />
          <p>Watchwise</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 40px;
    height: 40px;
  }
  p {
    color: white;
    font-family: var(--font-one);
    font-size: calc(1rem + 0.6vw);
    margin-top: 1.5rem;
    margin-left: 0.3rem;
  }
`;
