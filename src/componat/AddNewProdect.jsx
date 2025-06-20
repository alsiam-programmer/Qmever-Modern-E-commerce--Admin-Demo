import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { FaImage } from "react-icons/fa";
const AddNewProdect = () => {

  const db = getDatabase();

  let [Url, setUrl] = useState('')
  let [name, setname] = useState('')
  let [cate, setcate] = useState('')
  let [Mainx_category, setMainx_category] = useState('')
  let [subx_category, setsubx_category] = useState('')
  let [subsx_category, setsubsx_category] = useState('')
  let [Mainx_category_value, setMainx_category_value] = useState('')
  let [subx_category_value, setsubx_category_value] = useState('')
  let [subsx_category_value, setsubsx_category_value] = useState('')
  let [VideoURL, setVideoURL] = useState('')
  let [ModelName, setModelName] = useState('')
  let [ModleItem, setModleItem] = useState('')
  let [Modles, setModles] = useState('')
  let [description, setdescription] = useState('')
  let [Price, setPrice] = useState('')
  let [ProdectId, setProdectId] = useState('')
  let [Thum1, setthum1] = useState('')
  let [Thum2, setthum2] = useState('')
  let [Thum3, setthum3] = useState('')
  let [products, setProducts] = useState({});
  let [subPrice, setsubPrice] = useState('');

  let handleUrl = (e) => {
    let File = e.target.files[0]
    if (File) {
      let reader = new FileReader();
      reader.onloadend = () =>{
        setUrl(reader.result);
      }
      reader.readAsDataURL(File); // Read the file as a Data URL
    }else {
      console.error("No file selected");
    }  

  }
  let handleName = (e) => {
    setname(e.target.value);

  }
  let handleMainCate = (item) => {
    setMainx_category(item.id);
    setMainx_category_value(item.name)
  }
  let handlesubCate = (item) => {
    setsubx_category(item.id);
    setsubx_category_value(item.name)
  }
  let handlesubsCate = (item) => {
    setsubsx_category(item.id);
    setsubsx_category_value(item.name)
  }
  let handleDescription = (e) => {
    setdescription(e.target.value)
  }
  let handlePrice = (e) => {
    setPrice(e.target.value)
  }
  let handlethum1 = (e) => {
    let File = e.target.files[0]
    if (File) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setthum1(reader.result);
      }
      reader.readAsDataURL(File)
    } else{
      console.error("No file selected");
    }
  }
  let handlethum2 = (e) => {
    let File = e.target.files[0]
    if (File) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setthum2(reader.result)
      }
      reader.readAsDataURL(File)
    }
  }
  let handlethum3 = (e) => {
    let File = e.target.files[0]
    if (File) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setthum3(reader.result)
      }
      reader.readAsDataURL(File)
    }
  }
  // let HandleVideoURL = (e) => {
  //   let videoFile = e.target.files[0]
  //   if (videoFile) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setVideoURL(reader.result)
  //     }
  //     reader.readAsDataURL(videoFile)
  //   }
  // }
  let HandleModles = (e) => {
    setModleItem(e.target.value);

  }
  let handleAddModle = () => {
    setModles(prevModels => [...prevModels,{ Model:ModleItem , Price:subPrice}]);
    setModleItem('')
  }
  let HandleModelName = (e) => {
    setModelName(e.target.value)
  }
  let handlesubPrice = (e) => {
    setsubPrice(e.target.value);
    
  }

  console.log(VideoURL);
  
 
  let submit = () => {
    let CodeG = Math.random()*ProdectId*1000/ProdectId
    let PCU = CodeG.toFixed(0)
    console.log(PCU);
    set(ref(db, 'products/' + ProdectId), {
      PCU: ` PCU:${PCU}` ,
      Prodectname: name,
      imgurl: Url,
      Price: Price,
      category: {
        main: Mainx_category_value,
        sub: subx_category_value,
        subs: subsx_category_value,
      },
      description: description,
      ProdectId: ProdectId,
      ModelName: ModelName,
      VideoURL:VideoURL,
      addModle : Modles,
      thumbnail: {
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
    setModles('')
    setModleItem('')
    setVideoURL('')
    
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
  }, [db, ProdectId])



  const Main_category = [
    {"id":"0", "name":"Health" },
    {"id":"1", "name":"Dress" },
    {"id":"2", "name":"Food/Vegetables" },
    {"id":"3", "name":"jewelery" },
    {"id":"4", "name":"electronics" },
  ]
  const sub_category = [
    { "id":"0" , "Main_C_id":"1", "name":"man" },
    { "id":"1" , "Main_C_id":"1", "name":"woman" },
    { "id":"2" , "Main_C_id":"1", "name":"child" },
    { "id":"3" , "Main_C_id":"1", "name":"boys" },
    { "id":"4" , "Main_C_id":"1", "name":"girls" },
    { "id":"5" , "Main_C_id":"2", "name":"Vegetables" },

  ]

  const subs_category = [
    { "id":"0" , "sub_C_id":"0" , "name":"t-shirt" },
    { "id":"1" , "sub_C_id":"0" , "name":"shirt" },
    { "id":"2" , "sub_C_id":"0" , "name":"wallet" },
    { "id":"3" , "sub_C_id":"0" , "name":"shoes" },
    { "id":"4" , "sub_C_id":"0" , "name":"pant" },
    { "id":"5" , "sub_C_id":"0" , "name":"underwear " },
    { "id":"6" , "sub_C_id":"0" , "name":"jacket " },
    { "id":"7" , "sub_C_id":"1" , "name":"Saree" },
    { "id":"8" , "sub_C_id":"1" , "name":"Three pice" },
    { "id":"9" , "sub_C_id":"1" , "name":"one pice" },
    { "id":"10" , "sub_C_id":"1" , "name":"bra" },
    { "id":"11" , "sub_C_id":"1" , "name":"panty" },
    { "id":"12" , "sub_C_id":"1" , "name":"shoes" },
    { "id":"13" , "sub_C_id":"1" , "name":"pant" },
    { "id":"14" , "sub_C_id":"1" , "name":"shirt" },
    { "id":"15" , "sub_C_id":"1" , "name":"watch" },
    { "id":"16" , "sub_C_id":"1" , "name":"two pice" },
    { "id":"17" , "sub_C_id":"1" , "name":"wallet" },
    { "id":"18" , "sub_C_id":"1" , "name":"handbag" },
    { "id":"19" , "sub_C_id":"0" , "name":"watch " },
    { "id":"19" , "sub_C_id":"5" , "name":"Chili" },


  ]

  
  
  return (
<section>
  <div className="container mx-auto px-[10px] py-[20px]">
    <div className="inputBox w-full bg-white shadow-md rounded-lg p-6">

      <label htmlFor="MainImg_Pro" className="block mb-4">
        {Url !== "" ? (
          <div className="p-4 my-4 flex justify-center items-center addimgDev w-[500px] border-2 border-gray-300 rounded-lg">
            <img src={Url} alt="Preview" className="max-h-[300px]" />
          </div>
        ) : (
          <div className="my-4 flex justify-center items-center addimgDev w-[500px] h-[200px] border-2 border-gray-300 rounded-lg">
            <h2 className='text-[26px] text-gray-400'><FaImage /></h2>
          </div>
        )}
      </label>
      <input
        id='MainImg_Pro'
        className='hidden'
        onChange={handleUrl}
        type="file"
      />

      <div className="flex gap-3 flex-wrap">
        {[Thum1, Thum2, Thum3].map((thumb, index) => (
          <div key={index} className="w-[100px] h-[100px]">
            <label htmlFor={`Thum${index + 1}`} className="block h-[80px]">
              {thumb !== "" ? (
                <div className="p-2 flex justify-center items-center addimgDev border-2 border-gray-300 rounded-lg">
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className="max-h-[80px]" />
                </div>
              ) : (
                <div className="flex justify-center items-center addimgDev w-full h-full border-2 border-gray-300 rounded-lg">
                  <h2 className='text-[26px] text-gray-400'><FaImage /></h2>
                </div>
              )}
            </label>
            <input
              id={`Thum${index + 1}`}
              className='hidden'
              onChange={index === 0 ? handlethum1 : index === 1 ? handlethum2 : handlethum3}
              type="file"
            />
          </div>
        ))}
      </div>

      <input
        className='w-full px-4 py-2 mt-4 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400'
        onChange={handleName}
        value={name}
        type="text"
        placeholder='Product Name'
      />
      <input
        className='w-full px-4 py-2 mt-4 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400'
        onChange={handlePrice}
        value={Price}
        type="text"
        placeholder='Price'
      />

      <div className="category mt-6">
        <div className="flex flex-wrap gap-2">
          {Main_category.map((item) => (
            <h5
              key={item.id}
              onClick={() => handleMainCate(item)}
              className={`cursor-pointer text-[18px] px-4 py-2 rounded-lg font-semibold ${Mainx_category === item.id ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
            >
              {item.name || "null"}
            </h5>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {sub_category.map((item) => (
            <h5
              key={item.id}
              onClick={() => handlesubCate(item)}
              className={`cursor-pointer text-[18px] px-4 py-2 rounded-lg font-semibold ${Mainx_category === item.Main_C_id ? "block" : "hidden"} ${subx_category === item.id ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
            >
              {item.name || "null"}
            </h5>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {subs_category.map((item) => (
            <h5
              key={item.id}
              onClick={() => handlesubsCate(item)}
              className={`cursor-pointer text-[18px] px-4 py-2 rounded-lg font-semibold ${subx_category === item.sub_C_id ? "block" : "hidden"} ${subsx_category === item.id ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
            >
              {item.name || "null"}
            </h5>
          ))}
        </div>
        <h5 className='mt-2'>{Mainx_category_value} {subx_category_value} {subsx_category_value}</h5>
      </div>

      <input
        type="text"
        className='my-4 w-[200px] h-[40px] px-4 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400'
        onChange={HandleModelName}
        placeholder='Model Name'
      />

      <div className="flex gap-2 mt-4">
        <input
          onChange={HandleModles}
          value={ModleItem}
          placeholder='Model'
          className='w-[200px] h-[40px] px-4 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400'
          type="text"
        />
        <input
          onChange={handlesubPrice}
          placeholder='Price'
          className='w-[200px] h-[40px] px-4 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400'
          type="text"
        />
        <h2
          onClick={handleAddModle}
          className='bg-green-500 text-white w-[50px] flex justify-center items-center rounded-lg cursor-pointer'
        >
          Add
        </h2>
      </div>

      {Modles.length > 0 && (
        <div className="flex gap-4 flex-wrap my-4">
          {Modles.map((itemModles, index) => (
            <div key={index} className="">
              <h2 className='rounded-lg px-4 py-2 border-2 border-red-400 text-[18px]'>"{itemModles.Model}"</h2>
              <h2 className='rounded-lg px-4 py-2 border-2 border-red-400 text-[18px]'>"{itemModles.Price}"</h2>
            </div>
          ))}
        </div>
      )}

      <textarea
        onChange={handleDescription}
        value={description}
        className='w-full px-4 py-2 mt-4 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 h-[200px]'
        placeholder='Description'
      ></textarea>

      <h2
        className='cursor-pointer mt-4 px-6 py-2 bg-green-500 text-white rounded-lg text-center w-[120px]'
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
