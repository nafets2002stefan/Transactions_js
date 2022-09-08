import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const PieCharts = (props) => {

    const  generateRandomColor = () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    };
    
    const getDataPieChart = (data, client, amount) =>{
        let res = data.map(item => ({title: item[client], value: item[amount], color: generateRandomColor()}));
        return res;
    };

    return ( 
        <PieChart 
            data={getDataPieChart(props.transaction, props.client, props.amount)}
            animate={true}
            style={{height: '60wh', width: '30vw'}}
            label={(names) => names.dataEntry.title}
            labelStyle={{
                fontSize: '.5rem',
                fontWeight: '500'
            }}
            labelPosition={70}
        />
    );
}

export default PieCharts;