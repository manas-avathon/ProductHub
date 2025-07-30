import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { Product } from "../../type";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";
import { useWishlist } from "../WishlistContext";

jest.mock("../WishlistContext");
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
	category: "",
	reviews: [],
	returnPolicy: "",
	minimumOrderQuantity: 0,
	meta: { createdAt: "", updatedAt: "", barcode: "", qrCode: "" },
	images: [],
};

describe("ProductCard", () => {
	test("Discount Percentage is present", () => {
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => false,
			addToWishlist: jest.fn(),
			removeFromWishlist: jest.fn(),
		});
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText("-10%")).toBeInTheDocument();
	});

	test("Title is present", () => {
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => false,
			addToWishlist: jest.fn(),
			removeFromWishlist: jest.fn(),
		});
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText("Classic T-Shirt")).toBeInTheDocument();
	});

	test("Rating is present", () => {
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => false,
			addToWishlist: jest.fn(),
			removeFromWishlist: jest.fn(),
		});
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText("4.5")).toBeInTheDocument();
	});

	test("Original price is present", () => {
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => false,
			addToWishlist: jest.fn(),
			removeFromWishlist: jest.fn(),
		});
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText("$19.99")).toBeInTheDocument();
	});

	test("All tags are present", () => {
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => false,
			addToWishlist: jest.fn(),
			removeFromWishlist: jest.fn(),
		});
		render(<ProductCard product={mockProduct} />);

		mockProduct.tags.forEach((tag) => {
			expect(screen.getByText(tag)).toBeInTheDocument();
		});
	});

	test("calls addToWishlist when the product is not in the wishlist", async () => {
		const mockAddToWishlist = jest.fn();
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => false,
			addToWishlist: mockAddToWishlist,
			removeFromWishlist: jest.fn(),
		});

		render(<ProductCard product={mockProduct} />);

		const wishlistButton = screen.getByRole("button");
		await userEvent.click(wishlistButton);
		expect(mockAddToWishlist).toHaveBeenCalledWith(mockProduct);
	});

	test("calls removeFromWishlist when the product is in the wishlist", async () => {
		const mockRemoveFromWishlist = jest.fn();
		mockedUseWishlist.mockReturnValue({
			isInWishlist: () => true,
			addToWishlist: jest.fn(),
			removeFromWishlist: mockRemoveFromWishlist,
		});

		render(<ProductCard product={mockProduct} />);

		const wishlistButton = screen.getByRole("button");
		await userEvent.click(wishlistButton);
		expect(mockRemoveFromWishlist).toHaveBeenCalledWith(mockProduct.id);
	});

});
