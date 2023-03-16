import React, { useEffect, useState } from "react";

//theme one components
import Header from "../../Components/theme_1/Common/Header";
import MenuBar from "../../Components/theme_1/Common/Menubar";
import Delivary from "../../Components/theme_1/Common/Delivary";
import Footer from "../../Components/theme_1/Common/Footer";
import SocialMedia from "../../Components/theme_1/Common/SocialMedia";
import TinyFooter from "../../Components/theme_1/Common/TinyFooter";
import CheckOut from "../../Components/theme_1/CheckOut/CheckOut";
//theme 2 components
import Menubar2 from "../../Components/ThemePage/ThemeTwo/Common/Menubar";
import Footer2 from "../../Components/ThemePage/ThemeTwo/Common/Footer";
import ShippingAddress2 from "../../Components/ThemePage/ThemeTwo/ShipingAddress/ShippingAddress";
import Cookies from "js-cookie";
import Head from 'next/head'
import { useRouter } from "next/router";
import axios from "axios";

const checkout = () => {
	const [shopInfo, setShopInfo] =useState();
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
      console.log("err", err)
			// router.push("/404");
		}
	};



	useEffect(() => {
		if (shopName !== undefined) {
			getShopInfo();
		}

	}, [shopName]);


	useEffect(()=>{
		const shop = {
			theme: localStorage.getItem("theme_id"),
			landing: null,
			shop_id: localStorage.getItem("shop_id"),
		  };
		  setShopInfo(shop)
	},[])
 
  return (
    <>
     <Head>
        <title>{shopData?.shop_meta_title}</title>
        <meta name="description" content={shopData?.shop_meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={shopData?.shop_favicon?.name} />
      </Head>

      {shopInfo?.theme == 201  && <CheckOut shopData={shopData}/>}

      {shopInfo?.theme == 202  && (
        <div className='ThemeTwo'>
          <Menubar2 shopData={shopData}/>
          <ShippingAddress2 shopData={shopData}/>
          <Footer2 shopData={shopData}/>
        </div>
      )}
    </>
  );
};

export default checkout;
