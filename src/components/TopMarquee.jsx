import React, { useState, useEffect } from 'react';

const TopMarquee = () => {
  const [marqueeText, setMarqueeText] = useState('');

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/marquee');
        const data = await res.json();
        const combinedText = data.map(item => item.text).join(' &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; ');
        setMarqueeText(combinedText);
      } catch (err) {
        console.error('Error fetching marquee:', err);
      }
    };
    fetchMarquee();
  }, []);

  return (
    <div style={{
      backgroundColor: '#703c19',
      height: '35px',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }}>
      <marquee behavior="scroll" direction="left" scrollAmount="5" style={{color: '#FFF', marginTop: '5px', marginBottom: '10px', fontSize: '15px', fontWeight: 'bold'}}>
        {marqueeText ? (
          <span dangerouslySetInnerHTML={{ __html: marqueeText }} />
        ) : (
          <span>*** Welcome to JNEC Library ***</span>
        )}
      </marquee>
    </div>
  );
};

export default TopMarquee;
