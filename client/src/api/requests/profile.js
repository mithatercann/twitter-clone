import axios from "axios";
import * as url from "../urls";

export const getAllProfiles = (token) => {
  return axios({
    method: "GET",
    url: url.GET_ALL_PROFILES,
    headers: {
      token: token,
    },
  })
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};

export const getProfileById = (token, profileId) => {
  return axios({
    method: "GET",
    url: url.GET_PROFILE_ID + profileId,
    headers: {
      token: token,
    },
  })
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};

export const getProfileByUsername = (username) => {
  return axios
    .get(url.GET_PROFILE_USERNAME + username)
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};

export const followById = (token, userId) => {
  return axios({
    method: "POST",
    url: url.FOLLOW_ID + userId,
    headers: {
      token: token,
    },
  })
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};

export const followByUsername = (token, username) => {
  return axios({
    method: "POST",
    url: url.FOLLOW_NAME + username,
    headers: {
      token: token,
    },
  })
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};

export const unFollowId = (token, userId) => {
  return axios({
    method: "POST",
    url: url.UNFOLLOW_ID + userId,
    headers: {
      token: token,
    },
  })
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};

export const unFollowUsername = (token, username) => {
  return axios({
    method: "PATCH",
    url: url.UNFOLLOW_NAME + username,
    headers: {
      token: token,
    },
  })
    .then((result) => {
      return { type: "success", data: result.data };
    })
    .catch((err) => {
      return { type: "error", data: err.response.data.errors };
    });
};
