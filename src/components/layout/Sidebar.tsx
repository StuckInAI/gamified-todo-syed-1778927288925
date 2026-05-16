import { NavLink, useLocation } from 'react-router-dom';
import { Home, ListTodo, User, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/tasks', icon: ListTodo, label: 'Tasks' },
  { path: '/character', icon: User, label: 'Character' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoEmoji}>🏡</span>
          <span className={styles.logoText}>Cozy Quest</span>
        </div>
        <ul className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={clsx(styles.navLink, isActive && styles.active)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className={styles.footer}>
          <span>🌿 Stay cozy!</span>
        </div>
      </nav>
      <nav className={styles.mobileNav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(styles.mobileLink, isActive && styles.mobileActive)}
            >
              <Icon size={20} />
              <span className={styles.mobileLabel}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
