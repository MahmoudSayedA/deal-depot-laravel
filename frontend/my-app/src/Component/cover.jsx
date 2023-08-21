import React, { useState } from 'react';
import styles from './cover.module.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cover(props) {
  const { outer, inner, logo, navbar, searchbar } = styles;
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSearch) {
      props.onSearch(searchTerm);
    }
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

      <div className={searchbar}>
        <form onSubmit={handleSubmit}>
          <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search..." />
          <button type="submit"> 
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cover;