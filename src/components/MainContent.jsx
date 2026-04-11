import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const MainContent = () => {
  const [data, setData] = useState({ title: '', fullText: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data-index.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Container><p>Loading library data...</p></Container>;

  return (
    <Container className="py-4">
      <h2 className="mb-4" style={{ color: '#703c19', fontWeight: 'bold' }}>
        {data.title}
      </h2>
      <div 
        style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.6', 
          fontSize: '1rem',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #703c19'
        }}
        dangerouslySetInnerHTML={{ __html: data.fullText.replace(/\n/g, '<br>') }}
      />
    </Container>
  );
};

export default MainContent;

