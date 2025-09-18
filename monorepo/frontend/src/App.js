import React, { useState } from 'react';
import Form from './components/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommendationsChange = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <header className="text-center mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Recomendador de Produtos RD Station - Kylie Santos
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
          </p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:col-span-1">
            <Form onRecommendationsChange={handleRecommendationsChange} />
          </div>
          <div className="lg:col-span-1">
            <RecommendationList recommendations={recommendations} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;