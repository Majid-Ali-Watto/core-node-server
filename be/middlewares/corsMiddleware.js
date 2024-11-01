// Create a CORS middleware function
export const corsMiddleware = (req, res, next, sendData) => {
	// Set appropriate CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		sendData(() => {
			return {
				status: 200,
				data: {}
			};
		});
		return;
	}

	// Call the next middleware in the chain
	next();
};
