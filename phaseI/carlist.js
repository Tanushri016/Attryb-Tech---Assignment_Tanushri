import React, { useState } from 'react';
import carcard from "E:\Folder\7Internshipsss\attryb\carcard.js";
import "E:\Folder\7Internshipsss\attryb\styles.css\Car.css";


export default function CarList({ cars, setCars }) {
const [selected, setSelected] = useState([]);
const [filters, setFilters] = useState({ color: "", price: "", mileage: "" });


const toggleSelect = id => {
setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
};


const deleteSelected = () => {
setCars(cars.filter(c => !selected.includes(c.id)));
setSelected([]);
};


return (
<div>
<h2>Car Inventory</h2>


<div className="filters">
<input placeholder="Filter by Color" onChange={e => setFilters({ ...filters, color: e.target.value })} />
<input placeholder="Filter by Price" onChange={e => setFilters({ ...filters, price: e.target.value })} />
<input placeholder="Filter by Mileage" onChange={e => setFilters({ ...filters, mileage: e.target.value })} />
</div>


<button onClick={deleteSelected}>Delete Selected</button>


<div className="car-list">
{cars.map(car => (
<carcard key={car.id} car={car} toggleSelect={toggleSelect} selected={selected.includes(car.id)} />
))}
</div>
</div>
);
}