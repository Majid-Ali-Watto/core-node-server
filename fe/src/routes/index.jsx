import { Route, Routes } from "react-router-dom";
import Create from "../components/create";
import Delete from "../components/delete";
import Read from "../components/read";
import Update from "../components/update";
import { useEffect, useState } from "react";
import CallAPI from "../custom-hooks/fetchHook";

export default function RoutesComponent() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		// Fetch data from API
		const fetchData = async () => {
			console.log("Fetching data");
			const { error, data } = await CallAPI();
			if (!error) {
				setBooks(data.books);
			} else {
				alert(error);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures this runs only once

	return (
		<Routes>
			<Route
				path="/"
				element={<Read books={books} />}
			/>
			<Route
				path="/read"
				element={<Read books={books} />}
			/>
			<Route
				path="/create"
				element={<Create />}
			/>
			<Route
				path="/update"
				element={<Update />}
			/>
			<Route
				path="/delete"
				element={<Delete />}
			/>
			<Route
				path="/delete/:id"
				element={<div style={{ fontWeight: "bold" }}>You have to explore dynamic and nested routes</div>}
			/>
			<Route
				path="*"
				element={<div style={{ fontWeight: "bold" }}>Page Not Found! 404</div>}
			/>
		</Routes>
	);
}
