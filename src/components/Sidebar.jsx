import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [newsText, setNewsText] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        // Since News items have title and content, we'll combine them for the marquee
        const combined = data
          .map(item => `<strong>${item.title}</strong>: ${item.content}`)
          .join('<br/><br/>');
        setNewsText(combined);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, []);
  return (
    <div className="sidebar" style={{backgroundColor: '#d7cdc3', padding: '20px'}}>
      <h5 style={{color: '#703c19', textAlign: 'center', textDecoration: 'underline'}}><strong>LATEST NEWS</strong></h5>
      <hr />
      <div style={{height: '200px', overflow: 'hidden'}}>
        <marquee behavior="scroll" direction="up" scrollAmount="2" style={{color: '#000'}}>
          {newsText ? (
            <div dangerouslySetInnerHTML={{ __html: newsText }} />
          ) : (
            <div>Loading latest news...</div>
          )}
        </marquee>
      </div>
      <hr />
      <h5 style={{color: '#703c19', textAlign: 'center', textDecoration: 'underline'}}><strong>QUICK LINKS</strong></h5>
      <hr />
      <ul style={{color: '#000', listStyleType: 'none', padding: 0}}>
        <li><Link to="/ulfs" style={{color: '#000'}}>Useful Links for Students</Link></li>
<li><Link to="/e-news-papers" style={{color: '#000'}}>E - News Papers</Link></li>
        <li><Link to="/ask-librarian" style={{color: '#000'}}>Ask A Librarian Service</Link></li>
        <li><Link to="/new-arrival-books" style={{color: '#000'}}>New Arrivals- Books</Link></li>
        <li><Link to="/feedback" style={{color: '#000'}}>Library Feedback Form</Link></li>
        <li><Link to="/journals" style={{color: '#000'}}>New Arrivals- Journals</Link></li>
        <li><Link to="/question-papers" style={{color: '#000'}}>Preparation-Question Paper's</Link></li>
        <li><a href="/public/books cds record.pdf" target="_blank" style={{color: '#000'}}>List of Book CDs</a></li>
        <li><Link to="/faq" style={{color: '#000'}}>FAQ's about Library</Link></li>
        <li><Link to="/gallery" style={{color: '#000'}}>Image Gallery</Link></li>
        <li><Link to="/e-resources" style={{color: '#000'}}>E-Resources</Link></li>
        <li><Link to="/lib-rules" style={{color: '#000'}}>Lib Rules</Link></li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;
