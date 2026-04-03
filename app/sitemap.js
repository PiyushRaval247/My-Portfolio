import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://piyushraval.com";

  // Fetch all blogs to include in sitemap
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, updated_at")
    .eq("is_published", true);

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: new Date(blog.updated_at || new Date()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
