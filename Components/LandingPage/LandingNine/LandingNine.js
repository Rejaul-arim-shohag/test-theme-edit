import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi';
import { BsCheckCircleFill, BsTelephone } from 'react-icons/bs';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { RiShoppingCart2Line } from 'react-icons/ri';
import styles from '../../../styles/landing_nine/landing_nine.module.css';

import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { useEditor, useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import Context from "../../Context";
const LandingNine = (props) => {
  const [product, setProduct] = useState({});
  const [shopID, setShopID] = useState();
  const [quantity, setQuantity] = useState(1);

  //shipping cost add
  const [isCheckedInSideDhaka, setIsCheckedInSideDhaka] = useState(true);
  const [isCheckedInOutSideDhaka, setIsCheckedInOutSideDhaka] = useState(false);
  const [shippingCost, setShippingCost] = useState()


  //shipping cost change function
  const handleChange = e => {
    if (e.target.id === "insideDhaka") {
      setIsCheckedInSideDhaka(!isCheckedInSideDhaka);
      setIsCheckedInOutSideDhaka(false)
      setShippingCost(e.target.value)
    }
    else if (e.target.id === "outSideDhaka") {
      setIsCheckedInOutSideDhaka(!isCheckedInOutSideDhaka)
      setIsCheckedInSideDhaka(false)
      setShippingCost(e.target.value)
    }
  }



  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem("shop_id"),
    };
    setShopID(localStorage.getItem("shop_id"));
  }, [shopID]);


  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };



  //order submit
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const shop_name = router.query.shopName;

  const { page } = router.query;
  const getPageInfo = async (page) => {
    const pageInformation = await axios.get(
      `${process.env.API_URL}v1/page/${page}`
    );
    setProduct(pageInformation.data.data.product)
    setShippingCost(pageInformation?.data?.data?.product?.inside_dhaka)
  };
  useEffect(() => {
    if (page !== undefined) {
      getPageInfo(page);
    }

  }, [shop_name])

  const onSubmit = (data) => {
    console.log("postBody", data);
    const postBody = {
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      product_id: [product.id],
      product_qty: [quantity],
      shipping_cost: shippingCost,

    };

    axios
      .post(`${process.env.API_URL}v1/customer/order/store`, postBody, {
        headers: { "shop-id": shopID },
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/${shop_name}/order_successfull/${res?.data?.data?.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Sorry",
          text: "Something went wrong",
          icon: "warning",
        });
      });
  };




  //theme edit



  return (
    <div className={styles.LandingNine}>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Banner
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.Banner}>

        <Container>

          <Row>

            <Col lg={9}>

              <div className={styles.BannerContent}>
                <div className={styles.Logo}>

                  <img className={styles.imgBlack} src={props.logo} alt="" />


                </div>

                <div className={styles.text}>

                  <h1><span>{props.heroContent}</span></h1>

                  <h4><span>{props.previousPrice}</span></h4>

                  <h2>{props.currentPrice}</h2>

                  <div className={styles.btnBox}>

                    <Link href='#OrderConfirmFrom' className={styles.bg}> <AiOutlineShoppingCart /> অর্ডার করুন</Link>

                  </div>

                </div>

              </div>


            </Col>

          </Row>


        </Container>

      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Hotline Number
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.Hotline}>

        <Container>

          <Row>

            <Col lg={12}>

              <div className={styles.hotlineBG}>

                <div className={styles.text}>

                  <h3>যে কোন প্রয়োজনে কল করুন</h3>

                  <h2> <span>হটলাইন:</span>{props.phoneNumber}</h2>

                </div>

              </div>

            </Col>


          </Row>

        </Container>

      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Honey Jar /images
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.JarImage}>

        <Container>

          <Row>

            <Col lg={3} xs={6}>
              <div className={styles.Image}>

                <img className={styles.imgItem} src="/images/landing_9/jar1.png" alt="" />

              </div>

            </Col>

            <Col lg={3} xs={6}>
              <div className={styles.Image}>

                <img className={styles.imgItem} src="/images/landing_9/jar2.png" alt="" />

              </div>

            </Col>

            <Col lg={3} xs={6}>
              <div className={styles.Image}>

                <img className={styles.imgItem} src="/images/landing_9/jar3.png" alt="" />

              </div>

            </Col>

            <Col lg={3} xs={6}>
              <div className={styles.Image}>

                <img className={styles.imgItem} src="/images/landing_9/jar4.png" alt="" />

              </div>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Middle Order Btn
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.OrderBtn}>

        <div className={styles.Leftlayer}>

          <img className={styles.imgBlack} src="/images/landing_9/honey_layer.svg" alt="" />

        </div>
        <div className={styles.Rightlayer}>

          <img className={styles.imgBlack} src="/images/landing_9/honey_layer.svg" alt="" />

        </div>

        <Container>

          <Row className='justify-content-center'>

            <Col lg={8}>

              <div className={styles.btnBox}>

                <Link href='#OrderConfirmFrom' className={styles.bg}>অর্ডার করতে এখানে ক্লিক করুন</Link>

              </div>

              <div className={styles.text}>

                <h5>{props.slogan1}</h5>

              </div>

            </Col>

          </Row>

        </Container>

      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Benefit section Start
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.Benefit}>

        <Container>

          <Row className='justify-content-center'>

            <Col lg={9} xs={12}>

              <div className={styles.headerTitle}>
                <h2>{props.benifitOfThisProduct}</h2>

              </div>

            </Col>

          </Row>

          <Row>

            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitOneTitle}</h3>
                  <p>{props.benifitOneDescription}</p>

                </div>

              </div>

            </Col>
            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitTwoTitle}</h3>
                  <p>{props.benifitTwoDescription}</p>

                </div>

              </div>

            </Col>
            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitThreeTitle}</h3>
                  <p>{props.benifitThreeDescription}</p>

                </div>

              </div>

            </Col>
            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitFourTitle}</h3>
                  <p>{props.benifitFourDescription}</p>
                </div>

              </div>

            </Col>

          </Row>

          <Row className=' my-1 my-lg-3'>

            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitFiveTitle}</h3>
                  <p>{props.benifitFiveDescription}</p>

                </div>

              </div>

            </Col>
            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitSixTitle}</h3>
                  <p>{props.benifitSixDescription}</p>

                </div>

              </div>

            </Col>
            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitSevenTitle}</h3>
                  <p>{props.benifitSevenDescription}</p>
                </div>

              </div>

            </Col>
            <Col xl={3} lg={6} md={6} className='my-1'>

              <div className={styles.cardBox}>

                <div className={styles.text}>

                  <h3>{props.benifitEightTitle}</h3>
                  <p>{props.benifitEightDescription}</p>

                </div>

              </div>

            </Col>

          </Row>


        </Container>

      </section>



      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Features section Start
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.Features}>

        <div className={styles.BeeImage}>

          <img className={styles.imgBlack} src="/images/landing_9/bee1.svg" alt="" />

        </div>

        <Container>

          <Row className='justify-content-center'>

            <Col lg={9} xs={12}>

              <div className={styles.headerTitle}>
                <h2>{props.sloganTwo}</h2>
              </div>

            </Col>

          </Row>

          <Row>

            <Col lg={6} md={5} className="position-relative">

              <div className={styles.FeatureImage}>

                <img className={styles.imgBlack} src="/images/landing_9/honeyFeature.png" alt="" />

              </div>


            </Col>
            <Col lg={6} md={7}>

              <div className={styles.FeatureList}>

                <ul>
                  <li><div><BsCheckCircleFill /></div> <div><p>{props.sloganTwoDescription1}</p></div> </li>
                  <li><div><BsCheckCircleFill /></div> <div><p> {props.sloganTwoDescription2}</p></div></li>
                  <li><div><BsCheckCircleFill /></div> <div><p> {props.sloganTwoDescription3}</p></div></li>
                  <li><div><BsCheckCircleFill /></div> <div><p>{props.sloganTwoDescription4}</p></div></li>
                  <li><div><BsCheckCircleFill /></div> <div><p> {props.sloganTwoDescription5}</p></div></li>

                </ul>

              </div>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            PriceSection section Start
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.PriceSection}>

        <div className={styles.BeeImage}>

          <img className={styles.imgBlack} src="/images/landing_9/bee2.svg" alt="" />

        </div>

        <div className={styles.BeeImage2}>

          <img className={styles.imgBlack} src="/images/landing_9/flower.svg" alt="" />

        </div>

        <Container>

          <Row className='justify-content-center'>

            <Col>

              <div className={styles.btnBox}>

                <Link href='#OrderConfirmFrom' className={styles.bg}>অর্ডার করতে এখানে ক্লিক করুন</Link>

              </div>



              <div className={styles.text}>

                <h2>{props.currentPrice}</h2>

                {/* <h5>{props.homeDelivery}</h5> */}

              </div>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>


      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            WhyBuy section Start
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.WhyBuy}>

        <div className={styles.BeeImage}>

          <img className={styles.imgBlack} src="/images/landing_9/honeyspoon.svg" alt="" />

        </div>

        <div className={styles.BeeImage2}>

          <img className={styles.imgBlack} src="/images/landing_9/bee3.svg" alt="" />

        </div>

        <Container>

          <Row className='justify-content-center'>

            <Col lg={9} xs={12}>

              <div className={styles.headerTitle}>

                <h2>{props.whyBuyThisProductFromUs}</h2>

              </div>

              <div className={styles.text}>

                <h5>{props.homeDelivery}</h5>
                <h5>{props.guranty1}</h5>
                <h5>{props.quality2}</h5>
                <h5>{props.bussinessPolicy}</h5>
                {/* <h5>ফ্রি হেলথ টিপস ।</h5> */}

              </div>

            </Col>

          </Row>

        </Container>


      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Checkout Form
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section id="OrderConfirmFrom" className="OrderConfirmFrom">

        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>

              <Col>
                <div className={styles.headerTitle}>

                  <h2>তাই আর দেরি না করে আজই অর্ডার করুন </h2>

                </div>

              </Col>

            </Row>

            <Row>

              {/* left */}
              <Col lg={7}>

                <div className="OrderConfirmLeft">

                  <h3>Billing details</h3>

                  <div className="CustomeInput">
                    <input type="text"
                      {...register("customerName", { required: true })}
                      placeholder='আপনার নাম লিখুন *' />
                    {errors.customerName && (
                      <span style={{ color: "red" }}>Name is required</span>
                    )}
                  </div>

                  <div className="CustomeInput">
                    <input type="text"
                      {...register(
                        "customerMobile",
                        { required: true },
                        { min: 11, max: 15 }
                      )}
                      placeholder='আপনার মোবাইল নাম্বার লিখুন *' />
                    {errors.customerMobile && (
                      <span style={{ color: "red" }}>
                        Valid Mobile Number require
                      </span>
                    )}
                  </div>

                  <div className="CustomeInput">
                    <input
                      {...register("customerAddress", { required: true })}
                      type="text" placeholder='আপনার সম্পূর্ণ ঠিকানা লিখুন *' />
                    {errors.customerAddress && (
                      <span style={{ color: "red" }}>Address is required</span>
                    )}
                  </div>

                  {/* Payment */}
                  <div className="Payment">

                    <h3>Paymet</h3>

                    <div className="CustomeInput d_flex">
                      <input type="checkbox" checked name="" id='CashOn' />
                      <label htmlFor="CashOn">ক্যাশ অন ডেলিভারি</label>
                    </div>

                    <div className="ArrowBg">
                      <p>Pay with cash on delivery.</p>
                    </div>

                  </div>

                </div>

              </Col>

              {/* right */}
              <Col lg={5}>

                <div className="OrderConfirmRight">

                  <h3>Your order</h3>

                  <ul>

                    <li>
                      <h4>Product</h4>
                      <h5>Subtotal</h5>
                    </li>

                    <li>

                      <div className="left d_flex">

                        <div className="img">
                          <img src={product?.main_image?.name} alt='' />
                        </div>

                        <p>{product?.product_name}</p>

                      </div>

                      <div className="right d_flex">
                        <input type='number'
                          onChange={handleQuantityChange}
                          defaultValue={1}
                          min={1} />

                        <h5>BDT {product?.price}</h5>

                      </div>

                    </li>

                    <li>
                      <h5>Subtotal</h5>
                      <h5>{quantity * product?.price}</h5>
                    </li>
                    <li>
                      <h5>Shipping</h5>
                      <div>
                        <div>
                          <div> <input type='checkbox' value={product?.inside_dhaka} onChange={handleChange} id="insideDhaka" checked={isCheckedInSideDhaka} /> Inside Dhaka ৳ <span style={{ fontWeight: "bold" }}>{product?.inside_dhaka}</span></div>
                          <div> <input type='checkbox' value={product?.outside_dhaka} onChange={handleChange} id="outSideDhaka" checked={isCheckedInOutSideDhaka} /> Outside Dhaka ৳ <span style={{ fontWeight: "bold" }}>{product?.outside_dhaka}</span></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <h4>Total</h4>
                      <h4>{quantity * product?.price + parseInt(shippingCost)}</h4>
                    </li>

                  </ul>

                  <button> <RiShoppingCart2Line /> Place Order  BDT {quantity * product?.price + parseInt(shippingCost)}</button>

                </div>

              </Col>

            </Row>
          </form>
        </Container>

      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>


      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Footer section Start
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.Footer}>

        <div className={styles.BeeImage}>

          <img className={styles.imgBlack} src="/images/landing_9/beelast.svg" alt="" />

        </div>

        <div className={styles.BeeImage2}>

          <img className={styles.imgBlack} src="/images/landing_9/beelast.svg" alt="" />

        </div>

        <Container>

          <Row className='justify-content-between'>

            <Col xl={3} lg={4} md={4}>
              <div className={styles.footermenu}>

                <h5>প্রয়োজনে কল করুন</h5>

                <ul className=''>

                  <li><Link href="#"><BsTelephone />
                   {props.phoneNumber}</Link>
                  </li>

                </ul>
                <ul className={styles.social}>

                  <li>
                    <Link href="#"><FiInstagram /></Link>
                  </li>
                  <li>
                    <Link href="#"><FiFacebook /></Link>
                  </li>

                  <li>
                    <Link href="#"><FiTwitter /></Link>
                  </li>

                </ul>

              </div>

            </Col>
            <Col xl={3} lg={4} md={4}>

              <div className={styles.footermenu}>

                <h5>Important Links</h5>

                <ul className=''>

                  <li><Link href="#">
                    Privacy Policy</Link>
                  </li>
                  <li><Link href="#">
                    Terms & Conditions</Link>
                  </li>
                  <li><Link href="#">
                    Contact</Link>
                  </li>

                </ul>

              </div>

            </Col>
            <Col xl={3} lg={4} md={4}>

              <div className={styles.footermenu}>

                <h5>Email us</h5>

                <ul className=''>

                  <li><Link href="#"><BiEnvelope />
                   {props.businessEmail}</Link>
                  </li>

                </ul>

              </div>


            </Col>

          </Row>

          <Row>
            <Col lg={12}>
              <hr></hr>
              <div className='d-flex justify-content-center'>

                <p>Copyright © 2023 Hafsa. All rights reserved.</p>

              </div>
            </Col>
          </Row>

        </Container>


      </section>






    </div>
  )
}

export default LandingNine