import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const blogs = defineCollection({
  loader: glob({ base: "./src/data/blogs", pattern: "**/*.mdx" }),
  schema: z.object({
    cover: z.string(),
    title: z.string(),
    category: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { blogs }
