const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:3001/products');
    if (!response.ok) throw new Error('Falha ao buscar produtos');
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};

export const getRecommendations = async ({ mode, preferences = [], features = [] }) => {
  const allProducts = await getProducts();

  const scoredProducts = allProducts.map(product => {
    let score = 0;
    preferences.forEach(userPref => {
      if (product.preferences.includes(userPref)) {
        score += 1;
      }
    });
    features.forEach(userFeature => {
      if (product.features.includes(userFeature)) {
        score += 1;
      }
    });
    return { ...product, score };
  });

  const sortedProducts = scoredProducts.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.id - a.id;
  });

  if (mode === 'SingleProduct') {
    return sortedProducts.length > 0 ? [sortedProducts[0]] : [];
  }
  
  return sortedProducts.filter(p => p.score > 0);
};
