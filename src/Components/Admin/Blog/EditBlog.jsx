import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { resources } from "../../resources";

export default function EditBlog() {
  const { blogId } = useParams(); // assumes route like /edit-blog/:blogId
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null); // show current image
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);

  const quillRef = React.useRef(null);

  const Font = Quill.import("formats/font");
  Font.whitelist = ["arial", "times-new-roman", "courier-new", "helvetica", "georgia"];
  Quill.register(Font, true);

  // Load blog data for editing
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${resources.APPLICATION_URL}admin/get-blog/${blogId}`);
        if (res.ok) {
          const data = await res.json();
          setId(data.id);
          setTitle(data.title);
          setDescription(data.description || "");
          setContent(data.content);
          setCategory(data.category || "");
          setPublished(data.published);
          setExistingThumbnail(data.thumbnail || null);
        } else {
          alert("Failed to load blog");
        }
      } catch (err) {
        console.error("Error loading blog:", err);
      }
    };
    fetchBlog();
  }, [blogId]);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await fetch(`${resources.APPLICATION_URL}admin/upload/image`, {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", data.url);
          } else {
            alert("Failed to upload image.");
          }
        } catch (error) {
          console.error("Image upload error:", error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: ["arial", "times-new-roman", "courier-new", "helvetica", "georgia"] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!content.trim()) {
      alert("Please enter content");
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        id, // required for modify
        title: title.trim(),
        content,
        description,
        category,
        slug: title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        published,
      };

      const formData = new FormData();
      formData.append("blog", new Blob([JSON.stringify(blogData)], { type: "application/json" }));

      // Append only if new file selected
      if (thumbnail) {
        formData.append("file", thumbnail);
      } else {
        formData.append("file", new Blob([], { type: "application/octet-stream" })); // keep compat if backend requires
      }

      const res = await fetch(`${resources.APPLICATION_URL}admin/modify-blog`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Blog updated successfully!");
        navigate("/admin/blogs"); // go back to list
      } else {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Failed to update blog. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error updating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Existing Thumbnail */}
        {existingThumbnail && !thumbnail && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Thumbnail:</p>
            <img src={existingThumbnail} alt="Blog thumbnail" className="h-32 object-cover rounded" />
          </div>
        )}

        {/* Thumbnail Upload */}
        <div>
          <label className="block mb-1 font-medium">Change Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="block w-full border rounded p-2"
          />
          {thumbnail && <p className="text-sm text-green-600 mt-1">Selected: {thumbnail.name}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="bg-white"
          />
        </div>

        {/* Preview + Submit */}
        <button type="button" onClick={() => setPreview(!preview)} className="bg-gray-500 text-white px-4 py-2 rounded">
          {preview ? "Hide Preview" : "Preview"}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className="mt-10 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <h3 className="text-lg font-bold">{title}</h3>
          {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
      )}
    </div>
  );
}
