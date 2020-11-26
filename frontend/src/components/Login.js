import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleAuth } from './helpers';
import { Reveal, Zoom } from 'react-reveal'
import "./styles/style.css"
import Logo from "./styles/logo.png";

export default function Login({ setUser, setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    return (
        <div>
            <Reveal duration={1500}>
                <form id="outterForm" onSubmit={async (e) => {
                    const msg = await handleAuth(e, 'login', { email, password }, setUser, setToken);
                    if (msg) {
                        setMsg(msg);
                    }
                }}>
                    <img src={Logo} alt="logo" style={{ margin: 10 }} />
                    {msg && <Zoom><div style={{color:'red', padding:3}}>{msg}</div></Zoom>}
                    <label htmlFor="email">Email</label>
                    <input id='email' name='email' type='email' required placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">password</label>
                    <input id='password' name='password' type='password' required placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="true" />
                    {
                        email && password ?
                            <button type='submit'>Login</button>
                            :
                            <button disabled>Login</button>
                    }
                    <Link className='swap' to='/register'>register</Link>
                </form>
            </Reveal>
        </div>
    )
}
