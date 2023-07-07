import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import "./Register.css";
import {useDispatch} from 'react-redux';
import axios from './interceptors/axios';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Register = () => {
    const disPatch=useDispatch();
    const navigate=useNavigate();
    const initialValues = {
        firstName:"",
        lastName:"",
        userName:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:""
    }

    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }) }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        await axios.post('/register', formValues).then((res) => {
            // const { data: { id,  message, status } } = res;
            disPatch(registerUser(res.data));
            // alert(res.data.message);
            Swal.fire(
                'Success',
                res.data.message,
                'success'
            )
            navigate('/');
        }).catch((error) => {
            // alert(error.response.data.message);
            Swal.fire(
                'OOPs!',
                error.response.data.message,
                'error'
            )
        });
    }

    return (
        <>
            <div className="Main-container">
                <div className="container-register">
                    <div className="wrap-register">

                        <form onSubmit={handleSubmit} className="register-form">
                            <span className="register-form-title">Register Here!</span>
                            <div className="wrap-input">
                                <input type="text" className="input" name="firstName" placeholder="First Name" value={formValues.firstName} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input">
                                <input type="text" className="input" name="lastName" placeholder="Last Name" value={formValues.lastName} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input">
                                <input type="text" className="input" name="userName" placeholder="Username" value={formValues.userName} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input">
                                <input type="text" className="input" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input">
                                <input type="text" className="input" name="phone" placeholder="Phone" value={formValues.phone} onChange={handleChange} required />
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
                            <div className="wrap-input">
                                <input type="text" className="input" name="confirmPassword" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <Link to='/login' className="txt2" style={{color:"#31C48D ",fontSize:"20px"}}>have an account? Login <i className="fa fa-long-arrow-right " aria-hidden="true"></i></Link>
                            <div className="register-form-btn-container">
                                <button className="register-form-btn">Register</button>
                            </div>


                        </form>
                         <div className="register-pic">
                            <img src="loginicon.png" alt="IMG" />
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Register