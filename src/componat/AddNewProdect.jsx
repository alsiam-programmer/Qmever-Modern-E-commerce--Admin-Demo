import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, onValue } from "firebase/database";

const AddNewProdect = () => {

    const db = getDatabase();

    let [Url, setUrl] = useState('')
    let [name, setname] = useState('')
    let [cate, setcate] = useState('')
    let [description, setdescription] = useState('')
    let [Price, setPrice] = useState('')
    let [ProdectId, setProdectId] = useState('')
    let handleUrl = (e) => {
        setUrl(e.target.value);

    }
    let handleName = (e) => {
        setname(e.target.value);

    }
    let handlecate = (e) => {
        setcate(e.target.value);

    }
    let handledescription = (e) => {
        setdescription(e.target.value)
    }
    let handlePrice = (e) => {
        setPrice(e.target.value)
    }
    let submit = () => {
        set(ref(db, 'products/' + ProdectId), {
            Prodectname: name,
            imgurl: Url,
            Price: Price,
            category: cate,
            description: description,
            ProdectId : ProdectId,
        });
    }
    useEffect(() => {
        const starCountRef = ref(db, 'products/');
        onValue(starCountRef, (snapshot) => {
            let data = snapshot.val();
            console.log(data);
            if (ProdectId === "") {
                setProdectId(1)
            } else {
                setProdectId(snapshot.val().length)
            }
        });
    },[db , ProdectId])
    
    return (
        <section>
            <div className="container mx-auto">
                <div className="inputBox w-[100%] md:w-[50%]">
                    <input className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]' onChange={handleName} type="text" placeholder='Name' />
                    <input className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]' onChange={handleUrl} type="text" placeholder='img URL' />
                    <input className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]' onChange={handlePrice} type="text" placeholder='price' />
                    <input className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]' onChange={handlecate} type="text" placeholder='category' />
                    <textarea onChange={handledescription} className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[200px]' ></textarea>
                    <h2 className=' cursor-pointer' onClick={submit} >send</h2>
                </div>
            </div>
        </section>
    )
}

export default AddNewProdect