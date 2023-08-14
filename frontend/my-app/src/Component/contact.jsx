import React, { useState, Fragment } from 'react';
import styles from './contact.module.css';

const Contact = () => {
    const { outer, inner, logo } = styles;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    body: new FormData(event.target)
                });

                if (response.ok) {
                    window.location.href = "/home";
                } else {
                    throw new Error('Failed to register');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Fragment>
            <div className={outer}>
                <div className={inner} />
                <img className={logo} alt="Company Logo" src={require("../Images/logo.jpeg")} />
                <div className={styles.contactus}>
                    <span>{`Contact `}</span>
                    <span className={styles.us}>Us</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.Name}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder=" name"
                        />
                        <div className={styles.error}>
                            {errors.name && <span >{errors.name}</span>}
                        </div>
                    </div>
                    <div className={styles.Email}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder=" email"
                        />
                        <div className={styles.error}>
                            {errors.email && <span >{errors.email}</span>}
                        </div>
                        
                    </div>
                    <div className={styles.subject}>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder=" the subject"
                        />
                        <div className={styles.error}>
                            {errors.subject && <span >{errors.subject}</span>}
                        </div>
                        
                    </div>
                    <div className={styles.message}>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder=" your message"
                        />
                        <div className={styles.error}>
                            {errors.message && <span >{errors.message}</span>}
                        </div>
                        
                    </div>
                    <div className={styles.rectangleDiv}>
                        <button type="submit">Send Message</button>
                    </div>
                </form>
                <div className={styles.information}>
                    <h2>Contact Us</h2>
                    <img src={require("../Images/country.png")} alt="" />
                    <div className={styles.address}>
                        <span className={styles.font}>Address:</span>
                        <span>Cairo</span>
                    </div>
                    <img src={require("../Images/phone.png")} alt="" /> 
                    <div className={styles.phone}>
                        <span className={styles.font}>Phone:</span>
                        <span>11111</span>
                    </div>
                    <img src={require("../Images/gmail.png")} alt="" />
                    <div className={styles.mail}> 
                        <span className={styles.font}>Mail:</span>
                        <span>f@gmail.com</span>
                    </div>
                    <img src={require("../Images/website.png")} alt="" />
                    <div className={styles.website}> 
                        <span className={styles.font}>Website:</span>
                        <span>www.DealDepot.com</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Contact;