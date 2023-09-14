import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "./register.module.css";

const Register = () => {
    const { outer, inner, logo } = styles;
    const [state, setState] = useState({
        name: "",
        gender: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        city: "",
        dateOfBirth: "",
        image: null,
        errors: {},
    });

    const { name, gender, email, password, phone, country, city, dateOfBirth, image, errors } = state;

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setState({ ...state, errors: errors });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('image', image);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.location.href = "/home";
            } else {
                throw new Error('Failed to register');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (name.trim() === '') {
            errors.name = 'Name is required';
        }

        if (gender.trim() === '') {
            errors.gender = 'Gender is required';
        }

        if (email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (password.trim() === '') {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (phone.trim() === '') {
            errors.phone = 'Phone is required';
        }

        if (country.trim() === '') {
            errors.country = 'Country is required';
        }

        if (city.trim() === '') {
            errors.city = 'City is required';
        }

        if (dateOfBirth.trim() === '') {
            errors.dateOfBirth = 'Date of birth is required';
        }

        return errors;
    };

    return (
        <div className={outer}>
            <div className={inner} />
            <img className={logo} alt="Company Logo" src={require("../../assets/Images/logo.jpeg")} />
            <h2 className={styles.signUp}>
                <span>{`Sign `}</span>
                <span className={styles.up}>Up</span>
            </h2>
            <div className={styles.loginName}>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="  name"
                />
                {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>
            <div className={styles.loginEmail}>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="  email"
                />
                {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div className={styles.loginPass}>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="  password"
                />
                {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
            <div className={styles.loginPhone}>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="  phone"
                />
                {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </div>
            <div className={styles.loginGender}>
                <input
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={handleChange}
                    placeholder="  gender"
                />
                {errors.gender && <div className={styles.error}>{errors.gender}</div>}
            </div>
            <div className={styles.loginCountry}>
                <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={handleChange}
                    placeholder="  country"
                />
                {errors.country && <div className={styles.error}>{errors.country}</div>}
            </div>
            <div className={styles.loginCity}>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={handleChange}
                    placeholder="  city"
                />
                {errors.city && <div className={styles.error}>{errors.city}</div>}
            </div>
            <div className={styles.loginDob}>
                <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleChange}
                    placeholder="  date of birth"
                />
                {errors.dateOfBirth && <div className={styles.error}>{errors.dateOfBirth}</div>}
            </div>
            <div className={styles.loginImage}>
                <label htmlFor="image">
                    {state.image ? (
                        <img src={URL.createObjectURL(state.image)} alt="" />
                    ) : (
                        <img src={require("../../assets/Images/personal photo.jpg")} alt="" />
                    )}
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                        setState({ ...state, image: e.target.files[0] });
                    }}
                />
            </div>
            <div className={styles.rectangleDiv}>
                <button
                    onClick={handleSubmit}
                    type="submit">
                    Register
                </button>
            </div>
            <div className={styles.haveAccount}>
                <a href="./login">Already have an account?</a>
            </div>
        </div>
    );
};

Register.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Register;