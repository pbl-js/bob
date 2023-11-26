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
    <div style={{ width: '100%', height: '200px', padding: '15px' }}>
      <div>Product title: {title}</div>
      <div>Product subtile: {subtitle}</div>
      <div>priceTotal: {priceTotal}</div>
      <div>priceTotal: {priceDetailed}</div>
    </div>
  );
};

export default ProductTile;
