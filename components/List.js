import React, { useState, useEffect } from 'react';
import Link from "next/link"


function List(props) {


  return (
    <div>
      <table className="table table-dark table-striped" style={{ width: "80vw", margin: "0 auto", fontFamily: "'Cinzel', serif" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {props.recipes.map(recipe => {
            return (
              <>
                <tr style={{fontFamily: "'Roboto', sans-serif"}}>
                  <td><Link href={`/${recipe.fields.slug}`}>{recipe.fields.title}</Link></td>
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
