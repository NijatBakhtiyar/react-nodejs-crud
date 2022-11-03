import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface BookType {
  title: string;
  description: string;
  cover?: string;
}

function Update() {
  const navigate = useNavigate();
  const [book, setBook] = React.useState<BookType[]>([]);
  const { id } = useParams();

  async function fetchBook() {
    const res = await axios.get(`http://localhost:8800/books/${id}`);

    setBook(res.data);
  }

  useEffect(() => {
    fetchBook();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.title.value;
    const description = e.currentTarget.description.value;
    const cover = e.currentTarget.cover.value;

    const formData: BookType = {
      title,
      description,
      cover,
    };

    try {
      await axios.put(`http://localhost:8800/books/${id}`, formData);
      setBook([...book, formData]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Update book</h1>
      <form action="" onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={book[0]?.title}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          defaultValue={book[0]?.description}
        />
        <input
          type="text"
          placeholder="Image"
          name="cover"
          defaultValue={book[0]?.cover}
        />
        <button type="submit" className="update">
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
