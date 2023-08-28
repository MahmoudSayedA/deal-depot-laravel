import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from '../Product/product';
import styles from './addOffer.module.css';
import Cover from '../../Component/cover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faMapLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';

const AddOffer = () => {
  const api_url = 'http://localhost:3000/products';
  const [product, setProduct] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const handlePriceChange = (event) => {
    setOfferPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOffer = {
      productId: params.productId,
      price: offerPrice,
      date: new Date().toISOString().slice(0, 10) // Set current date
    };

    axios.post(`${api_url}/${params.productId}/offers`, newOffer)
      .then((response) => {
        setOfferSubmitted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    axios.get(`${api_url}/${params.productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [api_url, params.productId]);

  if (offerSubmitted) {
    navigate(`/myOffers/${params.productId}`);
  }

  return (
    <>
      <div>
        <Cover />
      </div>
      <div className={styles.content}>
        <Product product={product} showButton={false} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={offerPrice}
            onChange={handlePriceChange}
            placeholder="Enter your offer"
          />
          <span>EGP</span>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : ''}`}>
        <button onClick={() => setShowSidebar(!showSidebar)}>Show/Hide seller info</button>
        {showSidebar && (
          <div className={styles.sinfo}>
            <div className={styles.personalImg}>
              <img src={require("../../Images/personal photo.jpg")} alt="" />
            </div>
            <div className={styles.name}>S.Name</div>
            <div className={styles.sideIcon}>
              <FontAwesomeIcon icon={faPhone} />
              <p>012890380</p>
            </div>
            <div className={styles.sideIcon}>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>seller@seller.com</p>
            </div>
            <div className={styles.sideIcon}>
              <FontAwesomeIcon icon={faMapLocationDot} />
              <p>seller's address</p>
            </div>
            <div className={styles.sideIcon}>
              <FontAwesomeIcon icon={faLocationDot} />
              <p>seller's location</p>
            </div>
            <div className={styles.rating}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddOffer;