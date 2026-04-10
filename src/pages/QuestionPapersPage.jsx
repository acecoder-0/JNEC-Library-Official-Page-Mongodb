import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavbarComp from "../components/NavbarComp";
import Footer from "../components/Footer";
import { Container, Row, Col, Card, Button, Accordion, Table } from 'react-bootstrap';

const quickLinks = [
  { label: "Open Education Resource", to: "/e-resources" },
  { label: "Ask A Librarian Service", to: "#" },
  { label: "New Arrivals- Books", to: "#" },
  { label: "Library Feedback Form", to: "/feedback" },
  { label: "New Arrivals- Journals", to: "/journals" },
  { label: "Preparation-Question Paper's", to: "/question-papers" },
  { label: "List of Book CDs", to: "#" },
  { label: "FAQ's about Library", to: "/faq" },
  { label: "Image Gallery", to: "/gallery" },
];

const QuestionPapersPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/papers");
        const data = await res.json();
        
        // Group by department
        const grouped = data.reduce((acc, paper) => {
          if (!acc[paper.department]) {
            acc[paper.department] = { name: paper.department, papers: [] };
          }
          acc[paper.department].papers.push({
            semester: paper.semester,
            subject: paper.subject,
            year: paper.year,
            link: `http://localhost:5000${paper.pdfPath}`
          });
          return acc;
        }, {});
        
        setDepartments(Object.values(grouped));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPapers();
  }, []);

  const sectionStyle = {
    marginBottom: '2rem',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
  };

  const titleStyle = {
    color: '#703c19',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  };

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <NavbarComp />

      {/* Page Body */}
      <div
        style={{
          display: "flex",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "22px 16px",
          gap: 22,
          alignItems: "flex-start",
        }}
      >
        {/* Main Area */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: 26,
              fontWeight: "bold",
              letterSpacing: 4,
              color: "#1a1a1a",
              marginBottom: 18,
              fontFamily: "Georgia, serif",
            }}
          >
            PREVIOUS YEAR QUESTION PAPERS
          </h1>
          <p className="text-center mb-4" style={{ fontSize: '1.2rem', color: '#666' }}>
            Download previous year question papers for exam preparation. Select department and semester.
          </p>
          <Accordion defaultActiveKey="0">
            {departments.map((dept, deptIndex) => (
              <Accordion.Item eventKey={deptIndex.toString()} key={deptIndex}>
                <Accordion.Header style={{ fontWeight: 'bold', color: '#703c19', fontSize: '1.3rem' }}>
                  {dept.name}
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr style={{ backgroundColor: '#703c19', color: 'white' }}>
                        <th>Semester</th>
                        <th>Subject</th>
                        <th>Year</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dept.papers.map((paper, index) => (
                        <tr key={index}>
                          <td>{paper.semester}</td>
                          <td>{paper.subject}</td>
                          <td>{paper.year}</td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              onClick={() => handleDownload(paper.link)}
                              size="sm"
                            >
                              📥 Download PDF
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 195, flexShrink: 0 }}>
          {/* Quick Links */}
          <div
            style={{
              background: "#ede8db",
              border: "1px solid #b8a888",
              padding: "10px 14px 14px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#8B3A00",
                fontSize: 14,
                marginBottom: 10,
                textDecoration: "underline",
              }}
            >
              QUICK LINKS
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {quickLinks.map((link, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: 7,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 5,
                  }}
                >
                  <span style={{ color: "#555", fontSize: 13, lineHeight: "17px", flexShrink: 0 }}>•</span>
                  <Link
                    to={link.to}
                    style={{ color: "#222", fontSize: 12, textDecoration: "none", lineHeight: 1.35 }}
                    onMouseEnter={(e) => (e.target.style.color = "#8B3A00")}
                    onMouseLeave={(e) => (e.target.style.color = "#222")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Go Green */}
          <div
            style={{
              background: "linear-gradient(170deg, #eaf7e8 0%, #c5e8b8 100%)",
              border: "2px solid #5aaa3a",
              borderRadius: 3,
              padding: "14px 10px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#276010",
                fontStyle: "italic",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              This is your planet
            </div>
            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 6 }}>🌍</div>
            <div
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: "#276010",
                letterSpacing: 1,
                fontStyle: "italic",
              }}
            >
              go green!
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default QuestionPapersPage;

