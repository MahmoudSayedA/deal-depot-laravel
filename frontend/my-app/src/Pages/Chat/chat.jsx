import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEnvelope, faBackward } from '@fortawesome/free-solid-svg-icons';

const ChatPopup = () => {
    const [isChatPopupVisible, setIsChatPopupVisible] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const toggleChatPopup = () => {
        setIsChatPopupVisible(!isChatPopupVisible);
    };

    return (
        <div className={styles.message}>
            <button className={styles.button} onClick={toggleChatPopup}>
                <FontAwesomeIcon icon={faEnvelope} />
            </button>
            {isChatPopupVisible && (
                <div className={styles.chatPopup}>
                    <hr />
                    <div className={styles.chat}>
                        <div className={`${styles.chatMessage} ${styles.send}`}>
                            <div className={styles.chatMessageContent}>
                                <p>Hello</p>
                            </div>
                            <img
                                className="img-fluid rounded-circle"
                                src="images/any-product/human.png"
                                alt=""
                            />
                        </div>
                        <div className={`${styles.chatMessage} ${styles.receive}`}>
                            <img
                                className="img-fluid rounded-circle"
                                src="images/any-product/human.png"
                                alt=""
                            />
                            <div className={styles.chatMessageContent}>
                                <p>I'm doing great, thanks!</p>
                            </div>
                        </div>
                        <div className={`${styles.chatMessage} ${styles.send}`}>
                            <div className={styles.chatMessageContent}>
                                <p>I'm doing great, thanks!</p>
                            </div>
                            <img
                                className="img-fluid rounded-circle"
                                src="images/any-product/human.png"
                                alt=""
                            />
                        </div>
                        <div className={styles.fieldSend}>
                            <input className={styles.typeHere} type="text" placeholder="type here" />
                            <button className={styles.sendButton}></button>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={toggleChatPopup}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}
            <Link to={`/product/${params.productId}`}>
                <button onClick={() => navigate(-1)} className={styles.buttonback}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
            </Link>
        </div>
    );
};

export default ChatPopup;