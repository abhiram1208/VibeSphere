import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (image) data.append('image', image);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate('/login');
        return;
      }

      await axios.post(
        'https://vibesphere-1-ij68.onrender.com/api/posts',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      alert('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto mt-6 sm:mt-10">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">
        Create New Post
      </h1>

      {/* Card */}
      <div className="card p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          {/* Content */}
          <textarea
            name="content"
            placeholder="Write your thoughts..."
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-2 font-medium">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-zinc-500
              file:mr-3 sm:file:mr-4
              file:py-2 sm:file:py-3
              file:px-4 sm:file:px-6
              file:rounded-xl sm:file:rounded-2xl
              file:border-0
              file:bg-violet-100
              file:text-violet-700
              hover:file:bg-violet-200"
            />
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 sm:h-56 lg:h-64 object-cover rounded-xl sm:rounded-2xl"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl sm:rounded-2xl font-semibold hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreatePost;