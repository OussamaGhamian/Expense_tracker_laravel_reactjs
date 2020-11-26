import React, { useState, useEffect } from 'react'
import { handleSubmit, getData } from './helpers';
import { Reveal } from 'react-reveal';

export default function AddExpForm({ expenses, setExpenses, categories, setCategories }) {
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');
    const [category_id, setCategory_id] = useState(0);
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getData('category', setCategories);
    }, []);
    return (
        <form onSubmit={e => {
            handleSubmit(e, 'expense', { id: -1, user_id: user.id, amount: parseInt(amount), name, category_id: parseInt(category_id), created_at: new Date(+ new Date()).toISOString(), updated_at: new Date(+ new Date()).toISOString() }, setExpenses, expenses);
            setAmount(0);
            setName('');
            setCategory_id(0);
        }}>
            <input type='text' placeholder='Expense name' required value={name} onChange={e => setName(e.target.value)} />
            <input type='number' placeholder='Expense amount' required value={amount} onChange={e => setAmount(e.target.value)} />
            <select value={category_id} onChange={e => setCategory_id(e.target.value)}>
                <option>Category</option>
                {
                    categories.map(category => <option value={category.id} key={category.id}>{category.title}</option>)
                }
            </select>
            {
                amount && name && category_id ?
                    <Reveal duration={3000}><button className="btn" type="submit">Add</button></Reveal>
                    :
                    <button className="btn disabledBtn">Add</button>
            }
        </form>
    )
}
