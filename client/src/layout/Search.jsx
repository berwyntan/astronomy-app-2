import { useEffect, useContext } from "react";
import { DataContext } from '../App';
import Container from "../components/Container";

export default function Search() {

    const dataContext = useContext(DataContext)

    const { 
        callApiByDate, searchDate, handleTitle
    } = dataContext || {}

    useEffect(() => {callApiByDate()}, [searchDate]) 

    useEffect(() => {
        const newTitle = "Search - Astronomy";
        handleTitle(newTitle);
    }, [])

    return(
        <>
            <Container />
        </>
    )
}