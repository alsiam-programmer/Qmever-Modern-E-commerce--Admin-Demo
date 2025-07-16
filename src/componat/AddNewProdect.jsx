import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { FaImage } from "react-icons/fa";
import { SketchPicker } from 'react-color'
import { useRef } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const AddNewProdect = () => {
  const db = getDatabase();
  const pickerRef = useRef(null)
  const [Url, setUrl] = useState('');
  const [Thum1, setthum1] = useState('');
  const [Thum2, setthum2] = useState('');
  const [Thum3, setthum3] = useState('');
  const [name, setname] = useState('');
  const [Mainx_category, setMainx_category] = useState('');
  const [subx_category, setsubx_category] = useState('');
  const [subsx_category, setsubsx_category] = useState('');
  const [Mainx_category_value, setMainx_category_value] = useState('');
  const [subx_category_value, setsubx_category_value] = useState('');
  const [subsx_category_value, setsubsx_category_value] = useState('');
  const [VideoURL, setVideoURL] = useState('');
  const [ModelName, setModelName] = useState('');
  const [ModleItem, setModleItem] = useState('');
  const [Modles, setModles] = useState([]);
  const [description, setdescription] = useState('');
  const [Price, setPrice] = useState('');
  const [ProdectId, setProdectId] = useState('');
  const [subPrice, setsubPrice] = useState('');
  const [Colours, setColours] = useState([
    {Color : '' , Stock : '' }
  ])
  const [activeIndex, setActiveIndex] = useState(null); // Tracks which picker is open


  const Main_category = [
    { id: "0", name: "Health" },
    { id: "1", name: "Dress" },
    { id: "2", name: "Food/Vegetables" },
    { id: "3", name: "Jewelry" },
    { id: "4", name: "Electronics" },
  ];

  const sub_category = [
    { id: "0", Main_C_id: "1", name: "Man" },
    { id: "1", Main_C_id: "1", name: "Woman" },
    { id: "2", Main_C_id: "1", name: "Child" },
    { id: "3", Main_C_id: "2", name: "Vegetables" },
  ];

  const subs_category = [
    { id: "0", sub_C_id: "0", name: "T-shirt" },
    { id: "1", sub_C_id: "0", name: "Shirt" },
    { id: "2", sub_C_id: "1", name: "Saree" },
    { id: "3", sub_C_id: "1", name: "Three Piece" },
    { id: "4", sub_C_id: "3", name: "Chili" },
    { id: "5", sub_C_id: "0", name: "Jacket" },
  ];

  const handleAddModle = () => {
    if (ModleItem) {
      setModles(prev => [...prev, { Model: ModleItem , Price: subPrice ? subPrice : "", NeedValue : Colours }]);
      setModleItem('');
      setsubPrice('');
      setColours([])
    }
  };

  const submit = () => {
    set(ref(db, 'products/' + ProdectId), {
      PCU: name.slice(0, 2) + (ProdectId + 1).toString(),
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
      VideoURL: VideoURL,
      addModle: Modles,
      thumbnail: {
        productimg: Thum1,
        productimg2: Thum2,
        productimg3: Thum3,
      }
    }).then(() => {
      setUrl(''); setname(''); setdescription(''); setthum1(''); setthum2(''); setthum3('');
      setPrice(''); setModles([]); setModleItem(''); setVideoURL('');
      setMainx_category(''); setsubx_category(''); setsubsx_category('');
      setMainx_category_value(''); setsubx_category_value(''); setsubsx_category_value('');
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, 'products/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setProdectId(data ? Object.keys(data).length : 0);
    });
  }, []);


  let AddSubColour = () => {
    setColours([...Colours , {Color : "" , Stock : "" }])
  }

  let ColVal = (item, index) => {
    let update = [...Colours]
    update[index].Color = item
    setColours(update)
  }

  let HandleStock = ( item , index ) => {
    let update = [...Colours]
    update[index].Stock = item
    setColours(update)
  }

  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        pickerRef.current && !pickerRef.current.contains(event.target)
      ) {
        setActiveIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutSide)

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide)
    }


  }, [])
  
  const ModlesRemove = (index) => {
    const updatedModles = [...Modles]
    updatedModles.splice(index , 1)
    setModles(updatedModles)
  }

  const handleColorRemove = (index) => {
    const updatedColours = [...Colours]
    updatedColours.splice(index, 1);
    setColours(updatedColours)
  }

  return (
<div className="p-6 max-w-5xl mx-auto space-y-6 bg-white shadow rounded-xl">
  <h2 className="text-2xl font-bold">Add New Product</h2>

  {/* Main Image URL input */}
  <div>
    <label className="block mb-1 font-semibold">Main Image URL</label>
    <input
      type="text"
      placeholder="Paste main image URL"
      className="border p-2 rounded w-full"
      value={Url}
      onChange={(e) => setUrl(e.target.value)}
    />
    {Url && <img src={Url} alt="Main" className="mt-2 h-32 rounded" />}
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
      <label className="block mb-1 font-semibold">Thumbnail 1 URL</label>
      <input
        type="text"
        placeholder="Paste thumbnail 1 URL"
        className="border p-2 rounded w-full"
        value={Thum1}
        onChange={(e) => setthum1(e.target.value)}
      />
      {Thum1 && <img src={Thum1} className="mt-2 h-32 rounded" />}
    </div>
    <div>
      <label className="block mb-1 font-semibold">Thumbnail 2 URL</label>
      <input
        type="text"
        placeholder="Paste thumbnail 2 URL"
        className="border p-2 rounded w-full"
        value={Thum2}
        onChange={(e) => setthum2(e.target.value)}
      />
      {Thum2 && <img src={Thum2} className="mt-2 h-32 rounded" />}
    </div>
    <div>
      <label className="block mb-1 font-semibold">Thumbnail 3 URL</label>
      <input
        type="text"
        placeholder="Paste thumbnail 3 URL"
        className="border p-2 rounded w-full"
        value={Thum3}
        onChange={(e) => setthum3(e.target.value)}
      />
      {Thum3 && <img src={Thum3} className="mt-2 h-32 rounded" />}
    </div>
  </div>

  {/* Product Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      className="border p-2 rounded"
      placeholder="Product Name"
      value={name}
      onChange={(e) => setname(e.target.value)}
    />
    <input
      className="border p-2 rounded"
      placeholder="Price"
      value={Price}
      onChange={(e) => setPrice(e.target.value)}
    />
    <input
      className="border p-2 rounded"
      placeholder="Video URL"
      value={VideoURL}
      onChange={(e) => setVideoURL(e.target.value)}
    />
    <input
      className="border p-2 rounded"
      placeholder="Model Name"
      value={ModelName}
      onChange={(e) => setModelName(e.target.value)}
    />
  </div>

  {/* Description */}
  <textarea
    className="w-full border p-2 rounded"
    rows="3"
    placeholder="Description"
    value={description}
    onChange={(e) => setdescription(e.target.value)}
  />

  {/* Add Models */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
    <input
      className="border p-2 rounded"
      placeholder="Model"
      value={ModleItem}
      onChange={(e) => setModleItem(e.target.value)}
    />
    <input
      className="border p-2 rounded"
      placeholder="Sub Price"
      value={subPrice}
      onChange={(e) => setsubPrice(e.target.value)}
    />
    <button
      className="bg-blue-500 text-white w-[80px] py-2 text-[16px] rounded hover:bg-blue-600"
      onClick={AddSubColour}
    >
      +
    </button>

    {Colours?.map((item, index) => (
      <div key={index} className="flex relative items-center gap-3 mb-4">
        {/* Label or Color Circle */}
        {!item?.Color ? (
          <label
            className="text-sm font-medium text-gray-700 cursor-pointer"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            Choose Color
          </label>
        ) : (
          <div
            className="w-10 h-10 rounded-full border shadow cursor-pointer"
            style={{ backgroundColor: item?.Color }}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            title={item.Color}
          />
        )}

        {/* Remove Button */}
        <button onClick={() => handleColorRemove(index)} className="text-[red]">
          <CiCircleRemove />
        </button>

        {/* Stock Input */}
        <input
          className="border p-2 rounded"
          placeholder="Stock"
          value={item.Stock || ""}
          onChange={(e) => HandleStock(e.target.value, index)}
        />

        {/* Color Picker */}
        {activeIndex === index && (
          <div className="absolute top-12 z-50" ref={pickerRef}>
            <SketchPicker
              color={item?.Color}
              onChangeComplete={(color) => ColVal(color.hex, index)}
            />
          </div>
        )}
      </div>
    ))}

    <button
      onClick={handleAddModle}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add Model
    </button>
  </div>

  <ul className="space-y-4 text-sm text-gray-700">
    {Modles.map((m, i) => (
      <li
        key={i}
        className="border cursor-pointer flex gap-2 items-center justify-between p-4 rounded-lg shadow-sm bg-white"
      >
        <span onClick={() => ModlesRemove(i)} className="text-red-700 text-[24px]">
          <MdDeleteForever />
        </span>

        <div className="cursor-pointer font-semibold  text-[20px]  text-gray-800 hover:text-blue-600">
          {ModelName} : {m.Model}
        </div>
        {m.Price && (
          <div className="cursor-pointer flex gap-1 font-semibold items-center text-[20px]  text-gray-800 hover:text-blue-600">
            <span>{m.Price}</span>
            <span className="text-green-900 text-[24px] font-bold hover:text-green-700">৳</span>
          </div>
        )}

        {m?.NeedValue?.map((item, idx) => (
          <div key={idx} className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 border shadow-black/13 shadow-sm "
                style={{ backgroundColor: item?.Color }}
              />
            </div>
            <span className="cursor-pointer font-semibold items-center text-[20px]  text-gray-800 hover:text-blue-600">
              Stock : {item?.Stock || "null"}
            </span>
          </div>
        ))}
      </li>
    ))}
  </ul>

  {/* Category Selection */}
  <div className="space-y-2">
    <div>
      <h4 className="font-semibold">Main Category</h4>
      <div className="flex flex-wrap gap-2">
        {Main_category.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setMainx_category(cat.id);
              setMainx_category_value(cat.name);
            }}
            className={`px-3 py-1 rounded ${
              Mainx_category === cat.id ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-semibold">Sub Category</h4>
      <div className="flex flex-wrap gap-2">
        {sub_category
          .filter((c) => c.Main_C_id === Mainx_category)
          .map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setsubx_category(cat.id);
                setsubx_category_value(cat.name);
              }}
              className={`px-3 py-1 rounded ${
                subx_category === cat.id ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>
    </div>

    <div>
      <h4 className="font-semibold">Sub Sub Category</h4>
      <div className="flex flex-wrap gap-2">
        {subs_category
          .filter((c) => c.sub_C_id === subx_category)
          .map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setsubsx_category(cat.id);
                setsubsx_category_value(cat.name);
              }}
              className={`px-3 py-1 rounded ${
                subsx_category === cat.id ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <button
    onClick={submit}
    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-lg font-semibold"
  >
    Submit Product
  </button>
</div>

  );
};

export default AddNewProdect;
