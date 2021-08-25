import {useEffect, useState} from "react";
import axios from "axios";


const Pokemon = () =>{
    const [pokemon, setPokemon] = useState([])
    const [goal, setGoal] = useState({})
    const [answer, setAnswer] = useState([])
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(10)
    const [active, setActive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() =>{
        axios('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
            .then(res => setPokemon(res.data.pokemon))
    },[])

    const start = () =>{
       let random = Math.round(Math.random()* 150)
        setGoal(pokemon.find(item => item.id === random))
        const numbers = [random, Math.round((Math.random() * 151) + 1), Math.round((Math.random() * 151) + 1), Math.round((Math.random() * 151) + 1)]

        function makeRandomArr() {
            return Math.random() - 0.5;
        }

        numbers.sort(makeRandomArr)


        setAnswer(numbers.map(num => {
            return pokemon.find(poke => poke.id === num)
        }))
        setActive(true)
        if (count-1 === 0){
            setGoal([])
            setAnswer([])
            setMessage('')
        }
        if (setActive===false && count -1 === 0){
            setScore(0)
            setCount(10)
        }
    }


    const compareAnswer = (id) => {
        if (id === goal.id){
            setScore(score + 1)
            setMessage('You are right!')
        } else {
            setMessage("Wrong!")
        }
        setCount(count-1)
        if (count-1 === 0){
            start()
        }
        start()
    }


    return (
        <div className='content'>
            <div>SCORE:{score} </div>
            <button className='start-btn' onClick={start}>{active ? 'Restart' : 'Start'}</button>
            <div>
                <img src={goal.img} alt=""/>
            </div>
            {
                answer.map(el => (
                    <div><button className='choose-btn' onClick={() => compareAnswer(el.id)}>{el.name}</button></div>
                ))
            }
            <div>{message}</div>
            <div>You have {count} {count === 1  ? 'game-attempt' : 'game-attempts'}</div>
        </div>
    )
}
export default Pokemon;
