import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Meta, NavLink } from "../components";
import Loader from "../components/Loader";

import {
  getUserProfileDetails,
  userProfileUpdate,
} from "../redux/actions/userActions";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const { user: userLogin } = useSelector((state) => state.userLogin);
  const { user, loading } = useSelector((state) => state.userProfileDetails);

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getUserProfileDetails("profile"));
      }
    }
  }, [navigate, userLogin, user, dispatch]);

  const handleAvatar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("avatar", file);

    try {
      setUploading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload/avatar`,
        formData,
        config
      );
      dispatch(userProfileUpdate({ avatar: data.url }));
      setUploading(false);
    } catch (err) {}
  };

  const stagger = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid gap-10 lg:grid-cols-7"
    >
      {(loading || uploading) && <Loader />}
      <Meta title={`${user?.firstName} ${user?.lastName} || Profile`} />
      <div className="lg:col-span-2">
        <div className="shadow-lg p-5 space-y-8 max-w-xl lg:max-w-full mx-auto">
          <div className="text-center space-y-3">
            <div className="relative w-24 mx-auto h-24 rounded-full img-container overflow-hidden ">
              <div className="absolute top-0 left-0 w-full h-full img-overlay"></div>
              <img
                src={user?.avatar}
                alt=""
                className="w-full h-full object-cover block"
              />
              <label
                htmlFor="upload-avatar"
                className="w-full upload-btn text-white h-1/3 absolute -bottom-full transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm"
              >
                change
                <input
                  type="file"
                  id="upload-avatar"
                  name="avatar"
                  className="opacity-0 cursor-pointer absolute top-0 left-0"
                  onChange={handleAvatar}
                />
              </label>
            </div>
            <div>
              <div>
                <h2 className="text-2xl font-medium text-gray-600 relative inline-block">
                  {user?.firstName} {user?.lastName}
                  {user?.isAdmin && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </h2>
              </div>
              <a
                href={`mailto:${user?.email}`}
                className="text-sm font-light text-gray-400 hover:underline"
              >
                {user?.email}
              </a>
            </div>
          </div>
          <motion.div
            exit={{ opacity: 0 }}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <NavLink
              to="/profile"
              activeClassName="border-l-4 border-gray-900"
              inactiveClassName="border-l-4 border-transparent"
              className="px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light"
            >
              <div className="flex items-center space-x-5">
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
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                <span>Thông tin tài khoản</span>
              </div>
            </NavLink>
            {/* <NavLink
              to="/profile/address"
              activeClassName="border-l-4 border-gray-900"
              inactiveClassName="border-l-4 border-transparent"
              className="px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light"
            >
              <div className="flex items-center space-x-5">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Địa chỉ</span>
              </div>
            </NavLink> */}
            {user?.isAdmin && (
              <>
                <NavLink
                  to="/profile/users"
                  activeClassName="border-l-4 border-gray-900"
                  inactiveClassName="border-l-4 border-transparent"
                  className="px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light"
                >
                  <div className="flex items-center space-x-5">
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>Danh sách User</span>
                  </div>
                </NavLink>
                <NavLink
                  to="/profile/movies"
                  activeClassName="border-l-4 border-gray-900"
                  inactiveClassName="border-l-4 border-transparent"
                  className="px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light"
                >
                  <div className="flex items-center space-x-5">
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
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                    <span>Danh sách phim</span>
                  </div>
                </NavLink>
              </>
            )}

            <NavLink
              to="/profile/change-password"
              activeClassName="border-l-4 border-gray-900"
              inactiveClassName="border-l-4 border-transparent"
              className="px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light"
            >
              <div className="flex items-center space-x-5">
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                <span>Đổi mật khẩu</span>
              </div>
            </NavLink>
          </motion.div>
        </div>
      </div>
      <div className="lg:col-span-5 overflow-x-auto">
        <div className="shadow-lg p-8 max-w-xl lg:max-w-full mx-auto">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileScreen;
