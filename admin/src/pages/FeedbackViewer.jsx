import React, { useState, useEffect } from 'react';
import { MdDelete, MdVisibility } from 'react-icons/md';

const FeedbackViewer = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const res = await fetch('http://localhost:5000/api/feedback');
    const data = await res.json();
    setFeedbacks(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this feedback?')) {
      await fetch(`http://localhost:5000/api/feedback/${id}`, { method: 'DELETE' });
      fetchFeedbacks();
      if (selectedFeedback && selectedFeedback._id === id) {
        setSelectedFeedback(null);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Feedback Viewer</h1>
      <p className="page-subtitle">Review visitor feedbacks and ratings</p>

      <div style={{ display: 'grid', gridTemplateColumns: selectedFeedback ? '1fr 1fr' : '1fr', gap: '2rem', transition: 'all 0.3s' }}>
        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f._id} style={{ background: selectedFeedback?._id === f._id ? 'rgba(59,130,246,0.1)' : 'transparent' }}>
                  <td style={{ fontWeight: 500 }}>{f.name}</td>
                  <td>{f.department}</td>
                  <td>{f.purpose}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(f.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-icon" onClick={() => setSelectedFeedback(f)} style={{ color: 'var(--accent-primary)' }}>
                        <MdVisibility size={20} />
                      </button>
                      <button className="btn btn-icon btn-danger" onClick={() => handleDelete(f._id)}>
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedFeedback && (
          <div className="glass-card animate-fade-in" style={{ alignSelf: 'start', position: 'sticky', top: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Feedback Details</h3>
              <button className="btn btn-icon" onClick={() => setSelectedFeedback(null)}>✕</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Name</span>
                <p style={{ fontWeight: 600 }}>{selectedFeedback.name}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Register No</span>
                <p>{selectedFeedback.regNo}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Department</span>
                <p>{selectedFeedback.department}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Section</span>
                <p>{selectedFeedback.section}</p>
              </div>
            </div>

            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '1rem' }}>Ratings</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Staff Behavior:</span> <span>{selectedFeedback.staffBehavior}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Staff Efficiency:</span> <span>{selectedFeedback.staffEfficiency}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Cleanliness:</span> <span>{selectedFeedback.envCleanliness}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Book Availability:</span> <span>{selectedFeedback.sufficiency}</span></div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Suggestions</span>
              <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>"{selectedFeedback.suggestions || 'No suggestions provided.'}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackViewer;
