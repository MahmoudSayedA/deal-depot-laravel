import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Product from './product';
import styles from "./productDetails.module.css";
import Cover from './cover';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faMapLocationDot, faStar, faMessage } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
    const api_url = 'https://fakestoreapi.com/products';
    const [product, setProduct] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);
    const params = useParams();

    useEffect(() => {
        fetch(`${api_url}/${params.productId}`)
            .then((res) => res.json())
            .then((product) => setProduct(product));
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
                    <div className={styles.sinfo}>
                        <div className={styles.personalImg}>
                            <img src={require("../Images/personal photo.jpg")} alt="" />
                        </div>
                        <div className={styles.name}>S.Name</div>
                        <div className={styles.sideIcon}>
                            <FontAwesomeIcon icon={faPhone} />
                            <p>01289038072</p>
                        </div>
                        <div className={styles.sideIcon}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p>Ss@gmail.com</p>
                        </div>
                        <div className={styles.sideIcon}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p>Cairo</p>
                        </div>
                        <div className={styles.sideIcon}>
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            <p>Helwan</p>
                        </div>
                        <div className={styles.sideIcon}>
                            <FontAwesomeIcon icon={faStar} />
                            <p>8/10</p>
                        </div>
                    </div>
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
};

export default ProductDetails;