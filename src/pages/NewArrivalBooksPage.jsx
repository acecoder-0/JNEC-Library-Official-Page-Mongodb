import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavbarComp from "../components/NavbarComp";
import Footer from "../components/Footer";

const quickLinks = [
  { name: 'Open Education Resource', url: '/e-resources' },
  { name: 'Ask A Librarian Service', url: '/ask-librarian' },
  { name: 'Library Feedback Form', url: '/feedback' },
  { name: 'New Arrivals- Journals', url: '/journals' },
  { name: "Preparation-Question Paper's", url: '/question-papers' },
  { name: 'List of Book CDs', url: '#' },
  { name: "FAQ's about Library", url: '/faq' },
  { name: 'Image Gallery', url: '/gallery' }
];

export default function NewArrivalBooksPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [bookYears, setBookYears] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books");
        const data = await res.json();
        // Since the backend items map easily to labels and pdfLinks
        const booksData = data.map(b => ({
          label: b.title,
          pdfLink: `http://localhost:5000${b.pdfPath}`
        }));
        setBookYears(booksData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <NavbarComp />

      <div style={{
        display: "flex",
        maxWidth: 1180,
        margin: "0 auto",
        padding: "22px 16px",
        gap: 22,
        alignItems: "flex-start",
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#222",
            marginBottom: 16,
            letterSpacing: 1,
            fontFamily: "Georgia, serif",
          }}>
            NEW ARRIVALS - BOOKS
          </h1>
          <p style={{ fontSize: 11, marginBottom: 10, color: "#555" }}>
            Click on the buttons to open the collapsible content.
          </p>

          {bookYears.map((item, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <div
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                style={{
                  background: "#d9d9d9",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#333",
                  borderRadius: 2,
                  userSelect: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.label}</span>
                <span style={{ fontSize: 11, color: "#666" }}>{openIndex === i ? "▲" : "▼"}</span>
              </div>
              {openIndex === i && item.pdfLink && (
                <div style={{
                  padding: "8px 14px",
                  background: "#f9f9f9",
                  borderTop: "1px solid #ddd",
                }}>
                  <a href={item.pdfLink} target="_blank" rel="noreferrer" style={{ color: "#8B4513", fontSize: 12 }}>
                    📄 {item.pdfLink.split('/').pop()}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ width: 195, flexShrink: 0 }}>
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
      </div>

      <Footer />
    </>
  );
}

