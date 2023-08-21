import React, { useState } from 'react';
import styles from './any.module.css';

const images = [
    '../Images/pexels-tima-miroshnichenko-6078297.jpg',
    '../Images/football.jpg',
];

function AnyProduct() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isChatPopupVisible, setIsChatPopupVisible] = useState(false);

    const showNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const showPreviousImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };

    const toggleChatPopup = () => {
        setIsChatPopupVisible(!isChatPopupVisible);
    };

    return (
        <div className={styles.product}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={images[currentImageIndex]}
                    alt="Product"
                />
                <div className={styles.imageButtons}>
                    <button className={styles.next} onClick={showNextImage}>
                        Next
                    </button>
                    <button className={styles.pre} onClick={showPreviousImage}>
                        Previous
                    </button>
                </div>
            </div>
            <div className={styles.description}>
                <h1>Description</h1>
                <p>
                    Rain across Greater Manchester is set to disrupt the thrilling fourth
                    Ashes test match at Emirates Old Trafford this weekend.
                </p>
                <div className={styles.price}>
                    <span>Price Range: 200 - 300 EGP</span>
                </div>
                <div className={styles.require}>
                    <button onClick={toggleChatPopup}>See Other People's Requests</button>
                </div>
            </div>
            {isChatPopupVisible && (
                <div className={styles.chatPopup}>
                    <div className={styles.closeButton} onClick={toggleChatPopup}></div>
                    <div className={styles.chat}>
                        <div className={styles.chatMessage}>
                            <div className={styles.chatMessageContent}>Hello</div>
                        </div>
                        <div className={`${styles.chatMessage} ${styles.send}`}>
                            <div className={styles.chatMessageContent}>I'm doing great, thanks!</div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.fieldSend}>
                        <input type="text" placeholder="Type your message here..." />
                        <button className={styles.sendButton}></button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnyProduct;