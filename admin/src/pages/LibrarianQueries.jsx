import React, { useState, useEffect } from 'react';
import { MdReply, MdDelete, MdCheck } from 'react-icons/md';

const LibrarianQueries = () => {
  const [queries, setQueries] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    const res = await fetch('http://localhost:5000/api/librarian');
    const data = await res.json();
    setQueries(data);
  };

  const handleReplySubmit = async (id) => {
    await fetch(`http://localhost:5000/api/librarian/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: replyText, status: 'Replied' })
    });
    setReplyText('');
    setActiveReplyId(null);
    fetchQueries();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this query?')) {
      await fetch(`http://localhost:5000/api/librarian/${id}`, { method: 'DELETE' });
      fetchQueries();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Ask a Librarian - Queries</h1>
      <p className="page-subtitle">Manage and reply to student inquiries</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {queries.map(q => (
          <div key={q._id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{q.subject}</h3>
                  <span className={`status-badge ${q.status === 'Pending' ? 'status-pending' : 'status-active'}`}>
                    {q.status}
                  </span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  From: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{q.name}</span> | {q.email} | {new Date(q.createdAt).toLocaleString()}
                </div>
              </div>
              <button className="btn btn-icon btn-danger" onClick={() => handleDelete(q._id)}>
                <MdDelete size={20} />
              </button>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', marginBottom: '1rem' }}>
              <p>{q.message}</p>
            </div>

            {q.reply && (
              <div style={{ padding: '1rem', borderLeft: '4px solid var(--accent-primary)', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0 8px 8px 0', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>Librarian Reply:</span>
                <p>{q.reply}</p>
              </div>
            )}

            {activeReplyId === q._id ? (
              <div style={{ marginTop: '1rem' }}>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={() => handleReplySubmit(q._id)}>
                    <MdCheck /> Send Reply & Mark Replied
                  </button>
                  <button className="btn" onClick={() => setActiveReplyId(null)} style={{ background: 'var(--bg-tertiary)' }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              !q.reply && (
                <button className="btn" onClick={() => setActiveReplyId(q._id)} style={{ background: 'var(--bg-tertiary)' }}>
                  <MdReply /> Reply to Query
                </button>
              )
            )}
          </div>
        ))}
        {queries.length === 0 && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No queries found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrarianQueries;
