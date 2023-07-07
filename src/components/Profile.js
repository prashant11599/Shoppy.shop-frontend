import React from 'react'
import "./Profile.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaCartPlus, FaUserPlus, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { ImHome } from "react-icons/im"
import axios from './interceptors/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logoutUser } from '../store/authSlice';
import { BiSolidLogOut } from "react-icons/bi";
import { useDispatch } from 'react-redux';
const Profile = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const { data: products, paymentStatus, total } = useSelector((state) => state.order);
  const data = useSelector((state) => state.auth);
  const { user } = data;
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
  return (
    <div className='profile'>
      <h1 className='info-header'>Profile</h1>
      <div className='main-container'>
        <div className="card">
          <div className="card-header">
            <img src="profile-image-placeholder.jpg" className="profile-img" alt='' />
          </div>
          <div className="card-body">
            <p className="name">{user.name}</p>
            <p className="mail">{user.email}</p>
          </div>
          <div className="web-link">
            <ul className='side-links'>
              <Link to='/' >
                <li className='sidebar-links'>Home<ImHome className="icons" /></li>
              </Link>
              <Link to='/products' >
                <li className='sidebar-links'>Products<FaProductHunt className="icons" /></li>
              </Link>
              <Link to='/mycart'>
                <li className='sidebar-links'>MyCart<FaCartPlus className="icons" /></li>
              </Link>
              <Link to='/contact-us' className='sidebar-links'>
                <li className='sidebar-links'>Contact Us<FaUserPlus className="icons" /></li>
              </Link>
              <Link onClick={handlelogout} to="/" >
                <li className='sidebar-links'>logout<BiSolidLogOut className="icons" /></li>
              </Link>
            </ul>
          </div>
          <ul className="social-links">
            <Link to='#' className='icon'>
              <li><BiSolidPhoneCall className="social-icon" /></li>
            </Link>
            <Link to='#' className='icon'>
              <li><FaFacebook className="social-icon" /></li>
            </Link>
            <Link to='#' className='icon'>
              <li><FaInstagram className="social-icon" /></li>
            </Link>
            <Link to='#' className='icon'>
              <li><FaTwitter className="social-icon" /></li>
            </Link>
          </ul>
        </div>

        <div className="ordered-products">
          <h1 className='product-header'>My Orders<sup className='order-count'>{total}</sup> </h1>
          <div className="cartWrapper">
            {products.map((product, index) => (
              <div key={index} className="cartCard">
                <img src={`https://${product.image}`} alt="images of product" className='product-image' />
                <div>
                  <p className='description'>{product.description}</p>
                  <p className='color'>Colour:{product.colour}</p>
                  <p className='brand'>Brand:{product.brandName}</p>
                  <p className='price'>Price:{product.price}</p>
                  <p className='reduced-price'>Reduced Price:{product.reducedPrice}</p>
                  {/* <p className='product-description'>{product.productDescription}</p> */}
                  <div className='status'>
                    <p className='payment-status '>Payment: {paymentStatus}</p>
                    <p className='order-status '>Order Status:Success</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile