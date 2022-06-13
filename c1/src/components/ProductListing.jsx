import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './product.css'

const ProductListing = () => {
    const [arr,setArr]=useState([])
    const[flag,setFlag]=useState(true)
    const[total,setTotal]=useState()
    const[page,setPage]=useState(1)
    const get = async()=>{
      try {
        let res=await fetch(`http://localhost:3001/form?_page=${page}&_limit=5`)
        let total = res.headers.get("X-Total-Count");
        setTotal(+total);
        let data=await res.json()
        console.log(data)
        setArr(data)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        get()
    },[flag])

    const del = (id)=>{
        fetch(`http://localhost:3001/form/${id}`,{
            method:"DELETE"
        })
        setFlag(!flag)
        }

  return (
    <>
      <h1 style={{textAlign:"center",margin:"1vw"}}>Registerd Items </h1>
    <div className='MainItemBox'>
  {
        arr.map(({id,title,gender,price,category,image})=>{
           return(
            <div className='ItemBox' >
            <div >
                <img src={image} alt="" />
            </div>
                <div className="information">Title : {title}</div>
                <div className="information">Gender : {gender}</div>
                <div className="information">Price : {price}</div>
                <div className="information">Category : {category}</div>
                <button onClick={()=>del(id)} className='deleteButton' >Delete</button>
            </div>
           )
        })
    }
  </div>
  
  <button className='deleteButton' onClick={()=>setPage(page-1)} disabled={page === 1} style={{marginTop:'1vw'}}>Prev</button>
      <button className='deleteButton' onClick={()=>setPage(page+1)} disabled={page === Math.ceil(total/5)}  style={{marginTop:'1vw'}}>Next</button>
    </>
  )
}

export default ProductListing

// "id": 10,
// "title": "Markel",
// "gender": "male",
// "price": 1353,
// "category": "jacket",
// "image": "https://picsum.photos/200"