import { useEffect, useContext } from "react";
import { DataContext } from '../App';
import Container from "../components/Container";

export default function Latest() {

    const dataContext = useContext(DataContext)

    const { 
        handleTitle, handleLatestView,
    } = dataContext || {}

    useEffect(() => {handleLatestView()}, []) 

    useEffect(() => {
        const newTitle = "Latest - Astronomy";
        handleTitle(newTitle);
    }, [])

    // console.log("loading latest")

    return(
        <>
            <Container />
        </>
    )
}