import React, { useContext, useEffect, useState } from 'react'
import AddNewProdect from '../componat/AddNewProdect';
import { IoAddOutline } from "react-icons/io5";
import Orders from '../componat/orders';
import axios from 'axios';
import { apiData } from '../AllDataModels/ordersApiD';
const Home = () => {
  let [AddNewProBoxShow, setAddNewProBoxShow] = useState(false)
  let HandleAddNewProduct = () => {
    setAddNewProBoxShow(!AddNewProBoxShow)
  }

  let [ items , setItems ] = useState('')

  let data = useContext(apiData)

  const S_E_system = () => {
    let select = data.filter( item => item?.orderStatus?.orderStatus === "Delivered" )
    
    if (select.length) {
      let AllP = select.flatMap(item => item.orderItem.map(orders => Number(orders.Price))).reduce((acc , price) => acc + price)
      setItems(AllP)
      
    } else {
    }
    
  }
  
  useEffect(()=>{
    S_E_system()
  },[data])
  
  console.log(items);
  

  return (
    <>
      <section>
        <div className="container relative mx-auto">
          <div className="mainDev my-[10px] flex gap-[10px] ">
            <div className="left_Box p-[10px] px-[20px] bg-[#e5e2e2] w-[39%]">
              <h5>Total Earning :{items}৳ </h5>
              <h2>Tolal sell Item :</h2>
            </div>
            <div className="Right_Box p-[10px] px-[20px] bg-[#e5e2e2] w-[59%]">
              <Orders/>
            </div>
          </div>
          <h2 onClick={HandleAddNewProduct} className=' z-[999] fixed bottom-[30px] right-[30px] text-[green] h-[40px] w-[40px] bg-[#c7c7c7] rounded-[50%] text-[24px] flex justify-center items-center'><IoAddOutline /></h2>
          {
            AddNewProBoxShow !== false
              ? <div className=" absolute w-[100%]  bg-[#fff] p-[30px] top-0 left-0">
                <AddNewProdect />
              </div>
              : ""
          }

        </div>
      </section>
    </>
  )
}

export default Home