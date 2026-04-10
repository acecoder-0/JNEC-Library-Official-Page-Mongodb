import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavbarComp from "../components/NavbarComp";
import Footer from "../components/Footer";

const workingHours = [
  { id: 1, days: "Working Days: Monday - Saturday", timings: "09:30 am - 05:00 pm" },
  { id: 2, days: "On Public Holidays", timings: "Closed" },
  { id: 3, days: "PL & During Examination", timings: "24 hrs (Sunday - Saturday)" },
];

export default function AboutPage() {
  const [advisoryMembers, setAdvisoryMembers] = useState([]);
  const [libraryStaff, setLibraryStaff] = useState([]);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/committee");
        const data = await res.json();
        setAdvisoryMembers(data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchStaff = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/staff");
        const data = await res.json();
        setLibraryStaff(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCommittee();
    fetchStaff();
  }, []);

const quickLinks = [
   { name: 'Open Education Resource', url: '/e-resources' },
{ name: 'Ask A LibrarianService', url: '/ask-librarian' },
    { name: 'New Arrivals- Books', url: 'new_arrival_books.php' },
    { name: 'Library Feedback Form', url: '/feedback' },
    { name: 'New Arrivals- Journals', url: '/journals' },
{ name: "Preparation-Question Paper's", url: '/question-papers' },
{ name: 'List of Book CDs', url: '/public/books cds record.pdf' },
    { name: "FAQ's about Library", url: '/faq' },
{ name: 'Image Gallery', url: '/gallery' }
 
];

const thStyle = {
  border: "1px solid #bbb",
  padding: "7px 10px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#000",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "6px 10px",
  fontSize: "12px",
  color: "#222",
};
  return (
    <>
      <Header />
      <NavbarComp />

      {/* Page Title */}
      <div
        style={{
          textAlign: "center",
          padding: "16px 0 10px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#222",
          background: "#f5f5f5",
          letterSpacing: 1,
          fontFamily: "Georgia, serif",
        }}
      >
        ABOUT LIBRARY
      </div>

      {/* Page Body */}
      <div
        style={{
          display: "flex",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "16px 16px 28px",
          gap: 22,
          alignItems: "flex-start",
        }}
      >
        {/* Left Sidebar */}
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
                    to={link.url}
                    style={{ color: "#222", fontSize: 12, textDecoration: "none", lineHeight: 1.35 }}
                    onMouseEnter={(e) => (e.target.style.color = "#8B3A00")}
                    onMouseLeave={(e) => (e.target.style.color = "#222")}
                  >
                    {link.name}
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

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "14px 16px",
            overflowX: "auto",
          }}
        >
          {/* Working Hours Table */}
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
              color: "#000",
              fontSize: 13,
            }}
          >
            Library Working Hours
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ background: "#d9d9d9" }}>
                <th style={thStyle}>Sr. No</th>
                <th style={thStyle}>Days</th>
                <th style={thStyle}>Timings</th>
              </tr>
            </thead>
            <tbody>
              {workingHours.map((row) => (
                <tr key={row.id} style={{ background: "#fff" }}>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{row.id}</td>
                  <td style={tdStyle}>{row.days}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{row.timings}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Advisory Committee Table */}
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
              color: "#000",
              fontSize: 13,
            }}
          >
            List of Library Advisory committee members
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#d9d9d9" }}>
                <th style={thStyle}>Sr. No</th>
                <th style={thStyle}>Name of Staff</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Designation</th>
              </tr>
            </thead>
            <tbody>
              {advisoryMembers.map((m, index) => (
                <tr key={m._id} style={{ background: "#fff" }}>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{index + 1}.</td>
                  <td style={tdStyle}>{m.name}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{m.department}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{m.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Library Staff Profile */}
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
              color: "#000",
              fontSize: 13,
              marginTop: 24,
            }}
          >
            Library Staff profile
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f1f1f1" }}>
                <th style={thStyle}>Sr. No</th>
                <th style={thStyle}>Name of staff</th>
                <th style={thStyle}>Qualification</th>
                <th style={thStyle}>Designation</th>
                <th style={thStyle}>Section/Work</th>
              </tr>
            </thead>
            <tbody>
              {libraryStaff.map((staff, index) => (
                <tr key={staff._id} style={{ background: "#fff" }}>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{String(index + 1).padStart(2, '0')}</td>
                  <td style={tdStyle}>{staff.name}</td>
                  <td style={tdStyle}>{staff.qualification}</td>
                  <td style={tdStyle}>{staff.designation}</td>
                  <td style={tdStyle}>{staff.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

