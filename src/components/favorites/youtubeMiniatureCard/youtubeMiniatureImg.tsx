const YoutubeMiniatureImg = ({
  videoId,
  handleClick,
}: {
  videoId: string;
  handleClick: () => void;
}) => {
  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
      alt={`Miniature vidéo id: ${videoId}`}
      onClick={handleClick}
      className="rounded-3xl aspect-video"
    />
  );
};

export default YoutubeMiniatureImg;
