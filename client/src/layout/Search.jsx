import { useEffect, useContext } from "react";
import { DataContext } from '../App';
import Container from "../components/Container";

export default function Search() {

    const dataContext = useContext(DataContext)

    const { 
        callApiByDate, searchDate, 
    } = dataContext || {}

    useEffect(() => {callApiByDate()}, [searchDate]) 

    return(
        <>
            <Container />
        </>
    )
}