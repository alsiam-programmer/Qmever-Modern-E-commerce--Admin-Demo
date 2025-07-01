import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { FaImage } from "react-icons/fa";

const AddNewProdect = () => {
  const db = getDatabase();

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
    { id: "5", sub_C_id: "0", name: "Jacket"},
  ];

  const handleAddModle = () => {
    if (ModleItem) {
      setModles(prev => [...prev, { Model: ModleItem, Price: subPrice ? subPrice : "" }]);
      setModleItem('');
      setsubPrice('');
    }
  };

  const submit = () => {
    const PCU = Math.floor(Math.random() * 1000000);
    set(ref(db, 'products/' + ProdectId), {
      PCU: `PCU:${PCU}`,
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
          {Thum1 && <img src={Thum1} className="mt-2 h-32 rounded" ></img> }
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
        </div>
        {Thum2 && <img src={Thum2} className="mt-2 h-32 rounded" ></img> }
        <div>
          <label className="block mb-1 font-semibold">Thumbnail 3 URL</label>
          <input
            type="text"
            placeholder="Paste thumbnail 3 URL"
            className="border p-2 rounded w-full"
            value={Thum3}
            onChange={(e) => setthum3(e.target.value)}
          />
          {Thum3 && <img src={Thum3} className="mt-2 h-32 rounded" ></img> }
        </div>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Product Name" value={name} onChange={e => setname(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Video URL" value={VideoURL} onChange={e => setVideoURL(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Model Name" value={ModelName} onChange={e => setModelName(e.target.value)} />
      </div>

      {/* Description */}
      <textarea className="w-full border p-2 rounded" rows="3" placeholder="Description" value={description} onChange={e => setdescription(e.target.value)} />

      {/* Add Models */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <input className="border p-2 rounded" placeholder="Model" value={ModleItem} onChange={e => setModleItem(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Sub Price" value={subPrice} onChange={e => setsubPrice(e.target.value)} />
        <button onClick={handleAddModle} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Model</button>
      </div>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        {Modles.map((m, i) => (
          <li key={i}>{m.Model} - ৳{m.Price}</li>
        ))}
      </ul>

      {/* Category Selection */}
      <div className="space-y-2">
        <div>
          <h4 className="font-semibold">Main Category</h4>
          <div className="flex flex-wrap gap-2">
            {Main_category.map((cat) => (
              <button key={cat.id} onClick={() => { setMainx_category(cat.id); setMainx_category_value(cat.name); }}
                className={`px-3 py-1 rounded ${Mainx_category === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Sub Category</h4>
          <div className="flex flex-wrap gap-2">
            {sub_category.filter(c => c.Main_C_id === Mainx_category).map((cat) => (
              <button key={cat.id} onClick={() => { setsubx_category(cat.id); setsubx_category_value(cat.name); }}
                className={`px-3 py-1 rounded ${subx_category === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Sub Sub Category</h4>
          <div className="flex flex-wrap gap-2">
            {subs_category.filter(c => c.sub_C_id === subx_category).map((cat) => (
              <button key={cat.id} onClick={() => { setsubsx_category(cat.id); setsubsx_category_value(cat.name); }}
                className={`px-3 py-1 rounded ${subsx_category === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button onClick={submit} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-lg font-semibold">
        Submit Product
      </button>
    </div>
  );
};

export default AddNewProdect;
