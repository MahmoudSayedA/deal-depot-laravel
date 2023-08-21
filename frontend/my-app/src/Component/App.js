import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './home';
import MyProducts from './myProducts';
import MyOffers from './myOffers';
import About from './about';
import Services from './services';
import Contact from './contact';
import Cover from './cover';
import Personal from './personal';
import Product from './product';
import ProductDetails from './productDetails';
import ProductsList from './productsList';
import AnyProduct from './any';
import ChatPopup from './chat';
import AddOffer from './addOffer';
import ProductOffers from './productOffers';
import ShoppingCart from './shoppingCart';
import Categories from './categories';


function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<>
                        <Home />
                        <ProductsList />
                    </>} />
                    <Route path="/home" element={<>
                        <Home />
                        <ProductsList />
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
                    <Route path="/productsList" element={<ProductsList />} />
                    <Route path="/any" element={<AnyProduct />} />
                    <Route path="/chat" element={<ChatPopup />} />
                    <Route path="/addOffer/:productId" element={<AddOffer />} />
                    <Route path="/productOffers" element={<ProductOffers />} />
                    <Route path="/shoppingCart" element={<ShoppingCart />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;