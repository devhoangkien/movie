import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import logo from "../assets/anafiya_logo.webp";
import useMenuHandler from "../hooks/useMenuHandler";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const innerRef = useMenuHandler(() => {
    setIsOpen(false);
    setOpenMenu(false);
  });
  const { user } = useSelector(({ userLogin }) => userLogin);

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div class="bg-gray-100 pt-5">
        <div class="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div class="p-5">
            <h3 class="font-bold text-xl text-indigo-600">Componentity</h3>
          </div>
          <div class="p-5">
            <div class="text-sm uppercase text-indigo-600 font-bold">
              Phim hay
            </div>
          </div>
          <div class="p-5">
            <div class="text-sm uppercase text-indigo-600 font-bold">Anime</div>
          </div>
          <div class="p-5">
            <div class="text-sm uppercase text-indigo-600 font-bold">
              Mọt phim
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 pt-2">
        <div
          class="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center"
        >
          <div class="md:flex-auto md:flex-row-reverse mt-2 flex-row flex"></div>
          <div class="my-5">© Copyright 2021. All Rights Reserved.</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
