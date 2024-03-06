import axios from "axios";
import md5 from "md5";

const data = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const hash = md5(`Valantis_${data}`);

const instans = axios.create({
  baseURL: `https://api.valantis.store:41000/`,
  headers: {
    "X-Auth": hash,
  },
});

export default instans;
