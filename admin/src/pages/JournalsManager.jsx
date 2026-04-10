import React, { useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

const JournalsManager = () => {
  const [journals, setJournals] = useState([]);
  const [formData, setFormData] = useState({ title: '', year: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    const res = await fetch('http://localhost:5000/api/journals');
    const data = await res.json();
    setJournals(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');

    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('pdf', file);

    try {
      await fetch('http://localhost:5000/api/journals', { method: 'POST', body: data });
      setFormData({ title: '', year: '' });
      setFile(null);
      fetchJournals();
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this journal list?')) {
      await fetch(`http://localhost:5000/api/journals/${id}`, { method: 'DELETE' });
      fetchJournals();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Journals Subscribed</h1>
      <p className="page-subtitle">Manage subscribed journal lists per year</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Upload Journal List</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Journal Label (e.g. Journals for 2018)</label>
              <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Year of Subscription</label>
              <input type="text" className="form-control" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
            </div>

            <div className="form-group">
              <label className="form-label">Journal PDF List</label>
              <input type="file" accept=".pdf" className="form-control" onChange={e => setFile(e.target.files[0])} required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Journal List'}
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Journal Archives</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {journals.map(j => (
                  <tr key={j._id}>
                    <td style={{ fontWeight: 500 }}>{j.title}</td>
                    <td>{j.year}</td>
                    <td>
                      <a href={`http://localhost:5000${j.pdfPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem' }}>View PDF</a>
                    </td>
                    <td>
                      <button className="btn btn-icon btn-danger" onClick={() => handleDelete(j._id)}><MdDelete size={18} /></button>
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

export default JournalsManager;
