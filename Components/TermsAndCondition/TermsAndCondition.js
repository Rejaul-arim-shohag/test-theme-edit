
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export default function TermsAndCondition({ shopData }) {
    return (
        <div className='ThemeOne'>
            <section className='AboutUs'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="AboutUsContent">
                                <h2>Terms & Conditions</h2>
                                <div>
                                    {
                                        shopData?.tos === null ? <>
                                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed enim error aliquid? Magni quos cupiditate voluptates nam libero omnis culpa eos ipsa inventore officia optio non totam ad sequi, dolore harum deserunt beatae delectus praesentium aliquam, asperiores exercitationem repellendus! Commodi sapiente saepe quos perspiciatis facilis, maxime accusantium fuga corrupti exercitationem mollitia facere, provident vero dicta eos odit quod sint pariatur!</p>
                                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed enim error aliquid? Magni quos cupiditate voluptates nam libero omnis culpa eos ipsa inventore officia optio non totam ad sequi, dolore harum deserunt beatae delectus praesentium aliquam, asperiores exercitationem repellendus! Commodi sapiente saepe quos perspiciatis facilis, maxime accusantium fuga corrupti exercitationem mollitia facere, provident vero dicta eos odit quod sint pariatur!</p>
                                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed enim error aliquid? Magni quos cupiditate voluptates nam libero omnis culpa eos ipsa inventore officia optio non totam ad sequi, dolore harum deserunt beatae delectus praesentium aliquam, asperiores exercitationem repellendus! Commodi sapiente saepe quos perspiciatis facilis, maxime accusantium fuga corrupti exercitationem mollitia facere, provident vero dicta eos odit quod sint pariatur!</p>
                                        </> : shopData?.tos
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}