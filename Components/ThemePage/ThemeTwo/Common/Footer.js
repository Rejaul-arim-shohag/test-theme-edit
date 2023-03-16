import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { BsSearch, BsCart3, BsTwitter, BsInstagram, BsPinterest, BsYoutube } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { FaFacebookF } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { SlSocialPintarest } from 'react-icons/sl'


const Footer = ({ shopData }) => {
  const [shopName, setShopName] = useState();
  const [subdomain, setSubdomain] = useState("")
  useEffect(() => {
    setShopName(localStorage.getItem('shop_name'));
    const subdomain = /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.');
    setSubdomain(subdomain)
  }, []);

  return (

    <>
      <section id='top-footer'>
        <Container>
          <Row>
            <Col lg={8}>

              <Row className="d-flex">
                <Col lg={4}>
                  <div className="widget1 theme_two_logo">
                    <img
                      //  src="../images/theme_2/logo-dark.png"
                      src={shopData?.shop_logo !== null || shopData?.shop_logo !== undefined ? shopData?.shop_logo?.name : "../images/theme_2/logo-dark.png"}
                      alt="" />
                    <p className="text">
                      {/* +880 02 223 344 , +880 123 456 789 */}
                      {
                        shopData?.phone !== null ? shopData?.phone : ''
                      }
                    </p>

                    <p> {
                      shopData?.address !== null ? shopData?.address : ""
                    }
                    </p>
                  </div>
                </Col>
                <Col lg={4}>

                  <div className='widget2'>
                    <h6>Legal</h6>
                    <ul className="list-unstyled pt-4">
                      <li><Link
                        // href={`/${subdomain.length <= 1 ? shopName : ''}/about-us`}
                        href={`/${shopName}/about-us`}
                      > About us </Link></li>
                      <li> <Link 
                      // href={`/${subdomain.length <= 1 ? shopName : ''}/privacy-policy`}
                      href={`/${shopName}/privacy-policy`}
                      >Privacy policy </Link></li>
                      <li><Link 
                      //  href={`/${subdomain.length <= 1 ? shopName : ''}/terms-and-condition`}
                      href={`/${shopName}/privacy-policy`}
                      >Terms&condition </Link></li>
                    </ul>
                  </div>
                </Col>

              </Row>



            </Col>
            <Col lg={4}>
              <div className="widget4">
                <h6>NEWSLETTER</h6>
                <form className="newsletter-search pt-lg-4 form-inline">
                  <input className="form-control mr-lg-2" type="search" placeholder="Your email" aria-label="Search" />
                  <button className="btn-subscribe" type="submit">Subscribe</button>
                </form>
                <ul className="social-icons list-inline pt-2">
                  <li className="list-inline-item"><FaFacebookF /></li>
                  <li className="list-inline-item"><BsTwitter /></li>
                  <li className="list-inline-item"><BsInstagram /></li>
                  <li className="list-inline-item"><BsPinterest /></li>
                  <li className="list-inline-item"><BsYoutube /></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>

      </section>





      {/* ---------------------Bottom Footer-------------- */}
      <section id="footer-section">
        <Container>
          <div className="DesktopMenu">
            <Row>
              <div className="copyright text-center">
                <p>System Developed by Funnel Liner</p>
              </div>
              {/* <Col lg={6}>
                <div className="payment">
                  <ul className=" list-inline pt-2">
                    <li className="list-inline-item"><img src="../images/theme_2/gateway1 (4).png" alt="" /></li>
                    <li className="list-inline-item"><img src="../images/theme_2/gateway1 (3).png" alt="" /></li>
                    <li className="list-inline-item"><img src="../images/theme_2/gateway1 (2).png" alt="" /></li>
                    <li className="list-inline-item"><img src="../images/theme_2/gateway1 (1).png" alt="" /></li>
                  </ul>
                </div>
              </Col> */}


            </Row>
          </div>

        </Container>

      </section>

    </>

  )

}

export default Footer