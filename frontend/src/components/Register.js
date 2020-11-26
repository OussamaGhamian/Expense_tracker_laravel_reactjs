import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleAuth } from './helpers'
import { Reveal } from 'react-reveal'
import Logo from './styles/logo.png'
import "./styles/style.css"

export default function Register({ setUser, setToken }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    return (
        <div>
            <Reveal>
                <form id="outterForm" onSubmit={e => {
                    image ?
                        handleAuth(e, 'register', { name, email, password, password_confirmation, image }, setUser, setToken)
                        :
                        handleAuth(e, 'register', { name, email, password, password_confirmation }, setUser, setToken)
                }}>
                    <img src={Logo} alt="logo" style={{ margin: 'auto' }} />
                    <input id='name' name='name' type='text' required placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                    <input id='email' name='email' type='email' required placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input id='password' name='password' type='password' required placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="true" />
                    <input id='password_confirmation' name='password_confirmation' type='password' required placeholder="Re-enter Password" value={password_confirmation} onChange={e => setPassword_confirmation(e.target.value)} autoComplete="true" />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {
                        email && password ?
                            <button type='submit'>Register</button>
                            :
                            <button disabled>Register</button>
                    }
                    <Link className='swap' to='/login'>login</Link>
                </form>
            </Reveal>
        </div >
    )
}
