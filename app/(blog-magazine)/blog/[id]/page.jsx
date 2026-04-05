import { supabase } from "@/lib/supabase";
import BlogClientPage from "./BlogClientPage";
import { notFound } from "next/navigation";

// --- DYNAMIC SEO METADATA ENGINE ---
export async function generateMetadata({ params }) {
  const { id } = await params;
  
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("title, sub_title, description, image_url, category")
    .eq("id", id)
    .single();

  if (error || !blog) {
    return {
      title: "Dispatch Not Found | Daily Blogs",
      description: "Searching archived dispatches..."
    };
  }

  return {
    title: `${blog.title} | Technical Intelligence Division`,
    description: blog.sub_title || blog.description.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.sub_title || blog.description.substring(0, 160),
      images: [blog.image_url || "/og-image.png"],
      type: "article",
      section: blog.category,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.sub_title || blog.description.substring(0, 160),
      images: [blog.image_url || "/og-image.png"],
    }
  };
}

export default async function BlogPage({ params }) {
  const { id } = await params;

  // 1. Fetch Blog Content
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (blogError || !blog) {
    return notFound();
  }

  // 2. Increment View Count (Operational Telemetry)
  await supabase.rpc('increment_blog_views', { blog_id: id });

  // 3. Fetch Related/Popular Articles (Engagement Data)
  const [{ data: latest }, { data: popular }] = await Promise.all([
    supabase.from("blogs").select("id, title, image_url, created_at").eq("is_published", true).order("created_at", { ascending: false }).limit(3),
    supabase.from("blogs").select("id, title, image_url, created_at").eq("is_published", true).order("created_at", { ascending: false }).limit(5)
  ]);

  // 4. Fetch Comments
  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("blog_id", id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (
    <BlogClientPage 
      blog={blog} 
      initialComments={comments || []} 
      latestArticles={latest || []}
      popularArticles={popular || []}
    />
  );
}
