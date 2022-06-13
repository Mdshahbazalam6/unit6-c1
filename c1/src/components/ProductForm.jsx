import React from 'react'
import { useState } from 'react'

const ProductForm = ({click}) => {
    const[data,setData]=useState({
        title:``,
        gender:``,
        price:``,
        category:``,
        image:``
    })
    const handleChange = (e) =>{
        let name=e.target.name
        let value=e.target.value 
        console.log(name,value)
        // setData({...data,[name]:value})
        setData({...data,[name]:value})
    }
const handleSubmit =(e)=>{
e.preventDefault()
fetch(`http://localhost:3001/form`,{
    method:"POST",
       body:JSON.stringify(data),
       headers :{
           "content-Type":"application/json"
       }
 })
.then((res)=>{
    res.json().then((res)=>{
        console.log(res)
        click()
    })
}).catch((error)=>{
    console.log(error)
})
console.log(data)
setData({
    title:``,
    gender:``,
    price:``,
    category:``,
    image:``
})
}
//   const {title,gender,price,category,image}=data
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='title'name='title' onChange={handleChange}  />
        <input type="number" placeholder='Price' name='Price' onChange={handleChange} />
        <input type="text" placeholder='Category' name='Category' onChange={handleChange} />
        <input type="text" placeholder='Image' name='Image' onChange={handleChange} />
        <select name="gender" id="" onChange={handleChange} >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select> 
        <input type="submit" onSubmit={handleSubmit} />
    </form>
  )
}

export default ProductForm