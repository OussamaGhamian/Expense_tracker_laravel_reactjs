import React, { useState } from 'react'
import { Zoom, Fade } from 'react-reveal'
import { RiCoinsLine, RiSearch2Line } from 'react-icons/ri';


export default function Search({ expenses }) {
    const [filter, setFilter] = useState('');
    const [filteredItems, setfileredItems] = useState([])
    const filteredExpenses = expenses.filter(expense => (expense.name.toLowerCase().includes(filter)))

    return (
        <div className="searchContainer">
            <Zoom>
                <div>
                <input type='text' value={filter} onChange={e => setFilter(e.target.value)} />
                <RiSearch2Line onClick={_ => setfileredItems(filteredExpenses)} size={20} />
                </div>
                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: "space-around" }}>
                    {filteredItems.length ?
                        filteredItems.map(expense => <Zoom key={expense.id}>
                            <div key={expense.id} className='tag'>
                                <div className='upper'>
                                    <div>
                                        <RiCoinsLine />
                                        <a href={`#${expense.id}`}>{expense.name}</a>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                        )
                        :
                        <div className='tag'>
                            No results
                    </div>
                    }
                </div>
            </Zoom>
        </div>
    )
}
