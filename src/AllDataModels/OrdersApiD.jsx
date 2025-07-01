import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

let apiData = createContext()

const OrdersApiD = ({children}) => {


  let [ info , setInfo ] = useState([])
  
  const Data_Call = async () => {
    
    try {

      let res = await axios.get('https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json')
      if (res?.data) {
        let system = Object.values(res.data).flat().filter( item => item !== null )
        console.log(system);
        
        setInfo(system);
      }

    } catch (error) {
      console.log(error);
      
    }
    
  }

  useEffect(()=>{
    Data_Call()
  },[info])
  
  return (                                                                                                                      
  <apiData.Provider value={info} >{children}</apiData.Provider>
  )
}

export {OrdersApiD , apiData }