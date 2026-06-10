import api from "./api";

export const getLieux = () => api.get("/lieux");

export const createLieu = (data) =>
  api.post("/lieux", data);

export const deleteLieu = (id) =>
  api.delete(`/lieux/${id}`);

export const toggleFavorite = (id) => {
  return api.put(`/lieux/${id}/favorite`);
};