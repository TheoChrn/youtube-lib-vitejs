interface YoutubeMiniatureImgProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const YoutubeMiniatureImg = ({ ...imgProps }: YoutubeMiniatureImgProps) => {
  return <img {...imgProps} className="rounded-3xl aspect-video" />;
};

export default YoutubeMiniatureImg;
