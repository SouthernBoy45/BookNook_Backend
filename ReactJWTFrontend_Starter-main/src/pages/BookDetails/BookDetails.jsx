import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewList from "../../components/ReviewList/ReviewList";

const BookDetails = ({ book, review, index }) => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState();

  useEffect(() => {
    displayBookDetails();
  }, [bookId]);

  const displayBookDetails = async () => {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      setBookDetails(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  return bookDetails ? (
    <div>
      <h1>Book Details {bookDetails.volumeInfo.title}</h1>
      <li>
        <img src={bookDetails.volumeInfo.imageLinks.smallThumbnail} />
        <div>{bookDetails.id}</div>
        <div>{bookDetails.volumeInfo.authors}</div>
        <div>{bookDetails.volumeInfo.description}</div>
      </li>
      <div>{<ReviewList review={review} index={index} key={review.id}/>}</div>
    </div>
  ) : <h1>Loading</h1>;
};

export default BookDetails;
