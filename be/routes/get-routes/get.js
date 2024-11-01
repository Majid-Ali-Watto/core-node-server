import url from "url";
import getBooks from "./books.js";

export default function get(req, res, sendData) {
	const parsedUrl = url.parse(req.url, true);
	const { pathname, query } = parsedUrl;
	console.log(pathname, query);
	switch (pathname) {
		case "/":
			sendData(() => {
				return {
					status: 200,
					data: {
						books: getBooks().data
					}
				};
			});
			break;
		case "/books":
			// If there are query parameters
			if (query.iban) {
				// Assuming you want to filter books by year
				const filteredBooks = getBooks().data.filter((book) => book.iban == query.iban);
				console.log(getBooks().data);
				sendData(() => {
					return {
						status: 200,
						data: {
							books: filteredBooks
						}
					};
				});
			} else {
				console.log("sendData in else");
				sendData(getBooks);
			}
			break;

		default:
			res.writeHead(404);
			res.end(JSON.stringify({ error: "Resource not found" }));
	}
}
