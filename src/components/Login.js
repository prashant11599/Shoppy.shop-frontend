import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Login.css";
import { loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from './interceptors/axios';
import Swal from 'sweetalert2';
import { addCart } from '../store/cartSlice';
import { setOrder } from '../store/orderSlice';
const Login = () => {
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }) }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);
        await axios.post('/login', formValues).then((res) => {
            disPatch(loginUser(res.data));
            const id=res.data.id;
            const fetchData = async () => {
                const res = await axios.post("https://shoppy.shop-api.onrender.com/api/products/getcart", { id });
                const { cartdata, total } = res.data;
                disPatch(addCart({ cartdata, total }));
            }
            fetchData();
            const fetchOrder = async () => {
                const resp = await axios.post("https://shoppy.shop-api.onrender.com/api/products/getorder", { id });
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
            Swal.fire(
                'OOPs!',
                error.response.data.message,
                'error'
            )
            // alert(error.response.data.message);
        });
    }

    return (
        <>
            <div className="Main-container">
                <div className="container-login">
                    <div className="wrap-login">
                        <form onSubmit={handleSubmit} className="login-form">
                            <span className="login-form-title">Login Here!</span>
                            <div className="wrap-input">
                                <input type="text" className="input" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input">
                                <input type="password" className="input" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="login-form-btn-container">
                                <button className="login-form-btn">Login</button>
                            </div>

                            <div className="text-center p-t-1">
                                {/* <span className="txt1" style={{color:"#20a508",fontSize:"20px"}}>Forgot</span> */}
                                <Link to='/reset-password' className="txt2" style={{ color: "#31C48D ", fontSize: "20px" }}>Forgot  Username / Password ?</Link>
                            </div>
                            <div className="text-center p-t-2">
                                <Link to='/register' className="txt2" style={{ color: "#31C48D ", fontSize: "20px" }}>Create Your Account <i className="fa fa-long-arrow-right " aria-hidden="true"></i></Link>
                            </div>
                        </form>
                        <div className="login-pic">
                            <img src="loginicon.png" alt="IMG" />
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Login



