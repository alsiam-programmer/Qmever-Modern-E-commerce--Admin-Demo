import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";

const AddNewProdect = () => {

  const db = getDatabase();

  let [Url, setUrl] = useState('')
  let [name, setname] = useState('')
  let [cate, setcate] = useState('')
  let [description, setdescription] = useState('')
  let [Price, setPrice] = useState('')
  let [ProdectId, setProdectId] = useState('')
  let [Thum1, setthum1] = useState('')
  let [Thum2, setthum2] = useState('')
  let [Thum3, setthum3] = useState('')
  let [products, setProducts] = useState({}); 
  let handleUrl = (e) => {
      setUrl(e.target.value);

  }
  let handleName = (e) => {
      setname(e.target.value);

  }
  let handleCate = (e) => {
      setcate(e.target.value);

  }
  let handleDescription = (e) => {
      setdescription(e.target.value)
  }
  let handlePrice = (e) => {
      setPrice(e.target.value)
  }
  let handlethum1 = (e) => {
      setthum1(e.target.value)
  }
  let handlethum2 = (e) => {
      setthum2(e.target.value)
  }
  let handlethum3 = (e) => {
    setthum3(e.target.value)
  }
  let submit = () => {
      set(ref(db, 'products/' + ProdectId), {
          Prodectname: name,
          imgurl: Url,
          Price: Price,
          category: cate,
          description: description,
          ProdectId : ProdectId,
          thumbnail:{
            productimg: Thum1,
            productimg2: Thum2,
            productimg3: Thum3,
          }
      });
      setUrl('')
      setname('')
      setdescription('')
      setthum1('')
      setthum2('')
      setthum3('')
      setcate('')
      setPrice('')
  }
  useEffect(() => {
      const starCountRef = ref(db, 'products/');
      onValue(starCountRef, (snapshot) => {
          let data = snapshot.val();
          console.log(data);
          if (ProdectId === "") {
              setProdectId(0)
          } else {
              setProdectId(snapshot.val().length)
              if (ProdectId === undefined) {
                  setProdectId(0)
              }
          }
      });
  },[db , ProdectId])
  // const deleteProduct = (productId) => {
  //   const productRef = ref(db, `products/${productId}`);
  //   remove(productRef)
  //     .then(() => {
  //       console.log("Product deleted successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting product:", error);
  //     });
  // };

  return (
    <section>
      <div className="container mx-auto px-[10px]">
        <div className="inputBox w-[100%] md:w-[50%]">
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handleName}
            value={name}
            type="text"
            placeholder='Name'
          />
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handleUrl}
            value={Url}
            type="text"
            placeholder='img URL'
          />
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handlethum1}
            value={Thum1}
            type="text"
            placeholder='thum URL'
          />
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handlethum2}
            value={Thum2}
            type="text"
            placeholder='thum URL'
          />
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handlethum3}
            value={Thum3}
            type="text"
            placeholder='thum URL'
          />
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handlePrice}
            value={Price}
            type="text"
            placeholder='Price'
          />
          <input
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[40px]'
            onChange={handleCate}
            value={cate}
            type="text"
            placeholder='Category'
          />
          <textarea
            onChange={handleDescription}
            value={description}
            className='w-[100%] px-[20px] outline-none border-[#000] border-[2px] mt-[10px] h-[200px]'
            placeholder='Description'
          ></textarea>
          <h2
            className='cursor-pointer px-[20px] py-[5px] bg-[#08e008] flex justify-center text-[#fff] w-[100px]'
            onClick={submit}
          >
            Send
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AddNewProdect;
