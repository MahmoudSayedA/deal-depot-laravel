import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./productOffers.module.css";
import Cover from '../../Component/cover';
import classNames from "classnames/bind";
import personalPhoto from '../../Images/personal photo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faMapLocationDot, faStar, faArrowLeft, faArrowRight, faSquarePlus, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretDown } from "@fortawesome/free-regular-svg-icons";

const images = [
    'Images/football2.jpg',
    'Images/football.jpg',
];
const cx = classNames.bind(styles);

const AddOffer = ({ children }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const showNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const showPreviousImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };


    const [showSideShow, setShowSideShow] = useState(false);

    const toggleSideShow = () => {
        setShowSideShow((prevShowSideShow) => !prevShowSideShow);
    };

    return (
        <>
            <div>
                <Cover />
                {children}
            </div>
            <div className={styles.container}>
                <div className={styles.pageCatigory}>Football</div>
                <div className={styles.imgDes}>
                    <img src={images[currentImageIndex]} alt="" />
                    <div className={styles.imageButtons}>
                        <div className={styles.pre}>
                            <button onClick={showPreviousImage} >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                        <div className={styles.next}>
                            <button onClick={showNextImage} >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>
                    </div>
                    <p className={styles.des}>Description</p>
                </div>
                <div className={styles.descriptionSection}>
                    <p>Price range: 200 : 250</p>
                </div>
                <section className={styles.offers}>
                    <div className={styles.descriptionOffers}>
                        <img src={personalPhoto} alt="" />
                        <p>Samuel</p>
                        <p>250</p>
                        <p>at: 12/3/23 12:03pm</p>
                    </div>
                    <div className={styles.descriptionOffers}>
                        <img src={personalPhoto} alt="" />
                        <p>Samuel</p>
                        <p>250</p>
                        <p>at: 12/3/23 12:03pm</p>
                    </div>
                    <div className={styles.descriptionOffers}>
                        <img src={personalPhoto} alt="" />
                        <p>Samuel</p>
                        <p>250</p>
                        <p>at: 12/3/23 12:03pm</p>
                    </div>
                </section>
                <div className={styles.more} onClick={toggleSideShow}>
                    <FontAwesomeIcon className={styles.more1} icon={faSquareCaretDown} />
                </div>
                <div className={cx(styles.sideShow, { [styles.show]: showSideShow })}>
                    <div className={styles.personalImg}>
                        <img src={require("../../Images/personal photo.jpg")} alt="" />
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
                <div className={styles.addOffer}>
                    <Link to="/addOffer">
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </Link>    
                        <p>Add Offer</p>    
                </div>
                <div className={styles.message}>
                    <Link to="/chat">
                        <button className={styles.button}>
                            <FontAwesomeIcon icon={faMessage} />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AddOffer;