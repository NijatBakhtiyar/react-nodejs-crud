import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BookType {
  id: number;
  title: string;
  description: string;
  cover?: string;
}

function Add() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.title.value;
    const description = e.currentTarget.description.value;
    const cover = e.currentTarget.cover.value;

    const formData = {
      title,
      description,
      cover,
    };

    try {
      await axios.post("http://localhost:8800/books", formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Add book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" />
        <input type="text" placeholder="Description" name="description" />
        <input type="text" placeholder="Image" name="cover" />
        <button type="submit" className="add">
          Add
        </button>
      </form>
    </section>
  );
}

export default Add;
