import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";

// // Common CSS
//theme_1 components
import Header from "../../../Components/theme_1/Common/Header";
import MenuBar from "../../../Components/theme_1/Common/Menubar";
import Delivary from "../../../Components/theme_1/Common/Delivary";
import Footer from "../../../Components/theme_1/Common/Footer";
import SocialMedia from "../../../Components/theme_1/Common/SocialMedia";
import TinyFooter from "../../../Components/theme_1/Common/TinyFooter";
import ProductDescription from "../../../Components/theme_1/ProductDetails/ProductDescription";

//theme_2 components
import Footer2 from "../../../Components/ThemePage/ThemeTwo/Common/Footer";
import Menubar2 from "../../../Components/ThemePage/ThemeTwo/Common/Menubar";
import ProductInfo2 from "../../../Components/ThemePage/ThemeTwo/SingleProduct/ProductInfo";
import ProductDescription2 from "../../../Components/ThemePage/ThemeTwo/SingleProduct/ProductDescription";

const axios = require("axios");
import { useRouter } from "next/router";
import { Editor, Frame } from "@craftjs/core";
const index = ({ data }) => {
  const [themeId, setThemeId] = useState();
  const [landing, setLanding] = useState();
  const [shopInfo, setShopInfo] = useState()
  const [singleProduct, setSingleProduct] = useState({});
  const router = useRouter();
  const productID = router.query.productID;


  const handleFetchProductById = async (shop_id) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}v1/customer/products/${productID}`,
        {
          method: "get",
          headers: {
            "shop-id": shop_id,
          },
        }
      );
      const data = await response?.json();
      setSingleProduct(data.data);
      // console.log("data", data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (productID !== undefined) {
      setThemeId(localStorage.getItem("theme_id"));
      setLanding(localStorage.getItem("landing"));
      handleFetchProductById(localStorage.getItem("shop_id"));
    }
  }, [productID]);
  useEffect(()=>{
	const shop = {
		theme: localStorage.getItem("theme_id"),
		landing: null,
		shop_id: localStorage.getItem("shop_id"),
	  };
	  setShopInfo(shop);
  },[])


  const [shopData, setShopData] = useState({});
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
      {/* theme_1 detail page */}
      {shopInfo?.theme == 201  && (
        <>
          <main>
            <Header shopData={shopData}></Header>
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
            <ProductDescription data={singleProduct}></ProductDescription>
            {/* <Delivary></Delivary> */}
            <Footer shopData={shopData}></Footer>
            <SocialMedia shopData={shopData}></SocialMedia>
            <TinyFooter shopData={shopData}></TinyFooter>
          </main>
          <footer></footer>
        </>
      )}
      {/* theme_two details page */}
      {shopInfo?.theme == 202  && (
        <div className='ThemeTwo'>
          <Menubar2 shopData={shopData}/>
          <ProductInfo2 shopData={shopData} data={singleProduct}/>
          <ProductDescription2 shopData={shopData} data={singleProduct}/>
          <Footer2 shopData={shopData}/>
        </div>
      )}
    </>
  );
};

export default index;

