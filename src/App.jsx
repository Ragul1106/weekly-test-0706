import React, { useState, useEffect } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PasswordInput from "./components/PasswordToggle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CounterAuto from "./components/CounterAuto";
import TodoList from "./components/TodoList";

function App() {
  const [query, setQuery] = useState("octocat");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim() === "") return;

    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://api.github.com/search/users?q=${query}`);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchUsers, 500);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className="container-fluid py-5">
      
      <h3 className="mb-4 text-center">Task 1 : Counter Auto Increment</h3>
        <CounterAuto />
        <TodoList />
      <h3 className="mb-4 text-center">Task 3 : Password Input</h3>
        <PasswordInput />
      <h3 className="display-4 mb-4">Task 4: API Search, Task 5: Scroll To Top </h3>

      <div className="mb-5">
        <h2 className="mb-3"> GitHub User Search</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <div className="spinner-border text-primary" role="status"></div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-3" key={user.id}>
              <div className="card shadow-sm">
                <img src={user.avatar_url} className="card-img-top" alt={user.login} />
                <div className="card-body">
                  <h5 className="card-title">{user.login}</h5>
                  <a href={user.html_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
