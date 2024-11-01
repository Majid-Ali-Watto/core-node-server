import { useState } from "react";
import CallAPI from "../custom-hooks/fetchHook";
import { Link } from "react-router-dom";

export default function Create() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");
	const [iban, setIban] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		const { error, data } = await CallAPI(
			"/books",
			{
				title: title,
				author: author,
				year: parseInt(year),
				iban: iban
			},
			"POST"
		);
		if (!error) {
			alert(data.title + " by " + data.author + " added successfully");
			setTitle("");
			setAuthor("");
			setYear("");
			setIban("");
		} else console.error(error);
	}

	return (
		<div className="formContainer">
			<h1>Create</h1>
			<Link to="/read">
				<img
					id="icon-img"
					src="/list.png"
				/>
			</Link>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<label>Title:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="row">
					<label>Author:</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						required
					/>
				</div>
				<div className="row">
					<label>Year:</label>
					<input
						type="number"
						value={year}
						onChange={(e) => setYear(e.target.value)}
						required
					/>
				</div>
				<div className="row">
					<label>Iban:</label>
					<input
						type="text"
						value={iban}
						onChange={(e) => setIban(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Add Book</button>
			</form>
		</div>
	);
}
