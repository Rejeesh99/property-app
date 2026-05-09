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

    console.log("SUBMIT CLICKED"); // debug

    const res = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    onAdd(data); // update UI

    setForm({
      title: "",
      price: "",
      location: "",
      image: "",
    });
  };

  return (
   <form
  onSubmit={handleSubmit}
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "30px",
  }}
>
      <h2>Add Property</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
}}
      />
      <br />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
}}
      />
      <br />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
}}
      />
      <br />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        required
        style={{
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
}}
      />
      <br />

     <button
  type="submit"
  style={{
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Add Property
</button>
    </form>
  );
}