import React from 'react'
import { useState } from 'react';
import axios from './interceptors/axios';
// import { loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const ResetPassword = () => {
    const navigate=useNavigate();
    const initialValues = {
        email: "",
        new_password: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }) }
    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formValues);
        await axios.post('/reset-password', formValues).then((res) => {
            // console.log(res.data);
            const hash=res.data.hash;
            // alert(res.data.message);
            Swal.fire(
                'Check Email',
                res.data.message,
                'info'
            )
            navigate('/verify-password',{state:{hash:hash,email:formValues.email}});
        }).catch((error) => {
            // alert(error.response.data.message);
            Swal.fire(
                'OOPS!',
                error.response.data.message,
                'error'
            )
            navigate('/register');
        }); 
    }
    return (
        <div>
            <div className="Main-container">
                <div className="container-login">
                    
                    <div className="wrap-login">
                        <form onSubmit={handleSubmit}  className="login-form">
                            <span className="login-form-title">Please Change Your Password!</span>
                            <div className="wrap-input">
                                <input type="text" className="input" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="login-form-btn-container">
                                <button className="login-form-btn">Continue</button>
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

export default ResetPassword