import React from "react";
import type { Product } from "../../type";
import discountedPrice from "../../utils/priceUtils";
import notInWishlist from "../../assets/heart.png";
import inWishlist from "../../assets/red heart.png";
import { useWishlist } from "../WishlistContext";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	
	const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
	const itemAdded = isInWishlist(product.id);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div>
				<span className="absolute m-2 bg-red-600 text-white text-sm rounded-full pl-2 pr-2 z-1">
					-{product.discountPercentage}%
				</span>
				<div
					className="flex justify-end"
					onClick={(event) => {
						event.stopPropagation();
						event.preventDefault();
						if (!itemAdded) {
							addToWishlist(product);
						} else {
							removeFromWishlist(product.id);
						}
					}}
				>
					<button>
						<div className="w-6 z-1 mt-2 mr-3 cursor-pointer">
							<img
								src={itemAdded ? inWishlist : notInWishlist}
								alt="this is image"
							/>
						</div>
					</button>
				</div>
				<div className="lg:h-52 md:h-28">
					<img
						className="relative z-0"
						src={product.thumbnail}
						alt={product.title}
					/>
				</div>
			</div>
			<div className="p-4">
				<div className="flex flex-wrap gap-2 mb-2">
					{product.tags.map((tag) => (
						<span key={tag} className="bg-gray-200 rounded-full text-center pl-2 pr-2 pb-1 font-semibold text-sm">
							{tag}
						</span>
					))}
				</div>
				<div>
					<h2 className="font-semibold mb-2 line-clamp-1">
						{product.title}
					</h2>
					<div className="flex items-baseline">
						<img
							className="w-4 mr-1"
							src="src\assets\star.png"
							alt="this is star"
						/>
						<span className="mb-2">
							{product.rating.toFixed(1)}
						</span>
					</div>
					<div>
						<span className="mr-2 text-blue-500 font-bold">
							$
							{discountedPrice(
								product.price,
								product.discountPercentage
							)}
						</span>
						<span className="text-sm line-through">
							${product.price}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
