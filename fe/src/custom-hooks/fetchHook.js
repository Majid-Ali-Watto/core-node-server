export default async function CallAPI(url = "/", data = {}, method = "GET") {
	let responseError = undefined;
	let responseData = undefined;
	try {
		const configs = {
			method: method?.toUpperCase(),
			headers: {
				"Content-Type": "application/json"
			}
		};
		if (method != "GET") configs.body = JSON.stringify(data);
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, configs);
		if (!response.ok) {
			throw new Error();
		}

		responseData = await response.json();
	} catch (error) {
		responseError = error;
	}
	return {
		data: responseData,
		error: responseError
	};
}
