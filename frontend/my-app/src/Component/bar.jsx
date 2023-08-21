import React, { useState } from 'react';
import styles from './cover.module.css';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={searchbar}>
                <SearchBar onSearch={handleSearch} />
                <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search..." />
                <button type="submit">Search</button>
            </div>
        </form>
    );
}

function Cover() {
    const { outer, inner, logo, navbar, searchbar } = styles;

    const handleSearch = (searchTerm) => {
        // Handle search logic here
        console.log(searchTerm);
    };

    return (
        <div className={outer}>
            <div className={inner} />
            <img className={logo} alt="Company Logo" src={require("../Images/logo.jpeg")} />

            <div className={navbar}>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/myproducts">My Products</a></li>
                        <li><a href="/myoffers">My Offers</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </nav>
            </div>

        </div>
    );
}

export default Cover;