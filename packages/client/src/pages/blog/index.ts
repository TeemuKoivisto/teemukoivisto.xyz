import '../../index.css'

import '$components/nav-bar'
import '$components/my-footer'
import '$components/blog-post'

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allPosts = await getAllBlogPosts()
//   return {
//     props: { preview, allPosts },
//   }
// }

// <script lang="ts" context="module">
//   export async function load({ params } : any) {
//     const { file_id } = params
//     return { props: { file_id } }
//   }
// </script>

export function useBuildContext(ctx: any) {
  // find post by slug -> blog/[slug].html slug == blog/asdf.html
  // doesnt really work..
  // must iterate over blog posts, then look for files at slug -> blog/[01-hello-world].html
  // matching those, should compile html
  // pass html to <blog-post>
}
