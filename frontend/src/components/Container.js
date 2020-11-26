import React, { useState, useEffect } from 'react'
import CategoriesList from './CategoriesList'
import Chart from './Chart'
import Header from './Header'
import { Zoom } from 'react-reveal';
import AddCatForm from './AddCatForm';
import AddExpForm from './AddExpForm';
import { getData } from './helpers';

export default function Container({ user, setToken }) {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [editMode, setEditmode] = useState(false);
    const [addMode, setAddMode] = useState(false);
    useEffect(() => {
        getData('category', setCategories);
        getData('expense', setExpenses);
    }, [])
    return (
        <div className="container">
            <Header expenses={expenses} setToken={setToken} user={user} />
            <div className="content">
                <Zoom>
                    <div className='RsubContainer'>
                        <Chart setCategories={setCategories} categories={categories} setExpenses={setExpenses} expenses={expenses} />
                        {addMode &&
                            <Zoom duration={500}>
                                <AddExpForm setExpenses={setExpenses} expenses={expenses} setCategories={setCategories} categories={categories} />
                                <AddCatForm setCategories={setCategories} categories={categories} />
                            </Zoom>
                        }
                    </div>
                </Zoom>
                <CategoriesList user={user} setCategories={setCategories} categories={categories} setExpenses={setExpenses} expenses={expenses} editMode={editMode} setEditmode={setEditmode} addMode={addMode} setAddMode={setAddMode} />
            </div>
        </div>
    )
}
