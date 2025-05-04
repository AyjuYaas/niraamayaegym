import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const YouTubeVideoInput = ({ videos, setFormData }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPreviews, setVideoPreviews] = useState([]);

  const fetchPreview = async (url) => {
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      return {
        url,
        title: data.title,
        thumbnail: data.thumbnail_url,
      };
    } catch {
      return null;
    }
  };

  // Fetch previews when `videos` changes
  useEffect(() => {
    const loadPreviews = async () => {
      const previews = await Promise.all(
        videos.map((url) => fetchPreview(url))
      );
      setVideoPreviews(previews.filter(Boolean));
    };
    loadPreviews();
  }, [videos]);

  const handleAddVideo = async () => {
    if (!videoUrl.trim()) return;

    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${videoUrl}&format=json`
      );
      if (!res.ok) throw new Error();

      // Prevent duplicate
      if (videos.includes(videoUrl)) return;

      setFormData((prev) => ({
        ...prev,
        videos: [...prev.videos, videoUrl],
      }));

      setVideoUrl("");
    } catch (err) {
      toast.error("Invalid YouTube URL");
      console.error("Invalid or unsupported YouTube URL: " + err);
    }
  };

  const handleRemoveVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Video URLs</span>
      </label>

      {/* Previews */}
      <div className="space-y-2 mb-2 w-full">
        {videoPreviews.map((video, index) => (
          <div
            key={index}
            className="flex items-center p-3 rounded-md gap-4 bg-gray-800"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-20 h-14 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{video.title}</p>
              <a
                href={video.url}
                target="_blank"
                className="text-sm text-blue-500 underline"
              >
                {video.url}
              </a>
            </div>
            <button
              className="bg-red-600 cursor-pointer p-1 rounded-full hover:bg-red-500"
              onClick={() => handleRemoveVideo(index)}
            >
              <IoCloseSharp size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Input field */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className="input input-bordered w-full"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddVideo}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default YouTubeVideoInput;
