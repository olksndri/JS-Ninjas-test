import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHeroById } from "../js/async";
import { MyGallery } from "./ImageGallery";
import { EditHero } from "./EditHero";
import css from "../styles/Details.module.css";

export const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState({});
  const [err, setErr] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      getHeroById(location.state.id)
        .then((res) => {
          setHero(res);
        })
        .catch((e) => setErr(e))
        .finally(setIsLoading(false));
    }
  }, [isLoading, err, hero, location.state.id]);

  const openHandler = () => setModalOpen(true);
  const closeHandler = () => setModalOpen(false);

  const images = !hero.images ? [] : hero.images;

  return (
    <div className={css["details_wrap"]}>
      <div className={css["content_wrap"]}>
        <MyGallery
          images={images}
          id={hero["_id"]}
          setIsLoading={setIsLoading}
        />
        <h1 className={css.nickname}>{hero.nickname}</h1>
        <h2 className={css["real_name"]}>{hero["real_name"]}</h2>
        <p className={css.description}>
          Description: {hero["origin_description"]}
        </p>
        <p className={css["superpowers"]}>
          Superpowers: {hero?.superpowers ?? ""}
        </p>
        <p>Catch phrase: {hero["catch_phrase"]}</p>
        <Link to={location.state.from} className={css["back_link"]}>
          Go back
        </Link>
      </div>
      <div className={css["edit_menu_wrap"]}>
        <EditHero
          open={modalOpen}
          onClose={closeHandler}
          onOpen={openHandler}
          images={hero["images"]}
          setIsLoading={setIsLoading}
          setModalOpen={setModalOpen}
          id={hero["_id"]}
          isItUpdate={true}
        />
      </div>
    </div>
  );
};
