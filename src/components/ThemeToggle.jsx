function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <div className="text-end mb-3">
      <button
        className="btn btn-outline-info"
        onClick={toggleTheme}
      >
        <i
          className={`bi ${
            darkMode ? "bi-sun-fill" : "bi-moon-fill"
          }`}
        ></i>
      </button>
    </div>
  );
}

export default ThemeToggle;
