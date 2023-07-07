import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./ContactUs.css";
import { FaPhone } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import Swal from 'sweetalert2';
const ContactUs = () => {
    const [pending,setPending]=useState(false);
    const form = useRef();
    const sendEmail = async(e) => {
        e.preventDefault();
        setPending(true);
        await emailjs.sendForm('service_zqvqzgr','template_jeb7nrl', form.current, 'mHtNXemC92UetMCs8')
            .then((result) => {
                console.log(result.text);
                setPending(false);
                Swal.fire(
                    'Success',
                    'Message Sent Successfully',
                    'success'
                )
                form.current.reset();
            }, (error) => {
                console.log(error.text);
                setPending(false);
                Swal.fire(
                    'OOPS!',
                    'Something went wrong',
                    'error'
                )
                form.current.reset();
            });
    };
    return (
        <>
            <div className='contact-container'>
                <div className="container">
                    <div className="content">
                        <div className="left-side">
                            <div className="address details">
                                <div className="topic">Address<ImLocation className="icons" /></div>
                                <div className="text-one">Varanasi, Utterpradesh</div>
                                <div className="text-two">IIT-BHU</div>
                            </div>
                            <div className="phone details">
                                <div className="topic">Phone<FaPhone className="icons" /></div>
                                <div className="text-one">+0098 9893 5647</div>
                                <div className="text-two">+0096 3434 5678</div>
                            </div>
                            <div className="email details">
                                <div className="topic">Email<BiLogoGmail className="icons" /></div>
                                <div className="text-one">shoppy.shop@gmail.com</div>
                                <div className="text-two">info.shoppy.shop@gmail.com</div>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="topic-text">Send us a message</div>
                            <p>If you any queries regarding any product of Shoppy.shop then message us.</p>
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="input-box">
                                    <input type="text" placeholder="Enter your name" name="name" className='input' required />
                                </div>
                                <div className="input-box">
                                    <input type="text" placeholder="Enter your email" name="email" className='input' required/>
                                </div>
                                <div className="input-box message-box">
                                    <textarea name="message" id="" rows="5" placeholder="Enter your message" className='input' required></textarea>
                                </div>
                                <div className="login-form-btn-container">
                                    {/* <input type="button" value="Send Now" /> */}
                                    <button type="submit" className="login-form-btn" disabled={pending?true:false}>{pending ?"loading....":"Send Message"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs