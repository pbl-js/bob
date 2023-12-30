import React from 'react';

// { name: 'title', type: 'string' },
// { name: 'subtitle', type: 'string', defaultValue: 'default subtitle' },
// { name: 'priceTotal', type: 'number' },
// { name: 'priceDetailed', type: 'number', defaultValue: 4.99 },

const ProductTile = ({
  title,
  subtitle,
  priceTotal,
  priceDetailed,
}: {
  title: string;
  subtitle: string;
  priceTotal: number;
  priceDetailed: number;
}) => {
  return (
    <div className="flex flex-col w-[300px] p-4 bg-gray-900 rounded-3xl gap-2">
      <div className="h-28 w-full bg-slate-800 rounded-xl"></div>
      <div className="flex flex-col w-full">
        <div className="text-xl text-gray-100">{title}</div>
        <div className="text-sm text-gray-400">{subtitle}</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="bg-blue-500 p-2 rounded-xl font-medium">Add to cart</button>
        <button className="bg-green-500 p-2 rounded-xl font-medium">See details</button>
      </div>
    </div>
  );
};

export default ProductTile;
