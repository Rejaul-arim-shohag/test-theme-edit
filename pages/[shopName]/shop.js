import React, { useState, useEffect } from "react";
import Header from "../../Components/theme_1/Common/Header";
import Footer from "../../Components/theme_1/Common/Footer";
import SocialMedia from "../../Components/theme_1/Common/SocialMedia";
import TinyFooter from "../../Components/theme_1/Common/TinyFooter";
import MenuBar from "../../Components/theme_1/Common/Menubar";
import Shop from "../../Components/theme_1/Shop/shop";
import { Editor, Frame } from "@craftjs/core";
import Cookies from "js-cookie";
const axios = require("axios");
import { useRouter } from "next/router";
import Menubar2 from "../../Components/ThemePage/ThemeTwo/Common/Menubar";
import Footer2 from "../../Components/ThemePage/ThemeTwo/Common/Footer";
import ProductListCarousel from "../../Components/ThemePage/ThemeTwo/HomePage/ProductListCarousel";
import Head from 'next/head'
const shop = () => {
  const [shopInfo, setShopInfo] = useState({});
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
      localStorage.setItem("shop_id", shopData.shop_id);
      localStorage.setItem("shop_name", shopData.domain);
      localStorage.setItem("theme_id", shopData.theme_id);
      localStorage.setItem("landing", shopData.landing);
      Cookies.set("shop_id", shopData.shop_id);

      const shopI = {
        theme: shopData.theme_id,
        landing: shopData.landing,
        shop_id: shopData.shop_id,
      };
      setShopInfo(shopI);
    } catch (err) {
      // console.log("err", err);
      // router.push("/404");
    }
  };
  useEffect(() => {
    if (shopName !== undefined) {
      getShopInfo();
    }
  }, [shopName]);

  return (
    <>
     <Head>
        <title>{shopData?.shop_meta_title}</title>
        <meta name="description" content={shopData?.shop_meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={shopData?.shop_favicon?.name} />
      </Head>

      {shopInfo?.theme == 201 && (
        <div>
          <Header shopData={shopData}/>
          <Editor resolver={{ MenuBar }}>
            <Frame>
              <MenuBar
                menu1={"Home"}
                menu2={"Shop"}
                menu3={"About Us"}
                menu4={"Contact Us"}
                fontSize={"15"}
              />
            </Frame>
          </Editor>
          <Shop></Shop>
          <Footer shopData={shopData}></Footer>
          <SocialMedia shopData={shopData}></SocialMedia>
          <TinyFooter shopData={shopData}></TinyFooter>
        </div>
      )}

      {shopInfo?.theme == 202 && (
        <div className='ThemeTwo'>
          <Menubar2 shopData={shopData}/>
          <ProductListCarousel />
          <Footer2 shopData={shopData}/>
        </div>
      )}
    </>
  );
};

export default shop;
