import { useState } from "react";

export default function AddProperty({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    onAdd(data); // update UI instantly

    setForm({ title: "", price: "", location: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add Property</h2>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required /><br />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required /><br />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required /><br />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required /><br />

      <button type="submit">Add Property</button>
    </form>
  );
}