import React, { useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { resources } from "../../resources";
import AdminNavbar from "../navbar/AdminNavbar";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category,setCategory] = useState("");
  const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'times-new-roman', 'courier-new', 'helvetica', 'georgia'];
Quill.register(Font, true);

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
  // const modules = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: [
  //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //         [{ font: ["sans-serif", "serif", "monospace", "Arial", "Times New Roman", "Courier New"] }],
  //         [{ size: ["small", false, "large", "huge"] }], // Custom font sizes
  //         ["bold", "italic", "underline", "strike"],
  //         [{ color: [] }, { background: [] }],
  //         [{ list: "ordered" }, { list: "bullet" }],
  //         ["link", "image"], // Include image in toolbar
  //         ["clean"],
  //       ],
  //       handlers: {
  //         image: imageHandler, // Custom image handler
  //       },
  //     },
  //   }),
  //   []
  // );


  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: ['arial', 'times-new-roman', 'courier-new', 'helvetica', 'georgia'] }],
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!content.trim()) {
      alert("Please enter content");
      return;
    }
    if (!thumbnail) {
      alert("Please select a thumbnail image");
      return;
    }

    setLoading(true);

    try {
      // Create the blog object
      const blogData = {
        title: title.trim(),
        content: content,
        description: description,
        category: category, // Add category field if needed
        slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), // Auto-generate slug
        published: false // Set to true if you want to publish immediately
      };

     

      

      const formData = new FormData();
      
      // Add blog data as JSON string to match @RequestPart("blog")
      formData.append("blog", new Blob([JSON.stringify(blogData)], {
        type: "application/json"
      }));
      
      // Add thumbnail file to match @RequestPart("file")
      formData.append("file", thumbnail);

      const res = await fetch(`${resources.APPLICATION_URL}admin/create-blog`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Blog submitted successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setContent("");
        setThumbnail(null);
        setPreview(false);
        // Reset file input
        document.querySelector('input[type="file"]').value = '';
      } else {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Failed to submit blog. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting blog. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sanitize content for preview
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <>
    <AdminNavbar/>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* thumbnail Upload */}
        <div>
          <label className="block mb-1 font-medium">
            Thumbnail Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="block w-full border rounded p-2"
            required
          />
          {thumbnail && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {thumbnail.name}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter blog title"
            required
          />
        </div>


         <div>
          <label className="block mb-1 font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Description - Note: This is not in your Java model */}
        <div>
          <label className="block mb-1 font-medium">
            Description <span className="text-sm text-gray-500">(Frontend only - not saved to backend)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter blog description (for preview only)"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block mb-1 font-medium">
            Content <span className="text-red-500">*</span>
          </label>
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
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {preview ? "Hide Preview" : "Preview"}
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className="mt-10 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <h3 className="text-lg font-bold">{title}</h3>
          {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      )}
    </div>
    </>
  );
}
