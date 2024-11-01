import { useEffect, useState } from "react";
import CallAPI from "../custom-hooks/fetchHook";
import { Link, useLocation } from "react-router-dom";

export default function Update() {
	const [ibanS, setIbanS] = useState("");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");
	const [iban, setIban] = useState("");
	const location = useLocation();
	useEffect(() => {
		handleSearch(location.state.iban);
	}, [location.state.iban]);
	async function handleUpdate(event) {
		event.preventDefault();
		if (iban === "") return;
		const { error, data } = await CallAPI(
			`/books?iban=${ibanS}`,
			{
				title,
				author,
				year,
				iban
			},
			"PUT"
		);
		if (!error) {
			const msg = data?.book?.iban;
			if (msg) {
				alert(ibanS + " updated ");
			} else alert(ibanS + " not updated");
		} else console.error(error);
	}
	async function handleSearch(ibanS) {
		setIbanS(ibanS);
		if (ibanS == "") return;
		const { error, data } = await CallAPI(`/books?iban=${ibanS}`);
		if (!error) {
			const book = data?.books;
			if (book.length == 0) {
				alert("Book not found");
			}
			setAuthor(book?.[0]?.author || "");
			setIban(book?.[0]?.iban || "");
			setTitle(book?.[0]?.title || "");
			setYear(book?.[0]?.year || "");
		} else console.error(error);
	}

	return (
		<div className="formContainer">
			<h1>Update</h1>
			<Link to="/read">
				<img
					id="icon-img"
					src="/list.png"
				/>
			</Link>

			<form onSubmit={handleUpdate}>
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
						disabled
					/>
				</div>
				<button type="submit">Update Book</button>
			</form>
		</div>
	);
}
