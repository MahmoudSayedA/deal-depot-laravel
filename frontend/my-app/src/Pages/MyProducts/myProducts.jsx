import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Cover from '../../Component/Cover/cover';
import styles from './myProducts.module.css';
import deleteIcon from "../../assets/Images/close-but.png";

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
    const [currentDate, setCurrentDate] = useState('');
    const editRef = useRef(null);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        setCurrentDate(new Date().toISOString().slice(0, 10)); // Update the current date
    }, [fetchProducts]);

    useEffect(() => {
        if (editingIndex !== -1) {
            editRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [editingIndex]);

    const addProduct = async () => {
        try {
            const response = await axios.post('http://localhost:3000/products', newProduct);
            setProducts([...products, response.data]);
            resetNewProduct(); // Call the resetNewProduct function
        } catch (error) {
            console.error(error);
            alert('Failed to add the product.');
        }
    };

    const updateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${editingIndex}`, newProduct);
            const updatedProducts = [...products];
            updatedProducts[editingIndex] = response.data;
            setProducts(updatedProducts);
            resetNewProduct(); // Call the resetNewProduct function
        } catch (error) {
            console.error(error);
            alert('Failed to update the product.');
        }
    };

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price) {
            alert('Please enter a name and price for the product.');
            return;
        }

        if (!newProduct.image) {
            alert('Please choose an image for the product.');
            return;
        }

        if (editingIndex !== -1) {
            updateProduct();
        } else {
            addProduct();
        }
    };

    const handleEditProduct = (index) => {
        const productToEdit = products[index];
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

    const deleteProduct = async (index) => {
        try {
            const productId = products[index].id;
            await axios.delete(`http://localhost:3000/products/${productId}`);
            const updatedProducts = [...products];
            updatedProducts.splice(index, 1);
            setProducts(updatedProducts);
        } catch (error) {
            console.error(error);
        }
    };

    const resetNewProduct = () => {
        setNewProduct({
            image: '',
            name: '',
            description: '',
            price: '',
            date: new Date().toISOString().slice(0, 10),
        });
        setEditingIndex(-1);
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
                                    <div className={styles.description}>
                                        Description:
                                        <span className={styles.descriptionText}>{product.description}</span>
                                    </div>
                                    <div className={styles.date}>
                                        Date:
                                        <span className={styles.dateText}>{currentDate}</span>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button className={styles.editButton} onClick={() => handleEditProduct(index)}>
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => deleteProduct(index)}>
                                        <img className={styles.deleteIcon} src={deleteIcon} alt="delete" />
                                    </button>
                                </div>
                            </div>
                        
                    ))}
                </div>
            </div>
            <div  ref={editRef}>
                    <div className={styles.form}>
                        <h2> {editingIndex !== -1 ? 'Update Product' : 'Add New Product'}</h2>
                        <div className={styles.inputGroup}>
                            <label htmlFor="image"><span>Image:</span></label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name"><span>Name:</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="description"><span>Description:</span></label>
                            <textarea
                                id="description"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="price"><span>Price:</span></label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <button className={styles.addButton} onClick={handleAddProduct}>
                                {editingIndex !== -1 ? 'Update' : 'Add'}
                            </button>
                            <button className={styles.resetButton} onClick={resetNewProduct}>
                                Reset
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