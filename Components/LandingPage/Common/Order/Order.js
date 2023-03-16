import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RiShoppingCart2Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import swal from 'sweetalert';

// Css
import style from './order.module.css';

const Order = ({ product }) => {
 
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isCheckedInSideDhaka, setIsCheckedInSideDhaka] = useState(true);
  const [isCheckedInOutSideDhaka, setIsCheckedInOutSideDhaka] = useState(false);
  const [shippingCost, setShippingCost] = useState()
  const [shopID, setShopID] = useState();
  const shop_name = router.query.shopName;
  useEffect(()=>{
    setShippingCost(product?.inside_dhaka)
    setShopID(localStorage.getItem("shop_id"));
  }, [product])
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
 
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
        swal({
          title: "Sorry",
          text: "Something went wrong",
          icon: "warning",
        });
      });
  };

  const subtotal = quantity * product?.price + parseInt(shippingCost)
  
  return (

    <>

      <section className={style.OrderConfirmFrom}>

        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <h2>তাই আর দেরি না করে আজই অর্ডার করুন </h2>

              {/* left */}
              <Col lg={7}>

                <div className={style.OrderConfirmLeft}>

                  <h3>Billing details</h3>

                  <div className={style.CustomeInput}>
                    <input type="text"
                      {...register("customerName", { required: true })}
                      placeholder='আপনার নাম লিখুন *' />
                    {errors.customerName && (
                      <span style={{ color: "red" }}>Enter Your Full name</span>
                    )}
                  </div>

                  <div className={style.CustomeInput}>
                    <input type="text"
                      {...register(
                        "customerMobile",
                        { required: true },
                        { min: 11, max: 15 }
                      )}
                      placeholder='আপনার মোবাইল নাম্বার লিখুন *' />
                    {errors.customerMobile && (
                      <span style={{ color: "red" }}>
                       Please Enter your valid phone number
                      </span>
                    )}
                  </div>

                  <div className={style.CustomeInput}>
                    <input
                      {...register("customerAddress", { required: true })}
                      type="text" placeholder='আপনার সম্পূর্ণ ঠিকানা লিখুন *' />
                    {errors.customerAddress && (
                      <span style={{ color: "red" }}>Please Enter your valid Address</span>
                    )}
                  </div>

                  {/* Payment */}
                  <div className={style.Payment}>


                    <h3>Payment</h3>

                    <div className={`${style.CustomeInput} ${style.d_flex}`}>

                      <input type="checkbox" checked name="" id='CashOn' />
                      <label htmlFor="CashOn">ক্যাশ অন ডেলিভারি</label>

                    </div>

                    <div className={style.ArrowBg}>
                      <p>Pay with cash on delivery.</p>
                    </div>

                  </div>

                </div>

              </Col>
              {/* right */}

              <Col lg={5}>

                <div className={style.OrderConfirmRight}>

                  <h3>Your order</h3>

                  <ul>

                    <li>
                      <h4>Product</h4>
                      <h5>Subtotal</h5>
                    </li>

                    <li>

                      <div className={`${style.left} ${style.d_flex}`}>

                        <div className={style.img}>
                          <img src={product?.main_image?.name} alt="Product Image" />
                        </div>

                        <p>{product?.product_name}</p>

                      </div>

                      <div className={`${style.right} ${style.d_flex}`}>

                        <input
                          onChange={handleQuantityChange} mn
                          defaultValue={1}
                          min={1}
                          type="number" />

                        <h5>BDT {product?.price}.00</h5>

                      </div>

                    </li>

                    <li>
                      <h5>Subtotal</h5>
                      <h5>{quantity * product?.price}.00</h5>
                    </li>

                    <li>
                      <h5>Shipping</h5>

                      <h5>
                     
                        <div> <input type='checkbox' value={product?.inside_dhaka} onChange={handleChange}  id="insideDhaka" checked={isCheckedInSideDhaka} /> Inside Dhaka ৳ <span style={{ fontWeight: "bold" }}>{product?.inside_dhaka}</span></div>
                        <div> <input type='checkbox' value={product?.outside_dhaka} onChange={handleChange}  id="outSideDhaka" checked={isCheckedInOutSideDhaka} /> Outside Dhaka ৳ <span style={{ fontWeight: "bold" }}>{product?.outside_dhaka}</span></div>

                       
                      </h5>

                    </li>

                    <li>
                      <h4>Total</h4>
                      <h4>{subtotal}.00</h4>
                    </li>

                  </ul>

                  <button type="submit"> <RiShoppingCart2Line /> Place Order BDT {subtotal}.00</button>

                </div>

              </Col>

            </Row>
          </form>
        </Container>

      </section>
    </>
  )
}

export default Order

