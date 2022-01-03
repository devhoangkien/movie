import axios from "axios";
import toast from "react-hot-toast";
import {
  EPISODE_CREATE_FAIL,
  EPISODE_CREATE_REQUEST,
  EPISODE_CREATE_SUCCESS,
  EPISODE_DELETE_FAIL,
  EPISODE_DELETE_REQUEST,
  EPISODE_DELETE_SUCCESS,
  EPISODE_DETAILS_FAIL,
  EPISODE_DETAILS_REQUEST,
  EPISODE_DETAILS_SUCCESS,
  EPISODE_LIST_FAIL,
  EPISODE_LIST_REQUEST,
  EPISODE_LIST_SUCCESS,
  EPISODE_UPDATE_FAIL,
  EPISODE_UPDATE_REQUEST,
  EPISODE_UPDATE_SUCCESS,
} from "./types";

// GET ALL MOVIES ACTION
export const getEpisodeList = (id) => async (dispatch) => {
  try {
    dispatch({ type: EPISODE_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${id}`,
      config
    );
    dispatch({ type: EPISODE_LIST_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: EPISODE_LIST_FAIL, payload: error });
  }
};

// GET EPISODE DETAILS ACTION
export const getEpisodeDetails = (movieId, episodeId) => async (dispatch) => {
  try {
    dispatch({ type: EPISODE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}/${episodeId}`,
      config
    );
    dispatch({ type: EPISODE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: EPISODE_DETAILS_FAIL, payload: error });
  }
};

// CREATE EPISODE ACTION
export const createEpisode = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EPISODE_CREATE_REQUEST });
    const { user } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}/add`,
      config
    );
    dispatch({ type: EPISODE_CREATE_SUCCESS, payload: data });
    toast.success("Thêm tập thành công!");
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: EPISODE_CREATE_FAIL, payload: error });
  }
};

// UPDATE EPISODE ACTION
export const updateEpisode =
  (movieId, episodeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EPISODE_UPDATE_REQUEST });
      const { user } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}/${episodeId}`,
        config
      );

      dispatch({ type: EPISODE_UPDATE_SUCCESS });
      toast.success("Cập nhật phim thành công!");
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
      dispatch({ type: EPISODE_UPDATE_FAIL, payload: error });
    }
  };

// DELETE EPISODE ACTION
export const deleteEpisode =
  (movieId, episodeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EPISODE_DELETE_REQUEST });
      const { user } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}/${episodeId}`,
        config
      );

      dispatch({ type: EPISODE_DELETE_SUCCESS });
      toast.success("Xóa phim thành công!");
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
      dispatch({ type: EPISODE_DELETE_FAIL, payload: error });
    }
  };
