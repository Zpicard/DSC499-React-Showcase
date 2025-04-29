import React from 'react';

const TopProducts = () => {
  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Top Products</h2>
      <img
        src="/images/visualizations/Top10MostFrequentlyPurchasesProducts.png"
        alt="Top Products"
        className="w-full h-auto"
      />
    </div>
  );
};

export default TopProducts; 