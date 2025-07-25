
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
      active: true
    },
    {
      name: 'Fresh Fish',
      image: '/Images/Fruits.jpg',
      active: true
    },
    {
      name: 'Meat',
      image: '/Images/Drinks.jpg',
      active: true
    },
  ];

  return (
    <section className="my-8 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">CATEGORY</h2>
      <div className="relative">
        <div className="flex space-x-8 overflow-x-auto pb-4 scrollbar-hide dark:text-white ">
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
