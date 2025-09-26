import React, { useState } from 'react';
import "E:\Folder\7Internshipsss\attryb\styles.css\Form.css";


export default function AddCar({ cars, setCars }) {
const [title, setTitle] = useState("");
const [image, setImage] = useState("");
const [bullets, setBullets] = useState(["", "", "", "", ""]);


const handleAdd = () => {
const newCar = { id: Date.now(), title, image, bullets };
setCars([...cars, newCar]);
setTitle("");
setImage("");
setBullets(["", "", "", "", ""]);
};


return (
<div className="form-container">
<h2>Add Car</h2>
<input placeholder="Car Title" value={title} onChange={e => setTitle(e.target.value)} />
<input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
{bullets.map((b, i) => (
<input key={i} placeholder={`Bullet ${i+1}`} value={b} onChange={e => {
const copy = [...bullets];
copy[i] = e.target.value;
setBullets(copy);
}} />
))}
<button onClick={handleAdd}>Add Car</button>
</div>
);
}