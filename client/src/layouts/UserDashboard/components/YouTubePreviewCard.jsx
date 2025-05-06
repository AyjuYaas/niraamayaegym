import { useEffect, useState } from "react";

const YouTubePreviewCard = ({ url }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${url}&format=json`
        );
        if (!res.ok) throw new Error("Failed to fetch preview");
        const data = await res.json();
        setPreview({
          title: data.title,
          thumbnail: data.thumbnail_url,
        });
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchPreview();
  }, [url]);

  if (error) return <p className="text-red-500">Invalid YouTube URL</p>;
  if (!preview) return <p>Loading preview...</p>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center border border-gray-600 bg-gray-800 text-white rounded-lg p-4 w-60 hover:shadow-xl transition"
    >
      <img
        src={preview.thumbnail}
        alt={preview.title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-base font-semibold text-start">{preview.title}</h2>
      <p className="text-sm text-blue-400 break-all mt-1 underline">{url}</p>
    </a>
  );
};

export default YouTubePreviewCard;
