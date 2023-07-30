import { useEffect, useState } from 'react';

export default function useScrollEffect() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Function to handle the scroll event
    function handleScroll() {
      const isScrolledDown = window.scrollY > 50; // Change this value to adjust when to modify the header
      setIsScrolling(isScrolledDown);
    }

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrolling };
}
