import React from 'react';

const RecommendationList = ({ recommendations }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl h-full">
      <h2 className="text-xl font-bold text-slate-700 mb-4">Produtos Recomendados</h2>
      {(!recommendations || recommendations.length === 0) ? (
        <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-300 rounded-lg bg-white">
          <p className="text-slate-500 text-center p-4">selecione suas preferencias no formulario ao lado para ver nossas sugestoes.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {recommendations.map((product) => (
            <li 
              key={product.id} 
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl hover:border-blue-500 border border-transparent transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
              <p className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-3 py-1 rounded-full mt-2">
                {product.category}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationList;