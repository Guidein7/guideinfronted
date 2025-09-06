import { useEffect } from "react";

export const InfeedAd = () => {
  
    useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);


  return (
  <div className="my-2">
   
<ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-format="fluid"
     data-ad-layout-key="-ef+6k-30-ac+ty"
     data-ad-client="ca-pub-9006004231762171"
     data-ad-slot="3174499576"></ins>

  </div>)
};