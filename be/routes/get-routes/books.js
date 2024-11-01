import { books } from "../../data-store/data-store.js";
export default function getBooks() {
	try {
		console.log("Loading books");
		return {
			status: 200,
			data: books
		};
	} catch (error) {
		return {
			status: 500,
			data: error
		};
	}
}
