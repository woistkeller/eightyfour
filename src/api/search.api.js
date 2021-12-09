import axios from "axios";

const searchAPI = {
  search: async (username, token) => {
    return await axios
      .get(`https://eightyfourserver.herokuapp.com/search/${username}`, {
        headers: {
          authorization: token,
        },
      })
      .then((re) => {
        return { message: re.data.data, status: true };
      })
      .catch((er) => {
        return { message: er.response, status: false };
      });
  },
  rating: async (rating, user, token) => {
    return axios({
      method: "post",
      url: `https://eightyfourserver.herokuapp.com/rating/${rating}/${user}`,
      headers: {
        authorization: token,
      },
    })
      .then((re) => {
        if (re) return { message: re.data.data, status: true };
      })
      .catch((er) => {
        return { message: er.response, status: false };
      });
  },
};

export default searchAPI;
