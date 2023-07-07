import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:8000/api/user';
// const BASE_URL='http://localhost:5000/api/user';
const BASE_URL='https://shoppy.shop-api.onrender.com/api/user';
// const BASE_URL1="http://localhost:5000/api/product"
const BASE_URL1='https://shoppy.shop-api.onrender.com/api/product';

export default axios.create({
    withCredentials:true,
    baseURL:BASE_URL,
    headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials':true ,'Content-Type': 'application/json'}
})

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Tpye':'application/json'},
    withCredentials:true
})
export const axiosFetch=axios.create({
    baseURL:BASE_URL1,
    withCredentials:true,
    headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials':true ,'Content-Type': 'application/json'}
})






