import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultTheme from "../../Components/DefaultTheme/DefaultTheme";
import Cookies from 'js-cookie'
// Common CSS
import Theme1 from "../../Components/theme_1/index";
import Theme2 from "../../Components/ThemePage/ThemeTwo/index";



const index = () => {

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
			Cookies.set("shop_title", shopData.shop_meta_title);
			Cookies.set("shop_meta_description", shopData.shop_meta_description);
			Cookies.set("shop_logo", shopData?.shop_logo?.name);

			const shopI = {
				theme: shopData.theme_id,
				landing: shopData.landing,
				shop_id: shopData.shop_id,
			}
			setShopInfo(shopI);
		} catch (err) {
			router.push("/404");
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
			{shopInfo.theme == 201 && (
				<Theme1 shopData={shopData} />
			)}
			{shopInfo.theme == 202 && (
				<Theme2 shopData={shopData} />
			)}

			{(shopInfo.theme === "null" || shopInfo.theme === null) && <DefaultTheme shopData={shopData} />}
		</>
	);
};

export default index;
