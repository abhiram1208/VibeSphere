import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, MessageCircle } from 'lucide-react';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        'https://vibesphere-1-ij68.onrender.com/api/posts'
      );

      if (res.data.success) {
        setPosts(res.data.posts || []);
      } else {
        setPosts([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto refresh (optimized)
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchPosts();
      }
    }, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center text-xl py-20">Loading latest vibes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Latest Vibes</h1>
        <button 
          onClick={fetchPosts}
          className="px-5 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-xl hover:bg-zinc-300 transition"
        >
          Refresh
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-zinc-500">No posts yet</p>
          <p className="text-zinc-400 mt-2">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="card overflow-hidden group">
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 line-clamp-4 mb-5">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author?.name?.charAt(0) || 'U'}
                    </div>
                    <span>{post.author?.name || 'Anonymous'}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart size={16} className="text-red-500" /> 
                      {post.likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={16} /> 
                      {post.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;