import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from '../Pages/Login/login';
import Register from '../Pages/Register/register';
import Home from '../Pages/Home/home';
import MyProducts from '../Pages/MyProducts/myProducts';
import MyOffers from '../Pages/MyOffers/myOffers';
import About from '../Pages/About/about';
import Services from '../Pages/Services/services';
import Contact from '../Pages/Contact/contact';
import Cover from './cover';
import Personal from '../Pages/Personal/personal';
import Product from '../Pages/Product/product';
import ProductDetails from '../Pages/ProductDetails/productDetails';
import ProductsList from '../Pages/ProductsList/productsList';
import ChatPopup from '../Pages/Chat/chat';
import AddOffer from '../Pages/AddOffer/addOffer';
import ProductOffers from '../Pages/ProductOffers/productOffers';


class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get('http://localhost:3000/products')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<>
              <Home />
              <ProductsList products={this.state.products} />
            </>} />
            <Route path="/home" element={<>
              <Home />
              <ProductsList products={this.state.products} />
            </>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myProducts" element={<MyProducts />} />
            <Route path="/myOffers/:productId" element={<MyOffers />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cover" element={<Cover />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/product" element={<Product />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="/productsList" element={<ProductsList products={this.state.products} />} />
            <Route path="/chat" element={<ChatPopup />} />
            <Route path="/addOffer/:productId" element={<AddOffer />} />
            <Route path="/productOffers" element={<ProductOffers />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;