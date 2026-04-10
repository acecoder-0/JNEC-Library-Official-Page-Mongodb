import React, { useState, useEffect } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

const StaffManager = () => {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({ name: '', qualification: '', designation: '', section: '', order: 0 });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const res = await fetch('http://localhost:5000/api/staff');
    const data = await res.json();
    setStaff(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', qualification: '', designation: '', section: '', order: 0 });
    fetchStaff();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this staff member?')) {
      await fetch(`http://localhost:5000/api/staff/${id}`, { method: 'DELETE' });
      fetchStaff();
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Library Staff Profile</h1>
      <p className="page-subtitle">Manage library staff members displayed on the About page</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add Staff Member</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Qualification</label>
              <input type="text" className="form-control" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Section/Work</label>
                <input type="text" className="form-control" placeholder="Circulation" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Order</label>
                <input type="number" className="form-control" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <MdAdd size={20} /> Add Staff
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Current Staff</h3>
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Designation</th>
                  <th>Section/Work</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(m => (
                  <tr key={m._id}>
                    <td style={{ color: 'var(--text-muted)' }}>{m.order}</td>
                    <td style={{ fontWeight: 500 }}>{m.name}</td>
                    <td>{m.qualification}</td>
                    <td>{m.designation}</td>
                    <td>{m.section}</td>
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

export default StaffManager;
