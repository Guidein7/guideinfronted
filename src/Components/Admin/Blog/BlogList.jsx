// import React, { useState, useEffect } from 'react';
// import { resources } from '../../resources';

// const BlogList = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [pagination, setPagination] = useState({
//         currentPage: 0,
//         totalItems: 0,
//         totalPages: 0,
//         pageSize: 10,
//         isLastPage: false
//     });

//     // Fetch blogs from API
//     const fetchBlogs = async (page = 0, size = 10) => {
//         setLoading(true);
//         try {
//             const response = await fetch(
//                 `${resources.APPLICATION_URL}admin/get-blogs?page=${page}&size=${size}`
//             );

//             if (!response.ok) {
//                 throw new Error('Failed to fetch blogs');
//             }

//             const data = await response.json();

//             setBlogs(data.content || []);
//             setPagination({
//                 currentPage: data.currentPage,
//                 totalItems: data.totalItems,
//                 totalPages: data.totalPages,
//                 pageSize: data.pageSize,
//                 isLastPage: data.isLastPage
//             });
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchBlogs();
//     }, []);

//     // Handle page change
//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < pagination.totalPages) {
//             fetchBlogs(newPage, pagination.pageSize);
//         }
//     };

//     // Handle page size change
//     const handlePageSizeChange = (newSize) => {
//         fetchBlogs(0, newSize);
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-64">
//                 <div className="text-lg">Loading blogs...</div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-64">
//                 <div className="text-red-600 text-lg">Error: {error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Blog Posts</h1>
//                 <div className="text-sm text-gray-600">
//                     Total: {pagination.totalItems} blogs
//                 </div>
//             </div>

//             {/* Blog Grid */}
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {blogs.map((blog) => (
//                     <BlogCard key={blog.id} blog={blog} />
//                 ))}
//             </div>

//             {blogs.length === 0 && (
//                 <div className="text-center py-12">
//                     <div className="text-gray-500 text-lg">No blogs found</div>
//                 </div>
//             )}

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//                 <Pagination 
//                     pagination={pagination}
//                     onPageChange={handlePageChange}
//                     onPageSizeChange={handlePageSizeChange}
//                 />
//             )}
//         </div>
//     );
// };

// // BlogCard.jsx - Individual blog card component
// const BlogCard = ({ blog }) => {
//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // Strip HTML tags for preview
//     const getTextPreview = (html, maxLength = 30) => {
//         const div = document.createElement('div');
//         div.innerHTML = html;
//         const text = div.textContent || div.innerText || '';
//         return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             {/* Thumbnail */}
//             {blog.thumbnail && (
//                 <div className="w-full h-48 bg-gray-200">
//                     <img
//                         src={`data:image/jpeg;base64,${blog.thumbnail}`}
//                         alt={blog.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                             e.target.style.display = 'none';
//                         }}
//                     />
//                 </div>
//             )}

//             <div className="p-4">
//                 {/* Title */}
//                 <h3 className="text-xl font-semibold mb-2 line-clamp-2">
//                     {blog.title}
//                 </h3>

//                 {/* Category */}
//                 {blog.category && (
//                     <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
//                         {blog.category}
//                     </span>
//                 )}

//                 {/* Content Preview */}
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-3">
//                     {getTextPreview(blog.content)}
//                 </p>

//                 {/* Footer */}
//                 <div className="flex justify-between items-center text-xs text-gray-500">
//                     <span>{formatDate(blog.createdAt)}</span>
//                     <div className="flex items-center gap-2">
//                         {blog.published && (
//                             <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
//                                 Published
//                             </span>
//                         )}
//                         {/* {!blog.published && (
//                             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                                 Draft
//                             </span>
//                         )} */}
//                     </div>
//                 </div>

//                 {/* Action Button */}
//                 <button 
//                     className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
//                     onClick={() => {
//                         // Navigate to blog detail page
//                         window.open(`/blog/${blog.slug}`, '_blank');
//                     }}
//                 >
//                     Read More
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Pagination.jsx - Pagination component
// const Pagination = ({ pagination, onPageChange, onPageSizeChange }) => {
//     const { currentPage, totalPages, pageSize, totalItems } = pagination;

//     const getPageNumbers = () => {
//         const delta = 2; // Number of pages to show on each side of current page
//         const range = [];
//         const rangeWithDots = [];

//         for (
//             let i = Math.max(2, currentPage - delta);
//             i <= Math.min(totalPages - 1, currentPage + delta);
//             i++
//         ) {
//             range.push(i);
//         }

//         if (currentPage - delta > 2) {
//             rangeWithDots.push(1, '...');
//         } else {
//             rangeWithDots.push(1);
//         }

//         rangeWithDots.push(...range);

//         if (currentPage + delta < totalPages - 1) {
//             rangeWithDots.push('...', totalPages);
//         } else {
//             rangeWithDots.push(totalPages);
//         }

//         return rangeWithDots;
//     };

//     return (
//         <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
//             {/* Page Size Selector */}
//             <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">Show:</span>
//                 <select
//                     value={pageSize}
//                     onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
//                     className="border rounded px-2 py-1 text-sm"
//                 >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                     <option value={50}>50</option>
//                 </select>
//                 <span className="text-sm text-gray-600">per page</span>
//             </div>

//             {/* Page Info */}
//             <div className="text-sm text-gray-600">
//                 Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems} entries
//             </div>

//             {/* Page Numbers */}
//             <div className="flex items-center gap-1">
//                 {/* Previous Button */}
//                 <button
//                     onClick={() => onPageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     Previous
//                 </button>

//                 {/* Page Numbers */}
//                 {totalPages <= 7 ? (
//                     // Show all pages if total pages <= 7
//                     [...Array(totalPages)].map((_, i) => (
//                         <button
//                             key={i}
//                             onClick={() => onPageChange(i)}
//                             className={`px-3 py-1 text-sm border rounded ${
//                                 currentPage === i
//                                     ? 'bg-blue-600 text-white'
//                                     : 'hover:bg-gray-50'
//                             }`}
//                         >
//                             {i + 1}
//                         </button>
//                     ))
//                 ) : (
//                     // Show pages with ellipsis
//                     getPageNumbers().map((page, index) => (
//                         <span key={index}>
//                             {page === '...' ? (
//                                 <span className="px-3 py-1 text-sm">...</span>
//                             ) : (
//                                 <button
//                                     onClick={() => onPageChange(page - 1)}
//                                     className={`px-3 py-1 text-sm border rounded ${
//                                         currentPage === page - 1
//                                             ? 'bg-blue-600 text-white'
//                                             : 'hover:bg-gray-50'
//                                     }`}
//                                 >
//                                     {page}
//                                 </button>
//                             )}
//                         </span>
//                     ))
//                 )}

//                 {/* Next Button */}
//                 <button
//                     onClick={() => onPageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BlogList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resources } from '../../resources';

const BlogList = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        pageSize: 10,
        isLastPage: false
    });

    // Fetch blogs from API
    const fetchBlogs = async (page = 0, size = 10) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${resources.APPLICATION_URL}admin/get-blogs?page=${page}&size=${size}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const data = await response.json();

            setBlogs(data.content.reverse() || []);
            setPagination({
                currentPage: data.currentPage,
                totalItems: data.totalItems,
                totalPages: data.totalPages,
                pageSize: data.pageSize,
                isLastPage: data.isLastPage
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            fetchBlogs(newPage, pagination.pageSize);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        fetchBlogs(0, newSize);
    };

    // Handle blog click - navigate to single blog page
    const handleBlogClick = (blogSlug) => {
        navigate(`/knowledge-hub/${blogSlug}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-red-600 text-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Knowledge Hub</h1>
                {/* <div className="text-sm text-gray-600">
                    Total: {pagination.totalItems} blogs
                </div> */}
            </div>

            {/* Blog Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onClick={() => handleBlogClick(blog.slug)}
                    />
                ))}
            </div>

            {blogs.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No blogs found</div>
                </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
        </div>
    );
};

// BlogCard.jsx - Individual blog card component with routing
const BlogCard = ({ blog, onClick }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Strip HTML tags for preview
    const getTextPreview = (html, maxLength = 30) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <>
        <div className="hidden bg-white md:block  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={onClick}>
            {/* Thumbnail */}
            {blog.thumbnail && (
                <div className="flex-1">
                    <img
                        src={`data:${blog?.fileType};base64,${blog?.thumbnail}`}
                        alt={blog.title}
                        className="blog-img "
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

            )}

            <div className="p-4 flex-1">
                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                </h3>

                {/* Category */}
                {blog.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                        {blog.category}
                    </span>
                )}

                {/* Content Preview */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {/* {getTextPreview(blog.content)} */}
                    {blog.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(blog.createdAt)}</span>
                    <div className="flex items-center gap-2">
                        {blog.published && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                Published
                            </span>
                        )}
                        {/* {!blog.published && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Draft
                            </span>
                        )} */}
                    </div>
                </div>

                {/* Action Button */}
                {/* <button
                    className="w-full hidden md:block mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when button is clicked
                        onClick();
                    }}
                >
                    Read More
                </button> */}
            </div>
        </div>

          <div className="md:hidden bg-white flex flex-row-reverse md:block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={onClick}>
            {/* Thumbnail */}
            {blog.thumbnail && (
                <div className=" rounded-lg">
                    <img
                        src={`data:${blog?.fileType};base64,${blog?.thumbnail}`}
                        alt={blog.title}
                        className="w-[120px] h-[150px]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

            )}

            <div className="p-4 flex-1">
                {/* Title */}
                <h3 className="text-sm font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                </h3>

                {/* Category */}
              

                

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(blog.createdAt)}</span>
                    <div className="flex items-center gap-2">
                        {blog.published && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                Published
                            </span>
                        )}
                        {/* {!blog.published && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Draft
                            </span>
                        )} */}
                    </div>
                </div>

                {/* Action Button */}
                {/* <button
                    className="w-full hidden md:block mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when button is clicked
                        onClick();
                    }}
                >
                    Read More
                </button> */}
            </div>
        </div>
        </>
    );
};

// Pagination.jsx - Pagination component (unchanged)
const Pagination = ({ pagination, onPageChange, onPageSizeChange }) => {
    const { currentPage, totalPages, pageSize, totalItems } = pagination;

    const getPageNumbers = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">per page</span>
            </div>

            {/* Page Info */}
            <div className="text-sm text-gray-600">
                Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems} entries
            </div>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {totalPages <= 7 ? (
                    // Show all pages if total pages <= 7
                    [...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => onPageChange(i)}
                            className={`px-3 py-1 text-sm border rounded ${currentPage === i
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))
                ) : (
                    // Show pages with ellipsis
                    getPageNumbers().map((page, index) => (
                        <span key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-1 text-sm">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page - 1)}
                                    className={`px-3 py-1 text-sm border rounded ${currentPage === page - 1
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            )}
                        </span>
                    ))
                )}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogList;