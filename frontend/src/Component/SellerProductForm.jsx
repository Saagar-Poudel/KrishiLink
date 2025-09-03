import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '../lib/supabaseClient';
import { v4 as uuid } from 'uuid';

export default function SellerProductForm() {
  const [form, setForm] = useState({
    name: '',
    nameNepali: '',
    category: '',
    price: '',
    unit: 'kg',
    quantity: 0,
    location: '',
    sellerName: '',
    isVerified: false,
    isAvailable: true,
    hasDelivery: false,
    rating: 0,
    reviewCount: 0,
    isOrganic: false,
    isBulkAvailable: false,
    estimatedDelivery: '',
    image: '' // will hold the public URL
  });

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  async function handleImageUpload(file) {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuid()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file, { upsert: true, cacheControl: '3600' });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      
      console.log(data.publicUrl);

      setForm((f) => ({ ...f, image: data.publicUrl }));
      setPreview(data.publicUrl);
    } catch (err) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/products', {
      ...form,
      price: String(form.price),
      quantity: Number(form.quantity),
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount)
    });
    alert('Product created');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" placeholder="Name" onChange={onChange} className="border p-2 w-full" />
      <input name="nameNepali" placeholder="Name (Nepali)" onChange={onChange} className="border p-2 w-full" />
      <input name="category" placeholder="Category" onChange={onChange} className="border p-2 w-full" />
      <input name="price" placeholder="Price" type="number" step="0.01" onChange={onChange} className="border p-2 w-full" />
      <input name="unit" placeholder="Unit (kg/liter/etc.)" onChange={onChange} className="border p-2 w-full" />
      <input name="quantity" placeholder="Quantity" type="number" onChange={onChange} className="border p-2 w-full" />
      <input name="location" placeholder="Location" onChange={onChange} className="border p-2 w-full" />
      <input name="sellerName" placeholder="Seller Name" onChange={onChange} className="border p-2 w-full" />
      <input name="estimatedDelivery" placeholder="Estimated Delivery (e.g. 2-3 days)" onChange={onChange} className="border p-2 w-full" />

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input name="isOrganic" type="checkbox" onChange={onChange} /> Organic
        </label>
        <label className="flex items-center gap-2">
          <input name="isVerified" type="checkbox" onChange={onChange} /> Verified
        </label>
        <label className="flex items-center gap-2">
          <input name="isAvailable" type="checkbox" defaultChecked onChange={onChange} /> Available
        </label>
        <label className="flex items-center gap-2">
          <input name="hasDelivery" type="checkbox" onChange={onChange} /> Delivery
        </label>
        <label className="flex items-center gap-2">
          <input name="isBulkAvailable" type="checkbox" onChange={onChange} /> Bulk
        </label>
      </div>

      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
        />
        {uploading && <div>Uploading…</div>}
        {preview && <img src={preview} alt="preview" className="h-32 object-cover rounded" />}
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save Product
      </button>
    </form>
  );
}
