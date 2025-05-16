import { useEffect, useMemo, useState } from "react";
import fetchData from "../utilities";
import fruit from "../../back/fruit.js"

export default function useFruits() {

    const [fruits, setFruits] = useState([])

    useEffect(() => {
        getFruits()
    }, [])

    const getFruits = async () => {
        try {
            setFruits(fruit)
            // console.log('fruit', fruit);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const getSingleFruit = async (id) => {
        const idToFind = parseInt(id)
        const response = fruits.find(item => item.id === idToFind)

        if (response === undefined) {
            throw new Error("Error fetching single data:")
        }
        return response
    }

    const deleteFruits = async (frutta, id) => {
        const idToFind = parseInt(id);
        const response = frutta.find(fruit => fruit.id === idToFind);
        console.log(response);

        if (response) {
            setFruits(prev => prev.filter(item => item.id !== id))
        }
        if (!response) {
            throw new Error("Error deleting data:", response)
        }
    }

    const addFruits = async (data) => {
        // todo Aggiungere controlli ai dati iin input
        const response = true
        if (response) {
            setFruits(prev => [...prev, { id: prev.length + 1, ...data }])
        }
    }

    const putFruits = async (id, data) => {

        const idToFind = parseInt(id);
        const response = fruits.find(fruit => fruit.id === idToFind);

        if (response === undefined) {

            throw new Error(`Network response was not ok`);
        }

        // Aggiorna lo stato locale
        setFruits(prev => prev.map(fruit => fruit.id === id ? data : fruit));

    };

    const allCategory = useMemo(() => {
        const categorys = []
        fruits.forEach((item) => {
            if (!categorys.includes(item.category)) {
                categorys.push(item.category)
            }
        })
        return categorys
    }, [fruits])

    return [fruits, setFruits, getFruits, getSingleFruit, deleteFruits, addFruits, putFruits, allCategory];
}