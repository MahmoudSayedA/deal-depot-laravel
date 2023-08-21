import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './productsList.module.css';
import Product from './product';

function ProductsList() {
    const api_url = 'https://fakestoreapi.com/products';
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const getProducts = () => {
        fetch(api_url)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            });
    };

    const getCategories = () => {
        fetch(`${api_url}/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    };

    const getProductInCategory = (catName) => {
        fetch(`${api_url}/category/${catName}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            });
    };

    const handleSearch = (searchTerm) => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    return (
        <>
            <div className={styles.sidebar} style={{ transform: `translateX(${showSidebar ? '0' : '-100%'})` }}>
                {categories.map((cat) => (
                    <div className={styles.categories} key={cat}>
                        <button
                            onClick={() => {
                                getProductInCategory(cat);
                            }}
                            className="btn btn-info"
                        >
                            {cat}
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.content}>
                <button onClick={() => setShowSidebar(!showSidebar)}>Show/Hide Categories</button>
                <h2 className={styles.Header}>Our Products</h2>
                <div className={styles.container}>
                    <div className={styles.productContent}>
                        {filteredProducts.map((product) => (
                            <div className={styles.product} key={product.id}>
                                <Link to={`/addOffer/${product.id}`} className={styles.productLink}>
                                    <Product product={product} showButton={true} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductsList;