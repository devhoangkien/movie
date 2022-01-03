import asyncHandler from "express-async-handler";
import Movie from "../models/Movie.js";

// Get All Movies
export const getMovies = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Movie.countDocuments({ ...keyword });
  const movies = await Movie.find({ ...keyword })
    // .sort([["slug", "desc"]])
    .sort([["updatedAt", "desc"]])
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ movies, page, pages: Math.ceil(count / pageSize) });
});

// Get Movie By ID
export const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  res.json(movie);
});

// Get Movie By slug
export const getMovieBySlug = asyncHandler(async (req, res) => {
  const movie = await Movie.findOne({ slug: req.params.slug });
  res.json(movie);
});

// Create Movie
export const createMovie = asyncHandler(async (req, res) => {
  const {
    name,
    name_en,
    year,
    country,
    cast,
    description,
    total_episode,
    image,
    category,
    slug,
    slugCountry,
    slugCategory,
  } = req.body;

  const movie = new Movie({
    user: req.user._id,
    name,
    name_en,
    slug,
    image,
    year,
    slugCountry,
    country,
    cast,
    category,
    slugCategory,
    description,
    total_episode,
  });

  const createdMovie = await movie.save();

  res.status(201).json(createdMovie);
});

// Update movie
export const updateMovie = asyncHandler(async (req, res) => {
  const {
    name,
    name_en,
    year,
    country,
    cast,
    slug,
    slugCountry,
    slugCategory,
    description,
    total_episode,
    image,
    category,
  } = req.body;

  const movie = await Movie.findById(req.params.movieId);

  if (movie) {
    movie.slug = slug;

    movie.slugCountry = slugCountry;
    movie.slugCategory = slugCategory;
    movie.name = name;
    movie.description = description;
    movie.total_episode = total_episode;
    movie.name_en = name_en;
    movie.year = year;
    movie.country = country;
    movie.cast = cast;
    movie.image = image;
    movie.category = category;

    const updatedMovie = await movie.save();

    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy phim.");
  }
});

// Get  episode By ID
export const getEpisodeById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  const episodes = movie.episode_list.find(
    (episode) => episode._id == req.params.episodeId
  );
  if (movie) {
    res.json(episodes);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy.");
  }
});

// Get  list episode By ID movie
export const getEpisodes = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  if (movie) {
    res.json(
      movie.episode_list.sort((a, b) => a.episode_number - b.episode_number)
    );
  } else {
    res.status(404);
    throw new Error("Không tìm thấy.");
  }
});

// export const getMovieByCountry = asyncHandler(async (req, res) => {
//   const movie = await Movie.findOne({ slug: slug });
//   if (movie) {
//     res.json(
//       movie.episode_list.sort((a, b) => a.episode_number - b.episode_number)
//     );
//   } else {
//     res.status(404);
//     throw new Error("Không tìm thấy.");
//   }
// });

// Create Movie Episode
export const createEpisode = asyncHandler(async (req, res) => {
  const { name, movie_id, num_episode, url_server1, url_server2 } = req.body;
  const movie = await Movie.findById(req.params.movieId);

  if (movie) {
    const episode = {
      name,
      movie_id: req.params.movieId,
      num_episode,
      url_server1,
      url_server2,
      user: req.user._id,
    };

    movie.episode_list.push(episode);
    const createEpisode = await movie.save();
    res.status(201).json({ createEpisode });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy phim.");
  }
});

// Create movie review
export const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Phim đã được đánh giá!");
    }
    console.log(req.user);

    const review = {
      name: `${req.user.firstName} ${req.user.lastName && req.user.lastName}`,
      avatar: req.user.avatar,
      comment,
      rating: Number(rating),
      user: req.user._id,
    };

    movie.reviews.push(review);

    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();
    res.status(201).json({ message: "Đã đánh giá." });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy phim.");
  }
});

// Delete Movie episode
export const deleteEpisode = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  const episode = movie.episode_list.find((r) => r._id == req.params.episodeId);
  if (episode) {
    movie.episode_list.remove(episode);
    const deleteEpisode = await movie.save();
    res.status(201).json({ deleteEpisode });
    movie.save();
    res.status(201).json({ message: "Đã xoá." });
  } else {
    res.status(400);
    throw new Error("Không tìm thấy phim.");
  }
});

// update Movie Episode
export const updateEpisode = asyncHandler(async (req, res) => {
  const { name, num_episode, url_server1, url_server2 } = req.body;
  const movie = await Movie.findById(req.params.movieId);
  const episode = movie.episode_list.find((r) => r._id == req.params.episodeId);

  if (episode) {
    episode.name = name;
    episode.num_episode = num_episode;
    episode.url_server1 = url_server1;
    episode.url_server2 = url_server2;
    await movie.save();
    res.status(201).json({ episode });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy phim.");
  }
});

// Delete Movie
export const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  if (movie) {
    await movie.remove();
    res.status(201).json({ message: "Đã xoá." });
  } else {
    res.status(400);
    throw new Error("Không tìm thấy phim.");
  }
});

export const getMovieByCountry = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const movie = await Movie.find({ slugCountry: req.params.slugCountry })
    .sort([["updatedAt", "desc"]])
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  const count = await Movie.countDocuments(req.params.slugCountry);

  res.json({ movie, page, pages: Math.ceil(count / pageSize) });
});
