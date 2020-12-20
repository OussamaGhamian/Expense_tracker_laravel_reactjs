import React, { useEffect, useState } from 'react'
import { getData, handleDelete, handleUpdate } from './helpers';
import { RiCoinsLine } from 'react-icons/ri';
import { GiCrossMark } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { BsCheckBox } from 'react-icons/bs';
import { FcMoneyTransfer } from 'react-icons/fc';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import CountUp from 'react-countup';

export default function ExpensesList({ categoryId, editMode, expenses, setExpenses }) {
    const [editItem, setEditItem] = useState(null);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        getData('expense', setExpenses);
    }, []);
    const update = (resource, id, setter, dataset, data) => {
        setEditItem(null);
        setAmount(0);
        setName('');
        handleUpdate(resource, id, setter, dataset, data);
    }
    const hasExpenses = (array, catID) => {
        let sum = 0;
        array.forEach(element => {
            if (element.category_id === catID)
                sum++;
        })
        return sum;
    }

    return (
        <div>
            {
                hasExpenses(expenses, categoryId) && expenses.length ?
                    expenses.map(expense => {
                        if (expense.category_id === categoryId) {
                            return <Zoom key={expense.id}>
                                <div key={expense.id} id={expense.id} className='expense'>
                                    <div className='upper'>
                                        <p>
                                            <RiCoinsLine />
                                            {editItem !== expense.id ? expense.name : <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />}
                                        </p>
                                        <div className='control-wide' >
                                            {editItem !== expense.id ? <CountUp end={expense.amount} duration={10} decimals={2} separator=',' /> : <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />}
                                            {editMode ?
                                                <Fade>
                                                    {editItem === expense.id ?
                                                        <div>
                                                            {name && amount && <Zoom><BsCheckBox size={25} onClick={() => update('expense', expense.id, setExpenses, expenses, { name, amount: parseInt(amount) })} /></Zoom>}
                                                        </div>
                                                        :
                                                        <div className="control-wide" style={{ width: 60 }}>
                                                            <GiCrossMark onClick={() => handleDelete('expense', expense.id, setExpenses, expenses)} />
                                                            <MdEdit onClick={() => setEditItem(expense.id)} />
                                                        </div>
                                                    }
                                                </Fade>
                                                :
                                                <Fade>
                                                    <FcMoneyTransfer />
                                                </Fade>
                                            }
                                        </div>
                                    </div>
                                    <p className="lower">{Math.floor((Date.now() - new Date(expense.updated_at).getTime()) / (60 * 60 * 24 * 1000))} Days ago</p>
                                </div>
                            </Zoom>
                        }
                    })
                    :
                    <div className='expense'>No expenses for this category</div>
            }
        </div>
    )
}
