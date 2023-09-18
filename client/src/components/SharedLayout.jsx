import { Outlet } from "react-router-dom";
import css from "../styles/SharedLayout.module.css";

export const SharedLayout = () => {
  return (
    <>
      <header className={css.header}></header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
