import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import {
  getEpisodeDetails,
  updateEpisode,
} from "../redux/actions/movieActions";

const EpisodeEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params.id;
  const episodeId = params.episodeId;
  const [disableEdit, setDisableEdit] = useState(true);

  const { user: userLogin } = useSelector((state) => state.userLogin);
  const { movie, loading } = useSelector((state) => state.movieDetails);
  const { success: movieUpdateSuccess } = useSelector(
    (state) => state.movieUpdate
  );

  const [name, setName] = useState("");
  const [num_episode, setNumberEpisode] = useState("");
  const [url_server1, setUrlServer1] = useState("");
  const [url_server2, setUrlServer2] = useState("");
  // console.log(movieId);
  // console.log(episodeId);
  // console.log(movie);

  useEffect(() => {
    if (!userLogin || !userLogin?.isAdmin) {
      navigate("/profile");
    } else {
      dispatch(getEpisodeDetails(movieId, episodeId));
    }
  }, [dispatch, movieId, episodeId, userLogin, navigate, movieUpdateSuccess]);

  useEffect(() => {
    if (movie) {
      setName(movie.name);
      setNumberEpisode(movie.num_episode);
      setUrlServer1(movie.url_server1);
      setUrlServer2(movie.url_server2);
    }
  }, [movie]);

  // Submit form handler

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateEpisode(movieId, episodeId, movie?._id, {
        name,
        num_episode,
        url_server1,
        url_server2,
      })
    );
    setDisableEdit(true);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-between pb-3 border-b-2 mb-5">
        <h3 className="text-gray-800 text-xl font-medium">Chi tiết phim</h3>
        {disableEdit && (
          <button
            className="text-purple-900 transition-colors duration-300 flex items-center"
            onClick={() => setDisableEdit(!disableEdit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            &nbsp; <span>Edit</span>
          </button>
        )}
      </div>

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
                  disabled={disableEdit}
                  id="name"
                  name="name"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                  type="text"
                  value={name}
                  placeholder="Nhập tên phim..."
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
                  disabled={disableEdit}
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
                  disabled={disableEdit}
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
                disabled={disableEdit}
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

          {!disableEdit && (
            <div className="flex items-center space-x-5">
              <button
                type="button"
                className="rounded-md border-2 px-5 py-2 text-gray-700 font-light hover:bg-gray-50 transition-colors duration-300"
                onClick={() => setDisableEdit(true)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default EpisodeEditScreen;
