import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface URLMetadata {
  key: string;
  url: string;
  title: string;
  description: string;
  domain: string;
  images: string[];
}

export default function useURLMetadata(url: string): URLMetadata {
  const [metadata, setMetadata] = useState<URLMetadata>({
    key: '',
    url: '',
    title: '',
    description: '',
    domain: '',
    images: [],
  });

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(
          `https://jsonlink.io/api/extract?url=${url}`
        );
        if (!response.ok) {
          setMetadata((prevMetadata) => ({
            ...prevMetadata,
            key: uuidv4(),
            url: url,
            title: '',
            description: '',
            domain: '',
            images: [],
          }));
        }
        const data = await response.json();
        setMetadata((prevMetadata) => ({
          ...prevMetadata,
          key: uuidv4(),
          url: data.url,
          title: data.title,
          description: data.description,
          domain: data.domain,
          images: data.images,
        }));
      } catch (error) {}
    }

    fetchMetadata();
  }, [url]);

  return metadata;
}
