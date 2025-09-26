import React, { useState } from 'react';
import oemData from "E:\Folder\7Internshipsss\attryb\oemData.js";


export default function OEMSpecs() {
const [query, setQuery] = useState("");


const results = oemData.filter(item => item.model.toLowerCase().includes(query.toLowerCase()));


return (
<div>
<h2>OEM Specs</h2>
<input placeholder="Search by Model" value={query} onChange={e => setQuery(e.target.value)} />
{results.map((item, i) => (
<div key={i}>
<h3>{item.model} ({item.year})</h3>
<p>List Price: {item.price}</p>
<p>Colors: {item.colors.join(", ")}</p>
<p>Mileage: {item.mileage}</p>
<p>Power: {item.power} BHP</p>
<p>Max Speed: {item.speed}</p>
</div>
))}
</div>
);
}