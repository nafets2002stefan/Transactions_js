import React, { Component } from 'react';
import i18n from 'i18next';

class LanguageSwitcher extends Component {

    change(option){
        localStorage.setItem('lang', option.target.value);
        i18n.changeLanguage(localStorage.getItem('lang'));
        window.location.reload();

    }

    render() { 
        const lang = localStorage.getItem('lang') ||'en';
        return (
            <select className='custom-select pull-right'
                onChange={this.change}
                value={lang}
            >
                <option value='en'>English</option>
                <option value='he'>Hebrew</option>
            </select>
        )
    }
}

export default LanguageSwitcher;