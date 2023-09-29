import React from 'react';
import CategoriesData from '../Data/Categories.json'; 
import { Link } from 'react-router-dom';
import img1 from '../assets/images/whishlist/img1.gif'

function Whishlist({filterValue, selectedProducts ,setSelectedProducts ,selectedCartItems
  ,setSelectedCartItems }) {
  const products = selectedProducts || [];

  // Find the selected products from the data source using their IDs.....******
  const selectedProductDetails = CategoriesData.products.filter(product => products.includes(product.id));


  const handleWishlistClick = (product) => {
    if (selectedProducts.includes(product.id)) {
      setSelectedProducts(selectedProducts.filter(id => id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product.id]);
    }
  };



  //add to cart
  const handleAddToCart = (product) => {
    if (selectedCartItems.includes(product.id)) {
      setSelectedCartItems(selectedCartItems.filter(id => id !== product.id));
    } else {
      setSelectedCartItems([...selectedCartItems, product.id]);
    }
  };

  return (
    <div className="wrapper">
    <div className="wishlist-container">
      {selectedProductDetails.length > 0 ? (
        selectedProductDetails && selectedProductDetails.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      ).map((product) => (
          <div className="s-p-c3-box wishlist-container-box" key={product.id}>
            {/* Render product details here */}
            <div className="s-p-c3-image-box">
              <Link to={`/categories-detail/${product.id}`} className="img-height">
                <img className="s-p-c3-img" src={product.image} alt="product-img" />
              </Link>
            </div>
            <div className="s-p-c3-detailsbox">
              <div className="s-p-c3-details">
                <div className="s-p-c3-details1">
                  <h3 className="s-p-c3-productname">{product.name}</h3>
                  <label htmlFor="">
                    {product.rating}
                    <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
                    <span>Rating</span>
                  </label>
                </div>
                <div className="s-p-c3-details2">
                  <div className="s-p-c3-discounted-price">{product.discountPrice}</div>
                  <div className="s-p-c3-price">{product.price}</div>
                </div>
              </div>
              <div className="s-p-c3-Product-type">{product.type}</div>
              <div className="s-p-c3-buttons">
              <button
                      className={`s-p-c3-addtocart ${
                        selectedCartItems.includes(product.id) ? 'change-in-color' : ''
                      }`}
                      onClick={() => handleAddToCart(product)} 
                    >
                  {selectedCartItems.includes(product.id) ? 'Remove from bag ' : 'Add to Bag'}
                </button>
                <button
                    className={`s-p-c3-save ${selectedProducts.includes(product.id) ? 'red-color' : ''}`}
                    onClick={() => handleWishlistClick(product)}
                  >
                    <i class="fa-solid fa-bookmark"></i>
                  </button>


              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-box">
          <img src={img1} alt="" />
          <h3 className="empty-box-text1">NOTHING TO SHOW!</h3>
          <p className="empty-box-text2">
            Unlock Your Shopping Desires: Fill Your Empty Wishlist
          </p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Whishlist;
