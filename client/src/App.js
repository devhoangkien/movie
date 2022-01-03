import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import { Header, Footer } from "./components";
import Container from "./components/Container";
import {
  HomeScreen,
  LoginScreen,
  MovieScreen,
  RegisterScreen,
  UserActivationScreen,
  ProfileScreen,
  UserInfoScreen,
  ChangePasswordScreen,
  UserListScreen,
  UserEditScreen,
  MovieListScreen,
  MovieEditScreen,
  MovieCreateScreen,
  NotFoundScreen,
  EpisodeListScreen,
  EpisodeCreateScreen,
  EpisodeEditScreen,
  MovieWatchScreen,
  MovieByCountryScreen,
} from "./screens";

function App() {
  return (
    <Router>
      <Header />
      <Toaster
        position="top-left"
        reverseOrder={false}
        // toastOptions={{ style: { marginTop: '4.5rem' } }}
      />
      <main>
        <Container>
          <AnimatePresence exitBeforeEnter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/quoc-gia/:slugCountry"
                element={<MovieByCountryScreen />}
              />

              <Route path="search/:keyword" element={<HomeScreen />} />
              <Route path="movie/:id" element={<MovieScreen />} />
              <Route
                path="watch/:id/:episodeId"
                element={<MovieWatchScreen />}
              />

              <Route path="register" element={<RegisterScreen />} />
              <Route
                path="user/active/:token"
                element={<UserActivationScreen />}
              />
              <Route path="login" element={<LoginScreen />} />
              {/* Start Dashboard Routes */}
              <Route path="profile" element={<ProfileScreen />}>
                <Route path="/" element={<UserInfoScreen />} />
                <Route path="/users" element={<UserListScreen />} />
                <Route path="/users/:id" element={<UserEditScreen />} />
                <Route path="/movies" element={<MovieListScreen />} />
                <Route path="/movies/create" element={<MovieCreateScreen />} />
                <Route path="/movies/:id" element={<MovieEditScreen />} />
                <Route
                  path="/movies/:id/list"
                  element={<EpisodeListScreen />}
                />
                <Route
                  path="/movies/:id/add"
                  element={<EpisodeCreateScreen />}
                />
                <Route
                  path="/movies/:id/:episodeId"
                  element={<EpisodeEditScreen />}
                />
                <Route
                  path="/change-password"
                  element={<ChangePasswordScreen />}
                />
              </Route>
              {/* End Dashboard Routes */}
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </AnimatePresence>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
