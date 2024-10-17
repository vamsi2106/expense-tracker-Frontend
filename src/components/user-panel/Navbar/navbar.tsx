import { User } from "lucide-react";
export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Expense Tracker</div>
      <div className="navbar-user">
        <span>John Doe</span>
        <div className="user-avatar">
          <User className="avatar-icon" />
        </div>
      </div>
    </nav>
  );
};
