import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../../services/recommendation.service';

const Form = ({ onRecommendationsChange }) => {
  const [products, setProducts] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [recommendationMode, setRecommendationMode] = useState('MultipleProducts'); 
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar dados para o formulário:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const hasSelection = selectedPreferences.length > 0 || selectedFeatures.length > 0;
    setIsSubmittable(hasSelection);
  }, [selectedPreferences, selectedFeatures]);

  const handleCheckboxChange = (value, setSelected) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSubmittable || isLoading) return;

    setIsLoading(true); 
    const recommendations = await getRecommendations({
      mode: recommendationMode,
      preferences: selectedPreferences,
      features: selectedFeatures,
    });
    
    onRecommendationsChange(recommendations);
    setIsLoading(false); 
  };

  const allPreferences = [...new Set(products.flatMap(p => p.preferences))];
  const allFeatures = [...new Set(products.flatMap(p => p.features))];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-700 mb-4">Encontre o produto certo</h3>
      </div>
      
      <div className="space-y-3">
        <label className="text-md font-semibold text-slate-600">1. Como você quer ver os resultados?</label>
        <select value={recommendationMode} onChange={(e) => setRecommendationMode(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
          <option value="SingleProduct">Apenas a melhor recomendação</option>
          <option value="MultipleProducts">Uma lista de produtos recomendados</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-md font-semibold text-slate-600">2. Quais são suas preferências?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allPreferences.map(pref => (
            <label key={pref} className="flex items-center p-3 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer space-x-3">
              <input type="checkbox" onChange={() => handleCheckboxChange(pref, setSelectedPreferences)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-700 select-none">{pref}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-md font-semibold text-slate-600">3. Que funcionalidades são essenciais?</label>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allFeatures.map(feat => (
            <label key={feat} className="flex items-center p-3 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer space-x-3">
              <input type="checkbox" onChange={() => handleCheckboxChange(feat, setSelectedFeatures)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-700 select-none">{feat}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={!isSubmittable || isLoading}
        className={`w-full p-4 rounded-lg font-semibold text-lg transition-all duration-200 transform
                    ${!isSubmittable || isLoading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-1'}`}
      >
        {isLoading ? 'Buscando...' : 'obter recomendaçao'}
      </button>
    </form>
  );
};

export default Form;