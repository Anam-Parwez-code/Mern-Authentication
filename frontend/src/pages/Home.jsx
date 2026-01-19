import React,{useEffect,useState} from "react";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";

import {ToastContainer} from 'react-toastify';

function Home(){
    const [loggedInUser,setloggedInUser] = useState('');
     const [products,setproducts] = useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const user=localStorage.getItem('loggedInUser');
        if(user){
            setloggedInUser(user);
        }
        else{
            navigate('/login')
        }
    },[navigate])
    const handlelogout = ()=>{
        localStorage.removeItem('token');
                localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout')

        setTimeout(()=>{
            navigate('/login');
        },1000);
    };
    const fetchProducts=async()=>{
        try{
            const url='https://mern-authentication-ivory-eta.vercel.app/products';
            const response=await fetch(url,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
                }
            });
            if(response.status===401 || response.status===403){
                handleError('Session Expired,please Login again');
                navigate('/login');
                return;
            }

            const result=await response.json();
            console.log("Products API result:",result);
            if(Array.isArray(result)){
            setproducts(result);
            }else if(Array.isArray(result.products)){
                            setproducts(result.products);
            }

        }catch(err){
            handleError(err.message);
        }
    };
    useEffect(()=>{
        fetchProducts();
    },[]);
    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handlelogout}>LogOut</button>
            <div>
                {products.map((item,index)=>(
 <ul key={index}>
                            <span>
                                {item.name}:{item.price}
                            </span>
                        </ul>
                ))}
                   
                        
                    
            </div>
           <ToastContainer/>
            </div>
    );
}
export default Home
