import axios from "axios";

const registerAPI = {
  register: (username, password, bio, song) => {
    return axios
      .post("https://eightyfourserver.herokuapp.com/register", {
        username: username,
        password: password,
        bio: bio,
        song: song,
      })
      .then(() => {
        return { message: "registrered", status: true };
      })
      .catch((er) => {
        return { message: er.response.data.message, status: false };
      });
  },
};

export default registerAPI;
