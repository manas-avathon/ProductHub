import type React from "react";
import ProductCard from "../components/ProductCard/ProductCard";
// import { useEffect, useState } from "react";
// import type { Product } from "../type";
// import axios from "axios";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Product } from "../type";
import SearchBar from "../components/SearchBar/SearchBar";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
// import { useFetch } from "../hooks/useFetch";

const ProductPage: React.FC = () => {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const {data:products, loading, error} = useFetch<any>('/products');

	const [searchTerm, setSearchTerm] = useState<string>('');
	// const [products, setProducts] = useState<Product[]>([]);
	// const [loading, setLoading] = useState<boolean>(true);
	// const [error, setError] = useState<string | null>(null);

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"https://dummyjson.com/products"
	// 			);
	// 			setProducts(response.data.products);
	// 		} catch (err) {
	// 			if (err instanceof Error) {
	// 				setError(err.message);
	// 			} else {
	// 				setError("An unknown error occurred");
	// 			}
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchProducts();
	// }, []);

	const debouncedTerm = useDebounce(searchTerm,1000);

	const filteredProducts = products?.products?.filter((product : Product) =>
		product.title.toLowerCase().includes(debouncedTerm.toLowerCase())
	);

	if(!products){
		return <div className="text-center">No items Present</div>;
	}

	if (loading) {
		return <div className="text-center">Loading products...</div>;
	}
	if (error) {
		return <div className="text-center text-red-500">Error: {error}</div>;
	}

	return (
		<section>
			<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pl-40 pr-40 pt-10">
				{ filteredProducts.map((prod: Product) => (
					<Link to={`/products/${prod.id}`}>
						<ProductCard key={prod.id} product={prod} />
					</Link>
				))}
			</div>
		</section>
	);
};

export default ProductPage;
