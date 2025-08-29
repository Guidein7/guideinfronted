import { useEffect } from "react";

export const AdSenseAd = () => {
  
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
style={{ display: "block", textAlign: "center" }}

     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-9006004231762171"
     data-ad-slot="6991286230"></ins>

  </div>)
};