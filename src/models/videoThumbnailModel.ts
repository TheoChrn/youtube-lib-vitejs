import { Video } from "@/types/types";

export class VideoThumbNailModel implements Video {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
  
  getThumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.id}/maxresdefault.jpg`;
  }
}
