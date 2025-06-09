import React from 'react';

const CategoryItem = ({ image, name, active = false }) => {
  return (
    <div className=" flex flex-col items-center justify-center w-full">
      <div className="mb-4 w-40 h-40 overflow-hidden rounded-xl hover:-translate-y-3 transition-transform
">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className={`text-lg md:text-xl font-medium text-center hover:-translate-y-1 transition-transform
 ${active ? 'text-primary font-bold' : 'text-gray-800'}`}>
        {name.toUpperCase()}
      </span>
    </div>
  );
};

export default CategoryItem;