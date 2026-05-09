import { useEffect, useState } from "react";
import AddProperty from "./AddProperty";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
  setProperties(data);
  setLoading(false);
});
  }, []);

  const addPropertyToUI = (newProperty) => {
    setProperties([newProperty, ...properties]);
  };
const deleteProperty = async (id) => {
  await fetch(`http://localhost:5000/api/properties/${id}`, {
    method: "DELETE",
  });

  setProperties(properties.filter((p) => p._id !== id));
};
const editProperty = async (property) => {
  const newTitle = prompt("Enter new title", property.title);
  const newPrice = prompt("Enter new price", property.price);

  if (!newTitle || !newPrice) return;

  const res = await fetch(
    `http://localhost:5000/api/properties/${property._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...property,
        title: newTitle,
        price: newPrice,
      }),
    }
  );

  const updated = await res.json();

  setProperties(
    properties.map((p) => (p._id === updated._id ? updated : p))
  );
};
  return (
    <>
  <div
    style={{
      background: "#111827",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #374151",
    }}
  >
    <h2 style={{ color: "white", margin: 0 }}>
      Rent Realty
    </h2>

    <div style={{ color: "#9ca3af" }}>
      Property Management App
    </div>
  </div>
   <div
  style={{
    padding: "40px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
  }}
>
      <h1
  style={{
    fontSize: "48px",
    textAlign: "center",
    marginBottom: "30px",
  }}
>
  Rent Realty
</h1>

      <AddProperty onAdd={addPropertyToUI} />
<input
  type="text"
  placeholder="Search by title or location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
    marginBottom: "20px",
  }}
/>

<input
  type="number"
  placeholder="Max price"
  value={maxPrice}
  onChange={(e) => setMaxPrice(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
    marginBottom: "20px",
  }}
/>
  /
  {loading && (
  <p style={{ textAlign: "center" }}>
    Loading properties...
  </p>
)}
{!loading && properties.length === 0 && (
  <p style={{ textAlign: "center" }}>
    No properties found.
  </p>
)}
     <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  }}
>
       {properties
  .filter((property) =>
    (property.title.toLowerCase().includes(search.toLowerCase()) ||
     property.location.toLowerCase().includes(search.toLowerCase())) &&
    (!maxPrice || Number(property.price) <= Number(maxPrice))
  )
  .map((property) => (
         <div
  key={property._id}
  style={{
    background: "#1e293b",
    borderRadius: "16px",
    overflow: "hidden",
    width: "280px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  }}
>
            <img src={property.image} alt="" style={{
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
}} />
            <h3>{property.title}</h3>
            <p>₹ {property.price}</p>
            <p>{property.location}</p>
            <button
  onClick={() => editProperty(property)}
  style={{
    marginRight: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Edit
</button>
           <button
  onClick={() => deleteProperty(property._id)}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Delete
</button>
          </div>
        ))}
      </div>
      <footer
  style={{
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    color: "#9ca3af",
    borderTop: "1px solid #374151",
  }}
>
  © 2026 Rent Realty Property Management
</footer>
    </div>
      </>
  );
}