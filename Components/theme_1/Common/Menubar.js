import Image from "next/image";
import Link from "next/link";
import { Col, Container, Dropdown, Row, Form } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useContext, useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import Context from "../../Context";
import { baseUrl } from "../../../constant/constant";

const Menubar = ({ menu1, menu2, menu3, menu4, fontSize, save }) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected.size > 0,
    hasDraggedNode: state.events.dragged.size > 0,
  }));
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: true,
  }));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const contextValue = useContext(Context);
  const [subdomain, setSubdomain] = useState("")
  useEffect(() => {
    const subdomain = /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.');
    setSubdomain(subdomain)
  }, [])

  let editActive = false;
  if (contextValue !== undefined) {
    editActive = contextValue.value;
    useEffect(() => {
      if (contextValue.value1 === true) {
        const serialize = query.serialize();
        save(serialize);
      }
    }, [contextValue.value1]);
  }

  //category list
  const [categories, setCategories] = useState([]);
  const [shopName, setShopName] = useState();


  async function handleFetchCategories(headers) {

    // ${process.env.API_URL}v1/customer/categories
    const response = await fetch(`${process.env.API_URL}v1/customer/categories`, {
      headers: headers,
    });
    const data = await response.json();

    if (data.success === true) {
      setCategories(data?.data);
    }
  }

  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem("shop_id"),
    };
    handleFetchCategories(headers)
    setShopName(localStorage.getItem('shop_name'));
    // .then((r) => console.log("r", r));
  }, []);

  console.log("subdomain", subdomain)
  return (
    <section className='Menubar'>
      <Container>
        <div className='DesktopMenu'>
          <Row className='d_flex'>
            {/* left  */}
            <Col xs={3}>
              <div className='MenubarLeftLogo'>
                <Dropdown>
                  <Dropdown.Toggle id='dropdown-basic'>
                    <BiCategory /> Browse Categories <BsChevronDown />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {categories?.map((item, index) => {
                      return (
                        <Dropdown.Item key={index} href='#/action-1'>{item.name}</Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>

            <Col xs={6}>
              <div className='MenubarMiddle'>
                <ul>
                  <li>
                    {editActive === false && (
                      <Link
                        //  href={`/${subdomain.length <= 1 ? shopName : ''}`}
                        href={`/${shopName}`}
                        className='active'>
                        Home
                      </Link>
                    )}
                    {editActive === true && (
                      <>
                        <ContentEditable
                          html={menu1}
                          onChange={(e) =>
                            setProp(
                              (props) =>
                              (props.menu1 = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                            )
                          }
                          tagName='a'
                          style={{ fontSize: `${fontSize}px` }}
                        />
                        {/* <Form.Control>
													<Form.Label>Range</Form.Label>
													<Form.Range />
												</Form.Control> */}
                      </>
                    )}
                  </li>

                  <li>
                    {editActive === false && (
                      <Link
                        //  href={`/${subdomain.length <= 1 ? shopName : ''}/shop`}
                        href={`/${shopName}/shop`}
                      > Shop </Link>
                    )}

                    {editActive === true && (
                      <>
                        <ContentEditable
                          html={menu2}
                          onChange={(e) =>
                            setProp(
                              (props) =>
                              (props.menu2 = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                            )
                          }
                          tagName='a'
                          style={{ fontSize: `${fontSize}px` }}
                        />
                      </>
                    )}
                  </li>

                  <li>
                    {editActive === false && <Link
                      // href={`/${subdomain.length <= 1 ? shopName : ''}/about-us`}
                      href={`/${shopName}/about-us`}
                    > About Us </Link>}

                    {editActive === true && (
                      <ContentEditable
                        html={menu3}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                            (props.menu3 = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                          )
                        }
                        tagName='a'
                        style={{ fontSize: `${fontSize}px` }}
                      />
                    )}
                  </li>

                  {/* <li>
                    {editActive === false && <Link href=''> Contact Us </Link>}

                    {editActive === true && (
                      <ContentEditable
                        html={menu4}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                            (props.menu4 = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                          )
                        }
                        tagName='a'
                        style={{ fontSize: `${fontSize}px` }}
                      />
                    )}
                  </li> */}
                </ul>
                {editActive === true && (
                  <Form.Range
                    min={1}
                    defaultvalue={fontSize}
                    max={50}
                    onChange={(e) => {
                      setProp((props) => (props.fontSize = e.target.value));
                    }}
                  />
                )}
              </div>
            </Col>

            <Col xs={3}>
              <div className='SocailIcon'>
                <Link href=''>
                  <FaFacebookF />
                </Link>
                <Link href=''>
                  <FaYoutube />
                </Link>
                <Link href=''>
                  <FaInstagram />
                </Link>
                <Link href=''>
                  <FaTwitter />
                </Link>
              </div>
            </Col>
          </Row>
        </div>

        {/* MobileMenu */}
        <div className='MobileMenu'>
          <Row>
            <Col xs={4}>
              <div className='MenubarLeftLogo'>
                <Dropdown>
                  <Dropdown.Toggle id='dropdown-basic'>
                    <BiCategory /> Browse Categories <BsChevronDown />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>

                    <Dropdown.Item href='#/action-2'>
                      Another action
                    </Dropdown.Item>

                    <Dropdown.Item href='#/action-3'>
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>

            <Col xs={8}>
              <div className='MobileMenuItem'>
                <Button onClick={handleShow}>
                  <AiOutlineBars />
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                    <div className='MenubarMiddle'>
                      <ul>
                        <li>
                          <Link
                            href={`/${shopName}`}
                          > Home </Link>
                        </li>

                        <li>
                        <Link
                            href={`/${shopName}/shop`}
                          > Shop </Link>
                        </li>

                        <li>
                        <Link
                            href={`/${shopName}/about-us`}
                          > About us </Link>
                        </li>

                        {/* <li>
                          <Link href=''> Contact Us </Link>
                        </li> */}
                      </ul>

                      <div className='SocailIcon'>
                        <Link href=''>
                          <FaFacebookF />
                        </Link>
                        <Link href=''>
                          <FaYoutube />
                        </Link>
                        <Link href=''>
                          <FaInstagram />
                        </Link>
                        <Link href=''>
                          <FaTwitter />
                        </Link>
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Menubar;
