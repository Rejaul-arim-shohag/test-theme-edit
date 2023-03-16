import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaCentos } from 'react-icons/fa';



const Footer = ({ shopData }) => {
    const [shopName, setShopName] = useState();
    const [subdomain, setSubdomain]=useState("")
 
    useEffect(() => {
        setShopName(localStorage.getItem('shop_name'));
        const subdomain = /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.');
        setSubdomain(subdomain)
      }, []);

    return (

        <section className="Footer">

            <Container>

                <Row className="d_flex_footer">

                    {/* item */}
                    <Col xs={12} lg={3}>

                        <div className="FooterItem">    

                            <div className="logo">
                                <img
                                    src={shopData?.shop_logo !== null ? shopData?.shop_logo?.name : "/theme_1/images/logo.png"}
                                />
                            </div>

                        </div>

                    </Col>

                    {/* item */}
                    <Col xs={12} lg={3}>

                        <div className="FooterItem">

                            <h3>Store Address</h3>
                            <p>
                                {
                                    shopData?.address !== null ? shopData?.address : ""
                                }

                            </p>

                        </div>

                    </Col>

                    {/* item */}
                    <Col xs={12} lg={3}>

                        <div className="FooterItem">

                            <h3>Contact No</h3>
                            <Link href="#">
                                {shopData?.phone !== null ? shopData?.phone : ""}
                            </Link>
                        </div>

                    </Col>

                    <Col xs={12} lg={3}>
                        <div className="FooterItem">
                            <h3>Legal</h3>
                            <Link
                            //  href={`/${subdomain.length <= 1 ? shopName : ''}/about-us`}
                            href={`/${shopName}/about-us`}
                             > About us </Link>
                            <br/>
                            <Link
                            //  href={`/${subdomain.length <= 1 ? shopName : ''}/privacy-policy`
                             href={`/${shopName}/privacy-policy`}
                             >Privacy policy </Link>
                            <br/>
                            <Link
                            //  href={`/${subdomain.length <= 1 ? shopName : ''}/terms-and-condition`}
                             href={`/${shopName}/terms-and-condition`}
                             >Terms&condition </Link>
                        </div>

                    </Col>

                </Row>

            </Container>

        </section>

    );

};

export default Footer;
