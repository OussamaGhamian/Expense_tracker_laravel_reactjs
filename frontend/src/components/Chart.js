import React, { useState, useEffect } from 'react';
import { getData } from './helpers'
import { Chart } from "react-google-charts";
import Zoom from 'react-reveal/Zoom';

const ChartGraph = ({ setCategories, categories, setExpenses, expenses }) => {
    const [chartType, setChartType] = useState('PieChart');
    useEffect(() => {
        getData('category', setCategories);
        getData('expense', setExpenses);
    }, []);

    const types = ["PieChart", "AreaChart", "BarChart",];
    const getCategoryTotal = (expenses, categoryId) => {
        let sum = 0;
        expenses.forEach(expense => {
            if (expense.category_id === categoryId)
                sum += expense.amount;
        })
        return sum;
    }
    const generateCategories = (array) => {
        let data = []
        array.forEach(item => data.push([item.title, getCategoryTotal(expenses, item.id)]));
        return data
    }

    return <>
        { categories.length && expenses.length ?
            <div className='chart'>
                <select onChange={e => setChartType(e.target.value)}>
                    {
                        types.map((type, index) => <option key={index} value={type}>{type}</option>)
                    }
                </select>
                <Zoom duration={2000}>
                    <Chart
                        width={'650px'}
                        height={'260px'}
                        chartType={chartType}
                        loader={<div className="expense">Loading Chart</div>}
                        data={[
                            ['Category', 'Total'],
                            ...generateCategories(categories)
                        ]}
                        options={{
                            title: 'Expenses by category',
                            hAxis: { title: 'Category', titleTextStyle: { color: '#828fe5' } },
                            vAxis: { title: 'Expenses by $', minValue: 0, titleTextStyle: { color: '#828fe5' } },
                            chartArea: { width: '70%', height: '70%' },
                            lineWidth: 2,
                            animation: { startup: true, easing: 'linear', duration: 600 },
                        }}
                    />
                </Zoom>
            </div>
            :
            <p style={{ textAlign: 'center', marginTop: 100 }}>No data to preview</p>
        }
    </>
}
export default ChartGraph;