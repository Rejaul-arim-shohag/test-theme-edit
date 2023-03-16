import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PrivacyPolicy from '../../Components/PrivacyPolicy/PrivacyPolicy';

// theme1 components
import Footer from '../../Components/theme_1/Common/Footer';
import Header from '../../Components/theme_1/Common/Header';
import SocialMedia from '../../Components/theme_1/Common/SocialMedia';
import TinyFooter from '../../Components/theme_1/Common/TinyFooter';

//theme2 components
import Menubar from "../../Components/ThemePage/ThemeTwo/Common/Menubar"
import Footer2 from "../../Components/ThemePage/ThemeTwo/Common/Footer";
const privacyPolicy = () => {
    const [shopInfo, setShopInfo] = useState();
    const [shopData, setShopData] = useState({});
    const router = useRouter();
    const { shopName } = router.query;
    const headers = {
        domain: shopName,
    };
    const getShopInfo = async () => {
        try {
            const shopInfo = await axios.post(
                `${process.env.API_URL}v1/shops/info`,
                {},
                { headers: headers }
            );
            const shopData = shopInfo?.data?.data;
            setShopData(shopData)
        } catch (err) {
            return
        
        }
    };

    useEffect(() => {
        if (shopName !== undefined) {
            getShopInfo();
        }

    }, [shopName]);


    useEffect(() => {
        const shop = {
            theme: localStorage.getItem("theme_id"),
            landing: null,
            shop_id: localStorage.getItem("shop_id"),
        };
        setShopInfo(shop)
    }, [])
    return (
        <>
            <Head>
                <title>{shopData?.shop_meta_title}</title>
                <meta name="description" content={shopData?.shop_meta_description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={shopData?.shop_favicon?.name} />
            </Head>
        
            {shopInfo?.theme == 201 && <>
                <Header shopData={shopData}/>
                <PrivacyPolicy shopData={shopData}/>
                <Footer shopData={shopData}/>
                <SocialMedia shopData={shopData}/>
                <TinyFooter shopData={shopData}/>
            </>}

            {shopInfo?.theme == 202 && <div className='ThemeTwo'>
                <Menubar shopData={shopData}/>
                <PrivacyPolicy shopData={shopData}/>
                <Footer2 shopData={shopData}/>
            </div>}
        </>
    )
}

export default privacyPolicy