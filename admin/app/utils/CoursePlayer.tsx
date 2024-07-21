import React, { FC, useEffect } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  console.log(videoUrl)
  const extractFileName = (url: string) => {
    return url.split('\\').pop() || '';
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

  useEffect(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    const courseId = window.location.pathname.split('/').pop();
    if (courseId) {
      const currentIndex = parseInt(localStorage.getItem(`lastWatched_${courseId}`) || '0');
      localStorage.setItem(`lastWatched_${courseId}`, (currentIndex + 1).toString());
    }
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
          src={`http://localhost:8080/${extractFileName(videoUrl)}`}
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
          onEnded={handleVideoEnd}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default CoursePlayer;