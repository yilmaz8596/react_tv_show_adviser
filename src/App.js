import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show-api";
import { TVShowDetail } from "./components/TVShowDetail";
import { TVShowListItem } from "./components/TVShowListItem";
import { Logo } from "./components/Logo";
import search from "./assets/search.png";
import styled from "styled-components";

const BASE_URL = "https://image.tmdb.org/t/p/original";
function App() {
  const [recommendedTVShows, setRecommendedTVShows] = useState([]);
  const [currentTVShow, setCurrentTVShow] = useState();
  const [searchedShow, setSearchedShow] = useState([]);
  const fetchPopularShows = async () => {
    try {
      const response = await TVShowAPI.fetchPopular();
      if (response) {
        setCurrentTVShow(response.data.results[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRecommendedShows = async (tvShowId) => {
    try {
      const response = await TVShowAPI.fetchRecommended(tvShowId);
      if (response) {
        setRecommendedTVShows(response.data.results);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchShowsByTitle = async (title) => {
    try {
      const response = await TVShowAPI.fetchByTitle(title);
      if (response) {
        setSearchedShow(response.data.results[0]);
        setCurrentTVShow(response.data.results[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      fetchShowsByTitle(e.target.value);
    }
  };

  useEffect(() => {
    fetchRecommendedShows(searchedShow?.id);
  }, [searchedShow?.id]);

  useEffect(() => {
    fetchPopularShows();
  }, []);

  const rating = (currentTVShow?.vote_average / 2).toFixed(1);

  const handleTVShowClick = (tvShow) => {
    setCurrentTVShow(tvShow);
  };

  return (
    <Wrapper>
      <div
        className="container-fluid main_container"
        style={{
          background: currentTVShow
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
            : "black",
        }}
      >
        <div className="header d-flex">
          <div className="col-sm-3 col-md-4">
            <div className="logo ">
              <Logo />
            </div>
            <p className="subtitle">Discover a show you may like!</p>
          </div>
          <div className="input_container col-sm-3 col-md-4 mt-5">
            <input
              type="text"
              className="input "
              placeholder="Search a show..."
              onKeyUp={submit}
            />
            <img src={search} alt="search" className="search" />
          </div>
        </div>
        <div className="tv_show_details">
          {currentTVShow && (
            <TVShowDetail
              title={currentTVShow?.original_name}
              description={currentTVShow?.overview}
              rating={rating}
              subrating={rating}
            />
          )}
        </div>
        <div className="recommendations d-flex">
          {currentTVShow &&
            recommendedTVShows
              .slice(0, 10)

              .map((show, index) => (
                <TVShowListItem
                  tvShow={show}
                  key={index}
                  onClick={handleTVShowClick}
                />
              ))}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .main_container {
    height: 100vh;
    padding: 25px;
    background-color: black;
    display: flex;
    flex-direction: column;
  }

  .header {
    flex: 2;
  }

  .subtitle {
    margin-top: -1rem;
  }

  .logo,
  .subtitle {
    color: white;
  }

  .input {
    width: 100%;
    padding-left: 40px;
    padding-botton: 30px;
    border-radius: 30px;
    background-color: #d9d9d96e;
    color: white;
    font-weight: 100;
    font-size: 20px;
    border-color: transparent;
  }

  .input::focus {
    outline-width: 0;
    border: 1px solid white;
  }

  .input::placeholder {
    font-family: var(--font-one);
    color: rgb(194, 194, 194);
  }

  .input_container {
    position: relative;
  }

  .tv_show_details {
    flex: 4;
    color: white;
  }

  .search {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 20px;
    height: 20px;
    color: rgb(194, 194, 194);
  }
  .recommendations:hover {
    overflow-x: overlay;
  }

  .recommendations {
    flex: 2;
    color: white;
    overflow-x: hidden;
    padding-bottom: 30px;
  }

  @media screen and (max-width: 576px) {
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .input_container {
      margin-bottom: 3rem;
      margin-top: -3rem;
    }
  }
`;

export default App;
