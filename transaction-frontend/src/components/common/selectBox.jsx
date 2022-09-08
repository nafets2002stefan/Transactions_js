import React, { Component } from 'react';
import i18next from 'i18next';

const SelectBox = (props) => {
    
    return (
        <React.Fragment>
        <p className='selectBox mr-2'>{i18next.t('pagesNumber')}</p>
        <select 
        className="form-select mb-3" 
        aria-label="multiple select example"
        value={props.pageSize} 
            onChange={props.handlePageSize}>
                {props.pagesSelect.map((option) => (
                    <option key={option}>{option}</option>
                    ))}
        </select>
        </React.Fragment>
    );
}

export default SelectBox;