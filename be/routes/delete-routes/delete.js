import { books } from "../../data-store/data-store.js";
import url from "url";
function removeData(list, key, value) {
	console.log("removeData",list[0][key]==value);
	try {
		const index = list.findIndex((b) => b[key] == value) ?? -1;
		let msg = -1;
		if (index != -1) msg = list.splice(index, 1);
		return {
			status: 200,
			data: { msg }
		};
	} catch (error) {
		return {
			status: 500,
			data: { error }
		};
	}
}
function removeBook(req) {
	const parsedUrl = url.parse(req.url, true);
	const { query } = parsedUrl;

	return removeData(books, "iban", query.iban);
}


export default function remove(req, res, sendData) {
	const parsedUrl = url.parse(req.url, true);
	const { pathname,query } = parsedUrl;
	console.log(pathname,query)
	try {
		switch (pathname) {
			case "/books":
				sendData(removeBook);
				break;

			default:
				res.writeHead(404);
				res.end(JSON.stringify({ error: "Resource not found" }));
		}
	} catch (error) {
		res.writeHead(400); // Bad request
		res.end(JSON.stringify({ error: "Invalid JSON data" }));
	}
}
