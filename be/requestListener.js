import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import remove from "./routes/delete-routes/delete.js";
import get from "./routes/get-routes/get.js";
import patch from "./routes/update-routes/patch.js";
import post from "./routes/add-routes/post.js";
import put from "./routes/update-routes/put.js";

export const requestListener = function (req, res) {
	res.setHeader("Content-Type", "application/json");
	let dataSent = false;
	/* The `sendData` function is responsible for sending the response data
	back to the client. */
	function sendData(fn) {
		const { data, status } = fn(req);
		// res.writeHead(status);
		console.log("response ", status, JSON.stringify(data));
		dataSent = true;
		res.statusCode = status;
		res.end(JSON.stringify(data));
	}
	// Use the CORS middleware
	corsMiddleware(req, res, () => {}, sendData);
	if (dataSent) return;
	// explore req.headers
	console.log(req.headers["authorization"]);
	console.log(req.method);
	switch (req.method?.toUpperCase()) {
		case "POST": {
			post(req, res, sendData);
			break;
		}
		case undefined:
		case "GET": {
			get(req, res, sendData);
			break;
		}

		case "PUT": {
			put(req, res, sendData);
			break;
		}
		case "PATCH": {
			patch(req, res, sendData);
			break;
		}

		case "DELETE": {
			remove(req, res, sendData);
			break;
		}

		default:
			sendData(() => {
				return {
					status: 403,
					data: { error: "Bad request, invalid request method" }
				};
			});
	}
};
