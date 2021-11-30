import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function List(props) {

  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    props.client.getEntries().then(result => {
      if (result && result.items) {
        setRecipeList(result.items);
        console.log(result.items);
      }

    }
    )
  }, []
  )


  return (
    <div>

      <p class="lead pt-5 pb-5" style={{ color: "white" }}>Lulufremen is a place for me to post recipes. They're written succinctly, in a way that makes sense to me. This is made for me and my way of doing things. If you stumbled onto it maybe it'll make sense for you, too.</p>
      <table className="table table-dark table-striped" style={{ width: "80vw", margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {recipeList.map(recipe => {
            return (
              <>
                <tr>
                  <td><Link to={`./recipes/${recipe.fields.title.replace(' ', '_')}`}>{recipe.fields.title}</Link></td>
                  <td>{recipe.fields.category}</td>
                  <td>{recipe.fields.tags}</td>
                </tr>
              </>
            )
          })}
        </tbody>

      </table>


    </div>
  );
}

export default List;
