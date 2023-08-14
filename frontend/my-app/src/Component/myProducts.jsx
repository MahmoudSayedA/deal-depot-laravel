import React, { useState } from 'react';
import Cover from './cover';
import styles from './myProducts.module.css';
import deleteIcon from "../Images/close-but.png";


const MyProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        image: '',
        name: '',
        description: '',
        price: '',
        date: new Date().toISOString().slice(0, 10), // Set current date as default
    });
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleAddProduct = () => {
        // Validate the input fields
        if (!newProduct.name || !newProduct.price) {
            alert('Please enter a name and price for the product.');
            return;
        }

        // Create a copy of the products array
        const updatedProducts = [...products];

        if (editingIndex !== -1) {
            // Update existing product
            updatedProducts[editingIndex] = newProduct;
            setEditingIndex(-1); // Exit editing mode
        } else {
            // Add new product to the array
            updatedProducts.push(newProduct);
        }

        // Update the products state with the updated array
        setProducts(updatedProducts);
        // Reset the newProduct state to clear the input fields
        setNewProduct({
            image: '',
            name: '',
            description: '',
            price: '',
            date: new Date().toISOString().slice(0, 10),
        });
    };

    const handleEditProduct = (index) => {
        const productToEdit = products[index];
        // Set the newProduct state with the product data to edit
        setNewProduct(productToEdit);
        setEditingIndex(index);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update the newProduct state with the changed input value
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    return (
        <>
            <div>
                <Cover />
                {props.children}
            </div>
            <div className={styles.content}>
                <h1 className={styles.titlePage}>My Products</h1>
                <div className={styles.myProduct}>
                    {products.map((product, index) => (
                        <div className={styles.context} key={index}>
                            <div className={styles.product}>
                                <div>
                                    <img className={styles.image} src={product.image} alt="" />
                                </div>
                                <div className={styles.name}>{product.name}</div>
                                <div className={styles.price}>
                                    Price:
                                    <span className={styles.priceText}>{product.price}</span>
                                </div>
                                <div>
                                    <p className={styles.time}>at {product.date}</p>
                                </div>
                                <div>
                                    <img
                                        src={require("../Images/icons8-edit-50.png")}
                                        className={styles.icon}
                                        alt=""
                                        onClick={() => handleEditProduct(index)}
                                    />
                                    <img
                                        src={deleteIcon}
                                        className={styles.icon}
                                        alt=""
                                        onClick={() => deleteProduct(index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.context}>
                        <label htmlFor="image">
                            {newProduct.image ? (
                                <img className={styles.image} src={newProduct.image} alt="" />
                            ) : (
                                <img className={styles.image} src={require("../Images/personal photo.jpg")} alt="" />
                            )}
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            required
                        />
                        <input
                            type="text"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            name="date"
                            value={newProduct.date}
                            onChange={handleInputChange}
                            placeholder="Date"
                            disabled // Disable user input for date
                        />
                        <button className={styles.addButton} onClick={handleAddProduct}>
                            {editingIndex !== -1 ? 'Save' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProducts;



//call api 

// import React, { useState, useEffect } from 'react';
// import Cover from './cover';
// import styles from './myProducts.module.css';
// import deleteIcon from "../Images/close-but.png";

// const MyProducts = (props) => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     image: '',
//     name: '',
//     description: '',
//     price: '',
//     date: new Date().toISOString().slice(0, 10), // Set current date as default
//   });
//   const [editingIndex, setEditingIndex] = useState(-1);

//   useEffect(() => {
//     // Fetch products from the API
//     api.getProducts().then((fetchedProducts) => {
//       setProducts(fetchedProducts);
//     });
//   }, []);

//   const handleAddProduct = () => {
//     // Validate the input fields
//     if (!newProduct.name || !newProduct.price) {
//       alert('Please enter a name and price for the product.');
//       return;
//     }

//     if (editingIndex !== -1) {
//       // Update existing product
//       api.updateProduct(products[editingIndex].id, newProduct).then((updatedProduct) => {
//         const updatedProducts = [...products];
//         updatedProducts[editingIndex] = updatedProduct;
//         setProducts(updatedProducts);
//         setEditingIndex(-1);
//       }).catch((error) => {
//         alert(error.message);
//       });
//     } else {
//       // Add new product to the API
//       api.createProduct(newProduct).then((createdProduct) => {
//         const updatedProducts = [...products];
//         updatedProducts.push(createdProduct);
//         setProducts(updatedProducts);
//       }).catch((error) => {
//         alert(error.message);
//       });
//     }

//     // Reset the newProduct state to clear the input fields
//     setNewProduct({
//       image: '',
//       name: '',
//       description: '',
//       price: '',
//       date: new Date().toISOString().slice(0, 10),
//     });
//   };

//   const handleEditProduct = (index) => {
//     const productToEdit = products[index];
//     // Set the newProduct state with the product data to edit
//     setNewProduct(productToEdit);
//     setEditingIndex(index);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     // Update the newProduct state with the changed input value
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewProduct((prevProduct) => ({
//           ...prevProduct,
//           image: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const deleteProduct = (index) => {
//     const productToDelete = products[index];
//     api.deleteProduct(productToDelete.id).then(() => {
//       const updatedProducts = [...products];
//       updatedProducts.splice(index, 1);
//       setProducts(updatedProducts);
//     }).catch((error) => {
//       alert(error.message);
//     });
//   };

//   return (
//     <>
//       <div>
//         <Cover />
//         {props.children}
//       </div>
//       <div className={styles.content}>
//         <h1 className={styles.titlePage}>My Products</h1>
//         <div className={styles.myProduct}>
//           {products.map((product, index) => (
//             <div className={styles.context} key={index}>
//               <div className={styles.product}>
//                 <div>
//                   <img className={styles.image} src={product.image} alt="" />
//                 </div>
//                 <div className={styles.name}>{product.name}</div>
//                 <div className={styles.price}>
//                   Price:
//                   <span className={styles.priceText}>{product.price}</span>
//                 </div>
//                 <div>
//                   <p className={styles.time}>at {product.date}</p>
//                 </div>
//                 <div>
//                   <img
//                     src={require("../Images/icons8-edit-50.png")}
//                     className={styles.icon}
//                     alt=""
//                     onClick={() => handleEditProduct(index)}
//                   />
//                   <img
//                     src={deleteIcon}
//                     className={styles.icon}
//                     alt=""
//                     onClick={() => deleteProduct(index)}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className={styles.context}>
//             <label htmlFor="image">
//               {newProduct.image ? (
//                 <img className={styles.image} src={newProduct.image} alt="" />
//               ) : (
//                 <img className={styles.image} src={require("../Images/personal photo.jpg")} alt="" />
//               )}
//             </label>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             <input
//               type="text"
//               name="name"
//               value={newProduct.name}
//               onChange={handleInputChange}
//               placeholder="Product Name"
//               required
//             />
//             <input
//               type="text"
//               name="price"
//               value={newProduct.price}
//               onChange={handleInputChange}
//               placeholder="Price"
//               required
//             />
//             <input
//               type="text"
//               name="description"
//               value={newProduct.description}
//               onChange={handleInputChange}
//               placeholder="Description"
//             />
//             <input
//               type="text"
//               name="date"
//               value={newProduct.date}
//               onChange={handleInputChange}
//               placeholder="Date"
//               disabled // Disable user input for date
//             />
//             <button className={styles.addButton} onClick={handleAddProduct}>
//               {editingIndex !== -1 ? 'Save' : 'Add'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyProducts;