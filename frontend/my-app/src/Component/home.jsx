import React, { Fragment } from 'react';
import Cover from './cover';
import { Link } from 'react-router-dom';
import styles from './home.module.css';
import HomeImage from '../Images/Home.jpg';

const Home = ({ children }) => (
    <Fragment>
        <div>
            <Cover />
            {children}
        </div>
        <div className={styles.content}>
            <img alt="" src={HomeImage} />
            <div className={styles.contentname}>
                <h1>Deal Depot</h1>
                <p>Pre-owned treasures, yours to discover.</p>
                <p>Find your next great deal with us.</p>
                <div className={styles.Footer}>
                    <Link className={styles.Footer1} to="/register">Register</Link>
                    <Link className={styles.Footer2} to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Home;