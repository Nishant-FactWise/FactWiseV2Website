const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!ENDPOINT) {
    throw new Error("NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not set");
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Hygraph request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`Hygraph GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

export type RichTextNode = {
  type?: string;
  text?: string;
  href?: string;
  src?: string;
  title?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  openInNewTab?: boolean;
  children?: RichTextNode[];
};

export type HygraphPost = {
  title: string;
  excerpt: string;
  featuredPicture: {
    secure_url?: string;
    url?: string;
  } | null;
  lastUpdated: string;
  readingTime: string;
  featuredImage: { url: string } | null;
  author: {
    name: string;
    bio: string;
    photo: { url: string } | null;
  } | null;
  createdAt: string;
  slug: string;
  content: { raw: { children: RichTextNode[] } };
  categories: { name: string; slug: string; categoryDescription?: string }[];
  seos: {
    id: string;
    keywords?: string;
    title?: string;
    description?: string;
  }[];
};

export type SlugListPost = {
  slug: string;
};

export async function getPostDetails(slug: string): Promise<HygraphPost | null> {
  const query = `
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredPicture
        lastUpdated
        readingTime
        featuredImage { url }
        author {
          name
          bio
          photo { url }
        }
        createdAt
        slug
        content { raw }
        categories { name slug categoryDescription }
        seos(first: 1) {
          id
          keywords
          title
          description
        }
      }
    }
  `;
  const data = await gql<{ post: HygraphPost | null }>(query, { slug });
  return data.post;
}

export async function getAllPostSlugs(): Promise<SlugListPost[]> {
  const query = `
    query GetAllSlugs {
      posts(first: 500) {
        slug
      }
    }
  `;
  const data = await gql<{ posts: SlugListPost[] }>(query);
  return data.posts;
}

export type SimilarPost = {
  title: string;
  excerpt: string;
  slug: string;
  lastUpdated: string;
  readingTime: string;
  featuredPicture: { secure_url?: string; url?: string } | null;
  featuredImage: { url: string } | null;
};

export async function getSimilarPosts(
  categories: string[],
  slug: string,
): Promise<SimilarPost[]> {
  const query = `
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
        last: 6
      ) {
        title
        slug
        excerpt
        lastUpdated
        readingTime
        featuredPicture
        featuredImage { url }
      }
    }
  `;
  const data = await gql<{ posts: SimilarPost[] }>(query, { slug, categories });
  return data.posts;
}
