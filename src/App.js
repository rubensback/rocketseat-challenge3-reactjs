import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "titulo",
      url: "www.github.com",
      techs: ["Node Js", "React"]
    })
    const newRepository = response.data

    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      
      const newRepositories = repositories.filter(r => r.id !== id)

      setRepositories(newRepositories)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((r) => 
          <li key={r.id}>
            {r.title}
          <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
