import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactPaginate from "react-paginate";

import MovieCard from "../components/Card/MovieCard";
import Loader from "../components/Loader";
import { getMovieList, getMovieByCountry } from "../redux/actions/movieActions";
import { Meta, Slider } from "../components";

const MovieByCountryScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword || "";
  const slugCountry = params.slugCountry;
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);
  const {
    movies,
    pages: totalPage,
    loading,
  } = useSelector((state) => state.movieList);
  const { success: movieCreated } = useSelector((state) => state.movieCreate);

  useEffect(() => {
    dispatch(getMovieList(keyword, pageNumber));
  }, [dispatch, movieCreated, pageNumber, keyword]);

  useEffect(() => {
    if (!totalPage) {
      setPages((page) => page);
    } else {
      setPages(totalPage);
    }
  }, [totalPage]);

  const pageHandler = (page) => {
    setPageNumber(Number(page.selected + 1));
  };

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      {loading && <Loader />}
      <Meta />
      <Slider />
      <motion.h1
        className="text-3xl font-semibold text-gray-700 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Phim mới nhất
      </motion.h1>

      <motion.div
        // variants={stagger}
        layout="position"
        className="grid gap-10 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
      >
        {movies?.map((movie, i) => (
          <MovieCard key={movie?._id} {...{ movie, i }} />
        ))}
      </motion.div>
      {pages > 1 && (
        <div className="text-center">
          <div className="bg-gray-100  my-12 px-3 py-3 inline-block rounded-md">
            <ReactPaginate
              previousLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 px-4 box-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              }
              nextLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 px-4 box-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              }
              pageCount={pages}
              onPageChange={pageHandler}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              containerClassName={"text-lg flex space-x-3"}
              previousLinkClassName={"outline-none rounded-md"}
              pageLinkClassName={"px-4 outline-none"}
              nextLinkClassName={"outline-none rounded-md"}
              activeClassName={"bg-gray-50 border text-indigo-600"}
              disabledClassName={"opacity-20"}
              breakLabel={"..."}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MovieByCountryScreen;
