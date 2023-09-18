import { useEffect, useState } from "react";
import { LoadMoreBtn } from "./LoadMoreBtn";
import { HeroesList } from "./HeroesList";
import { EditHero } from "./EditHero";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { deleteHeroById, getHeroes } from "../js/async";
import css from "../styles/Heroes.module.css";

export const Heroes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const openHandler = () => setModalOpen(true);
  const closeHandler = () => setModalOpen(false);

  useEffect(() => {
    if (isLoading) {
      getHeroes(page, 5)
        .then((res) => {
          setHeroes([...heroes, ...res]);
        })
        .catch((e) => setErr(e))
        .finally(setIsLoading(false));

      getHeroes(page + 1, 5)
        .then((res) => {
          if (res.length === 0) {
            setLastPage(true);
          }
        })
        .catch((e) => setErr(e));
    }
  }, [isLoading, heroes, err, page, lastPage]);

  const onLoad = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const deleteHandler = (evt) => {
    const listItem = evt.currentTarget.parentNode.parentNode;
    const id = listItem.dataset.id;

    deleteHeroById(id)
      .then(() => {
        Notify.success(`Hero deleted!`, { timeout: 4000 });
        setHeroes(heroes.filter((el) => el["_id"] !== id));
      })
      .catch((e) => {
        Report.failure(
          `Error ${e.response.status}`,
          `${e.response.data.message}`,
          "Okay"
        );
      });
  };

  return (
    <>
      <div className={css["list_wrap"]}>
        {!err && <HeroesList list={heroes} deleteHandler={deleteHandler} />}
        <div className={css["btn_wrap"]}>
          {!err && !lastPage && <LoadMoreBtn onLoad={onLoad} />}
          {!err && (
            <EditHero
              open={modalOpen}
              onClose={closeHandler}
              onOpen={openHandler}
              images={[]}
              id="0"
              setIsLoading={setIsLoading}
              setModalOpen={setModalOpen}
              setPage={setPage}
              setHeroes={setHeroes}
              setLastPage={setLastPage}
              isItUpdate={false}
            />
          )}
        </div>
        {err && <div>{err.message}</div>}
      </div>
    </>
  );
};
