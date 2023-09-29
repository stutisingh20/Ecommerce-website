import React, { useState, useEffect } from 'react';
import CategoriesData from '../Data/Categories.json';
// import Whishlist from './Whishlist';
import { Link } from 'react-router-dom';
import img1 from "../assets/images/cart/img-1.png" ;



function Cart({ filterValue, selectedCartItems, setSelectedCartItems, selectedProducts, setSelectedProducts, setCartDetails }) {
  const productsAllData = CategoriesData.products;

   // Filter the products based on selectedCartItems
   const cartItemsData = productsAllData.filter(product => selectedCartItems.includes(product.id));

   // Initialize cart items with quantity property
   const [cartItems, setCartItems] = useState(
     cartItemsData.map(product => ({ ...product, quantity: 1 }))
   );
 
   // Calculate the total price
   const calculateTotalPrice = () => {
     return cartItems.reduce((totalPrice, cartItem) => {
       return totalPrice + parseFloat(cartItem.discountPrice) * cartItem.quantity;
     }, 0);
   };

  const handleQuantityChange = (productId, action) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = prevCartItems.map(cartItem => {
        if (cartItem.id === productId) {
          if (action === 'increment') {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else if (action === 'decrement' && cartItem.quantity > 1) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
        }
        return cartItem;
      });
      return updatedCartItems;
    });
  };

  

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== productId);
    setCartItems(updatedCartItems);
  };

  // Update selectedCartItems when cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setSelectedCartItems(cartItems.map(item => item.id));
    setCartDetails(cartItems);
  }, [cartItems, setSelectedCartItems, setCartDetails]);



  // const [cartItemCount, setCartItemCount] = useState(cartItems.length);

  // useEffect(() => {
  //   setCartItemCount(cartItems.length);
  // }, [cartItems]);


  // Whishlist save
  const handleWishlistClick = (product) => {
    if (selectedProducts.includes(product.id)) {
      setSelectedProducts(selectedProducts.filter(id => id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product.id]);
    }
  };




  return (
    <div className="wrapper">
      <div className="a-t-c-wrapper">
        <h3 className="a-t-c-heading">Bag({cartItems.length})</h3>
        <div className="a-t-c-container-box">
          <div className="a-t-c-container1">
            {cartItems.length > 0 ? (
              cartItems.filter((product) =>
                product.name.toLowerCase().includes(filterValue.toLowerCase())
              ).map(cartItem => (
                <div className="a-t-c-productBox" key={cartItem.id}>
                  <div className="a-t-c-details">
                    <img
                      src={cartItem.image}
                      className="atc-img"
                      alt={cartItem.name}
                    />
                    <div className="a-t-c-info">
                      <h2>{cartItem.name}</h2>
                      <div className="a-t-c-quantity">
                        <label htmlFor="">Quantity: </label>
                        <a

                          onClick={() => handleQuantityChange(cartItem.id, 'decrement')}
                          className={` ${cartItem.quantity === 1 ? 'no-drop' : ''}`}
                        >
                          <i className="fa-solid fa-minus" />
                        </a>
                        <span>{cartItem.quantity}</span>
                        <a

                          onClick={() => handleQuantityChange(cartItem.id, 'increment')}
                        >
                          <i className="fa-solid fa-plus" />
                        </a>
                      </div>
                      <div className="a-t-c-buttons">
                        <a className="atc-btn1" onClick={() => handleRemoveFromCart(cartItem.id)}>
                          Remove from bag
                        </a>
                        <a
                          className={`s-p-c3-save ${selectedProducts.includes(cartItem.id) ? 'red-color' : ''}`}
                          onClick={() => handleWishlistClick(cartItem)}
                        >
                          <i className="fa-solid fa-bookmark" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="atc-priceBox a_i_p_price ">
                    <label htmlFor="">{cartItem.discountPrice}</label>
                    <span>₹{cartItem.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-box">
                <img className="empty-cart" src={img1} alt="" />
                <h3 className="empty-box-text1">Hey, it feels so light!</h3>
                <p className="empty-box-text2">
                  There's nothing in your bag. Let's add some items.
                </p>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="a-t-c-container2">
              <h3 className="a-t-c-c2-header">Price Details</h3>
              <div className="a-t-c-c2-billingInfo-container">
                {cartItems.map(cartItem => (
                  <div className="a-t-c-c2-billingInfo" key={cartItem.id}>
                    <label className="a-t-c-c2-itemName">
                      {cartItem.name} ({cartItem.quantity} item)
                    </label>
                    <span className="a-t-c-c2-price">₹ {parseFloat(cartItem.discountPrice) * cartItem.quantity}</span>

                    
                  </div>


                ))}
              </div>
              <div className="a-t-c-c2-total-container-Box">
                <label htmlFor="" className="a-t-c-c2-total">
                  Total
                </label>
                <span htmlFor="" className="a-t-c-c2-price2">
                  ₹ {calculateTotalPrice()}
                </span>
              </div>
              <div>
                <Link
                  to={'/billingDetails'}
                  className="a-t-c-c2-button"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
