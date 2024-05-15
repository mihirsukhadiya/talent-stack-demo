import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/loader/Loader";
const UserDashboard = lazy(() => import("./screen/UserDashboard"));
const UserDetails = lazy(() => import("./screen/UserDetails"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/">
          <Route index={true} element={<UserDashboard />} />
          <Route path="userDetail">
            <Route
              index={true}
              element={<Navigate to={"/"} replace={true} />}
            />
            <Route path=":userId" element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
