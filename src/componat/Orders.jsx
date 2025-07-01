import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { AiOutlineLoading } from "react-icons/ai";
import { apiData } from '../AllDataModels/ordersApiD';

const Orders = () => {
    let data = useContext(apiData)
    let statusRef = useRef()
    let db = getDatabase()
    let [allOrders, setallOrders] = useState([])
    let [orders_item_Data, setorders_item_Data] = useState(false)
    let [orderStatus_on_Of, setorderStatus_on_Of] = useState(false)
    let [CUid, setCUid] = useState('')
    let [ORid, setORid] = useState('')
    let [CUaddress, setCUaddress] = useState({})
    let [Order_ITEM, setOrder_ITEM] = useState([])
    let [sub_status, setsub_status] = useState([])
    let [status, setStatus] = useState('')
    let [Loading, setLoading] = useState(false)

    console.log(data);
    
    const oR_status = [
        { "id": "0", "status": "Processing" },
        { "id": "1", "status": "Confirmed" },
        { "id": "2", "status": "Picking" },
        { "id": "3", "status": "Shipped" },
        { "id": "4", "status": "Delivered" },
        { "id": "5", "status": "Cancelled" },
    ]
    
    

    const orders_data = async () => {
        setLoading(true);
        try {
            let res = await axios.get('https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json');
            if (res?.data) {
                const ordersObject = Object.values(res.data).flat().filter(item => item !== null);
                setallOrders(ordersObject);
            } else {
                console.log("No data in the orders API response.");
            }
        } catch (error) {
            console.error("Error fetching orders data:", error);
        } finally {
            
        }
    };
    
    useEffect(() => {
        try {
            if (data.length > 0) {
                setLoading(false); 
            } else {
                setLoading(true);
            }
        } catch (error) {
            
        }
    },); // Ensure `status` is updated somewhere

    
    let handleOrders = ({ item, index }) => {
        if (orders_item_Data === false) {
            setorders_item_Data(index)
        } else {
            setorders_item_Data(index)
        }
        setCUid(item.customerUid)
        setORid(item.orderId)

    }

    useEffect(() => {
        let handlestatus = (e) => {
            if (statusRef.current.contains(e.target) !== false) {
                setorderStatus_on_Of(statusRef.current.contains(e.target))
            } else {
                setorderStatus_on_Of(statusRef.current.contains(e.target))
            }
        }
        document.addEventListener('click', handlestatus)
        return () => document.removeEventListener('click', handlestatus)
    })

    let handleup_Order_sT = (item) => {
        if (CUid !== "" && ORid !== "") {
            const push_path = ref(db, `orders/${CUid}/${ORid}/orderStatus`)
            set(push_path, {
                orderStatus: item.status
            }).then(() => {
                console.log("data push");
                setStatus('')
            })
        } else {
            console.log("error");

        }
    }


    

    let handlesubItem = (citem) => {
        setStatus(citem.status)
    }




    let datas = () => {
        
        const find_sub_status = data.filter((item) => item?.orderStatus?.orderStatus === status )
        setsub_status(find_sub_status)
        
    }


    useEffect(()=>{
        datas()
    },[status])

    return (
        <div className="Order_box w-[100%]">
            <div className=" flex justify-between mb-[20px] ">
                {oR_status.map((item, index) => (
                    <h5 onClick={() => handlesubItem(item)} className={` ${item.id !== "5" ? "" : "bg-[red]"} cursor-pointer px-[20px] py-[4px] text-[#fff] bg-[#000] rounded`} >{item.status}</h5>
                ))}
            </div>
            {
                Loading && (
                    <div className="loader mx-auto">
                    </div>
                )
            }
            {sub_status.map((item, index) => (
                <div className=" w-[100%] ">

                    <div onClick={() => handleOrders({ item, index })} className="header_Order py-[10px] border-[2px] border-[#000] rounded-[10px] my-[10px] cursor-pointer px-[10px] flex justify-between w-[100%] ">
                        <h5 className='text-[18px] text-[green] font-[700]' >Order Id : <span className='font-[600] text-[#ff00c8]' >{item.orderId}</span> </h5>
                        <h5 className='text-[#ff00c8] tex-[18px] font-[600] ' >{item.customer?.email}</h5>
                    </div>
                    {orders_item_Data === index
                        ?
                        <div className="w-[100%]">
                            <div className="customer pb-[30px] border-b-[1px] border-b-[#000]">
                                <h4 className='w-[100%] flex justify-center text-[#000] my-[30px] font-[700] uppercase' >Customer Data</h4>
                                <h5 className='text-[#ff00c8] tex-[18px] font-[600] flex justify-between py-[6px] ' ><span className='text-[green]' >Customer Gmail</span>{item.customer?.email}</h5>
                                <h5 className='text-[#ff00c8] tex-[18px] font-[600] flex justify-between py-[6px] ' ><span className='text-[green]' >Customer Name</span>{item.customer?.username}</h5>
                                <h5 className='text-[#ff00c8] tex-[18px] font-[600] flex justify-between py-[6px] ' ><span className='text-[green]' >Customer Number</span>{item.customer?.Phone_Number}</h5>
                                <h5 className='text-[#ff00c8] tex-[18px] font-[600] flex justify-between py-[6px] ' ><span className='text-[green]' >Customer Address</span>{item.customer?.unions},{item.customer?.upazila},{item.customer?.District},{item.customer?.Division}</h5>
                                <h5 className='text-[#ff00c8] tex-[18px] font-[600] flex justify-between py-[6px] ' ><span className='text-[green]' >Customer Local Address</span>{item.customer?.local_address}</h5>
                            </div>
                            <div className="buy">
                                <h4 className='w-[100%] flex justify-center text-[#000] my-[30px] font-[700] uppercase' >Buy item</h4>
                                <h4 ref={statusRef} className='w-[100%] cursor-pointer flex justify-center bg-[green] text-[#fff] mt-[30px] font-[700] uppercase' >{item?.orderStatus?.orderStatus}</h4>
                                {
                                    orderStatus_on_Of !== false
                                        ?
                                        <div className="w-[50%] my-[6px] mx-auto">
                                            {oR_status.map((item) => (
                                                <h4 onClick={() => handleup_Order_sT(item)} className={` ${item.id !== "5" ? "bg-[green]" : "bg-[red]"} cursor-pointer w-[100%] flex justify-center text-[#fff] my-[2px] font-[700] uppercase`} >{item.status}</h4>
                                            ))}
                                        </div>
                                        : ""
                                }
                                {item?.orderItem?.map((item_m, itemIndex) => (

                                    item_m.cartItem === undefined ?
                                        <div
                                            key={item_m.ProdectId} // Unique key for React list rendering
                                            className="product-item border-[1px] border-[#ccc] p-[10px] rounded-[10px] mb-[10px]"
                                        >
                                            <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[green]">Product Name:</span>
                                                {item_m.Prodectname || "N/A"}
                                            </h5>
                                            <h5 className="text-[#ff2b2b] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[#000]">Total price: </span>
                                                {item.TotalBuild || "N/A"} ৳
                                            </h5>
                                            <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[green]">Price:</span>
                                                {item_m.Price || "N/A"}
                                            </h5>

                                            <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[green]">Product ID:</span>
                                                {item_m.ProdectId || "N/A"}
                                            </h5>

                                            <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[green]">Quantity:</span>
                                                {item_m.ProdectQun || "N/A"}
                                            </h5>

                                            <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[green]">Category:</span>
                                                 {item_m?.category?.main  || "N/A"} /
                                                 {item_m?.category?.sub} /
                                                 {item_m?.category?.subs }
                                            </h5>

                                            <p className="text-[#333] text-[16px] font-[500] my-[10px]">
                                                {item_m.description || "No description available."}
                                            </p>

                                            {item_m.imgurl && (
                                                <img
                                                    src={item_m.imgurl}
                                                    alt={item_m.Prodectname || "Product Image"}
                                                    className="w-[200px] h-auto rounded-[10px] my-[10px]"
                                                />
                                            )}
                                        </div>
                                        : <div className="">
                                            <h5 className="text-[#15a115] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[#000]">Total price: </span>
                                                {item.TotalBuild || "N/A"} ৳
                                            </h5>
                                            <h5 className="text-[#15a115] text-[18px] font-[600] flex justify-between py-[6px]">
                                                <span className="text-[#000]">Total price: </span>
                                                {item_m.totalQun || "N/A"} X
                                            </h5>
                                            {item_m?.cartItem?.map((itemx) => (
                                                <div key={itemx.ProdectId} className="">

                                                    <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                        <span className="text-[green]">Product Name:</span>
                                                        {itemx.Prodectname || "N/A"}
                                                    </h5>
                                                    <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                        <span className="text-[green]">Price:</span>
                                                        {itemx.Price || "N/A"} ৳
                                                    </h5>

                                                    <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                        <span className="text-[green]">Product ID:</span>
                                                        #{itemx.ProdectId || "N/A"}
                                                    </h5>

                                                    <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                        <span className="text-[green]">Quantity:</span>
                                                        {itemx.ProdectQun || "N/A"}
                                                    </h5>

                                                    <h5 className="text-[#ff00c8] text-[18px] font-[600] flex justify-between py-[6px]">
                                                        <span className="text-[green]">Category:</span>
                                                        {/* {itemx.category || "N/A"} */}
                                                    </h5>

                                                    <p className="text-[#333] text-[16px] font-[500] my-[10px]">
                                                        {itemx.description || "No description available."}
                                                    </p>

                                                    {itemx.imgurl && (
                                                        <img
                                                            src={itemx.imgurl}
                                                            alt={itemx.Prodectname || "Product Image"}
                                                            className="w-[200px] h-auto rounded-[10px] my-[10px]"
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                        </div>
                                ))}

                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
            ))}
        </div>
    )
}

export default Orders