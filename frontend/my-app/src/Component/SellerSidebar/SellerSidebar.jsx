import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faMapLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useUser } from '../../SellerContext';
import styles from './sellerSidebar.module.css';

const SellerSidebar = () => {
    const { user } = useUser(); // Get user data from the user context

    return (
        <div className={styles.sinfo}>
            <div className={styles.personalImg}>
                <img src={user.image} alt="" />
            </div>
            <div className={styles.name}>{user.name}</div> {/* Display user's name */}
            <div className={styles.sideIcon}>
                <FontAwesomeIcon icon={faPhone} />
                <p>{user.phone}</p> {/* Display user's phone */}
            </div>
            <div className={styles.sideIcon}>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{user.email}</p> {/* Display user's email */}
            </div>
            <div className={styles.sideIcon}>
                <FontAwesomeIcon icon={faMapLocationDot} />
                <p>{user.address}</p> {/* Display user's address */}
            </div>
            <div className={styles.sideIcon}>
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{user.location}</p> {/* Display user's location */}
            </div>
            <div className={styles.sideIcon}>
                <FontAwesomeIcon icon={faStar} />
                {user.rating}
            </div>
        </div>
    );
};

export default SellerSidebar;