import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast   } from "react-toastify";


function ProductDetail({cartItems,setCartItems}) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/product/" + id)
      .then((res) => res.json())
      .then((res) => setProduct(res.product));
  });

    function addToCart(){
        const itemExist= cartItems.find((item)=> item.product._id === product._id)
        if(!itemExist){
            const newItem ={product,qty}
            setCartItems((prev)=>[...prev,newItem])
            toast.success("Item Added to cart",{
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                })
        }
    }

    function increaseQty(){
        if(product.stock == qty){
            return;
        }
        setQty((prev)=> prev  + 1)
    }
    function decreaseQty(){
        if(qty > 1){
            setQty((prev)=> prev-1)
        }
        
    }
  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].image}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">#product {product._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>

            <hr />

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

              <input
                type="number"
                className="form-control count d-inline"
                value={qty}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCart}
              disabled={product.stock == 0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>
            
            <div className="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetail;
