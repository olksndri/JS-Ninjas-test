import axios from "axios";

const prefs = {
  baseUrl: "http://127.0.0.1:3300/api/heroes",
};

const getHeroes = async (page, limit) => {
  const res = await axios.get(`${prefs.baseUrl}?limit=${limit}&page=${page}`);
  return res.data;
};

const getHeroById = async (id) => {
  const res = await axios.get(`${prefs.baseUrl}/${id}`);
  return res.data;
};

const updateHeroById = async (id, obj) => {
  const res = await axios.patch(`${prefs.baseUrl}/${id}`, obj);
  return res.data;
};

const addHero = async (obj) => {
  const res = await axios.post(`${prefs.baseUrl}`, obj);
  return res.data;
};

const deleteHeroById = async (id) => {
  const res = await axios.delete(`${prefs.baseUrl}/${id}`);
  return res.data;
};
export { getHeroes, getHeroById, updateHeroById, addHero, deleteHeroById };
