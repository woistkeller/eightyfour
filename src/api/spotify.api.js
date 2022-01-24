import axios from "axios";

const spotifyAPI = {
  getSpotifyContent: (search) => {
    return axios
      .get(`https://eightyfourserver.herokuapp.com/spotify/${search}`, {
        headers: {
          "spotify-jwt-token": `${localStorage.getItem("spotify-jwt-token")}`,
        },
      })
      .then((response) => {
        localStorage.setItem(
          "spotify-jwt-token",
          response.data["spotify-jwt-token"]
        );

        return response.data.data;
      })
      .catch(() => {
        return "error";
      });
  },
};

export default spotifyAPI;
