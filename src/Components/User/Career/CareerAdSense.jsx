import { useEffect } from "react";

export const CareerAdSense = () => {

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
                data-ad-layout-key="-ea+6s-4b-cl+138"
                data-ad-client="ca-pub-9006004231762171"
                data-ad-slot="3819181613"></ins>
        </div>)
};