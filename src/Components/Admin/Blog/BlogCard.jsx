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
        <div className="bg-white w-full max-w-[400px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
             onClick={onClick}>
            {/* Thumbnail */}
            {blog.thumbnail && (
                <div className="w-full h-auto bg-gray-200 overflow-hidden">
                    <img
                        src={blog.Thumbnail.length > 500
    ? `data:${blog?.fileType};base64,${blog.Thumbnail}`
    : blog.Thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <div className="p-4">
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
                    {blog.description.substring(0,50)}
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
                    className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when button is clicked
                        onClick();
                    }}
                >
                    Read More
                </button> */}
            </div>
        </div>
    );
};

export default BlogCard;