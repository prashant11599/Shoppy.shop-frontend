import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Layout from './components/Layout';
import Product from './components/Product';
import MyCart from './components/MyCart';
import ContactUs from './components/ContactUs';
import { useEffect } from 'react';
import axios from './components/interceptors/axios';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from './store/authSlice';
import { addCart } from './store/cartSlice';
import { setOrder } from './store/orderSlice';
import useAxiosPrivateInstance from './components/interceptors/useAxiosPrivate';
import { setUser } from './store/authSlice';
import ResetPassword from './components/ResetPassword';
import VerifyOtp from './components/VerifyOtp';
const App = () => {
  // code for persistent login after refresh
  const disPatch = useDispatch();
  const axiosPrivate = useAxiosPrivateInstance();
  const [id, setId] = useState("");
  useEffect(() => {
    const refresh = async () => {
      await axios.post("/refresh",{ withCredentials: true }).then((res) => {
        setId(res.data.id);
        disPatch(loginUser(res.data));
        // console.log(res.data)
      });
      await axiosPrivate.get('/info', { withCredentials: true }).then((res) => {
        disPatch(setUser(res.data));
        // console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    }
    refresh();
    const fetchData = async () => {
      const res = await axios.post("https://shoppy-shop-api.onrender.com/api/products/getcart", { id });
      const { cartdata, total } = res.data;
      disPatch(addCart({ cartdata, total }));
    }
    fetchData();
    const fetchOrder = async () => {
      const resp = await axios.post("https://shoppy-shop-api.onrender.com/api/products/getorder",{id});
      const { orderdata, paymentStatus, total } = resp.data;
      disPatch(setOrder({ orderdata, paymentStatus, total }));
    }
    fetchOrder();
  }, [disPatch, axiosPrivate, id])

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='reset-password' element={<ResetPassword />}></Route>
            <Route path='verify-password' element={<VerifyOtp />}></Route>
            <Route path='products' element={<Product />}></Route>
            <Route path='myCart' element={<MyCart />}></Route>
            <Route path='contact-us' element={<ContactUs />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='*' element={<h1>Error 404 page not found</h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
