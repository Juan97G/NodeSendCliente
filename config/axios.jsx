import axios from "axios";
import process from "../next.config";

const clienteAxios = axios.create({
   baseURL: process.env.backendURL
});

export default clienteAxios;
