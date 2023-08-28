import React from 'react';
import styles from "./product.module.css";
import { Link } from 'react-router-dom';


function Product(props) {
    const { product, showButton } = props;


    return (
        <>
            <div className={styles.container}>
                <img src={product.image} className={styles.img} alt={product.title} />
                <div className="card-body">
                    <h5 className={styles.pageCategory}>{product.title}</h5>
                    <p className={styles.des}>{product.description}</p>
                    <div className={styles.descriptionSection}>
                        <p>Price: {product.price}$</p>
                    </div>
                    {showButton && (
                        <div className={styles.iconDes}>
                            <Link to={`/product/${product.id}`}>
                                <button>
                                    Details
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Product;