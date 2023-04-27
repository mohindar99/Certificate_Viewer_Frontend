import { BaseUrl } from "./Config";
import axios from "axios";
const token = localStorage.getItem("token");

export const getCertDetails = async (id) => {
  const res = await axios.get(
    `${BaseUrl}certificate/certificate-detail?id=${id}`,
    {
      headers: {
        authentication: `${token}`,
      },
    }
  );
  return res;
};
export const fontMaster = async (dataFont) => {
  const res = await axios.post(
    `${BaseUrl}font-master/list`,
    {
      ...dataFont,
    },
    {
      headers: {
        authentication: `${token}`,
      },
    }
  );
  return res;
};
