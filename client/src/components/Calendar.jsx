import { useContext } from 'react'
import { DataContext } from '../App'
import { useNavigate } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "./calendar.css";
import { useEffect } from 'react';

export default function Search() {
    const dataContext = useContext(DataContext)

    const { handleDateSearch, searchDate } = dataContext || {}

    let navigate = useNavigate();

    useEffect(() => {
        navigate("/search");
    }, [searchDate]);
        
    return (
        <>
        
        <div className="absolute top-16 right-1 z-70">
        <DatePicker 
            selected={searchDate} 
            onChange={(date) => handleDateSearch(date)}
            inline
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
            minDate={803347920000}
        />
        </div>
        
        
        </>
        
    )
}

