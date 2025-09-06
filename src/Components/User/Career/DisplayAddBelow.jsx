import { useEffect } from "react";

export const CareerDisplayAd = () => {

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
                style={{display:"block"}}
                data-ad-client="ca-pub-9006004231762171"
                data-ad-slot="1332863899"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>)
};