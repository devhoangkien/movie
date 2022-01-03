import mongoose from "mongoose";
import URLSlug from "mongoose-slug-generator";

mongoose.plugin(URLSlug);
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg",
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const episode_listSchema = new mongoose.Schema(
  {
    movie_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
    },
    num_episode: { type: Number, required: true },
    url_server1: { type: String, required: true },
    url_server2: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    name_en: { type: String, required: true },
    image: { type: String, required: true },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    year: { type: Number, required: true },
    country: { type: String, required: true },
    slug: { type: String, slug: "name" },
    slugCountry: { type: String, slug: "country" },
    slugCategory: { type: String, slug: "category" },
    cast: { type: String, required: true },
    tags: { type: String },
    reviews: [reviewSchema],
    total_episode: { type: String, required: true, default: "N.A" },
    episode_list: [episode_listSchema],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
