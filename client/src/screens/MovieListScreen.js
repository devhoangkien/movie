import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import emptyImg from "../assets/empty.svg";
import { deleteMovie, getMovieList } from "../redux/actions/movieActions";
import Loader from "../components/Loader";

const MovieListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: userLogin } = useSelector((state) => state.userLogin);
  const {
    movies,
    pages: totalPage,
    loading,
  } = useSelector((state) => state.movieList);
  const { success: deleteMovieSuccess } = useSelector(
    (state) => state.movieDelete
  );
  const [showModal, setShowModal] = React.useState(false);
  console.log(movies);
  useEffect(() => {
    if (!userLogin?.isAdmin) {
      navigate("/profile");
    } else {
      dispatch(getMovieList(""));
    }
  }, [dispatch, navigate, userLogin, deleteMovieSuccess]);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:space-y-0 space-y-3 sm:items-center sm:justify-between pb-3 border-b-2 mb-5">
        <h3 className="text-gray-800 text-2xl font-medium">Danh sách phim</h3>
        {loading && <Loader />}
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 transition-colors duration-300 flex items-center"
          onClick={() => navigate("/profile/movies/create")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          &nbsp;&nbsp; <span>Thêm phim</span>
        </button>
      </div>
      {movies?.length === 0 ? (
        <div className="space-y-10">
          <div className="flex justify-center items-center mt-20">
            <img src={emptyImg} width="250" height="250" alt="" />
          </div>
          <h4 className="text-center text-lg lg:text-xl text-gray-700">
            Xin lỗi, không tìm thấy phim
          </h4>
        </div>
      ) : (
        <div className="overflow-auto max-h-32rem mt-6">
          <motion.table
            exit={{ opacity: 0 }}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="table-auto border-collapse w-full "
          >
            <thead>
              <tr
                className="rounded-lg text-sm font-medium text-gray-700 text-left"
                style={{ backgroundColor: "#f8f8f8" }}
              >
                <th className="px-4 py-2 whitespace-nowrap">Picture</th>
                <th className="px-4 py-2 whitespace-nowrap">Name</th>
                {/* <th className='px-4 py-2 whitespace-nowrap'>Brand</th>
                <th className='px-4 py-2 whitespace-nowrap'>Category</th> */}
                <th className="px-4 py-2 whitespace-nowrap">Quốc gia</th>
                <th className="px-4 py-2 whitespace-nowrap">Tập</th>
                <th className="px-4 py-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal overflow-auto hover:overflow-scroll text-gray-700">
              {movies?.map((movie) => (
                <tr
                  className="hover:bg-gray-100 border-b border-gray-200 py-10"
                  key={movie._id}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={movie.image}
                      alt=""
                      className="w-10 h-10 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{movie.name}</td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {movie.country}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {movie.episode_list?.length}/{movie.total_episode}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button
                        className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() =>
                          navigate(`/profile/movies/${movie._id}/list`)
                        }
                      >
                        Tập
                      </button>
                      <button
                        className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() =>
                          navigate(`/profile/movies/${movie._id}/add`)
                        }
                      >
                        Thêm tập
                      </button>
                      <button
                        className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => navigate(`/profile/movies/${movie._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Bạn có chắc chắn muốn xóa phim này?"
                            )
                          ) {
                            dispatch(deleteMovie(movie?._id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      )}
    </>
  );
};

export default MovieListScreen;
