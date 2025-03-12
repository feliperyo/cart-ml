import React, { useEffect, useContext } from 'react';

import './Products.css';
import fetchProducts from '../../api/fetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';

function Products() {
  const { products, setProducts, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    setLoading(true); // Garante que o estado de loading é ativado

    fetchProducts('iphone')
      .then((response) => {
        if (!response || !Array.isArray(response)) {
          throw new Error('Resposta inválida da API');
        }
        setProducts(response);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setProducts([]); // Evita erro ao mapear um valor indefinido
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    loading ? <Loading /> : (
      <section className="products container">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} data={product} />)
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </section>
    )
  );
}

export default Products;
