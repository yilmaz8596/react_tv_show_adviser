import styled from "styled-components";
const SMALL_IMG_URL = "https://image.tmdb.org/t/p/w300";
export const TVShowListItem = ({ onClick, tvShow }) => {
  const onClick_ = () => {
    onClick(tvShow);
  };
  return (
    <Wrapper>
      <div className="container" onClick={onClick_}>
        <img
          src={SMALL_IMG_URL + tvShow?.backdrop_path}
          alt="tv_show_name"
          className="img"
        />
        <div className="title">{tvShow?.name}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    margin-right: 20px;
    position: relative;
    overflow-x: hidden;
  }

  .title {
    position: absolute;
    margin-top: -40px;
    height: 40px;
    width: 300px;
    padding-left: 20px;
    padding-top: 8px;
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  img {
    border-radius: 10px;
  }
`;
