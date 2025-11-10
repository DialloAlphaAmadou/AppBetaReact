import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AutoCompleteSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/autocomplete?q=${query}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Recherche nom ou prénom"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {suggestions.map((user) => (
          <li key={user.id}>
            {user.nom} {user.prenom}
          </li>
        ))}
      </ul>
    </div>
  );
}
