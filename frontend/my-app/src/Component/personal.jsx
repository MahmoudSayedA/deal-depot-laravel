import React, { Fragment } from 'react';
import Cover from './cover';
import { Link } from 'react-router-dom';
import styles from './personal.module.css';


const Personal = ({ children }) => (
    <Fragment>
        <div>
            <Cover />
            {children}
        </div>
    <div className={styles.content}>
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
            <div className={styles.contentname}>
                <h1>Deal Depot</h1>
                <p>Revive, reuse, and reimagine with Deal Depot</p>
                <div className={styles.Footer}>
                    <Link className={styles.Footer1} to="/myProducts">My Products</Link>
                    <Link className={styles.Footer2} to="/myOffers">My Offers</Link>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Personal;