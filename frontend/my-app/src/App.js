import React, { Component } from 'react';
import { UserProvider } from './UserContext';
import {SellerProvider} from './SellerContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from '../src/FormsComponent/Login/login';
import Register from '../src/FormsComponent/Register/register';
import Home from '../src/Pages/Home/home';
import MyProducts from '../src/Pages/MyProducts/myProducts';
import MyOffers from '../src/Pages/MyOffers/myOffers';
import About from '../src/Pages/About/about';
import Services from '../src/Pages/Services/services';
import Contact from '../src/FormsComponent/Contact/contact';
import Cover from '../src/Component/Cover/cover';
import Personal from '../src/Pages/Personal/personal';
import Product from '../src/Pages/Product/product';
import ProductDetails from '../src/Pages/ProductDetails/productDetails';
import ProductsList from '../src/Pages/ProductsList/productsList';
import ChatPopup from '../src/Pages/Chat/chat';
import AddOffer from '../src/Pages/AddOffer/addOffer';
import ProductOffers from '../src/Pages/ProductOffers/productOffers';


class App extends Component {


  state = {
    products: [],
  };


  componentDidMount() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
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
            <Route path="/personal" element={<UserProvider><Personal /></UserProvider>} />
            <Route path="/product" element={<Product />} />
            <Route path="product/:productId" element={<SellerProvider> <ProductDetails /> </SellerProvider>} />
            <Route path="/productsList" element={<ProductsList products={this.state.products} />} />
            <Route path="/chat" element={<ChatPopup />} />
            <Route path="/addOffer/:productId" element={<SellerProvider> <AddOffer /> </SellerProvider>} />
            <Route path="/productOffers" element={<ProductOffers />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;