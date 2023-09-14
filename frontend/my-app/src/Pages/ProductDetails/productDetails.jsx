import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Product from '../Product/product';
import styles from "./productDetails.module.css";
import Cover from '../../Component/Cover/cover';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import SellerSidebar from '../../Component/SellerSidebar/SellerSidebar';

function ProductDetails() {
    const api_url = 'http://localhost:3000/products';
    const [product, setProduct] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`${api_url}/${params.productId}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [params.productId]);

    return (
        <>
            <div>
                <Cover />
            </div>
            <div className={styles.content}>
                <Product product={product} showButton={false} />
                <div className={styles.iconDes}>
                    <Link to={`/addOffer/${product.id}`}>
                        <button>Add Offer</button>
                    </Link>
                </div>
            </div>
            <div className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : ''}`}>
                <button onClick={() => setShowSidebar(!showSidebar)}>Show/Hide seller info</button>
                {showSidebar && (
                    <SellerSidebar />
                )}
            </div>
            <div className={styles.message}>
                <Link to="/chat">
                    <button className={styles.button}>
                        <FontAwesomeIcon icon={faMessage} />
                    </button>
                </Link>
            </div>
        </>
    );
}

export default ProductDetails;