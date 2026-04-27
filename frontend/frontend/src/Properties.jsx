import { useEffect, useState } from "react";
import AddProperty from "./AddProperty";

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
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
    <div style={{ padding: "20px" }}>
      <h1>Property Listings</h1>

      <AddProperty onAdd={addPropertyToUI} />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {properties.map((property) => (
          <div key={property._id} style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
            <img src={property.image} alt="" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{property.title}</h3>
            <p>₹ {property.price}</p>
            <p>{property.location}</p>
            <button onClick={() => editProperty(property)}>
  Edit
</button>
            <button onClick={() => deleteProperty(property._id)}>
  Delete
</button>
          </div>
        ))}
      </div>
    </div>
  );
}