import {useEffect, useState} from "react";
import axios from "axios";


const Pokemon = () =>{
    const [pokemon, setPokemon] = useState([])
    const [goal, setGoal] = useState({})
    const [answer, setAnswer] = useState([])


    const start = () =>{
       let random = Math.round(Math.random()* 150)
        setGoal(pokemon.find(item => item.id === random))
        const numbers = [random, Math.round(Math.random()* 150), Math.round(Math.random()* 150), Math.round(Math.random()* 150)]
        setAnswer(numbers.map(num => {
            return pokemon.find(poke => poke.id === num)
        }))
    }

    useEffect(() =>{
        axios('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
            .then(res => setPokemon(res.data.pokemon))
    },[])


    const compareAnswer = () => {
        if (pokemon.id === goal.id){
            console.log('right')
        } else {
            console.log('wrong')
        }
        start()
    }
    return (
        <>
            <div>SCORE: </div>
            <button onClick={start}>Start</button>
            <div>
                <img src={goal.img} alt=""/>
            </div>
            {
                answer.map(el => (
                    <div><button onClick={() => compareAnswer(el.id)}>{el.name}</button></div>
                ))
            }
        </>
    )
}
export default Pokemon;

