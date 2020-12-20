import React, { useState, useEffect } from 'react'
import ExpensesList from './ExpensesList';
import { getData, handleDelete, handleUpdate } from './helpers';
import { GiCrossMark } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { BsToggleOff, BsToggleOn, BsCheckBox } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';


export default function CategoriesList({ setCategories, categories, setExpenses, expenses, setEditmode, editMode, setAddMode, addMode, setSearchMode, searchMode }) {
    const [title, setTitle] = useState('');
    const [editItem, setEditItem] = useState(null);


    useEffect(() => {
        getData('category', setCategories);
    }, []);
    const update = (resource, id, setter, dataset, data) => {
        setEditItem(null);
        handleUpdate(resource, id, setter, dataset, data);
    }
    return (
        <div className='control-wide' className='sideMenu'>
            {(categories.length !== 0) && <div className='control-wide' style={{ borderRadius: 50, border: '2px solid #5d6dda', padding: 7 }}>
                Edit mode  {editMode ? <BsToggleOn onClick={() => setEditmode(!editMode)} size={25} /> : <BsToggleOff onClick={() => setEditmode(!editMode)} size={25} />}
            </div>
            }
            <div className='control-wide' style={{ borderRadius: 50, border: '2px solid #5d6dda', padding: 7 }}>
                Add mode  {addMode ? <BsToggleOn onClick={() => setAddMode(!addMode)} size={25} /> : <BsToggleOff onClick={() => setAddMode(!addMode)} size={25} />}
            </div>
            <div className='control-wide' style={{ borderRadius: 50, border: '2px solid #5d6dda', padding: 7 }}>
                Search mode  {searchMode ? <BsToggleOn onClick={() => setSearchMode(!searchMode)} size={25} /> : <BsToggleOff onClick={() => setSearchMode(!searchMode)} size={25} />}
            </div>
            {
                categories.length ?
                    categories.map(category => {
                        return (
                            <div key={category.id}>
                                <div className='category'>
                                    {!(editItem == category.id) ? <p className='title'>{category.title}</p> : <input placeholder="title" onChange={e => setTitle(e.target.value)} />}
                                    {editMode &&
                                        <Fade>
                                            <div className="control-wide">
                                                {!(editItem === category.id) && <GiCrossMark onClick={() => handleDelete('category', category.id, setCategories, categories)} />}
                                                {!(editItem === category.id) ? <MdEdit onClick={() => setEditItem(category.id)} /> : <BsCheckBox size={22} onClick={() => update('category', category.id, setCategories, categories, { title })} />}
                                            </div>
                                        </Fade>
                                    }
                                </div>
                                <ExpensesList categoryId={category.id} editMode={editMode} setExpenses={setExpenses} expenses={expenses} />
                            </div>
                        );
                    })
                    :
                    <Fade>
                        <p style={{ textAlign: 'center', marginTop: 100 }}>No Categories to show, let's start</p>
                    </Fade>
            }
        </div>
    )
}
