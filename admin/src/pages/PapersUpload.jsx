import React, { useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

const PapersUpload = () => {
  const [papers, setPapers] = useState([]);
  const [formData, setFormData] = useState({ title: '', department: 'Computer Engineering', semester: 'SE Sem I', subject: '', year: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    const res = await fetch('http://localhost:5000/api/papers');
    const data = await res.json();
    setPapers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');

    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title || formData.subject);
    data.append('department', formData.department);
    data.append('semester', formData.semester);
    data.append('subject', formData.subject);
    data.append('year', formData.year);
    data.append('pdf', file);

    try {
      await fetch('http://localhost:5000/api/papers', { method: 'POST', body: data });
      setFormData({ ...formData, subject: '', year: '' });
      setFile(null);
      fetchPapers();
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this question paper?')) {
      await fetch(`http://localhost:5000/api/papers/${id}`, { method: 'DELETE' });
      fetchPapers();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Question Papers</h1>
      <p className="page-subtitle">Upload and manage exam question papers</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Upload Paper</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-control" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                <option>Computer Engineering</option>
                <option>Information Technology</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
                <option>Electronics & Telecommunication</option>
                <option>Electrical Engineering</option>
                <option>Chemical Engineering</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Semester</label>
                <input type="text" className="form-control" placeholder="SE Sem I" value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <input type="text" className="form-control" placeholder="2023" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
            </div>

            <div className="form-group">
              <label className="form-label">PDF File</label>
              <input type="file" accept=".pdf" className="form-control" onChange={e => setFile(e.target.files[0])} required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Question Paper'}
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Paper Database</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Semester/Subject</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {papers.map(p => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 500 }}>{p.department}</td>
                    <td>
                      <div>{p.semester}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.subject}</div>
                    </td>
                    <td>{p.year}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a href={`http://localhost:5000${p.pdfPath}`} target="_blank" rel="noreferrer" className="btn btn-icon" style={{ color: 'var(--accent-primary)' }}>View</a>
                        <button className="btn btn-icon btn-danger" onClick={() => handleDelete(p._id)}><MdDelete size={18} /></button>
                      </div>
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

export default PapersUpload;
