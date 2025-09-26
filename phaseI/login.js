import React, { useState } from 'react';
import "E:\Folder\7Internshipsss\attryb\styles.css\Form.css";


export default function Login({ setUser, setPage }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = () => {
const saved = JSON.parse(localStorage.getItem("userCreds"));
if (saved && saved.email === email && saved.password === password) {
localStorage.setItem("user", email);
setUser(email);
setPage("add");
} else {
alert("Invalid credentials");
}
};


return (
<div className="form-container">
<h2>Login</h2>
<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
<button onClick={handleLogin}>Login</button>
<p>Don’t have an account? <span className="link" onClick={() => setPage("signup")}>Signup</span></p>
</div>
);
}