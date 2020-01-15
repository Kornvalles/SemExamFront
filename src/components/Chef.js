import React, { useState, useEffect } from "react";

export default function Chef() {
  const [hasError, setErrors] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8080/semexamback/api/recipe/all");
      res
        .json()
        .then(res => setRecipes(res))
        .catch(err => setErrors(err));
    }
    fetchData();
  }, []);

  const filteredRecipes = recipes.filter(e => e.name.includes(filter))

  return (
    <div>
      <div style={{ padding: "100px", top: "100%" }}>
        <h1>Here is all the recipes!</h1>
        <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
        <table>
          <tr>
            <th>Name</th>
            <th>Direction</th>
            <th>Preperation Time</th>
          </tr>
          {filteredRecipes.map((recipe) => {
            return (
              <tr><td>{recipe.name}</td><td>{recipe.direction}</td><td>{recipe.prepTime}</td></tr>
            )
          })}
        </table>
      </div>
    </div>
  );
}