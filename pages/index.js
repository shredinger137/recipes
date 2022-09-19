import Head from "next/head"
import List from '../components/List';
import Layout from '../components/Layout';


export default function Index({ posts }) {
  return (
<Layout>
<List recipes={posts}></List>

</Layout>
  )
}

export async function getStaticProps() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require("contentful").createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  // Fetch all entries of content_type `blogPost`
  const posts = await client
    .getEntries({ content_type: "recipe" })
    .then((response) => response.items)

  return {
    props: {
      posts,
    },
  }
}