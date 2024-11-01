Node server created using core node http module.
Code snippet is added for creating server.
```javascript
import http from "http";
import { requestListener } from "./requestListener.js";
const PORT = 3000;

const server = http.createServer(requestListener);
server.listen(PORT, (err, _res) => {
	if (err) {
		console.error(err);
	} else console.log("Server is listening on " + PORT);
});
```
