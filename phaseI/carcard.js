import React from 'react';
import "E:\Folder\7Internshipsss\attryb\styles.css\Car.css";


export default function CarCard({ car, toggleSelect, selected }) {
return (
<div className={`car-card ${selected ? 'selected' : ''}`} onClick={() => toggleSelect(car.id)}>
<img src={car.image} alt={car.title} />
<h3>{car.title}</h3>
<ul>
{car.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
</ul>
</div>
);
}