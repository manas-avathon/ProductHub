import type React from "react";
import { useWishlist } from "../components/WishlistContext";
import { Link } from "react-router-dom";
import discountedPrice from "../utils/priceUtils";

const Wishlist: React.FC = () => {
	const { wishlistItems, removeFromWishlist } = useWishlist();

	if (wishlistItems.length === 0) {
		return (
			<div className="bg-white m-4 p-4 text-center">
				<h1 className="font-semibold text-4xl p-4">My Wishlist</h1>
				<p className="text-2xl pb-4">
					Wishlist is empty add some products
				</p>
				<Link to="/" className="text-blue-500">
					&larr; Back to products
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="pl-10 pt-4">
				<Link to="/" className="text-blue-500 p-8 mt-2">
					&larr; Back to products
				</Link>
			</div>
			<div className="pl-4 pr-4 ml-8 mr-8">
				<div>
					<h1 className="text-center text-3xl font-semibold">
						My Wishlist
					</h1>
                    <p className="pl-8 pt-8">Your wishlist contains {wishlistItems.length} items</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pl-8 pr-8 mt-4">
					{wishlistItems.map((item) => (
						<div className="bg-white shadow-md w-full rounded-md">
							<div className="h-64 flex justify-center">
								<img src={item.thumbnail} alt="this is image" />
							</div>
							<div className="pl-4 pr-4 pt-2">
								<h2 className="font-semibold line-clamp-1">{item.title}</h2>
								<p className="text-blue-500 font-semibold">${discountedPrice(item.price, item.discountPercentage)}</p>
							</div>
							<div className="flex justify-center bg-red-500 text-white p-2 font-semibold m-4 rounded-md shadow-md">
								<button onClick={() => removeFromWishlist(item.id)} className="cursor-pointer">
									Remove Product
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Wishlist;
