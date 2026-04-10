import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

const MarqueeManager = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ text: '', order: 0 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/marquee/all');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/marquee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ text: '', order: 0 });
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this marquee text?')) {
      await fetch(`http://localhost:5000/api/marquee/${id}`, { method: 'DELETE' });
      fetchItems();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Marquee Settings</h1>
      <p className="page-subtitle">Manage scrolling horizontal text on the homepage</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add Scroll Text</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Marquee Text (HTML allowed)</label>
              <textarea 
                className="form-control" 
                value={formData.text} 
                onChange={e => setFormData({ ...formData, text: e.target.value })}
                placeholder="Ex: *** RECOMMENDED BOOKS ***"
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Order</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.order} 
                onChange={e => setFormData({ ...formData, order: e.target.value })} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <MdAdd size={20} /> Add Item
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Current Marquee Items</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Text Preview</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.text}
                    </td>
                    <td>{item.order}</td>
                    <td>
                      <button className="btn btn-icon btn-danger" onClick={() => handleDelete(item._id)}>
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeManager;
