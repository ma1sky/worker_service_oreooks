import axios from "axios";
import { ORIOKS_LINK } from "../config/env.config";
import { createTokenHeader } from "../utils/schedule";

export const createApi = (token: string) => {
  return axios.create({
    baseURL: ORIOKS_LINK,
    headers: {
      Accept: "application/json",
      Authorization: createTokenHeader(token),
      "User-Agent": "Oreooks-bot/1.0 Windows 11"
    }
  });
};