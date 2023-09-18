import { Link, useLocation } from "react-router-dom";
import { DeleteBtn } from "./DeleteBtn";
import css from "../styles/HeroesList.module.css";

export const HeroesList = ({ list, deleteHandler }) => {
  const location = useLocation();
  const backLink = location.state?.from ?? "/";

  return (
    <ul className={css["heroes_list"]}>
      {list.map((hero) => {
        return (
          <li key={hero["_id"]} data-id={hero["_id"]}>
            <img src={hero.images[0]} alt="Hero" className={css["hero_img"]} />
            <div className={css["descr_wrap"]}>
              <div>
                <p className={css["hero_nickname"]}>{hero.nickname}</p>
                <Link
                  to="details"
                  className={css["details_link"]}
                  state={{ from: backLink, id: hero["_id"] }}
                >
                  Details
                </Link>
              </div>
              <DeleteBtn deleteHandler={deleteHandler} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
