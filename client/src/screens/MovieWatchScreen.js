import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Meta, Rating, PlayerControl, FbComments } from "../components";
import Loader from "../components/Loader";
import { addToCart } from "../redux/actions/cartActions";
import axios from "axios";
import { FacebookProvider, Comments } from "react-facebook";

import {
  Player,
  PlaybackRateMenuButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";

import {
  createMovieReview,
  getMovieDetails,
  getEpisodeDetails,
} from "../redux/actions/movieActions";
// player

const MovieWatchScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const movieId = params.id;
  const episodeId = params.episodeId;

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.userLogin);
  const { success: reviewCreatedSuccess, loading: reviewCreatedLoading } =
    useSelector((state) => state.movieReviewCreate);
  useEffect(
    () => dispatch(getEpisodeDetails(movieId, episodeId)),
    [dispatch, movieId, episodeId, reviewCreatedSuccess]
  );
  //   useEffect(
  //     () => dispatch(getMovieDetails(movieId)),
  //     [dispatch, movieId, reviewCreatedSuccess]
  //   );
  //   const { movies } = useSelector((state) => state.episodeList);

  //   console.log(episodeId);
  //   console.log(movieId);
  //   console.log(movies);
  // get data by movieId
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    const getRepo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}`
        );
        console.log(res.data);
        const data = res.data;
        setRepo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRepo();
  }, [movieId]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createMovieReview(movieId, { rating, comment }));
  };
  const { movie, loading } = useSelector((state) => state.movieDetails);

  //   console.log(movie);

  //   const [sv1, setSv1] = useState(false);
  //   const [sv2, setSv2] = useState(true);
  const sources = {
    sv1: `${movie?.url_server1}`,
    sv2: `${movie?.url_server2}`,
  };
  const playMovie = {
    source: sources.sv1,
  };

  const [player, setPlayer] = useState(null);
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
      <Meta title={`${repo?.name} - Tập ${movie?.num_episode}`} />

      {reviewCreatedLoading && <Loader />}
      <Player ref={player} autoPlay>
        <source src={playMovie?.source} />

        <ControlBar>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={10} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton true />
        </ControlBar>
      </Player>
      <div className="mx-auto max-w-sm md:max-w-full">
        {/* <PlayerControl className="mx-auto max-w-sm md:max-w-full" /> */}
        <motion.div
          className="mx-auto max-w-sm md:max-w-full"
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
          <span className="text-md text-gray-500"></span>
          <h3 className="text-4xl md:text-5xl text-gray-700 mt-5 mb-3">
            {`${repo?.name} - Tập ${movie?.num_episode}`}
          </h3>
          <p>Danh sách tập</p>
          <div class="grid overflow-auto max-h-36 grid-cols-12 grid-cols-4 justify-center  ">
            {repo?.episode_list?.map((epi) => (
              <span
                onClick={() => navigate(`/watch/${movieId}/${epi._id}`)}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 episode "
                key={epi._id}
              >
                {epi.name}
              </span>
            ))}
          </div>
          <hr></hr>
        </motion.div>
      </div>
      <div className="mx-auto max-w-sm md:max-w-full">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <h3 className="font-bold">Bình luận</h3>
            <FacebookProvider appId="197692747997440">
              <Comments href={`https://www.facebook.com/${repo?._id}`} />
            </FacebookProvider>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Giới thiệu</h3>
            {repo?.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieWatchScreen;
