import React from 'react'
import { APP_DOMAIN } from './interceptors/axios';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from '../store/orderSlice';
import { addCart } from '../store/cartSlice';
import './MyCart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const MyCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: products } = useSelector((state) => state.cart);
    // console.log(products);
    const data = useSelector((state) => state.auth);
    const { id, user } = data;
    const handleRemove = async (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your item is removed from cart',
                    'success'
                )
                const res = await axios.post(`${APP_DOMAIN}/api/products/removecart`, { productId, id });
                const { cartdata, total } = res.data;
                dispatch(addCart({ cartdata, total }));
            }
        }).catch((error) => {
            console.log(error);
        })


    };
    const checkoutHandler1 = async (product) => {
        Swal.fire(
            'OOPs!',
            'Please login to checkout',
            'info'
        )
        navigate('/login');
    }
    const checkoutHandler = async (product) => {
        const { price } = product;
        const { data: { key } } = await axios.get(`${APP_DOMAIN}/api/getkey`)
        // console.log(key);
        const { data: { order } } = await axios.post(`${APP_DOMAIN}/api/checkout`, {
            price
        })
        // console.log(order);
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: user.name,
            description: "paying money for product",
            image: "websitelogo.png",
            order_id: order.id,
            // callback_url: "http://localhost:5000/api/paymentverification",
            handler: async (response) => {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
                const res = await axios.post(`${APP_DOMAIN}/api/paymentverification`, {
                    razorpay_order_id, razorpay_payment_id, razorpay_signature, product, id
                })
                // alert(res.data.message);
                Swal.fire(
                    'Success',
                    res.data.message,
                    'success'
                )
                const resp = await axios.post(`${APP_DOMAIN}/api/products/getorder`, { id });
                const { orderdata, paymentStatus, total } = resp.data;
                dispatch(setOrder({ orderdata, paymentStatus, total }));
                navigate('/profile');
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone,
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
        <div>
            <div className="cartWrapper">
                {products && products.map((product, index) => (
                    <div key={index} className="cartCard">
                        <img src={`https://${product.image}`} alt="images of product" className='product-image' />
                        <div className='product-detail'>
                            <p className='description'>{product.description}</p>
                            <p className='color'>Colour: {product.colour}</p>
                            <p className='brand'>Brand: {product.brandName}</p>
                            <p className='price'>Price: {product.price}</p>
                            <p className='reduced-price'>Reduced Price:{product.reducedPrice}</p>
                            <p className='product-description'>{product.productDescription}</p>
                            <div className="cartbtnWrapper">
                                <button
                                    className="btn-click"
                                    onClick={() => handleRemove(product._id)}
                                >
                                    Remove
                                </button>
                                {data.isLoggedIn === false && <button onClick={() => checkoutHandler1(product)} className="btn-click">
                                    buy Now
                                </button>}
                                {data.isLoggedIn && <button onClick={() => checkoutHandler(product)} className="btn-click">
                                    buy Now
                                </button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyCart