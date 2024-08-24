import { useEffect } from "react";

const useSaveScrollPosition = () => {
  useEffect(() => {
    return () => {
      const hasSavedScrollPosition = localStorage.getItem('hasSavedScrollPosition');
      if (!hasSavedScrollPosition) {
      
        localStorage.setItem('scrollPosition', window.scrollY);
        localStorage.setItem('hasSavedScrollPosition', 'true');
      }
    };
  }, []);
};

export default useSaveScrollPosition;
