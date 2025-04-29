import React from 'react';

const VisualizationGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Department Order Frequency</h2>
        <img
          src="/images/visualizations/OrderFrequencyByDepartment.png"
          alt="Department Order Frequency"
          className="w-full h-auto"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
        <img
          src="/images/visualizations/Top10MostFrequentlyPurchasesProducts.png"
          alt="Top Products"
          className="w-full h-auto"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Top Aisles</h2>
        <img
          src="/images/visualizations/Top10AsilesWithHighestNumberOfProducts.png"
          alt="Top Aisles"
          className="w-full h-auto"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Order Counts by Day</h2>
        <img
          src="/images/visualizations/OrderCountsByDayOfTheWeek.png"
          alt="Order Counts by Day"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default VisualizationGrid; 