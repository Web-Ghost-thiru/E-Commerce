import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/products?" + searchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  }, [searchParams]);

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} index={index} />;
          })}
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Home;
