type LinkType = {
  url: string;
  key: string;
  description: string;
  domain: string;
  images: string[];
  title: string;
};

interface URLMetadata {
  key: string;
  url: string;
  title: string;
  description: string;
  domain: string;
  images: string[];
}

export type { URLMetadata, LinkType };
