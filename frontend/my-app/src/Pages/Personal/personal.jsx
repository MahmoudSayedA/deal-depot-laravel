import React, { Fragment} from 'react';
import UserSidebar from '../../Component/UserSidebar/usersidebar';
import Cover from '../../Component/Cover/cover';
import { Link } from 'react-router-dom';
import styles from './personal.module.css';


const Personal = ({ children }) => {


    return (
        <Fragment>
            <div>
                <Cover />
                {children}
            </div>
            <div className={styles.content}>
                <UserSidebar/>
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