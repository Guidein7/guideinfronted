import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Clock, Share2 } from 'lucide-react';
import { resources } from '../../resources';
import Footer from '../Footer';
import { AdSenseAd } from '../AdsenseText';
const SingleBlog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    // Fetch single blog by slug
    const fetchBlogBySlug = async (blogSlug) => {
        setLoading(true);
        try {
            // First, fetch all blogs to find the one with matching slug
            const response = await fetch(
                `${resources.APPLICATION_URL}admin/get-blogs?page=0&size=100`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }

            const data = await response.json();
            const foundBlog = data.content.find(b => b.slug === blogSlug);

            if (!foundBlog) {
                throw new Error('Blog not found');
            }

            setBlog(foundBlog);

            // Set related blogs (excluding current blog)
            const related = data.content
                .filter(b => b.id !== foundBlog.id && b.published)
                .slice(0, 3);
            setRelatedBlogs(related);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchBlogBySlug(slug);
        }
    }, [slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


  const getReadingTime = (content) => {
        const wordsPerMinute = 200;
        const div = document.createElement('div');
        div.innerHTML = content;
        const text = div.textContent || div.innerText || '';
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

//       const renderBlogWithAds = (htmlContent) => {
//   if (!htmlContent) return;

//   const div = document.createElement("div");
//   div.innerHTML = htmlContent;

//   const children = Array.from(div.childNodes);
//   let elements = [];
//   let pCount = 0;

//   children.forEach((node, index) => {
//     if (node.nodeType === Node.ELEMENT_NODE) {
//       elements.push(
//         <div
//           key={`node-${index}`}
//           dangerouslySetInnerHTML={{ __html: node.outerHTML }}
//         />
//       );
//       if (node.tagName === "P") {
//         pCount++;
//         if (pCount === 2) {
//           elements.push(<AdSenseAd key={`ad-${index}`} />);
//         }
//       }
//     }
//   });

//   return elements;
// };
const renderBlogWithAds = (htmlContent) => {
  if (!htmlContent) return;

  const div = document.createElement("div");
  div.innerHTML = htmlContent;

  const children = Array.from(div.childNodes);

  // Count all <p> tags
  const totalParagraphs = children.filter(
    (node) => node.nodeType === Node.ELEMENT_NODE && node.tagName === "P"
  ).length;

  let elements = [];
  let pCount = 0;

  children.forEach((node, index) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "P") {
        pCount++;

        // Insert ad after 2nd paragraph
        elements.push(
          <div
            key={`node-${index}`}
            dangerouslySetInnerHTML={{ __html: node.outerHTML }}
          />
        );
        if (pCount === 2) {
          elements.push(<AdSenseAd key={`ad-after-2`} />);
        }

        // Insert ad before last 2 paragraphs
        if (pCount === totalParagraphs - 4) {
          elements.push(<AdSenseAd key={`ad-before-last-2`} />);
        }
      } else {
        elements.push(
          <div
            key={`node-${index}`}
            dangerouslySetInnerHTML={{ __html: node.outerHTML }}
          />
        );
      }
    }
  });

  return elements;
};

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600">Loading</div>
                </div>
            </div>
        );
    }
    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center">
                    <div className="text-6xl text-gray-400 mb-4">📝</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The blog you are looking for does not exist.'}</p>
                    <button
                        onClick={() => navigate('/knowledge-hub')}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Navigation */}
            <div className="bg-white  shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl px-6 py-4">
                    <button
                        onClick={() => navigate('/knowledge-hub')}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>
            </div>

            <div className="max-w-4xl md:mx-auto px-6 py-8">
                {/* Blog Header */}


                <header className="mb-8">

                    {/* Blog Meta */}

                    <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <p className='text-[#6b7280] text-xl mb-4 '>{blog.description}</p>
                    {blog.thumbnail && (
                        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={blog.thumbnail.length > 500 ? `data:${blog.fileType};base64,${blog.thumbnail}` : blog.thumbnail}
                                alt={blog.title}
                                className="blog-img"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{getReadingTime(blog.content)} min read</span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                        </button>
                    </div>

                    {blog.category && (
                        <div className="mb-4">
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                <Tag className="w-3 h-3" />
                                {blog.category}
                            </span>
                        </div>
                    )}






                    {/* Featured Image */}

                </header>

                {/* Blog Content */}
                <article className="rounded-2xl mb-12 custom-html">
                    {renderBlogWithAds(blog.content)}
                </article>

                {/* Related Blogs */}
                {relatedBlogs.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedBlogs.map((relatedBlog) => (
                                <RelatedBlogCard
                                    key={relatedBlog.id}
                                    blog={relatedBlog}
                                    onClick={() => navigate(`/knowledge-hub/${relatedBlog.slug}`)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </div>
    );
};

// Related Blog Card Component
const RelatedBlogCard = ({ blog, onClick }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTextPreview = (html, maxLength = 100) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
        >
            {blog.thumbnail && (
                <div className="w-full h-32 bg-gray-200 overflow-hidden">
                    <img
                        src={blog.thumbnail.length > 500 ? `data:${blog.fileType};base64,${blog.thumbnail}` : blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {getTextPreview(blog.content)}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(blog.createdAt)}</span>
                    {blog.category && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {blog.category}
                        </span>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default SingleBlog;