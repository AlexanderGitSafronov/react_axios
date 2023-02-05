import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './app.css'

export default function Api() {
    const [products, setProducts] = useState([])
    const [catigories, setCatigories] = useState([])
    const [status, setStatus] = useState('All')
    useEffect(() => {
        axios(`https://fakestoreapi.com/products${ status !== 'All' ? '/category/' + status : '' }`)
        .then(({data}) => {
            setProducts(data)
        }).catch((err) => console.log(err))

    }, [status])
    useEffect(() => {

        axios('https://fakestoreapi.com/products/categories')
        .then(({data}) => {
            setCatigories(data)
        }).catch((err) => console.log(err))

    }, [])
   
  
    return (
        <div>
           <ul>
               {products.map((el) => (
                   <li key={el.id}>{el.title}</li>
               ))}
               
           </ul>
           <h2>Status : {status}</h2>
           <div>
               <button className={`btn ${status === 'All' ? 'btn_active': ''}`}  onClick={()=> {setStatus('All')}} type='button'>All</button>
           {catigories.map((catigories) => (
                   <button className={`btn`} style = {{backgroundColor : catigories === status ? 'red' : ''}} type='button' onClick={()=> {setStatus(catigories)}} key={catigories}>{catigories}</button>
               ))}
           </div>
        </div>
    )
}
