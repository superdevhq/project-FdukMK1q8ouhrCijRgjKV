
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string | null;
  date: string;
  read_time: string; // Note: This matches the Supabase column name
  category: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

// For compatibility with existing code that uses readTime instead of read_time
export interface BlogPostClient extends Omit<BlogPost, 'read_time'> {
  readTime: string;
}

// Conversion functions
export function toClientBlogPost(post: BlogPost): BlogPostClient {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    readTime: post.read_time,
    category: post.category,
    image: post.image,
    created_at: post.created_at,
    updated_at: post.updated_at
  };
}

export function toDbBlogPost(post: BlogPostClient): BlogPost {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    read_time: post.readTime,
    category: post.category,
    image: post.image,
    created_at: post.created_at,
    updated_at: post.updated_at
  };
}
