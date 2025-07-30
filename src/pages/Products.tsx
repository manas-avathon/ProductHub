import type React from "react";
import ProductPage from "./ProductPage";


const Products : React.FC = () =>{
    return(
        <>
        <section className="text-center mt-4">
            <h1 className="text-3xl font-bold pb-4">Product Explorer</h1>
            <p className="text-gray-800">Discover amazing products and add them to your wishlist</p>
        </section>
        <section>
            <ProductPage/>
        </section>
        </>
    );
};

export default Products;