import '@testing-library/jest-dom';
import { render,screen } from "@testing-library/react";
import type { Product } from "../type";
import { useWishlist } from "./WishlistContext";
import ProductCard from "./ProductCard";

jest.mock("./WishlistContext");
const mockedUseWishlist = useWishlist as jest.Mock;

const mockProduct: Product = {
	id: 1,
	title: "Classic T-Shirt",
	price: 19.99,
	discountPercentage: 10,
	rating: 4.5,
	tags: ["clothing", "top"],
	thumbnail: "image.jpg",
	// other required fields...
	description: "",
	stock: 0,
	brand: "",
	sku: "",
	weight: 0,
	dimensions: { width: 0, height: 0, depth: 0 },
	warrantyInformation: "",
	shippingInformation: "",
	availabilityStatus: "",
    category:"",
	reviews: [],
	returnPolicy: "",
	minimumOrderQuantity: 0,
	meta: { createdAt: "", updatedAt: "", barcode: "", qrCode: "" },
	images: [],
};

test('renders product rating', () => {
    mockedUseWishlist.mockReturnValue({
        isInWishlist : () => false,
        addToWishlist : jest.fn(),
        removeFromWishlist : jest.fn(), 
    });

    render(<ProductCard product={mockProduct}/>);
	expect(screen.getByText('4.5')).toBeInTheDocument();
}); 

test('renders product title', () => {
    mockedUseWishlist.mockReturnValue({
        isInWishlist : () => false,
        addToWishlist : jest.fn(),
        removeFromWishlist : jest.fn(), 
    });

    render(<ProductCard product={mockProduct}/>);
    expect(screen.getByText('Classic T-Shirt')).toBeInTheDocument();
});

test('renders product price', () => {
    mockedUseWishlist.mockReturnValue({
        isInWishlist : () => false,
        addToWishlist : jest.fn(),
        removeFromWishlist : jest.fn(), 
    });

    render(<ProductCard product={mockProduct}/>);
    expect(screen.getByText('$19.99')).toBeInTheDocument();
});
