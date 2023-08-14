import React, { useState } from 'react';
import styles from './login.module.css';

const Login = () => {
    const { outer, inner, logo } = styles;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.location.href = "/home";
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (username.trim() === '') {
            errors.username = 'Username is required';
        }

        if (password.trim() === '') {
            errors.password = 'Password is required';
        }

        return errors;
    };

    return (
        <div className={outer}>
            <div className={inner} />
            <img className={logo} alt="Company Logo" src={require('../Images/logo.jpeg')} />
            <div className={styles.signIn}>
                <span>{`Sign `}</span>
                <span className={styles.in}>In</span>
            </div>
            <form onClick={handleSubmit}>
                <div className={styles.loginUsername}>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="  username"
                    />
                    {errors.username && <div className={styles.error}>{errors.username}</div>}
                </div>
                <div className={styles.loginPass}>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="  password"
                    />
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </div>
                <div className={styles.rectangleDiv}>
                    <button  type="submit">
                        Login
                    </button>
                </div>
            </form>
            <div className={styles.checkbox}>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div>
                    <a href="/forgot-password" className={styles.forgotPass}>
                        Forgot Pass?
                    </a>
                </div>
            <a href="./register" className={styles.createAccount}>
                Create an Account
            </a>
        </div>
    );
};

export default Login;