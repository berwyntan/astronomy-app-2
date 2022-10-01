import { useContext } from 'react'
import { DataContext } from '../App'

import DatePicker from "react-datepicker";
import "./calendar.css";

export default function Search() {
    const dataContext = useContext(DataContext)

    const { handleDateSearch, searchDate } = dataContext || {}
        
    return (
        <>
        
        <div className="absolute top-16 right-1">
        <DatePicker 
            selected={searchDate} 
            onChange={date => handleDateSearch(date)} 
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

