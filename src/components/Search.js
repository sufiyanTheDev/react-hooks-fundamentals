import { useState, useEffect } from "react";
import { useDebounce } from "../Hooks/useDebounce.js";
import "./Search.scss";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Debounced callback and delay settinf
  const { debounceFn, cancel } = useDebounce(async (value) => {
    setSelected(true);
    if (!value.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${value}`
      );
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      setResults(data?.users || []);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, 500);

  // Calling api when input changed
  const onInputChange = (e) => {
    setQuery(e?.target?.value);
    debounceFn(e?.target?.value);
  };

  // Setting the dropdown value to the input field
  const onDropDownChoose = (user) => {
    setSelected(false);
    setQuery(user?.firstName);
  };
  
  // Cancel Button Click Initialize the values
  const onCancelClick = () => {
    setSelected(false);
    setQuery("");
    setResults([]);
    cancel();
  }

  // Keyboard navigation handler
  const onKeyDown = (e) => {
    if (!selected || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        onDropDownChoose(results[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setSelected(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return (
    <div className="debounce-container">
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search users..."
          value={query}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          aria-label="Search users"
          aria-expanded={selected}
          aria-controls="search-listbox"
          role="combobox"
        />
        <button
          onClick={onCancelClick}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
      {selected && (
        <div 
          className="dropdown"
          id="search-listbox"
          role="listbox"
        >
          {loading && <p className="info-text">Loading...</p>}
          {!loading && error && (
            <p className="error-text">{"Something went wrong"}</p>
          )}
          {!loading && !error && results.length === 0 && query && (
            <p className="info-text">No results found</p>
          )}
          {!loading && !error && results.length > 0 && (
            <ul className="results-list">
              {results.map((user, index) => (
                <li key={user.id} onClick={() => onDropDownChoose(user)} className={highlightIndex === index ? "highlighted" : ""}>
                  {user.firstName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
