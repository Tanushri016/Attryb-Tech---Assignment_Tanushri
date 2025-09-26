import React, { useState } from 'react';
import signup from "E:\Folder\7Internshipsss\attryb\signup.js";
import login from "E:\Folder\7Internshipsss\attryb\login.js";
import addcar from "E:\Folder\7Internshipsss\attryb\addcar.js";
import carlist from "E:\Folder\7Internshipsss\attryb\carlist.js";
import OEMSpecs from "E:\Folder\7Internshipsss\attryb\OEMSpecs.js";
import "E:\Folder\7Internshipsss\attryb\styles.css\App.css";


export default function App() {
const [user, setUser] = useState(localStorage.getItem("user") || null);
const [cars, setCars] = useState([]);
const [page, setPage] = useState("login");


const logout = () => {
localStorage.removeItem("user");
setUser(null);
setPage("login");
};


return (
<div className="app-container">
<h1>BUYC Corp - Second Hand Car Marketplace</h1>


{!user && page === "signup" && <signup setPage={setPage} />}
{!user && page === "login" && <login setUser={setUser} setPage={setPage} />}


{user && (
<>
<nav>
<button onClick={() => setPage("add")}>Add Car</button>
<button onClick={() => setPage("list")}>View Cars</button>
<button onClick={() => setPage("oem")}>OEM Specs</button>
<button onClick={logout}>Logout</button>
</nav>


{page === "add" && <addcar cars={cars} setCars={setCars} />}
{page === "list" && <carlist cars={cars} setCars={setCars} />}
{page === "oem" && <OEMSpecs />}
</>
)}
</div>
);
}