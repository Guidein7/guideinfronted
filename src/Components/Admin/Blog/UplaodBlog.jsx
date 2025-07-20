import React, { useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { resources } from "../../resources";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  // Custom image upload handler
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
          // Replace with your image upload API endpoint (e.g., Cloudinary or your server)
          const res = await fetch(`${resources.APPLICATION_URL}admin/upload/image`, {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            // Insert the image URL into the editor
            quill.insertEmbed(range.index, "image", data.url);
          } else {
            alert("Failed to upload image.");
          }
        } catch (error) {
          console.error("Image upload error:", error);
          alert("Error uploading image.");
        }
      }
    };
  };

  // Reference to ReactQuill editor
  const quillRef = React.useRef(null);

  // Custom toolbar configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: ["sans-serif", "serif", "monospace", "Arial", "Times New Roman", "Courier New"] }],
          [{ size: ["small", false, "large", "huge"] }], // Custom font sizes
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"], // Include image in toolbar
          ["clean"],
        ],
        handlers: {
          image: imageHandler, // Custom image handler
        },
      },
    }),
    []
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Blog submitted successfully!");
      } else {
        alert("Failed to submit blog.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting blog.");
    }
  };

  // Sanitize content for preview
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thumbnail Upload */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="block w-full"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter blog title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter blog description"
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
            placeholder="Write your blog here..."
          />
        </div>

        {/* Preview Button */}
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          {preview ? "Hide Preview" : "Preview"}
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Publish Blog
        </button>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className="mt-10 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      )}
    </div>
  );
}