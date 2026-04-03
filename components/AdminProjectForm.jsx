"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Upload, Plus, Trash2, X } from "lucide-react";

export default function AdminProjectForm({ project, onComplete, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image_url: project?.image_url || "",
    demo_url: project?.demo_url || "",
    github_url: project?.github_url || "",
    tags: project?.tags || [],
  });
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      if (file) {
        finalImageUrl = await handleUpload(file);
      }

      const projectData = {
        ...formData,
        image_url: finalImageUrl,
      };

      if (project?.id) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);
        if (error) throw error;
      }

      onComplete();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {project ? "Edit Project" : "Add New Project"}
        </h2>
        <button onClick={onCancel} className="p-2 hover:bg-muted rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary"
            placeholder="E-commerce App"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            required
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary"
            placeholder="Short overview of... "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Demo URL</label>
            <input
              type="url"
              value={formData.demo_url}
              onChange={(e) =>
                setFormData({ ...formData, demo_url: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) =>
                setFormData({ ...formData, github_url: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center gap-1"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary"
              placeholder="React"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-all font-medium"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Project Image</label>
          <div className="flex items-center gap-4">
            {(formData.image_url || file) && (
              <div className="w-20 h-20 rounded-lg overflow-hidden border">
                <img
                  src={file ? URL.createObjectURL(file) : formData.image_url}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-all">
              <Upload className="w-6 h-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">
                {file ? file.name : "Upload image (PNG/JPG)"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Plus className="w-5 h-5" />
                {project ? "Update Project" : "Add Project"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
