
import React from 'react';
import CategoryItem from './CategoryItem';

const Categories = () => {

  const categories = [
    {
      name: 'Vegetables',
      image: '/Images/vegatables.jpeg',
      active: true
    },
    {
      name: 'Fruits',
      image: '/Images/Fruits.jpg',
      active: true
    },
    {
      name: 'Drinks',
      image: '/Images/Drinks.jpg',
      active: true
    },
    {
      name: 'Fresh Nuts',
      image: '/Images/vegatables.jpeg',
      active: false
    },
    {
      name: 'Fresh Fish',
      image: '/Images/Fruits.jpg',
      active: false
    },
    {
      name: 'Meat',
      image: '/Images/Drinks.jpg',
      active: false
    },
  ];

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">CATEGORY</h2>
      
      <div className="relative">
        <div className="flex space-x-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index} 
              name={category.name} 
              image={category.image} 
              active={category.active} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
