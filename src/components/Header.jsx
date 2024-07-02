import { useNavigate } from "react-router-dom";

export default function Header({ title, backRoute, actions }) {
  const navigate = useNavigate();

  return (
    <header id="page-header">
      {backRoute && (
        <button id="back-nav" onClick={() => navigate(backRoute)}>
          &#x2190; Back
        </button>
      )}
      <h1>{title}</h1>
      {actions && <span id="page-actions">Idk yet</span>}
    </header>
  );
}
