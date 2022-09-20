//TODO: All ingredients should be listed like: '1.5 tsp, butter', then we can split by the , here. But that might be for later, let's just get this looking good.
//Also instructions should be a list.
//And validate the entries in Contentful better. Alfredo, for example, is just notes with no ingredients.


import React from "react"
import Head from "next/head"
import Layout from '../components/Layout'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';


export default function Slug({ post }) {


  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": post.fields.title,
    "recipeCategory": post.fields.category,
    "recipeIngredient": post.fields.ingredients,

  }



  return (
    <Layout>
      <Head>
        <title>{post.fields.title}</title>
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <p className="light-text" style={{ fontSize: '.8em' }}>{post.fields.category.toUpperCase()}</p>
      <div className="single-recipe-title" style={{ marginBottom: '30px' }}>
        <h1>{post.fields.title}</h1>
      </div>
      <div>
        <p>{post.fields.description}</p>
      </div>
      <ul className="single-recipe-ingredients">
        {post.fields.ingredients.map(ingredient => {
          return (<li onClick={(e) => { strikeOut(e) }} key={ingredient}>{ingredient}</li>)
        })}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.fields.instructions) }} style={{ marginTop: '5vh' }}></div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  // Create an instance of the Contentful JavaScript SDK
  const client = require("contentful").createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  // Fetch all results where `fields.slug` is equal to the `slug` param
  const result = await client
    .getEntries({
      content_type: "recipe",
      "fields.slug": context.params.slug,
    })
    .then((response) => response.items)

  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct post.
  const post = result.pop()

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!post) {
    return { props: {} }
  }

  // Return the post as props
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require("contentful").createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  // Query Contentful for all blog posts in the space
  const posts = await client
    .getEntries({ content_type: "recipe" })
    .then((response) => response.items)

  // Map the result of that query to a list of slugs.
  // This will give Next the list of all blog post pages that need to be
  // rendered at build time.
  const paths = posts.map(({ fields: { slug } }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

const strikeOut = (e) => {
  e.target.classList.toggle('strike')
}