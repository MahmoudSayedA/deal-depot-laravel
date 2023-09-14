import React, { Fragment } from 'react';
import Cover from '../../Component/Cover/cover';
import styles from '../About/about.module.css';

const Services = ({children}) => (
    <Fragment>
    <div>
        <Cover />
        {children}
    </div>
    <div className={styles.content}>
        <p>
        🛍️ Sell any product: Easily upload and list your specific product for sale on our platform, reaching potential buyers nationwide.
        </p>
        <p>
        🔍 Find what you need: Discover a wide range of products from various sellers, ensuring you find exactly what you're looking for.
        </p>
        <p>
        🤝 Negotiate and accept: Engage in communication with potential buyers, negotiate terms, and accept the offer that suits you the most.
        </p>
        <p>
        🏷️ Competitive pricing: Ensure competitive pricing of your products by observing offers from different buyers and adjusting accordingly.
        </p>
        <p>
        📱 User-friendly interface: Enjoy a seamless and intuitive user experience, making the process of buying and selling hassle-free.
        </p>
        <p>
        💼 Multiple seller options: Benefit from receiving offers from different individuals, allowing you to compare prices and select the most favorable deal.
        </p>
    </div>
</Fragment>
    );
    
export default Services;