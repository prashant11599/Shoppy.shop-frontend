import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from "react-redux";
import axios from './interceptors/axios';
import { logoutUser, setUser } from '../store/authSlice';
import useAxiosPrivateInstance from './interceptors/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { BiSolidLogIn, BiSolidLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa"
import { ImCross, ImHome } from "react-icons/im"
import { FaCartPlus } from "react-icons/fa";
import { FaProductHunt, FaUserPlus, FaUser, FaRegistered } from "react-icons/fa";
import Swal from 'sweetalert2';
import { removeCart } from '../store/cartSlice';
import { removeOrder } from '../store/orderSlice';
const Navbar = () => {
    const [Mobile, setMobile] = useState(false);
    const navigate = useNavigate();
    const data = useSelector((state) => state.auth);
    const { total } = useSelector((state) => state.cart);
    const disPatch = useDispatch();
    const axiosPrivate = useAxiosPrivateInstance();
    const handlelogout = async () => {
        await axios.post('/logout', { withCredentials: true }).then((res) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Logged out',
                        res.data.status,
                        'success'
                    )
                    disPatch(removeOrder());
                    disPatch(removeCart());
                    disPatch(logoutUser());
                    navigate('/login');
                }
            })
            // disPatch(logoutUser());
            // console.log(res);
            // alert(res.data.status);
            // navigate('/login');
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleprofile = async () => {
        await axiosPrivate.get('/info', { withCredentials: true }).then((res) => {
            disPatch(setUser(res.data));
            // console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <>
            <div className='nav-container'>
                <nav className='navbar'>
                    {/* <h3 className='logo'>Shoppy.shop</h3> */}
                    <img src="websitelogo.png" alt="IMG" className='logo' />
                    <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
                        <Link to='/' className='home'>
                            <li>Home <ImHome className="icons" /></li>
                        </Link>
                        <Link to='/products' className='products'>
                            <li>Products <FaProductHunt className="icons" /> </li>
                        </Link>
                        {data.isLoggedIn &&<Link to='/mycart' className='mycart'>
                            <li>MyCart<FaCartPlus className="icons" /><sup className="cart-count">{total}</sup></li>
                        </Link>}
                        <Link to='/contact-us' className='contact-us'>
                            <li>Contact Us<FaUserPlus className="icons" /></li>
                        </Link>
                        {data.isLoggedIn === false && <Link to="./login"  >
                            <li>Login<BiSolidLogIn className="icons" /></li>
                        </Link>}
                        {data.isLoggedIn === false && <Link to="./register">
                            <li>Register<FaRegistered className="icons" /></li>
                        </Link>}
                        {data.isLoggedIn && <Link onClick={handlelogout} to="/" >
                            <li>logout<BiSolidLogOut className="icons" /></li>
                        </Link>}
                        {data.isLoggedIn && <Link onClick={handleprofile} to="/profile">
                            <li>profile<FaUser className="icons" /></li>
                        </Link>}
                    </ul>
                    <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
                        {Mobile ? <ImCross /> : <FaBars />}
                    </button>
                </nav>

            </div>


        </>
    )
}
export default Navbar
