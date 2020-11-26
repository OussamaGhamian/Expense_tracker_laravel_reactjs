import React, { useState } from 'react';
import { handleSubmit } from './helpers';
import { Reveal } from 'react-reveal';

export default function AddCatForm({ setCategories, categories }) {
    const [title, setTitle] = useState('');
    let user = JSON.parse(localStorage.getItem('user'));
    return (
        <form onSubmit={e => {
            handleSubmit(e, 'category', { id: -1, user_id: user.id, title }, setCategories, categories)
            setTitle('');
        }}>
            <input type='text' placeholder='Category title' required value={title} onChange={e => setTitle(e.target.value)} />
            {
                title ?
                    <Reveal duration={3000}><button className='btn' type="submit">Add</button></Reveal>
                    :
                    <button className="btn disabledBtn">Add</button>
            }
        </form>
    )
}
