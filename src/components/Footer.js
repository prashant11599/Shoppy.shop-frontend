import React from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';
import { ImHome } from "react-icons/im"
import { FaProductHunt, FaCartPlus, FaUserPlus, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="box1">
          <h1>Shoppy.shop</h1>
          {/* <img src="finalfooter1.png" alt="IMG" className='logo' /> */}
          <p>Making shop Easier With us for better experience <br />
            ectus eos nihil cumque sum dolor sit amet consectetur,<br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus <br />
            ectus eos nihil cumque sum dolor sit amet consectetur,<br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus <br />
          </p>
        </div>
        <div className="box2">
          <h1>Contact Us</h1>
          <ul>
            <Link to='#' className='footer-links'>
              <li>Call Us<BiSolidPhoneCall className="icons" /></li>
            </Link>
            <Link to='#' className='footer-links'>
              <li>Facebook<FaFacebook className="icons" /></li>
            </Link>
            <Link to='#' className='footer-links'>
              <li>Instagram<FaInstagram className="icons" /></li>
            </Link>
            <Link to='#' className='footer-links'>
              <li>Twitter<FaTwitter className="icons" /></li>
            </Link>
          </ul>
        </div>
        <div className="box3">
          <h1>Quick Links</h1>
          <ul>
            <Link to='/' className='footer-links'>
              <li>Home<ImHome className="icons" /></li>
            </Link>
            <Link to='/products' className='footer-links'>
              <li>Products<FaProductHunt className="icons" /></li>
            </Link>
            <Link to='/mycart' className='footer-links'>
              <li>MyCart<FaCartPlus className="icons" /></li>
            </Link>
            <Link to='/contact-us' className='footer-links'>
              <li>Contact Us<FaUserPlus className="icons" /></li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer