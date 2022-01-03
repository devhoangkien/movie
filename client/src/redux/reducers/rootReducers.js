import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";

import {
  movieCreateReducer,
  movieDeleteReducer,
  movieDetailsReducer,
  movieListReducer,
  movieReviewCreateReducer,
  movieUpdateReducer,
  episodeDetailsReducer,
  episodeListReducer,
} from "./movieReducers";

import {
  userActivationReducer,
  userDeleteReducer,
  userDetailsReducer,
  userFacebookLoginReducer,
  userGoogleLoginReducer,
  userListReducer,
  userLoginReducer,
  userProfileDetailsReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userActivation: userActivationReducer,
  userGoogleLogin: userGoogleLoginReducer,
  userFacebookLogin: userFacebookLoginReducer,
  userProfileDetails: userProfileDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  movieCreate: movieCreateReducer,
  movieReviewCreate: movieReviewCreateReducer,
  movieUpdate: movieUpdateReducer,
  movieDelete: movieDeleteReducer,
  episodeList: episodeListReducer,
  episodeDetails: episodeDetailsReducer,
});
