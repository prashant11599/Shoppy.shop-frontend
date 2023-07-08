import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:8000/api/user';
// const BASE_URL='http://localhost:5000/api/user';
export const APP_DOMAIN='https://shoppy-shop-api.onrender.com';
const BASE_URL=`${APP_DOMAIN}/api/user`;
// const BASE_URL1="http://localhost:5000/api/products"
const BASE_URL1=`${APP_DOMAIN}/api/products`;

export default axios.create({
    withCredentials:true,
    baseURL:BASE_URL,
    headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials':true ,'Content-Type': 'application/json'}
})

export const axiosPrivate=axios.create({
    withCredentials:true,
    baseURL:BASE_URL,
    headers:{'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials':true ,'Content-Type': 'application/json'},
})
export const axiosFetch=axios.create({
    baseURL:BASE_URL1,
    withCredentials:true,
    headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials':true ,'Content-Type': 'application/json'}
})






