import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-simple-restaurant.herokuapp.com",
});

export const apiImageUpload = axios.create({
  baseURL: "https://api.imgur.com",
});
