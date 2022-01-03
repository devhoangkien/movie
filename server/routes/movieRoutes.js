import express from "express";
import {
  createMovie,
  createMovieReview,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisodes,
  getEpisodeById,
  getMovieByCountry,
  // getMovieBySlug,
  // getMovieByCountry,
} from "../controllers/movieController.js";
import { admin, protect } from "../middleware/auth.js";
const router = express.Router();

router.route("/").get(getMovies);
router.route("/quoc-gia/:slugCountry").get(getMovieByCountry);

router.route("/create").post(protect, admin, createMovie);
router
  .route("/:movieId")
  .get(getMovieById)
  .post(protect, createMovieReview)
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);
router.route("/:movieId/add").post(protect, admin, createEpisode);
router.route("/:movieId/list").get(getEpisodes);
router
  .route("/:movieId/:episodeId")
  .get(getEpisodeById)
  .put(protect, admin, updateEpisode)
  .delete(protect, admin, deleteEpisode);

export default router;
