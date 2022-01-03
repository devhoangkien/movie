import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { addToCart } from "../../redux/actions/cartActions";
import Rating from "../Rating";

const MovieCard = ({ movie, i }) => {
  const dispatch = useDispatch();
  // console.log(movie);
  const fadeUp = {
    initial: { x: 30, opacity: 0 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className="flex flex-col justify-center mx-auto hover:shadow-xl border-2 border-dashed transition-shadow duration-500"
    >
      <Link to={`/movie/${movie?._id}`} className="flex-1">
        <span class="current-status bg-red-500 text-white	 ">
          Tập {movie?.episode_list.length}{" "}
        </span>

        <img
          className="h-64 img-movie w-80 object-cover mx-auto"
          src={movie?.image}
          alt=""
        />
      </Link>
      <div className="px-5 py-3">
        {/* <div className="flex justify-between items-center">
          <small className="text-gray-500">{movie?.category}</small>
          <Rating value={movie?.rating} />
        </div> */}
        <div className="flex justify-between items-center">
          <Link
            to={`/movie/${movie?._id}`}
            className="text-base text-gray-700 hover:underline flex-1"
          >
            {movie?.name}
          </Link>
        </div>
        <small className="text-gray-500">{movie?.name_en}</small>
      </div>
    </motion.div>
  );
};

export default MovieCard;
