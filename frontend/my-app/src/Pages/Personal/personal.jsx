import React, { Fragment, useState } from 'react';
import Cover from '../../Component/cover';
import { Link } from 'react-router-dom';
import styles from './personal.module.css';

const Personal = ({ children }) => {
    const [address, setAddress] = useState("Cairo");
    const [phone, setPhone] = useState("11111");
    const [email, setEmail] = useState("f@gmail.com");
    const [name, setname] = useState("www.DealDepot.com");

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlenameChange = (e) => {
        setname(e.target.value);
    };

    const saveData = () => {
        // Save the new data to the server or perform any other necessary operations
        console.log("New data saved:", { address, phone, email, name });
    };

    return (
        <Fragment>
            <div>
                <Cover />
                {children}
            </div>
            <div className={styles.content}>
                <div className={styles.information}>
                    <h2>My Info</h2>
                    <img src={require("../../Images/country.png")} alt="" />
                    <div className={styles.address}>
                        <span className={styles.font}>Address:</span>
                        <input
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <img src={require("../../Images/phone.png")} alt="" />
                    <div className={styles.phone}>
                        <span className={styles.font}>Phone:</span>
                        <input type="text" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <img src={require("../../Images/gmail.png")} alt="" />
                    <div className={styles.mail}>
                        <span className={styles.font}>Mail:</span>
                        <input type="text" value={email} onChange={handleEmailChange} />
                    </div>
                    <img src={require("../../Images/personal photo.jpg")} alt="" />
                    <div className={styles.name}>
                        <span className={styles.font}>Name:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={handlenameChange}
                        />
                    </div>
                    <button onClick={saveData}>Save</button>
                </div>
                <div className={styles.contentname}>
                    <h1>Deal Depot</h1>
                    <p>Revive, reuse, and reimagine with Deal Depot</p>
                    <div className={styles.Footer}>
                        <Link className={styles.Footer1} to="/myProducts">
                            My Products
                        </Link>
                        <Link className={styles.Footer2} to="/myOffers">
                            My Offers
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Personal;