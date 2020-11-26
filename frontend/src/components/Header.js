import React from 'react'
import { AiOutlineLogout, AiOutlineDollarCircle } from 'react-icons/ai';
import { SiWebmoney } from 'react-icons/si';
import CountUp from 'react-countup';

export default function Header({ expenses, setToken }) {
    const user = JSON.parse(localStorage.getItem('user'));

    const getSum = array => {
        let sum = 0;
        array.forEach(element => sum += element.amount);
        return sum;
    }
    const logOut = () => {
        localStorage.clear();
        setToken(null);
        // window.location.reload();
    }
    return (
        <header className="header">
            <div><SiWebmoney size={30} /> My Penny</div>
            <div><AiOutlineDollarCircle size={25} /><CountUp end={getSum(expenses)} duration={10} decimals={2} separator=',' /></div>
            <div className='actions'>
                <div>Hi {user.name}!</div>
                <img src={`http://localhost:8000/${user.image}`} alt="profile_picture" width={27} height={27} style={{ borderRadius: 100 }} />
                <AiOutlineLogout size={27} onClick={() => logOut()} />
            </div>
        </header>
    )
}
