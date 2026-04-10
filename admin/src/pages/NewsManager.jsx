import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await fetch('http://localhost:5000/api/news');
    const data = await res.json();
    setNewsList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ title: '', content: '' });
    fetchNews();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this news item?')) {
      await fetch(`http://localhost:5000/api/news/${id}`, { method: 'DELETE' });
      fetchNews();
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title">News Manager</h1>
          <p className="page-subtitle">Manage the latest news and announcements</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add New News</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea 
                className="form-control" 
                value={formData.content} 
                onChange={e => setFormData({ ...formData, content: e.target.value })} 
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <MdAdd size={20} /> Add News
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Current News</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map(item => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 500 }}>{item.title}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td><span className="status-badge status-active">Active</span></td>
                    <td>
                      <button className="btn btn-icon btn-danger" onClick={() => handleDelete(item._id)}>
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {newsList.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No news items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsManager;
