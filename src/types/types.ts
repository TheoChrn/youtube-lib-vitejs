export interface User {
  name: string;
  videos: Video[];
}

export interface Video {
  id: string;
  title: string;
}

interface Thumbnails {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
}

interface Id {
  kind: string;
  videoId: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Item {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}
