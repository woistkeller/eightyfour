import axios from "axios";

const spotifyAPI = {
  getSpotifyContent: (search) => {
    return axios
      .get("https://eightyfourserver.herokuapp.com/spotify", {
        headers: {
          "spotify-jwt-token": `${localStorage.getItem("spotify-jwt-token")}`,
        },
        params: {
          search: search,
        },
      })
      .then((response) => {
        localStorage.setItem(
          "spotify-jwt-token",
          response.data["spotify-jwt-token"]
        );

        return response.data.data;
      });
  },
};

export default spotifyAPI;
