import React, { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, set, push } from "firebase/database";
import { SketchPicker } from 'react-color';
import { CiCircleRemove } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { RiAddBoxLine } from "react-icons/ri";
import { VscDiffRemoved } from "react-icons/vsc";
const AddNewProduct = () => {
  const db = getDatabase();
  const pickerRef = useRef(null);

  // --- States ---
  const [Url, setUrl] = useState('');
  const [Thum1, setThum1] = useState('');
  const [Thum2, setThum2] = useState('');
  const [Thum3, setThum3] = useState('');
  const [name, setName] = useState('');
  const [Mainx_category, setMainx_category] = useState('');
  const [subx_category, setSubx_category] = useState('');
  const [subsx_category, setSubsx_category] = useState('');
  const [Mainx_category_value, setMainx_category_value] = useState('');
  const [subx_category_value, setSubx_category_value] = useState('');
  const [subsx_category_value, setsubsx_category_value] = useState('');
  const [VideoURL, setVideoURL] = useState('');
  const [ModelName, setModelName] = useState('');
  const [ModleItem, setModleItem] = useState('');
  const [addModle, setModles] = useState([]);
  const [description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [subPrice, setSubPrice] = useState('');
  const [Colours, setColours] = useState([{ Color: '', Stock: '' }]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [SpecificationValue , setSpecificationValue] = useState([])
  const [SpecificationValuefastinput , setSpecificationValuefastinput] = useState("")
  const [SpecificationValuesecoendinput , setSpecificationValuesecoendinput] = useState("")
  const [SBONOFF , setSBONOFF] = useState(false)
  

  // --- Category Data ---
const Main_category = [
  { id: "0", name: "Electronics" },
  { id: "1", name: "Fashion" },
  { id: "2", name: "Health & Beauty" },
  { id: "3", name: "Home & Living" },
  { id: "4", name: "Food & Beverages" },
  { id: "5", name: "Sports & Outdoors" },
  { id: "6", name: "Toys & Kids" },
  { id: "7", name: "Automotive" },
  { id: "8", name: "Books & Stationery" },
  { id: "9", name: "Jewelry & Accessories" },
];

const sub_category = [
  // Electronics
  { id: "0", Main_C_id: "0", name: "Mobiles & Tablets" },
  { id: "1", Main_C_id: "0", name: "Computers & Laptops" },
  { id: "2", Main_C_id: "0", name: "TV & Appliances" },
  { id: "3", Main_C_id: "0", name: "Cameras & Gadgets" },

  // Fashion
  { id: "4", Main_C_id: "1", name: "Men" },
  { id: "5", Main_C_id: "1", name: "Women" },
  { id: "6", Main_C_id: "1", name: "Kids" },
  { id: "7", Main_C_id: "1", name: "Footwear" },

  // Health & Beauty
  { id: "8", Main_C_id: "2", name: "Skincare" },
  { id: "9", Main_C_id: "2", name: "Makeup" },
  { id: "10", Main_C_id: "2", name: "Personal Care" },
  { id: "11", Main_C_id: "2", name: "Medical Supplies" },

  // Home & Living
  { id: "12", Main_C_id: "3", name: "Furniture" },
  { id: "13", Main_C_id: "3", name: "Home Decor" },
  { id: "14", Main_C_id: "3", name: "Kitchen" },
  { id: "15", Main_C_id: "3", name: "Appliances" },

  // Food & Beverages
  { id: "16", Main_C_id: "4", name: "Fruits & Vegetables" },
  { id: "17", Main_C_id: "4", name: "Snacks" },
  { id: "18", Main_C_id: "4", name: "Beverages" },
  { id: "19", Main_C_id: "4", name: "Dairy & Bakery" },

  // Sports & Outdoors
  { id: "20", Main_C_id: "5", name: "Fitness" },
  { id: "21", Main_C_id: "5", name: "Sports Equipment" },
  { id: "22", Main_C_id: "5", name: "Outdoor Gear" },

  // Toys & Kids
  { id: "23", Main_C_id: "6", name: "Toys" },
  { id: "24", Main_C_id: "6", name: "Baby Care" },
  { id: "25", Main_C_id: "6", name: "Clothing" },

  // Automotive
  { id: "26", Main_C_id: "7", name: "Car Accessories" },
  { id: "27", Main_C_id: "7", name: "Motorbike Accessories" },
  { id: "28", Main_C_id: "7", name: "Spare Parts" },

  // Books & Stationery
  { id: "29", Main_C_id: "8", name: "Books" },
  { id: "30", Main_C_id: "8", name: "Office Supplies" },
  { id: "31", Main_C_id: "8", name: "Art & Crafts" },

  // Jewelry & Accessories
  { id: "32", Main_C_id: "9", name: "Necklaces" },
  { id: "33", Main_C_id: "9", name: "Earrings" },
  { id: "34", Main_C_id: "9", name: "Rings" },
  { id: "35", Main_C_id: "9", name: "Watches" },
];

const subs_category = [
  // Mobiles & Tablets
  { id: "0", sub_C_id: "0", name: "Smartphones" },
  { id: "1", sub_C_id: "0", name: "Tablets" },
  { id: "2", sub_C_id: "0", name: "Mobile Accessories" },

  // Computers
  { id: "3", sub_C_id: "1", name: "Laptops" },
  { id: "4", sub_C_id: "1", name: "Desktops" },
  { id: "5", sub_C_id: "1", name: "Computer Accessories" },

  // Men Fashion
  { id: "6", sub_C_id: "4", name: "T-Shirts" },
  { id: "7", sub_C_id: "4", name: "Shirts" },
  { id: "8", sub_C_id: "4", name: "Jeans" },
  { id: "9", sub_C_id: "4", name: "Jackets" },
  { id: "27", sub_C_id: "4", name: "Wallets" },


  // Women Fashion
  { id: "10", sub_C_id: "5", name: "Saree" },
  { id: "11", sub_C_id: "5", name: "Kurti" },
  { id: "12", sub_C_id: "5", name: "Western Wear" },
  { id: "13", sub_C_id: "5", name: "Handbags" },

  // Fruits & Vegetables
  { id: "14", sub_C_id: "16", name: "Vegetables" },
  { id: "15", sub_C_id: "16", name: "Fruits" },
  { id: "16", sub_C_id: "16", name: "Herbs" },

  // Snacks
  { id: "17", sub_C_id: "17", name: "Chips" },
  { id: "18", sub_C_id: "17", name: "Biscuits" },
  { id: "19", sub_C_id: "17", name: "Nuts" },

  // Toys
  { id: "20", sub_C_id: "23", name: "Educational Toys" },
  { id: "21", sub_C_id: "23", name: "Soft Toys" },
  { id: "22", sub_C_id: "23", name: "Action Figures" },

  // Jewelry
  { id: "23", sub_C_id: "32", name: "Gold Necklaces" },
  { id: "24", sub_C_id: "32", name: "Silver Necklaces" },
  { id: "25", sub_C_id: "34", name: "Engagement Rings" },
  { id: "26", sub_C_id: "35", name: "Smart Watches" },
];

  // --- Color & Stock Handlers ---
  const addSubColour = () => setColours([...Colours, { Color: "", Stock: "" }]);
  const handleColorChange = (color, index) => {
    const update = [...Colours];
    update[index].Color = color;
    setColours(update);
  };
  const handleStockChange = (stock, index) => {
    const update = [...Colours];
    update[index].Stock = stock;
    setColours(update);
  };
  const removeColour = (index) => {
    const update = [...Colours];
    update.splice(index, 1);
    setColours(update);
  };

  // --- Model Handlers ---
  const addModel = () => {
    let NeedValue = Colours
    if (ModleItem) {
      setModles(prev => [...prev, { Model: ModleItem, Price: subPrice || "",  NeedValue }]);
      setModleItem('');
      setSubPrice('');
      setColours([{ Color: '', Stock: '' }]);
    }
  };
  const removeModel = (index) => {
    const update = [...Modles];
    update.splice(index, 1);
    setModles(update);
  };

  // --- Firebase Submit ---
  const submitProduct = () => {
    if (!name || !Price || !Url) return alert("Product name, price and main image required");

    const newRef = push(ref(db, 'products'));
    const uid = newRef.key;

    const thumbnail = {}

    if(Thum1) thumbnail.productimg = Thum1;
    if(Thum2) thumbnail.productimg2 = Thum2;
    if(Thum3) thumbnail.productimg3 = Thum3;

    set(newRef, {
      Prodectname: name,
      imgurl: Url,
      Price,
      category: { main: Mainx_category_value, sub: subx_category_value, subs: subsx_category_value },
      description,
      SpecificationValue,
      uid,
      ModelName,
      VideoURL,
      addModle,
      thumbnail,
    }).then(() => {
      // Reset
      alert('send')
      setUrl(''); setName(''); setDescription('');
      setThum1(''); setThum2(''); setThum3('');
      setPrice(''); setModles([]); setModleItem(''); setVideoURL('');
      setMainx_category(''); setSubx_category(''); setsubsx_category('');
      setMainx_category_value(''); setsubx_category_value(''); setsubsx_category_value('');
      setColours([{ Color: '', Stock: '' }]);
    });
  };

  // --- Close color picker on click outside ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setActiveIndex(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const SpecificationHandle = () => {   
    if (SpecificationValuefastinput !== "" && SpecificationValuesecoendinput !== "") {
    setSpecificationValue( prev => [...prev , { First : SpecificationValuefastinput , Second: SpecificationValuesecoendinput }] )
    setSpecificationValuefastinput('')
    setSpecificationValuesecoendinput('')
    }

  }

  return (
<div className="p-8 w-[95%] max-w-6xl min-h-screen mx-auto space-y-8 bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-2xl">
  {/* Title */}
  <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight text-center">
    ➕ Add New Product
  </h2>

  {/* Main Image */}
  <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
    <h3 className="text-lg font-semibold text-gray-700">Main Image</h3>
    <input
      type="text"
      placeholder="Paste main image URL"
      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={Url}
      onChange={e => setUrl(e.target.value)}
    />
    {Url && <img src={Url} alt="Main" className="mt-3 h-40 rounded-lg shadow-sm object-cover" />}
  </div>

  {/* Thumbnails */}
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Thumbnails</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[Thum1, Thum2, Thum3].map((thumb, idx) => (
        <div key={idx} className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Thumbnail {idx + 1}
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            value={thumb}
            onChange={e =>
              idx === 0
                ? setThum1(e.target.value)
                : idx === 1
                ? setThum2(e.target.value)
                : setThum3(e.target.value)
            }
          />
          {thumb && (
            <img
              src={thumb}
              alt={`thumb${idx}`}
              className="mt-2 h-28 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Product Info */}
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Info</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input placeholder="Product Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" value={Price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Video URL" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" value={VideoURL} onChange={e => setVideoURL(e.target.value)} />
      <input placeholder="Model Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400" value={ModelName} onChange={e => setModelName(e.target.value)} />
    </div>
    <textarea
      placeholder="Description"
      className="w-full mt-4 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
      rows={4}
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
  </div>

  {/* Models & Colors */}
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Models & Colors</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <input placeholder="Model" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400" value={ModleItem} onChange={e => setModleItem(e.target.value)} />
      <input placeholder="Sub Price" className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400" value={subPrice} onChange={e => setSubPrice(e.target.value)} />
      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition" onClick={addSubColour}>+ Add Color</button>
    </div>

    {Colours.map((c, i) => (
      <div key={i} className="flex relative items-center gap-3 mb-4">
        {!c.Color ? (
          <label
            className="cursor-pointer px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            Choose Color
          </label>
        ) : (
          <div
            className="w-10 h-10 rounded-full border cursor-pointer shadow-sm"
            style={{ backgroundColor: c.Color }}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        )}
        <button onClick={() => removeColour(i)} className="text-red-600 text-lg">
          <CiCircleRemove />
        </button>
        <input
          placeholder="Stock"
          className="border p-2 rounded-lg w-24 focus:ring-2 focus:ring-blue-400"
          value={c.Stock}
          onChange={e => handleStockChange(e.target.value, i)}
        />
        {activeIndex === i && (
          <div className="absolute top-12 z-50" ref={pickerRef}>
            <SketchPicker
              color={c.Color}
              onChange={color => handleColorChange(color.hex, i)}
            />
          </div>
        )}
      </div>
    ))}

    <button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition" onClick={addModel}>
      Add Model
    </button>

    {/* Model List */}
    <ul className="space-y-2 mt-6">
      {addModle.map((m, i) => (
        <li key={i} className="border p-3 flex items-center gap-3 rounded-lg shadow-sm bg-gray-50">
          <span onClick={() => removeModel(i)} className="text-red-700 cursor-pointer">
            <MdDeleteForever />
          </span>
          {m.NeedValue.map((item, j) => (
            <div key={j} className="w-6 h-6 rounded-full border shadow-sm" style={{ backgroundColor: item.Color }}></div>
          ))}
          <div className="text-sm font-medium text-gray-700">
            {ModelName}: {m.Model} {m.Price && `(${m.Price}৳)`}
          </div>
        </li>
      ))}
    </ul>
  </div>

<div className="bg-white p-6 rounded-xl shadow-md space-y-4">
  {/* Toggle Button */}
<span
  onClick={() => setSBONOFF(!SBONOFF)}
  className="flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition"
>
  <span>Specification Box</span>
  <span className=' text-[20px]' >{ SBONOFF ? <VscDiffRemoved /> : <RiAddBoxLine/>}</span>

</span>

  {/* Input + List Section */}
  {SBONOFF && (
    <>
      {/* Input Section */}
      <div className="flex items-center gap-3">
        <input
          onChange={(e) => setSpecificationValuefastinput(e.target.value)}
          type="text"
          value={SpecificationValuefastinput}
          placeholder="First input"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => setSpecificationValuesecoendinput(e.target.value)}
          type="text"
          value={SpecificationValuesecoendinput}
          placeholder="Second input"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={SpecificationHandle}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* List Section */}
      <div className="space-y-2">
        {SpecificationValue.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="font-medium text-gray-800">{item.First}</span>
            <span className="text-gray-600">{item.Second}</span>
          </div>
        ))}
      </div>
    </>
  )}
</div>




  {/* Categories */}
  <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
    <div>
      <h4 className="font-semibold text-gray-700 mb-2">Main Category</h4>
      <div className="flex gap-2 flex-wrap">
        {Main_category.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setMainx_category(cat.id); setMainx_category_value(cat.name) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${Mainx_category === cat.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-semibold text-gray-700 mb-2">Sub Category</h4>
      <div className="flex gap-2 flex-wrap">
        {sub_category.filter(c => c.Main_C_id === Mainx_category).map(cat => (
          <button
            key={cat.id}
            onClick={() => { setSubx_category(cat.id); setSubx_category_value(cat.name) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${subx_category === cat.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-semibold text-gray-700 mb-2">Sub Sub Category</h4>
      <div className="flex gap-2 flex-wrap">
        {subs_category.filter(c => c.sub_C_id === subx_category).map(cat => (
          <button
            key={cat.id}
            onClick={() => { setSubsx_category(cat.id); setsubsx_category_value(cat.name) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${subsx_category === cat.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Submit */}
  <button
    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-xl text-lg font-semibold shadow hover:scale-105 transition"
    onClick={submitProduct}
  >
    ✅ Submit Product
  </button>
</div>

  )
}

export default AddNewProduct;
