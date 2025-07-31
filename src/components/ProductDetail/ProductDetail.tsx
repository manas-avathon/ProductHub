import type React from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../../type";
import staricon from "/Users/Manas Singh/Desktop/ProductHub/src/assets/star.png";
import discountedPrice from "../../utils/priceUtils";
import { useWishlist } from "../WishlistContext";
import InterestForm from "../InterestForm/InterestForm";
import { useFetch } from "../../hooks/useFetch";


type IdParams = {
	id: string;
};

const ProductDetail: React.FC = () => {
	const { id } = useParams<IdParams>();

	const {addToWishlist, isInWishlist} = useWishlist();

	const {data:productDetail, loading, error} = useFetch<Product>(`/products/${id}`);

	if (loading) {
		return <div className="text-center mt-5">Loading Product Details..</div>;
	}

	if (error) {
		return <div className="text-center mt-5 text-red-500">Error :{error}</div>;
	}

	if (!productDetail) {
		return <div className="text-center mt-5">Product not found</div>;
	}

	const itemAdded = isInWishlist(productDetail.id);

	return (
		<>
			<div className="pl-10 mb-4 mt-4 text-blue-500 font-semibold">
				<Link to={"/"}>&larr; Back to Products</Link>
			</div>
			<div>
				<section className="flex flex-col md:flex-row gap-4 ml-10 mr-10">
					<div className="w-full md:w-1/2 p-4 bg-white shadow-md">
						<div className="flex items-center justify-center">
							<img src={productDetail.thumbnail} alt={productDetail.title} />
						</div>
					</div>
					<div className="w-full md:w-1/2 p-4">
						<div>
							{productDetail.tags.map((tag) => (
								<span key={tag} className="bg-white rounded-full text-center font-semibold text-sm pl-2 pr-2 mr-2 pb-1">{tag}</span>
							))}
						</div>
						<div>
							<h2 className="mt-4 font-semibold text-2xl">{productDetail.title}</h2>
							<div className="flex items-baseline mt-2">
								<img className="w-4 mr-2" src={staricon} alt="this" />
								<span className="mb-2">{productDetail.rating.toFixed(1)}</span>
							</div>
							<div>
								<span className="mr-4 text-2xl text-blue-500 font-bold">${discountedPrice(productDetail.price, productDetail.discountPercentage)}</span>
								<span className="mr-4 line-through text-sm">${productDetail.price}</span>
								<span className="bg-red-500 rounded-full pl-2 pr-2 text-sm">-{productDetail.discountPercentage}% OFF</span>
							</div>
							<div className="mt-4">
								<p>{productDetail.description}</p>
							</div>
							<div className="mt-4 flex gap-4">
								<button className="bg-blue-950 text-white font-semibold rounded-md p-4 md:w-1/2">Add to Cart</button>
								<button onClick={() => itemAdded ? '' : addToWishlist(productDetail)}
								className="bg-white rounded-md font-semibold p-4 md:w-1/2 hover:cursor-pointer disabled:cursor-not-allowed" disabled={itemAdded} >{itemAdded ? 'Item Added' : 'Add to Wishlist'}</button>
							</div>
							<div>
								<p className="pt-4">
									Brand : <strong>{productDetail.brand}</strong>
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-white shadow-md ml-10 mr-10 mt-5 p-4">
					<h2 className="font-semibold text-2xl text-center">Reviews</h2>
					<div className="grid grid-cols-3 pl-4 pr-4">
						{productDetail.reviews.map((review, index) => (
							<div key={index} className="p-4 bg-gray-200 shadow-md m-4">
								<div className="grid grid-cols-2 gap-6">
									<span>
										Rating : <strong>{review.rating.toFixed(1)}</strong>
									</span>
									<span>Date : {review.date.substring(0, 10)}</span>
								</div>
								<p className="font-semibold">{review.comment}</p>
								<p>{review.reviewerName}</p>
								<p>{review.reviewerEmail}</p>
							</div>
						))}
					</div>
				</section>
				<section className="flex flex-col md:flex-row gap-4 ml-10 mr-10 pb-4 bg-white shadow-md">
					<div className="w-full md:w-1/2">
						<h2 className="text-2xl font-semibold pl-8">More Information</h2>
						<div className="pl-8 pt-4">
							<p>Warranty : <strong>{productDetail.warrantyInformation}</strong></p>
							<p>Shipping Information : <strong>{productDetail.shippingInformation}</strong></p>
							<p>Availability Status : <strong>{productDetail.availabilityStatus}</strong></p>
							<p>Minimum Order Quantity : <strong>{productDetail.minimumOrderQuantity}</strong></p>
							<p>Return Policy : <strong>{productDetail.returnPolicy}</strong></p>
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<h2 className="text-2xl font-semibold pl-8">Interested in this Product ?</h2>
						<InterestForm/>
					</div>
				</section>
			</div>
		</>
	);
};

export default ProductDetail;
