import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import {
  createEpisode,
  updateMovie,
  getMovieDetails,
} from "../redux/actions/movieActions";
import { MOVIE_CREATE_RESET } from "../redux/actions/types";

const EpisodeCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params.id;

  const { user: userLogin } = useSelector((state) => state.userLogin);
  const { movie, loading } = useSelector((state) => state.movieDetails);

  const { success: movieCreateSuccess, loading: movieCreateLoading } =
    useSelector((state) => state.movieCreate);

  const [name, setName] = useState("");
  const [num_episode, setNumberEpisode] = useState("");
  const [url_server1, setUrlServer1] = useState("");
  const [url_server2, setUrlServer2] = useState("");
  console.log(movie);
  useEffect(() => {
    if (!userLogin || !userLogin?.isAdmin) {
      navigate("/profile");
    } else {
      dispatch(getMovieDetails(movieId));
      if (movieCreateSuccess) {
        navigate("/");
        dispatch({ type: MOVIE_CREATE_RESET });
      }
    }
  }, [dispatch, movieId, userLogin, navigate, movieCreateSuccess]);

  // Submit form handler

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createEpisode(movieId, { name, num_episode, url_server1, url_server2 })
    );
  };

  return (
    <>
      {movieCreateLoading && <Loader />}

      <h3 className="text-gray-800 text-xl font-medium pb-3 border-b-2 mb-5">
        Thêm tập mới
      </h3>

      <div className="max-w-lg">
        <form className="space-y-3" {...{ onSubmit }}>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-2"
              >
                Tên tập
              </label>
              <div className="flex">
                <input
                  id="name"
                  name="name"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                  type="text"
                  value={name}
                  placeholder="Nhập tên tập..."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5">
            <div className="w-full">
              <label
                htmlFor="episode"
                className="font-semibold text-gray-700 block pb-2"
              >
                Tập
              </label>
              <div className="flex">
                <input
                  id="episode"
                  name="episode"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                  type="text"
                  value={num_episode}
                  placeholder="Nhập số tập..."
                  onChange={(e) => setNumberEpisode(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="server1"
                className="font-semibold text-gray-700 block pb-2"
              >
                Url Server 1
              </label>
              <div className="flex">
                <input
                  id="server1"
                  name="server1"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200"
                  type="text"
                  value={url_server1}
                  placeholder="Url server 1..."
                  onChange={(e) => setUrlServer1(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="url_server2"
              className="font-semibold text-gray-700 block pb-2"
            >
              Url Server 2
            </label>
            <div className="flex">
              <input
                id="url_server2"
                name="url_server2"
                className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                type="text"
                value={url_server2}
                placeholder="Tên diễn viên..."
                onChange={(e) => setUrlServer2(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300"
          >
            Lưu
          </button>
        </form>
      </div>
    </>
  );
};

export default EpisodeCreateScreen;
