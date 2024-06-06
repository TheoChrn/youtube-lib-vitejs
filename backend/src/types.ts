export interface User {
  name: string;
  videos: Video[];
}

export interface Video {
  id: string;
  title: string;
}
