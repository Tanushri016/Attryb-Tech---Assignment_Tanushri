import React, { useState } from 'react';
import "E:\Folder\7Internshipsss\attryb\styles.css\Form.css";


export default function Signup({ setPage }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleSignup = () => {
localStorage.setItem("userCreds", JSON.stringify({ email, password }));
alert("Signup successful! Please login.");
setPage("login");
};


return (
<div className="form-container">
<h2>Signup</h2>
<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
<button onClick={handleSignup}>Signup</button>
<p>Already have an account? <span className="link" onClick={() => setPage("login")}>Login</span></p>
</div>
);
}