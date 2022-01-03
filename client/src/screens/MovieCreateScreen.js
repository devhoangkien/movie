import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import { createMovie } from "../redux/actions/movieActions";
import { MOVIE_CREATE_RESET } from "../redux/actions/types";

const MovieCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const { user: userLogin } = useSelector((state) => state.userLogin);
  const { success: movieCreateSuccess, loading: movieCreateLoading } =
    useSelector((state) => state.movieCreate);

  const [name, setName] = useState("");
  const [total_episode, setTotalEpisode] = useState("");
  const [image, setImage] = useState(
    "https://icon-library.com/images/upload-image-icon/upload-image-icon-14.jpg"
  );
  const [name_en, setNameEn] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [cast, setCast] = useState("");
  useEffect(() => {
    dispatch({ type: MOVIE_CREATE_RESET });
    if (!userLogin || !userLogin?.isAdmin) {
      navigate("/profile");
    } else {
      if (movieCreateSuccess) {
        navigate("/");
        dispatch({ type: MOVIE_CREATE_RESET });
      }
    }
  }, [dispatch, userLogin, navigate, movieCreateSuccess]);

  // Upload Avatar Handler

  const handleMovieImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("movie", file);

    try {
      setUploading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload/movie`,
        formData,
        config
      );
      setImage(data.url);
      setUploading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Submit form handler

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createMovie({
        name,
        name_en,
        year,
        country,
        cast,
        total_episode,
        description,
        image,
        category,
      })
    );
  };

  return (
    <>
      {(uploading || movieCreateLoading) && <Loader />}

      <h3 className="text-gray-800 text-xl font-medium pb-3 border-b-2 mb-5">
        Thêm phim mới
      </h3>

      <div className="max-w-lg">
        <form className="space-y-3" {...{ onSubmit }}>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
            <div className="relative w-24 h-24 rounded-xl img-container overflow-hidden border-2 border-gray-200 border-dashed">
              <div className="absolute top-0 left-0 w-full h-full img-overlay"></div>
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover block"
              />
              <label
                htmlFor="upload-movie"
                className="flex justify-center w-full upload-btn text-white h-1/3 absolute -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm"
                style={{ color: "#fff !important" }}
              >
                Chọn ảnh
                <input
                  type="file"
                  id="upload-movie"
                  name="movie"
                  className="opacity-0 cursor-pointer absolute top-0 left-0"
                  onChange={handleMovieImage}
                />
              </label>
            </div>
            <div className="flex-1">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-2"
              >
                Tên phim
              </label>
              <div className="flex">
                <input
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
            <div className="flex-1">
              <label
                htmlFor="name_en"
                className="font-semibold text-gray-700 block pb-2"
              >
                Tên phim khác
              </label>
              <div className="flex">
                <input
                  id="name_en"
                  name="name_en"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                  type="text"
                  value={name_en}
                  placeholder="Tên phim khác (The Avengers)"
                  onChange={(e) => setNameEn(e.target.value)}
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
                Số tập
              </label>
              <div className="flex">
                <input
                  id="episode"
                  name="episode"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                  type="text"
                  value={total_episode}
                  placeholder="Nhập số tập..."
                  onChange={(e) => setTotalEpisode(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="font-semibold text-gray-700 block pb-2"
              >
                Thể loại
              </label>
              <div className="flex">
                <input
                  id="category"
                  name="category"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200"
                  type="text"
                  value={category}
                  placeholder="Thể loại"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5">
            <div className="w-full">
              <label
                htmlFor="year"
                className="font-semibold text-gray-700 block pb-2"
              >
                Năm sản xuất
              </label>
              <div className="flex">
                <input
                  id="year"
                  name="year"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                  type="text"
                  value={year}
                  placeholder="Năm sản xuất..."
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="country"
                className="font-semibold text-gray-700 block pb-2"
              >
                Quốc gia
              </label>
              <div className="flex">
                <input
                  id="country"
                  name="country"
                  className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200"
                  type="text"
                  value={country}
                  placeholder="Quốc gia"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="cast"
              className="font-semibold text-gray-700 block pb-2"
            >
              Diễn viên
            </label>
            <div className="flex">
              <input
                id="cast"
                name="cast"
                className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300"
                type="text"
                value={cast}
                placeholder="Tên diễn viên..."
                onChange={(e) => setCast(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="description"
              className="font-semibold text-gray-700 block pb-2"
            >
              Mô tả
            </label>
            <div className="flex">
              <textarea
                className="text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200"
                rows={5}
                placeholder="Nhập mô tả phim..."
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
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

export default MovieCreateScreen;
