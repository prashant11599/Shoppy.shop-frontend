import React from 'react'
// import { useState } from 'react';
import "./Home.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addCart } from '../store/cartSlice';
import { setOrder } from '../store/orderSlice';
import { setProducts } from '../store/productSlice';
// import { useSelector } from 'react-redux'
import { axiosFetch } from './interceptors/axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Home = () => {
  const data = useSelector((state) => state.auth);
  const { id, user } = data;
  const { data: products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const limit = 15;
      const res = await axiosFetch("https://shoppy.shop-api.onrender.com/api/products/all", {
        params: {
          page: 1,
          limit: limit
        }
      });
      // console.log(res.data);
      dispatch(setProducts(res.data));
      // console.log(res);
    }
    fetchProducts();
  }, [dispatch])
  const handleAdd1 = async (product) => {
    Swal.fire(
      'OOPs!',
      'Please login to add to cart',
      'info'
    )
    navigate('/login');
  };
  const handleAdd = async (product) => {
    // alert('item added to cart');
    await axios.post("https://shoppy.shop-api.onrender.com/api/products/addtocart", {
      product, id
    }).then((res) => {
      Swal.fire(
        'Success',
        res.data.message,
        'success'
      )
    }).catch((error) => {
      Swal.fire(
        'Already',
        error.response.data.message,
        'info'
      )
    });
    const res = await axios.post("https://shoppy.shop-api.onrender.com/api/products/getcart", { id });
    const { cartdata, total } = res.data;
    dispatch(addCart({ cartdata, total }));
  };
  const checkoutHandler1 = async (product) => {
    // alert("please login to buy products");
    Swal.fire(
      'OOPs!',
      'Please login to checkout',
      'info'
    )
    navigate('/login');
  }
  const checkoutHandler = async (product) => {
    const { price } = product;
    const { data: { key } } = await axios.get("https://shoppy.shop-api.onrender.com/api/getkey")
    // console.log(key);
    const { data: { order } } = await axios.post("https://shoppy.shop-api.onrender.com/api/checkout", {
      price
    })
    // console.log(order);
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: user.name,
      description: "Payment for the product",
      image:  "websitelogo.png",
      order_id: order.id,
      // callback_url: "http://localhost:5000/api/paymentverification",
      handler: async (response) => {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        const res = await axios.post("https://shoppy.shop-api.onrender.com/api/paymentverification", {
          razorpay_order_id, razorpay_payment_id, razorpay_signature, product, id
        })
        // alert(res.data.message);
        Swal.fire(
          'Success',
          res.data.message,
          'success'
        )
        const resp = await axios.post("https://shoppy.shop-api.onrender.com/api/products/getorder", { id });
        const { orderdata, paymentStatus, total } = resp.data;
        dispatch(setOrder({ orderdata, paymentStatus, total }));
        navigate('/profile');
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact:  user.phone,
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }
  return (
    <>
      <div className='front-image'>
        {/* <img src="finalfrontpage1.png" alt="IMG" className='front-pg1' /> */}
        <img src="finalfrontpage.png" alt="IMG" className='front-pg2' />
      </div>
      <div className='show-product'>
        <div>
          <h1>OUR LATEST PRODUCTS</h1>
        </div>
        <div className="product-wrapper">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={`https://${product.image}`} alt="images of product" className='product-image'/>
              {/* <img src="C:\Users\welcome\OneDrive\Desktop\project folder\frontend\public\background1.jpg" alt="images of product" /> */}
              {/* <a href={product.image}>image of product</a> */}
              {/* <Link to={product.image}> Image</Link> */}
              <p className='description'>{product.description}</p>
              <p className='color'>Colour:{product.colour}</p>
              <p className='brand'>Brand:{product.brandName}</p>
              <p className='price'>Price:{product.price}</p>
              <p className='reduced-price'>Reduced Price:{product.reducedPrice}</p>
              {/* <p>{product.productDescription}</p> */}
              <div className="btn-wrapper">
                {data.isLoggedIn === false && <button onClick={() => handleAdd1(product)} className="btn-click">
                  Add to cart
                </button>}
                {data.isLoggedIn && <button onClick={() => handleAdd(product)} className="btn-click">
                  Add to cart
                </button>}
                {/* <button onClick={() => handleAdd(product)} className="btn-click">
                  Add to cart
                </button> */}
                {data.isLoggedIn === false && <button onClick={() => checkoutHandler1(product)} className="btn-click">
                  buy Now
                </button>}
                {data.isLoggedIn && <button onClick={() => checkoutHandler(product)} className="btn-click">
                  buy Now
                </button>}
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )

}

export default Home