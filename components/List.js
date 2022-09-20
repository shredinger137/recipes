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

                <tr style={{ fontFamily: "'Roboto', sans-serif" }} key={`${recipe.fields.title}row`}>
                  <td key={`${recipe.fields.slug}row`}>
                    <Link href={`/${recipe.fields.slug}`} key={`${recipe.fields.title}link`}>{recipe.fields.title}</Link>
                  </td>
                  <td key={`${recipe.fields.title}cat`}>{recipe.fields.category}</td>
                  <td key={`${recipe.fields.title}tag`}>{recipe.fields.tags}</td>
                </tr>

            )
          })}
        </tbody>

      </table>


    </div>
  );
}

export default List;
