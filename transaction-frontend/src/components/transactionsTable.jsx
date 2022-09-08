import React, { Component } from 'react';
import Table from './common/table';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

class TransactionsTable extends Component {

    columns = [
        {
            path: '_id',
            label: 'ID', 
            content: transaction => <Link to={`/transactions/${transaction._id}`}>{transaction._id}</Link>
        },
        {path: 'debitAmount',label: i18next.t('debit')},
        {path: 'creditAmount',label: i18next.t('debit')},
        {path: 'sender',label: i18next.t('sender')},
        {path: 'reciever',label: i18next.t('reciever')},        
        {path: 'date',label: i18next.t('date')}        
    ]; 

    render() {
        const {transactions, onSort, sortColumn} = this.props;
        return (
            <Table 
                columns={this.columns} 
                data={transactions} 
                sortColumn={sortColumn} 
                onSort={onSort}
            />
        );
    }
}

export default TransactionsTable;