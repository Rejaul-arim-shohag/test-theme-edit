import Cookies from 'js-cookie';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
const axios = require('axios');

const OrderSuccessfull = () => {
    const [orderDetails, setOrderDetails]=useState({})
    const router = useRouter()
    const { orederdID } = router.query
    const shop_id = Cookies.get('shop_id')
    const headers = { "shop-id": shop_id }

    const orderInfoDetails = () => {
        axios.get(`${process.env.API_URL}v1/customer/order/${orederdID}/details`, { 'headers': { "shop-id": shop_id, } })
        .then((res)=>{
            // if(res.data.data !==null){
            //     setOrderDetails(res.data.data)
            // }
            setOrderDetails(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        orderInfoDetails()
    }, [orederdID, shop_id])
    // console.log("orderDetails", orderDetails)
    const totalPrice = orderDetails?.order_details?.reduce((acc, item) => acc + item.product.price*item.product_qty, 0);
    console.log("orderDetails" ,orderDetails)
    // console.log("orderDetails" ,orderDetails?.order_details[0]?.product_qty)
    return (

        <>


            {/* <section className='ThankYou'>

                <Container>

                    <Row className="justify-content-md-center">

                        <Col lg={6}>

                            <div className="ThankYouBanner header text-center">
                                <h4>Thank You.</h4>
                                <h4>Your order has been received.</h4>
                            </div>

                        </Col>

                    </Row>

                </Container>

                <div className="svg">
                </div>

            </section>

            <section className='OrderTitle'>

                <Container>

                    <Row className="justify-content-md-center">

                        <Col lg={6}>

                        </Col>

                    </Row>

                    <Row className="justify-content-md-center">

                        <Col lg={10}>

                            <div className="OrderTitleContent text-center">

                                <ul>


                                    <li>
                                        <p>Order number:</p>
                                        <h5>{orderDetails?.order_no}</h5>
                                    </li>

                                    <li>
                                        <p>Date:</p>
                                        <h5> {moment(orderDetails?.created_at).format("DD/MM/YYYY")}</h5>
                                    </li>

                                    <li>
                                        <p>Total:</p>
                                        <h5>৳ {totalPrice}</h5>

                                    </li>

                                    <li>
                                        <p>Payment method:</p>
                                        <h5>Cash on delivery</h5>
                                    </li>

                                </ul>

                            </div>

                        </Col>

                    </Row>

                    <div className="OrderDetail">

                        <Row className="justify-content-md-center">

                            <Col lg={10}>

                                <div className="OrderDetailContent">

                                    <h5>Order details</h5>

                                    <div className="OrderDetailContentPart">

                                        <div className="OrderDetailContentItem d_flex">

                                            <h4>Product</h4>
                                            <h4>Total</h4>

                                        </div>

                                        <div className="OrderDetailContentItem d_flex">
                                            <h6>Product Name</h6>
                                           <div>

                                            {
                                                orderDetails?.order_details?.map((item, index)=>{
                                                    return(
                                                        <h5>{item?.product?.product_name}</h5>
                                                    )
                                                })
                                            }
                                           </div>
                                        </div>

                                        <div className="OrderDetailContentItem d_flex">

                                            <h6>Subtotal:</h6>
                                            <h6>৳ {totalPrice}</h6>

                                        </div>

                                        <div className="OrderDetailContentItem d_flex">

                                            <h6>Payment method:	</h6>
                                            <h6>Cash on delivery</h6>

                                        </div>

                                        <div className="OrderDetailContentItem d_flex">

                                            <h6>Total:</h6>
                                            <h6>৳ {totalPrice}</h6>

                                        </div>

                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </div>




                </Container>

            </section> */}

            <section className='SuccessFullPage'>

                <Container>

                    <Row className="justify-content-md-center">

                        <Col lg={12}>

                           <div className="Header">
                                <h2>Thank You For Purchasing</h2>
                                <p>Thank you. Your order has been received.</p>
                           </div>

                            <div className="SuccessFullPageContent">

                                <div className="TitlePart">

                                    <ul>

                                        <li>  <h5>- Order number:</h5> <span>{orderDetails?.order_no}</span> </li>
                                        <li>  <h5>- Date:</h5> <span>{moment(orderDetails?.created_at).format("DD/MM/YYYY")}</span> </li>
                                        <li>  <h5>- Payment method:</h5> <span>Cash on delivery</span> </li>
                                        <li>  <h5>- Total:</h5> <span>{orderDetails?.grand_total +orderDetails?.shipping_cost}</span> </li>

                                    </ul>

                                </div>

                                {/* Order details */}
                                <div className="OrderDetail">

                                    <h3>Order Details</h3>

                                    <table className='Table striped bordered' responsive>

                                        <thead>
                                            <th>Product</th>
                                            <th>Subtotal</th>
                                        </thead>

                                        <tbody>

                                            <tr>
                                                <td>
                                                    <img src="/images/product image.png" alt="" />
                                                  
                                                    {
                                                orderDetails?.order_details?.map((item, index)=>{
                                                    return(
                                                        <span>{item?.product?.product_name}</span>
                                                    )
                                                })
                                            }
                                                    
                                                </td>

                                                <td>
                                                    <div className='d_flex'>
                                                        <h6>x 1</h6>{orderDetails?.grand_total}
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Shipping Cost</td>
                                                <td>{orderDetails?.shipping_cost}</td>
                                            </tr>

                                            <tr>
                                                <td> <h4>Subtotal</h4> </td>
                                                <td>৳ {totalPrice}</td>
                                            </tr>

                                            <tr>
                                                <td> <h4>Payment Method</h4> </td>
                                                <td><p>Cash on delivery</p></td>
                                            </tr>

                                            <tr>
                                                <td> <h4>Total</h4> </td>
                                                <td> <h4>{totalPrice + orderDetails?.shipping_cost}</h4> </td>
                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                                
                            </div>

                        </Col>

                    </Row>

                </Container>

            </section>


        </>

    );

};

export default OrderSuccessfull;
