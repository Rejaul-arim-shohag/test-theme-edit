import Head from "next/head";

// Common CSS
import Header from "./Common/Header";
import MenuBar from "./Common/Menubar";
import Delivary from "./Common/Delivary";
import Footer from "./Common/Footer";
import SocialMedia from "./Common/SocialMedia";
import TinyFooter from "./Common/TinyFooter";

import Banner from "./HomePage/Banner";
import Category from "./HomePage/Category";
import MiddleBanner from "./HomePage/MiddleBanner";
import PopularProduct from "./HomePage/PopularProduct";
import AllProduct from "./HomePage/AllProduct";
import { Editor, Frame } from "@craftjs/core";

import { useEffect, useState } from "react";
import { baseUrl } from "../../constant/constant";
import 'grapesjs/dist/css/grapes.min.css'
import Context from "../Context";
import lz from "lzutf8";

// const editor = new grapesjs.init()
const index = ({shopData}) => {
	const [categories, setCategories] = useState([])
	const [editActive, setEditActive] = useState(false)
	const [saveData, setSaveData] = useState(false)
	// const { actions, query, enabled } = useEditor((state) => ({
	// 	enabled: editActive
	//   }));


	// async function handleFetchCategories(headers) {
	// 	const response = await fetch(
	// 		`${baseUrl}/api/v1/customer/categories`, { headers: headers }
	// 	);
	// 	const data = await response.json();
	// 	if (data.success === true) {
	// 		setCategories(data?.data)
	// 	}
	// }

	// const handleFetchCategories=async (headers)=>{
	// 	try {
	// 	  let res = await axios({
	// 		method: "get",
	// 		url: `${baseUrl}/api/v1/customer/categories`,
	// 		headers: headers,
	// 	  });
	// 	//   const data = await res.json()
	// 	 setCategories(res.data.data)
	// 	} catch (err) {
	// 		// console.log(err)
	// 	}
	//   }

	// useEffect(() => {
	// 	const headers = {
	// 		shop_id: localStorage.getItem('shop_id'),
	// 	}
	// 	handleFetchCategories(headers).then(r => console.log())
	// }, [])


	let baseData
	const save = (data) => {
		// console.log(JSON.parse(data));
		const saveData = JSON.parse(data);
		if (saveData.ROOT !== undefined) {
			const rootData = saveData.ROOT;
			if (rootData.displayName === 'Menubar') {
				baseData = {
					menu: lz.encodeBase64(lz.compress(JSON.stringify(rootData.props))),
					shop_id: localStorage.getItem('shop_id'),
					theme: localStorage.getItem('theme_id'),
					page: 'home',
					type: 'menu'
				}
			}
			if (rootData.displayName === "Category") {
				baseData = {
					category: rootData.props,
					shop_id: localStorage.getItem('shop_id'),
					theme: localStorage.getItem('theme_id'),
					page: 'home',
					type: 'category'
				}
			}
			if (rootData.displayName === "PopularProduct") {
				baseData = {
					popularProduct: rootData.props,
					shop_id: localStorage.getItem('shop_id'),
					theme: localStorage.getItem('theme_id'),
					page: 'home',
					type: 'popular_product'
				}
			}

		} else {
			baseData = {
				logo: saveData,
				shop_id: localStorage.getItem('shop_id'),
				theme: localStorage.getItem('theme_id'),
				page: 'home',
				type: 'logo'
			}
		}
		// console.log(lz.decompress(lz.decodeBase64(baseData?.menu)));

	}
	return (
		<>
			
			<main>
				<button style={{ position: 'fixed', top: 0, right: '60px' }} onClick={() => {
					setSaveData(!saveData)
				}} className="btn btn-success">Save</button>
				<button style={{ position: 'fixed', top: 0, right: 0 }} onClick={() => setEditActive(!editActive)} className="btn btn-success">Edit</button>
				<Context.Provider value={{ value: editActive, value1: saveData }}>
					<Header shopData={shopData} save={save} />
					<Editor resolver={{ MenuBar }}>
						<Frame>
							<MenuBar shopData={shopData} menu1={'Home'} menu2={'Shop'} menu3={'About Us'} menu4={'Contact Us'} fontSize={'15'} save={save} />
						</Frame>
					</Editor>
					<Banner></Banner>
					<Editor resolver={{ Category }}>
						<Frame>
							<Category title={'Category'} fontSize={'16'} save={save} />
						</Frame>
					</Editor>
					<MiddleBanner />
					<Editor resolver={{ PopularProduct }}>
						<Frame>
							<PopularProduct title={'Popular Products'} fontSize={'16'} save={save} />
						</Frame>
					</Editor>
					<Editor resolver={{ AllProduct }}>
						<Frame>
							<AllProduct title={'All Products'} fontSize={'16'} save={save} />
						</Frame>
					</Editor>
					{/* <Delivary></Delivary> */}
					<Footer shopData={shopData}></Footer>
					<SocialMedia shopData={shopData}></SocialMedia>
					<TinyFooter shopData={shopData}></TinyFooter>
				</Context.Provider>
			</main>
			<footer></footer>
		</>
	);
};

export default index;

