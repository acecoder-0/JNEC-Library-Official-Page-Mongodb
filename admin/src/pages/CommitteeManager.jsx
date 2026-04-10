import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

const CommitteeManager = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: '', department: '', designation: '', order: 0 });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await fetch('http://localhost:5000/api/committee');
    const data = await res.json();
    setMembers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/committee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', department: '', designation: '', order: 0 });
    fetchMembers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this member?')) {
      await fetch(`http://localhost:5000/api/committee/${id}`, { method: 'DELETE' });
      fetchMembers();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Library Advisory Committee</h1>
      <p className="page-subtitle">Manage committee members displayed on About page</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add Member</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-control" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <input type="text" className="form-control" placeholder="Chairman/Member" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Order</label>
                <input type="number" className="form-control" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <MdAdd size={20} /> Add Member
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Current Members</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m._id}>
                    <td style={{ color: 'var(--text-muted)' }}>{m.order}</td>
                    <td style={{ fontWeight: 500 }}>{m.name}</td>
                    <td>{m.department}</td>
                    <td>{m.designation}</td>
                    <td>
                      <button className="btn btn-icon btn-danger" onClick={() => handleDelete(m._id)}><MdDelete size={18} /></button>
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

export default CommitteeManager;
