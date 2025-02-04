import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
   
    const [item,setItem]=useState(null)
    const [updatedData,setUpdatedData]=useState("")

    useEffect(()=>{
        axios.get(`${API_URI}/${itemId}`)
        .then((res)=>{
            setItem(res.data)
            setUpdatedData(res.data.name)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[itemId])

    const handleChange=(e)=>{
        setUpdatedData(e.target.value)
    }

    const handleUpdate=async(e)=>{
        e.preventDefault()
        try{
            let response = await axios.put(`${API_URI}/${itemId}`, { name: updatedData })
            setItem(response.data)
            console.log('Item updated scuccessfully')
        }
        catch(err){
            console.log(err.message)
            return err
        }
    }


    return (
        <div>
            <h1>Update Item</h1>
            <p>name: {item?.name}</p>
            <input type="text" value={updatedData} onChange={handleChange}/>
            <button onClick={handleUpdate}>Update</button>
        </div>
    )
};

export default UpdateItem;