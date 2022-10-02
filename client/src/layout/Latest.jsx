import { useEffect, useContext } from "react";
import { DataContext } from '../App';
import Container from "../components/Container";

export default function Latest() {

    const dataContext = useContext(DataContext)

    const { 
        callApiByDate, handleLatestView,
    } = dataContext || {}

    useEffect(() => {handleLatestView()}, []) 
    
    return(
        <>
            <Container />
        </>
    )
}