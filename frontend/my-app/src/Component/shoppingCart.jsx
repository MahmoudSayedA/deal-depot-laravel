import React, { Component } from "react";
import Product from "./product";

class ShoppingCart extends Component {
    state = {
        product: [
            {id: 1, name: "T-shirt", count: 2},
            {id: 1, name: "Football", count: 3},
            {id: 1, name: "Bag", count: 1},
        ]
    };

    render() {
        return (
            <>
                <h1>Shopping Cart</h1>
                <Product/>
            </>
        );
    }

}

export default ShoppingCart;