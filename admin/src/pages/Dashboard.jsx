import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArticle, MdFeedback, MdQuestionAnswer, MdMenuBook, MdDescription, MdLibraryBooks } from 'react-icons/md';

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    news: 0,
    feedbacks: 0,
    queries: 0,
    books: 0,
    papers: 0,
    journals: 0
  });

  useEffect(() => {
    // In a real app we would have a unified /api/stats endpoint
    // For now we will fetch each simply
    const fetchStats = async () => {
      try {
        const [newsRes, feedRes, libRes, booksRes, papersRes, journalsRes] = await Promise.all([
          fetch('http://localhost:5000/api/news').then(res => res.json()),
          fetch('http://localhost:5000/api/feedback').then(res => res.json()),
          fetch('http://localhost:5000/api/librarian').then(res => res.json()),
          fetch('http://localhost:5000/api/books').then(res => res.json()),
          fetch('http://localhost:5000/api/papers').then(res => res.json()),
          fetch('http://localhost:5000/api/journals').then(res => res.json())
        ]);

        setStats({
          news: newsRes.length || 0,
          feedbacks: feedRes.length || 0,
          queries: libRes.length || 0,
          books: booksRes.length || 0,
          papers: papersRes.length || 0,
          journals: journalsRes.length || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total News', count: stats.news, icon: <MdArticle size={32} />, color: '#3B82F6', path: '/news' },
    { title: 'Feedbacks', count: stats.feedbacks, icon: <MdFeedback size={32} />, color: '#10B981', path: '/feedback' },
    { title: 'Librarian Queries', count: stats.queries, icon: <MdQuestionAnswer size={32} />, color: '#F59E0B', path: '/librarian' },
    { title: 'Books', count: stats.books, icon: <MdMenuBook size={32} />, color: '#8B5CF6', path: '/books' },
    { title: 'Question Papers', count: stats.papers, icon: <MdDescription size={32} />, color: '#EF4444', path: '/papers' },
    { title: 'Journals', count: stats.journals, icon: <MdLibraryBooks size={32} />, color: '#EC4899', path: '/journals' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-subtitle">Welcome to the JNEC Library Administration Panel</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className="glass-card" 
            onClick={() => navigate(card.path)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                {card.title}
              </p>
              <h3 style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>{card.count}</h3>
            </div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${card.color}22, ${card.color}44)`,
              color: card.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${card.color}44`
            }}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '3rem' }} className="glass-card">
        <h3>System Status</h3>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
            <span style={{ color: 'var(--text-secondary)' }}>Backend API: Online</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
            <span style={{ color: 'var(--text-secondary)' }}>Database: Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
