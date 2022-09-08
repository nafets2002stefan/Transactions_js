import React, { Component, Suspense } from 'react';
import axios from 'axios';
import _ from 'lodash';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import i18next from 'i18next';
import SelectBox from './common/selectBox';
import TransactionsTable from './transactionsTable';
import { paginate } from './../utils/paginate';
import PieCharts from './common/pieCharts';
import Pagination from './common/pagination';
import LanguageSwitcher from './languageSwitcher';



class Transactions extends Component {
    state = { 
        transactions: [],
        currentPage: 1,
        pageSize: 5,
        filterDates:
            {fromDate: '08/10/2019', tillDate: '09/10/2023'},
        pagesSelect: [5, 8, 10, 15, 20, 25],
        sortColumn: {path: '_id', order: 'asc'},
    } 
    
    apiEndpoint = 'http://localhost:5000/api/transactions';
    
    getTransactions = () => {
        return axios.get(this.apiEndpoint);
    };

    setTransactions = async () => {
        const {data: transactions} = await this.getTransactions();
        this.setState({transactions: transactions});
    };

    async componentDidMount() {
        await this.setTransactions();
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };
    filterEvent = transaction => {
        let transactionFormated = transaction.date.substring(0,10).split('-').join('');
        let fromDateFormated = this.state.filterDates.fromDate;
        fromDateFormated = fromDateFormated[2] + fromDateFormated[0] + fromDateFormated[1];
        let tillDateFormated = this.state.filterDates.tillDate.split('/');
        tillDateFormated = tillDateFormated[2] + tillDateFormated[0] + tillDateFormated[1];
        return (transactionFormated >= fromDateFormated && tillDateFormated >= transactionFormated);
    }; 

    handleFilter =async(event, changeDate) => {
        
        await this.setTransactions();

        let dateFilter = {...this.state.filterDates};
        // Necessary because new Date toLocaleDateString returns date without 0's
        //returns 8/9/2022 instead of 08/09/2022
        let fromDateFilter = changeDate.startDate._d.toISOString().substring(0,10).split('-');
        let tillDateFilter = changeDate.endDate._d.toISOString().substring(0,10).split('-');
        fromDateFilter = fromDateFilter[1] + '/'+ fromDateFilter[2] +'/' + fromDateFilter[0];
        tillDateFilter = tillDateFilter[1] + '/'+ tillDateFilter[2] +'/' + tillDateFilter[0];
        dateFilter.fromDate = fromDateFilter;
        dateFilter.tillDate = tillDateFilter;
        this.setState({filterDates: dateFilter},() => {
            let result = this.state.transactions.filter(this.filterEvent);
            this.setState({transactions: result});
        });
        
    };

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

    handlePageSize = pageSize => {
        this.setState({pageSize: Number(pageSize.target.value)});
    }

    getPagedData = () => {
        const {sortColumn, currentPage, pageSize, transactions} = this.state;

        const sorted = _.orderBy(transactions, [sortColumn.path], [sortColumn.order]);
        const transactionsFiltered = paginate(sorted, currentPage, pageSize);
        return {totalCount: transactions.length, data: transactionsFiltered};
    };

    render() { 
        const {length: count} = this.state.transactions;
        const {
            pageSize,
            pagesSelect,
            currentPage,
            sortColumn,
            filterDates
        } = this.state;

        if (count === 0)
            return <p>There are no transactions in database.</p> ;

        const {totalCount, data: transactions} = this.getPagedData();
        return (
            <Suspense fallback='Loading ...'>
            <div className="row">
                <div className="col">
                    <LanguageSwitcher />
                    <span className='pieCharts'>
                        <span>{i18next.t('sender/credit')}</span> 
                        <PieCharts 
                            transaction = {transactions}
                            client = {'sender'}
                            amount = {'creditAmount'}
                        />
                    </span>
                    <span className='pieCharts'>
                        <span>{i18next.t('reciever/debit')}</span>
                        <PieCharts 
                            transaction = {transactions}
                            client = {'reciever'}
                            amount = {'debitAmount'}
                        />
                        </span>

                    <h2 className='title-transaction-grid'>{i18next.t('transactionsTable')}</h2>
                    <p>{i18next.t('showingTransactions', {totalCount})}</p>


                    <SelectBox 
                        pageSize={this.state.pageSize}
                        handlePageSize={this.handlePageSize}
                        pagesSelect={pagesSelect}
                    />

                    <DateRangePicker
                        initialSettings={{ startDate: filterDates.fromDate, endDate: filterDates.tillDate}}
                        onApply={this.handleFilter}
                        onCancel={this.setTransactions}
                    >
                    <div>
                        <span className='filterSpan'>{i18next.t('dataRange')}</span>
                        <button className=' btn btn-primary filterDateBtn'>{filterDates.fromDate} - {filterDates.tillDate}</button>
                    </div>
                    </DateRangePicker>

                    <TransactionsTable 
                        transactions={transactions} 
                        sortColumn={sortColumn}
                        onSort={this.handleSort}
                    />

                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />        
                </div>
            </div>
            </Suspense>
        );
    }

}

export default Transactions;