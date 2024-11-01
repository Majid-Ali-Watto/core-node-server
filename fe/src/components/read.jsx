import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
Read.propTypes = {
	books: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			year: PropTypes.number.isRequired,
			iban: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		})
	).isRequired
};
export default function Read(props) {
	const { books } = props; // Extract books from props
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	// Set initial filteredBooks to the full list of books
	useEffect(() => {
		setFilteredBooks(books);
	}, [books]);

	// Filter books based on the search term
	useEffect(() => {
		const filtered = books.filter((book) => {
			const { title, author, year, iban } = book;
			const query = searchTerm?.toLowerCase();
			return title.toLowerCase().includes(query) || author.toLowerCase().includes(query) || year.toString().includes(searchTerm) || iban.toString().includes(searchTerm);
		});
		setFilteredBooks(filtered);
	}, [searchTerm, books]); // Added books to dependencies to re-filter when books change

	return (
		<div className="formContainer">
			<div className="top-section">
				<h1>List of Books</h1>
				<Link to="/create">
					<img id="icon-img" src="/add.png" alt="Add Book" />
				</Link>
			</div>

			<div className="filter-section">
				<input type="search" placeholder="Search by title, author, year, or IBAN" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			</div>

			<div className="booksList">
				<ul>
					{filteredBooks.map((book, index) => (
						<li key={index}>
							<div>
								<h2>{book.title}</h2>
								<p>Author: {book.author}</p>
								<p>Year: {book.year}</p>
								<p>Iban: {book.iban}</p>
							</div>

							<div className="list-btns">
								<Link to="/update" state={{ iban: book.iban }}>
									<img id="icon-img" src="/edit.png" alt="Edit Book" />
								</Link>
								<Link to="/delete" state={{ iban: book.iban }}>
									<img id="icon-img" src="/remove.png" alt="Remove Book" />
								</Link>
							</div>
						</li>
					))}
				</ul>
				{filteredBooks.length === 0 && <p>No books found.</p>}
			</div>
		</div>
	);
}
