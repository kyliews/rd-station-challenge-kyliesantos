import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../../services/recommendation.service';

const Form = ({ onRecommendationsChange }) => {
  const [products, setProducts] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [recommendationMode, setRecommendationMode] = useState('SingleProduct');
  const [isSubmittable, setIsSubmittable] = useState(false);

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


  const handleCheckboxChange = (value, type, setSelected) => {
    setSelected(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSubmittable) return; 

    const recommendations = await getRecommendations({
      mode: recommendationMode,
      preferences: selectedPreferences,
      features: selectedFeatures,
    });
    
    onRecommendationsChange(recommendations);
  };

  const allPreferences = [...new Set(products.flatMap(p => p.preferences))];
  const allFeatures = [...new Set(products.flatMap(p => p.features))];

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Encontre o produto certo</h2>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">1. Como você quer ver os resultados?</h3>
        <select value={recommendationMode} onChange={(e) => setRecommendationMode(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="SingleProduct">Apenas a melhor recomendação</option>
          <option value="MultipleProducts">Uma lista de produtos recomendados</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">2. Quais são suas preferências?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allPreferences.map(pref => (
            <label key={pref} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" value={pref} onChange={() => handleCheckboxChange(pref, selectedPreferences, setSelectedPreferences)} className="h-4 w-4 rounded" />
              <span>{pref}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">3. Que funcionalidades são essenciais?</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allFeatures.map(feat => (
            <label key={feat} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" value={feat} onChange={() => handleCheckboxChange(feat, selectedFeatures, setSelectedFeatures)} className="h-4 w-4 rounded" />
              <span>{feat}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={!isSubmittable}
        className={`w-full p-3 rounded-lg font-semibold transition ${isSubmittable ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Obter recomendação
      </button>
    </form>
  );
};

export default Form;