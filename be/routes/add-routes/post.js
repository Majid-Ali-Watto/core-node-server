import { books } from "../../data-store/data-store.js";

function saveData(list, value) {
	console.log("value: ", value);
	try {
		const prevLen = list.length;
		const newLength = list.push(value);
		return {
			status: 200,
			data: newLength > prevLen ? value : {}
		};
	} catch (error) {
		return {
			status: 500,
			data: { error }
		};
	}
}
function saveBook(req) {
	console.log(req.body);
	return saveData(books, req.body);
}

export default function post(req, res, sendData) {
	let body = "";
	/* `req.on("data", (chunk) => { body += chunk.toString(); });` is an event listener in Node.js that
	listens for incoming data chunks in a request stream. When data is received, the callback function
	appends the data chunk to the `body` variable, which is used to accumulate the incoming data until
	all data has been received. This is commonly used to handle incoming POST request data in Node.js. */
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	// When all data has been received
	req.on("end", () => {
		try {
			const requestBody = JSON.parse(body);
			// Assuming the name is sent in the 'name' field of the request body
			console.log(requestBody);
			req.body = requestBody ?? {};
			switch (req.url) {
				case "/books":
					sendData(saveBook);
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
