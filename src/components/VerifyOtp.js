import React from 'react'
import { useState } from 'react';
import axios from './interceptors/axios';
// import { loginUser } from '../store/authSlice';
// import { setOrder } from '../store/orderSlice';
import { addCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setOrder } from '../store/orderSlice';
const VerifyOtp = () => {
    const location=useLocation();
    // console.log(location.state);
    const hash=location.state.hash;
    const email=location.state.email;
    // console.log(hash);
    const navigate=useNavigate();
    const disPatch=useDispatch();
    const initialValues = {
        new_password: "",
        otp: ""
    }

    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }) }
    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formValues);
        await axios.post('/verify-password', {...formValues,hash,email}).then((res) => {
            // console.log(res.data);
            disPatch(loginUser(res.data));
            const id=res.data.id;
            const fetchData = async () => {
                const res = await axios.post("https://shoppy-shop-api.onrender.com/api/products/getcart", { id });
                const { cartdata, total } = res.data;
                disPatch(addCart({ cartdata, total }));
            }
            fetchData();
            const fetchOrder = async () => {
                const resp = await axios.post("https://shoppy-shop-api.onrender.com/api/products/getorder", { id });
                const { orderdata, paymentStatus, total } = resp.data;
                disPatch(setOrder({ orderdata, paymentStatus, total }));
            }
            fetchOrder();
            // console.log(res.data);
            // alert(res.data.message);
            Swal.fire(
                'Success',
                res.data.message,
                'success'
            )
            navigate('/');
        }).catch((error) => {
            console.log(error);
            // alert(error.response.data.message);
            Swal.fire(
                'OOPS!',
                error.response.data.message,
                'error'
            )
        }); 
    }
    return (
        <div>
            <div className="Main-container">
                <div className="container-login">
                    
                    <div className="wrap-login">
                        <form onSubmit={handleSubmit}  className="login-form">
                            <div className="wrap-input">
                                <input type="password" className="input" name="new_password" placeholder="Enter new Password" value={formValues.new_password} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input">
                                <input type="number" className="input" name="otp" placeholder="Enter otp" value={formValues.otp} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="login-form-btn-container">
                                <button className="login-form-btn">Change Password</button>
                            </div>

                        </form>
                         <div className="login-pic">
                            <img src="loginicon.png" alt="IMG" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp