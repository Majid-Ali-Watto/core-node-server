import { books } from "../../data-store/data-store.js";
import url from "url";
function update(req) {
	console.log(req.body);
	const parsedUrl = url.parse(req.url, true);
	const { query } = parsedUrl;

	try {
		const index = books.findIndex((b) => b.iban == query.iban);
		books.splice(index, 1, { ...books[index], ...req.body });
		if (index.toString()) {
			return {
				status: 200,
				data: { book: books[index] }
			};
		} else {
			return {
				status: 200,
				data: { book: undefined }
			};
		}
	} catch (error) {
		return {
			status: 500,
			data: error
		};
	}
}

export default function patch(req, res, sendData) {
	let body = "";
	// Accumulate data from the request stream
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	// When all data has been received
	req.on("end", () => {
		const requestBody = JSON.parse(body);
		// Assuming the name is sent in the 'name' field of the request body
		req.body = requestBody ?? {};
		const parsedUrl = url.parse(req.url, true);
		const { pathname, query } = parsedUrl;

		try {
			switch (pathname) {
				case "/books":
					if (query.iban) {
						sendData(update);
					} else
						sendData(() => {
							return { status: 400, data: { error: "Invalid JSON data" } };
						});
					break;

				default:
					res.writeHead(404);
					res.end(JSON.stringify({ error: "Resource not found" }));
			}
		} catch (error) {
			res.writeHead(400); // Bad request
			res.end(JSON.stringify({ error: "Invalid JSON data" }));
		}
	});
}
