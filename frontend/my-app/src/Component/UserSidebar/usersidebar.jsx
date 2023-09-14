import {React, useEffect, useState} from 'react';
import { useUser } from '../../UserContext';
import styles from '../UserSidebar/userSidebar.module.css';
import axios from 'axios';

const UserSidebar = () => {
    const { user } = useUser();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    // Set input values once the user object is available
    useEffect(() => {
        if (user) {
            setAddress(user.address || '');
            setPhone(user.phone || '');
            setEmail(user.email || '');
            setName(user.name || '');
        }
    }, [user]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const saveData = () => {
        // Save the new data to the server or perform any other necessary operations
        const updatedUser = {
            ...user,
            address,
            phone,
            email,
            name,
        };

        axios
            .put(`http://localhost:3000/users/${user.id}`, updatedUser)
            .then((response) => {
                console.log('New data saved:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={styles.information}>
                    <h2>My Info</h2>
                    <img src={require('../../assets/Images/country.png')} alt="" />
                    <div className={styles.address}>
                        <span className={styles.font}>Address:</span>
                        <input type="text" value={address} onChange={handleAddressChange} />
                    </div>
                    <img src={require('../../assets/Images/phone.png')} alt="" />
                    <div className={styles.phone}>
                        <span className={styles.font}>Phone:</span>
                        <input type="text" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <img src={require('../../assets/Images/gmail.png')} alt="" />
                    <div className={styles.mail}>
                        <span className={styles.font}>Mail:</span>
                        <input type="text" value={email} onChange={handleEmailChange} />
                    </div>
                    <img src={require('../../assets/Images/personal photo.jpg')} alt="" />
                    <div className={styles.name}>
                        <span className={styles.font}>Name:</span>
                        <input type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <button onClick={saveData}>Save</button>
                </div>
    );
};

export default UserSidebar;