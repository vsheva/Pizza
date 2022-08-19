import {useParams, useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";

const FullPizza=()=>{
const {id}=useParams(); //    console.log(params)  // http://localhost:3000/pizza/5     //{id: '5'}
 const navigate= useNavigate()

    const [pizza, setPizza]= React.useState();

    React.useEffect(()=>{

       const fetchPizza=async()=>{
           try{
               const {data}= await axios.get(`https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks/${id}`)
               return setPizza(data);
           } catch(err){
            alert("Ошибка при получении пиццы!")
               navigate("/");
           }
       }
        fetchPizza();
    }, []);

    //пицца еще не загрузилась с бэка, но картинку мы уже просим, поэтому...
    if(!pizza) {
        return "Загрузка..."
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    )
}

export default FullPizza;