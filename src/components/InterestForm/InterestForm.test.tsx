import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InterestForm, { logData } from "./InterestForm";

describe("Interest Form", () => {
	const consoleLogSpy = jest
		.spyOn(console, "log")
		.mockImplementation(() => {});
	afterEach(() => {
		consoleLogSpy.mockClear();
	});
	afterAll(() => {
		consoleLogSpy.mockRestore();
	});

	test("Name input is fine", () => {
		render(<InterestForm />);
		const allTextInputs = screen.getAllByRole("textbox");

		expect(allTextInputs).toHaveLength(2);
		allTextInputs.forEach((input) => {
			expect(input).toBeInTheDocument();
		});
	});

	test("Selecttime is fine", () => {
		render(<InterestForm />);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	test("Button is fine", () => {
		render(<InterestForm />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("console is showing data", () => {
		const myData = { id: 123, status: "completed" };

		logData(myData);
		expect(consoleLogSpy).toHaveBeenCalledWith(myData);
		expect(consoleLogSpy).toHaveBeenCalledTimes(1);
	});

	test("should correctly log a different data type", () => {
		const myString = "Hello, World!";
		logData(myString);
		expect(consoleLogSpy).toHaveBeenCalledWith(myString);
	});
});
