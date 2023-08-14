import React from 'react';
import Cover from './cover';
import styles from './about.module.css';

const About = ({ children }) => (
    <>
        <div>
            <Cover />
            {children}
        </div>
        <div className={styles.content}>
            <p>
                Welcome to Deal Depot, the ultimate destination for buying and selling used products online. Our platform connects buyers and sellers from all over the world, making it easy to find great deals on pre-owned goods.
            </p>
            <p>
                Whether you're looking for electronics, furniture, clothing, or anything in between, you'll find it on Deal Depot. Our user-friendly interface and powerful search tool make it easy to browse and find the items you're looking for.
            </p>
            <p>
                Selling on Deal Depot is just as easy. Simply create an account, list your items, and wait for interested buyers to make offers. With our secure payment system and buyer protection policies, you can sell with confidence and get the best possible price for your items.
            </p>
            <p>
                Join the millions of users who have already discovered the convenience and value of Deal Depot. Sign up today and start buying and selling with ease!
            </p>
        </div>
    </>
);

export default About;
