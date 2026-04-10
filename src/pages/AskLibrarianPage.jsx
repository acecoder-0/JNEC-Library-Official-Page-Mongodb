import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const AskLibrarianPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/librarian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Your query has been submitted. Library staff will respond soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
      setStatus("Error submitting query. Please try again.");
    }
  };

  const titleStyle = {
    textAlign: "center",
    padding: "20px 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#703c19",
    backgroundColor: "#f8f4e8",
    marginBottom: "20px",
    borderBottom: "4px solid #703c19",
    letterSpacing: "1px"
  };

  const quickLinks = [
    { name: 'Open Education Resource', url: '/e-resources' },
    { name: 'Ask A Librarian Service', url: '/ask-librarian' },
    { name: 'New Arrivals- Books', url: '#' },
    { name: 'Library Feedback Form', url: '/feedback' },
    { name: 'New Arrivals- Journals', url: '/journals' },
    { name: "Preparation-Question Paper's", url: '/question-papers' },
    { name: 'List of Book CDs', url: '#' },
    { name: "FAQ's about Library", url: '/faq' },
    { name: 'Image Gallery', url: '/gallery' }
  ];

  return (
    <>
      <Header />
      <NavbarComp />

      <div style={titleStyle}>
        ASK A LIBRARIAN SERVICE
      </div>

      <div style={{
        display: "flex",
        maxWidth: 1180,
        margin: "0 auto",
        padding: "16px 16px 28px",
        gap: 22,
        alignItems: "flex-start",
      }}>
        {/* Left Sidebar */}
        <div style={{ width: 195, flexShrink: 0 }}>
          {/* Quick Links */}
          <div style={{
            background: "#ede8db",
            border: "1px solid #b8a888",
            padding: "10px 14px 14px",
            marginBottom: 16,
          }}>
            <div style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#8B3A00",
              fontSize: 14,
              marginBottom: 10,
              textDecoration: "underline",
            }}>
              QUICK LINKS
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {quickLinks.map((link, i) => (
                <li key={i} style={{ marginBottom: 7 }}>
                  <a
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    style={{ color: "#222", fontSize: 12, textDecoration: "none", lineHeight: 1.35 }}
                  >
                    • {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Go Green */}
          <div style={{
            background: "linear-gradient(170deg, #eaf7e8 0%, #c5e8b8 100%)",
            border: "2px solid #5aaa3a",
            borderRadius: 3,
            padding: "14px 10px 12px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: "bold",
              color: "#276010",
              fontStyle: "italic",
              marginBottom: 8,
              lineHeight: 1.3,
            }}>
              This is your planet
            </div>
            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 6 }}>🌍</div>
            <div style={{
              fontSize: 18,
              fontWeight: "900",
              color: "#276010",
              letterSpacing: 1,
              fontStyle: "italic",
            }}>
              go green!
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          {status && (
            <Alert variant="success" onClose={() => setStatus('')} dismissible>
              {status}
            </Alert>
          )}
          
          <h3 style={{ color: "#703c19", marginBottom: "25px", textAlign: "center" }}>
            Have a question about library services? Ask our librarians!
          </h3>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold", color: "#333" }}>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "bold", color: "#333" }}>Email <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "bold", color: "#333" }}>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold", color: "#333" }}>Subject <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold", color: "#333" }}>Your Question/Message <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ backgroundColor: "#703c19", borderColor: "#703c19" }}>
              Submit Query
            </Button>
          </Form>

          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <h5 style={{ color: "#703c19" }}><strong>Or Email Directly:</strong></h5>
            <p style={{ fontSize: "16px" }}>
              <strong>jnec library@gmail.com</strong>
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Library staff responds within 24-48 hours during working days.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AskLibrarianPage;
