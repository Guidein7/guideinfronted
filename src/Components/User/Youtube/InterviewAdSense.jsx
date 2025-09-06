import { useEffect } from "react";

export const InterviewAdsense = () => {

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
                data-ad-format="fluid"
                data-ad-layout-key="-eb+5o-8-b0+qf"
                data-ad-client="ca-pub-9006004231762171"
                data-ad-slot="6441190115"> 
            </ins>
        </div>)
};