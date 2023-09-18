import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { updateHeroById, addHero } from "../js/async";

const style = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

export const EditHeroMenu = ({
  open,
  onClose,
  onOpen,
  images,
  id,
  setIsLoading,
  setModalOpen,
  setPage,
  setHeroes,
  setLastPage,
  isItUpdate,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const nick = form.nickname.value.trim();
    const real = form.realname.value.trim();
    const deskr = form.description.value.trim();
    const superpwr = form.superpowers.value.trim();
    const catchPhr = form["catch_phrase"].value.trim();
    const imgLink = form["image_link"].value.trim();

    const bodyObj = {
      nickname: nick === "" ? undefined : nick,
      real_name: real === "" ? undefined : real,
      origin_description: deskr === "" ? undefined : deskr,
      superpowers: superpwr === "" ? undefined : superpwr,
      catch_phrase: catchPhr === "" ? undefined : catchPhr,
      images: imgLink === "" ? undefined : [...images, imgLink],
    };

    if (isItUpdate) {
      updateHeroById(id, bodyObj)
        .then((res) => {
          Notify.success(`${res.message}`, { timeout: 4000 });
          setIsLoading(true);
          setModalOpen(false);
        })
        .catch((e) => {
          Report.failure(
            `Error ${e.response.status}`,
            `${e.response.data.message}`,
            "Okay"
          );
        });
    } else {
      addHero(bodyObj)
        .then((res) => {
          Notify.success(`${res.message}`, { timeout: 4000 });
          setPage(1);
          setHeroes([]);
          setLastPage(false);
          setIsLoading(true);
          setModalOpen(false);
        })
        .catch((e) => {
          Report.failure(
            `Error ${e.response.status}`,
            `${e.response.data.message}`,
            "Okay"
          );
        });
    }
  };

  const btnText = isItUpdate ? "Edit info" : "Add hero";
  const modalTitle = isItUpdate ? "Edit info about hero" : "Add new hero";

  return (
    <>
      <Button variant="contained" onClick={onOpen}>
        {btnText}
      </Button>
      <Modal
        style={style}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: 700,
            height: 600,
            paddingBottom: "20px",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h2>{modalTitle}</h2>
          </Box>
          <form action="" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "30px",
                paddingTop: "10px",
                width: "100%",
              }}
            >
              <FormControl>
                <InputLabel htmlFor="nickname">Nickname</InputLabel>
                <Input id="nickname" name="nickname" />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="realname">Real name</InputLabel>
                <Input id="realname" name="realname" />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input id="description" name="description" multiline />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="superpowers">Superpowers</InputLabel>
                <Input id="superpowers" name="superpowers" multiline />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="catch_phrase">Catch phrase</InputLabel>
                <Input id="catch_phrase" name="catch_phrase" multiline />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="image_link">Image link</InputLabel>
                <Input id="image_link" name="image_link" multiline />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "20px",
                }}
              >
                <Button variant="contained" type="submit">
                  Confirm
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
