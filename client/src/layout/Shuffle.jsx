import { useEffect, useContext } from "react";
import { DataContext } from '../App';
import Container from "../components/Container";

export default function Shuffle() {

    const dataContext = useContext(DataContext)

    const { 
        callApiRandom, handleRandomView,
    } = dataContext || {}

    useEffect(() => {handleRandomView(); callApiRandom()}, []) 
    return(
        <>
            <Container />
        </>
    )
}