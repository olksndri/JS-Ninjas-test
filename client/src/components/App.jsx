import { Routes, Route } from "react-router-dom";
import { Heroes } from "./Heroes";
import { NotFound } from "./NotFound";
import { Details } from "./Details";
import { SharedLayout } from "./SharedLayout";

// import { lazy } from "react";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Heroes />} />
          <Route path="details" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
