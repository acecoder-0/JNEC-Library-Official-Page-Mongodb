import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdArticle, 
  MdViewCarousel, 
  MdFeedback, 
  MdQuestionAnswer, 
  MdMenuBook, 
  MdDescription, 
  MdLibraryBooks, 
  MdGroup,
  MdBadge
} from 'react-icons/md';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <MdDashboard /> },
    { path: '/news', name: 'News Manager', icon: <MdArticle /> },
    { path: '/marquee', name: 'Marquee Settings', icon: <MdViewCarousel /> },
    { path: '/feedback', name: 'Feedbacks', icon: <MdFeedback /> },
    { path: '/librarian', name: 'Librarian Queries', icon: <MdQuestionAnswer /> },
    { path: '/books', name: 'New Arrivals - Books', icon: <MdMenuBook /> },
    { path: '/papers', name: 'Question Papers', icon: <MdDescription /> },
    { path: '/journals', name: 'Journals', icon: <MdLibraryBooks /> },
    { path: '/committee', name: 'Committee Members', icon: <MdGroup /> },
    { path: '/staff', name: 'Library Staff', icon: <MdBadge /> },
  ];

  return (
    <aside style={{
      width: 'var(--nav-width)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50
    }}>
      <div style={{ padding: '0 2rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-glow)'
          }}></div>
          JNEC Library Admin
        </h2>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}>
        <ul style={{ listStyle: 'none' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                <NavLink 
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.95rem'
                  }}
                >
                  <span style={{ 
                    fontSize: '1.25rem', 
                    color: isActive ? 'var(--accent-primary)' : 'inherit',
                    display: 'flex'
                  }}>
                    {item.icon}
                  </span>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ padding: '2rem 1.5rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          JNEC Library v2.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
