import axios from "axios";
import toast from "react-hot-toast";
import {
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_RESET,
  MOVIE_CREATE_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_REVIEW_CREATE_FAIL,
  MOVIE_REVIEW_CREATE_REQUEST,
  MOVIE_REVIEW_CREATE_SUCCESS,
  MOVIE_UPDATE_FAIL,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_SUCCESS,
} from "./types";

// GET ALL MOVIES ACTION
export const getMovieList =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_LIST_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/movies?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({ type: MOVIE_LIST_SUCCESS, payload: data });
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
      dispatch({ type: MOVIE_LIST_FAIL, payload: error });
    }
  };

// GET MOVIE DETAILS ACTION
export const getMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${id}`,
      config
    );
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_DETAILS_FAIL, payload: error });
  }
};

// GET MOVIE DETAILS ACTION
export const getMovieEpisode = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${id}/list`,
      config
    );
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_DETAILS_FAIL, payload: error });
  }
};
export const deleteEpisode =
  (movieId, episodeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: MOVIE_DELETE_REQUEST });
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

      dispatch({ type: MOVIE_DELETE_SUCCESS });
      toast.success("Xóa phim thành công!");
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
      dispatch({ type: MOVIE_DELETE_FAIL, payload: error });
    }
  };

// Create MOVIE ACTION
export const createMovie = (movieData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_CREATE_REQUEST });
    const { user } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/create`,
      movieData,
      config
    );
    dispatch({ type: MOVIE_CREATE_SUCCESS, payload: data });
    toast.success("Thêm phim thành công!");
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_CREATE_FAIL, payload: error });
  }
};

// Create MOVIE ACTION
export const createMovieReview =
  (movieId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: MOVIE_REVIEW_CREATE_REQUEST });
      const { user } = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}`,
        review,
        config
      );
      dispatch({ type: MOVIE_REVIEW_CREATE_SUCCESS, payload: data });
      toast.success("Đánh giá thành công!");
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
      dispatch({ type: MOVIE_REVIEW_CREATE_FAIL, payload: error });
    }
  };

// Update MOVIE ACTION
export const updateMovie = (id, movieData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_UPDATE_REQUEST });
    const { user } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${id}`,
      movieData,
      config
    );

    dispatch({ type: MOVIE_UPDATE_SUCCESS });
    toast.success("Cập nhật phim thành công!");
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_UPDATE_FAIL, payload: error });
  }
};

// Delete MOVIE ACTION
export const deleteMovie = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_DELETE_REQUEST });
    const { user } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${id}`,
      config
    );

    dispatch({ type: MOVIE_DELETE_SUCCESS });
    toast.success("Xóa phim thành công!");
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_DELETE_FAIL, payload: error });
  }
};

export const createEpisode = (id, movieData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOVIE_UPDATE_REQUEST });
    const { user } = getState().userLogin;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${id}/add`,
      movieData,
      config
    );

    dispatch({ type: MOVIE_CREATE_RESET });
    toast.success("Thêm tập thành công!");
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_CREATE_FAIL, payload: error });
  }
};

// UPDATE EPISODE ACTION
export const updateEpisode =
  (movieId, episodeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: MOVIE_UPDATE_REQUEST });
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

      dispatch({ type: MOVIE_UPDATE_SUCCESS });
      toast.success("Cập nhật phim thành công!");
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
      dispatch({ type: MOVIE_UPDATE_FAIL, payload: error });
    }
  };

export const getEpisodeDetails = (movieId, episodeId) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}/${episodeId}`,
      config
    );
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_DETAILS_FAIL, payload: error });
  }
};

export const getMovieByCountry = (slugCountry) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/movies/quoc-gia/${slugCountry}`,
      config
    );
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: MOVIE_DETAILS_FAIL, payload: error });
  }
};
