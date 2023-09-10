import axios from "axios";

const API_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export class TVShowAPI {
  static async fetchPopular() {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    );
    return response;
  }

  static async fetchRecommended(tvShowId = 4057) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?language=en-US&page=1`,
      options
    );
    return response;
  }

  static async fetchByTitle(title) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${title}&include_adult=false&language=en-US&page=1`,
      options
    );
    return response;
  }
}
