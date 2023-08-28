import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './myOffers.module.css';
import Cover from '../../Component/cover';

const MyOffers = () => {
    const [myOffers, setMyOffers] = useState([]);
    const [editedOffer, setEditedOffer] = useState({});
    const [editedIndex, setEditedIndex] = useState(-1);
    const params = useParams();

    const handleEditOffer = (index) => {
        const offerToEdit = myOffers[index];
        setEditedOffer(offerToEdit);
        setEditedIndex(index);
    };

    const handleSaveOffer = (index) => {
        const updatedOffers = [...myOffers];
        updatedOffers[index] = editedOffer;
        setMyOffers(updatedOffers);
        setEditedOffer({});
        setEditedIndex(-1);
    };

    const handleDeleteOffer = (index) => {
        const updatedOffers = myOffers.filter((_, i) => i !== index);
        setMyOffers(updatedOffers);
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${params.productId}/offers`)
            .then((response) => {
                setMyOffers(response.data);
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
                <h1 className={styles.titlePage}>My Offers</h1>
                <div className={styles.myProduct}>
                    {myOffers.map((offer, index) => (
                        <div className={styles.context} key={index}>
                            <div className={styles.product}>
                                <div>
                                    <img
                                        className={styles.image}
                                        src={offer.image}
                                        alt=""
                                    />
                                </div>
                                <div className={styles.details}>
                                    {editedIndex === index ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editedOffer.price}
                                                onChange={(event) => setEditedOffer({ ...editedOffer, price: event.target.value })}
                                            />
                                            <button onClick={() => handleSaveOffer(index)}>Save</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>Price: {offer.price} EGP</p>
                                            <p>Date: {offer.date}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.editButton} onClick={() => handleEditOffer(index)}>Edit</button>
                                <button className={styles.deleteButton} onClick={() => handleDeleteOffer(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyOffers;