import React, { useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

const BooksUpload = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', year: '', category: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:5000/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');

    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('category', formData.category);
    data.append('pdf', file);

    try {
      await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        body: data
      });
      setFormData({ title: '', year: '', category: '' });
      setFile(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this book?')) {
      await fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">New Arrivals - Books</h1>
      <p className="page-subtitle">Upload and manage newly arrived book PDFs</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Upload New Book</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Book Title / Label</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: New Arrival Books - 2024"
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.year} 
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024"
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">PDF File (.pdf)</label>
              <div style={{ 
                border: '2px dashed var(--border-color)', 
                padding: '2rem', 
                textAlign: 'center',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                cursor: 'pointer'
              }}>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={e => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="pdf-upload"
                  required
                />
                <label htmlFor="pdf-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <MdCloudUpload size={32} color="var(--accent-primary)" />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {file ? file.name : 'Click to select PDF file'}
                  </span>
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Book PDF'}
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Uploaded Books Database</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>File Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(b => (
                  <tr key={b._id}>
                    <td style={{ fontWeight: 500 }}>{b.title}</td>
                    <td>{b.year}</td>
                    <td>
                      <a href={`http://localhost:5000${b.pdfPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem' }}>
                        View PDF
                      </a>
                    </td>
                    <td>
                      <button className="btn btn-icon btn-danger" onClick={() => handleDelete(b._id)}>
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)'}}>No books uploaded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksUpload;
