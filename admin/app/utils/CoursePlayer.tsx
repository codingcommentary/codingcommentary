import React, { FC } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  console.log(videoUrl)
  const extractFileName = (url: string) => {
    // Extracts the filename from the full path (assuming the format is consistent)
    return url.split('\\').pop() || ''; // This will get "Video1.mp4" from "C:\Users\jissa\Downloads\Videos\Video1.mp4"
  };
  const isYouTubeUrl = (url: string) => {
    const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regExp.test(url);
  };

  const extractYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      {isYouTubeUrl(videoUrl) ? (
        <iframe
          src={`https://www.youtube.com/embed/${extractYouTubeID(videoUrl)}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0
          }}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      ) : (
        <video
          src={`http://localhost:8080/${extractFileName(videoUrl)}`} // Replace with the correct path and filename
          controls
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0
          }}
          onError={() => {
            console.error("Failed to load video from URL:", videoUrl);
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default CoursePlayer;
