import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Meta, Rating, PlayerControl } from "../components";
import Loader from "../components/Loader";

import {
  createMovieReview,
  getMovieDetails,
} from "../redux/actions/movieActions";
// player

const MovieScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const movieId = params.id;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.userLogin);
  const { success: reviewCreatedSuccess, loading: reviewCreatedLoading } =
    useSelector((state) => state.movieReviewCreate);
  useEffect(
    () => dispatch(getMovieDetails(movieId)),
    [dispatch, movieId, reviewCreatedSuccess]
  );

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(createMovieReview(movieId, { rating, comment }));
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch();
  };
  const { movie, loading } = useSelector((state) => state.movieDetails);

  // console.log(movie);

  return loading ? (
    <Loader />
  ) : (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-5 divide-y divide-gray-100"
    >
      <Meta title={movie?.name} />

      {reviewCreatedLoading && <Loader />}
      <div className="grid max-h-34  grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 ">
          <img src={movie?.image}></img>
        </div>
        <motion.div
          className="col-span-2"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.3,
                duration: 0.3,
                delay: 0.3,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-4xl md:text-5xl text-gray-700 mt-5 mb-3">
            {movie?.name}
          </h3>
          <p className=" text-gray-900 mt-5 mb-3">{movie?.name_en}</p>
          <div className="divide-y-2 divide-gray-100">
            <div className="flex items-center space-x-5">
              <Rating value={movie?.rating} />
            </div>
            <div className="flex md:flex-row flex-col md:items-center space-y-5 md:space-y-0 md:space-x-5 mt-10">
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 transition-colors duration-300 flex items-center"
                onClick={() =>
                  navigate(`/watch/${movieId}/${movie?.episode_list[0]._id}`)
                }
              >
                &nbsp;&nbsp; <span>Xem phim</span>
              </button>
            </div>
            <div className=" items-center  mt-5 pt-5 mb-7">
              <p className="text-gray-900">
                <span className="text-gray-900 font-bold"> Trạng thái:</span>{" "}
                Tập
                {movie?.episode_list?.length}/{movie?.total_episode}
              </p>
              <p className="text-gray-900">
                <span className="text-gray-900 font-bold">Thể loại: </span>
                {movie?.category}
              </p>
              <p className="text-gray-900">
                <span className="text-gray-900 font-bold"> Quốc gia:</span>{" "}
                {movie?.country}
              </p>
              <p className="text-gray-900">
                <span className="text-gray-900 font-bold"> Năm phát hành:</span>{" "}
                {movie?.year}
              </p>
              <p className="text-gray-900">
                <span className="text-gray-900 font-bold">Diễn viên: </span>{" "}
                {movie?.cast}
              </p>
            </div>
          </div>
          <span className="text-gray-900 font-bold">Nội dung phim</span>
          <p className="text-gray-900 prose">{movie?.description}</p>
        </motion.div>
      </div>

      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-5 mx-auto max-w-sm md:max-w-full"
      ></motion.div>
    </motion.div>
  );
};

export default MovieScreen;
