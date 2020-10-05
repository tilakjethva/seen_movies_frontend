
import React from "react";
// reactstrap components
import {
    Card,
    CardImg,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import {Link} from "react-router-dom";

class MovieList extends React.Component {
    state = {
        error: null,
        isLoaded: true,
        items: []
    };
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

        // console.log(localStorage.getItem('user'))

        //  API to get movie list
        fetch("http://localhost:3000/movies")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    console.log(result.items);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                    isLoaded: true,
                    error
                    });
                }
            )
    }

    render()
     {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    <DemoNavbar/>
                    <main ref="main">
                        <div className="position-relative">
                            {/* shape Hero */}
                            <section className="section section-lg section-shaped pb-250">
                                <div className="shape shape-style-1 shape-default">
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                </div>
                                <Container className="py-lg-md d-flex">
                                    <div className="col px-0">
                                        <Row>
                                            <Col lg="6">
                                                <h1 className="display-3 text-white">
                                                    All Movies
                                                </h1>
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                                {/* SVG separator */}
                                <div className="separator separator-bottom separator-skew">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="none"
                                        version="1.1"
                                        viewBox="0 0 2560 100"
                                        x="0"
                                        y="0"
                                    >
                                        <polygon
                                            className="fill-white"
                                            points="2560 0 2560 100 0 100"
                                        />
                                    </svg>
                                </div>
                            </section>
                            {/* 1st Hero Variation */}
                        </div>
                        <section className="section section-lg pt-lg-0 mt--200">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg="12">
                                        <Row className="row-grid">
                                            {items.map(item => (
                                                <Col md="4">
                                                    <Card className="card-lift--hover bg-default shadow border-0 mt-5">
                                                        <div className="rating">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                                 data-icon="star"
                                                                 className="svg-inline--fa fa-star fa-w-18 sc-jzJRlG rating-star"
                                                                 role="img" xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 576 512">
                                                                <path fill="currentColor"
                                                                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288
                                                                    439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                                                            </svg>
                                                            "4.5"
                                                            {/* {item.rating} */}
                                                        </div>
                                                        <Link className="display-3 font-weight-bold text-white"
                                                              to={`movie-detail/${item._id}`}
                                                        >
                                                            <CardImg
                                                                alt="..."
                                                                src={item.img}
                                                                top
                                                            />
                                                        </Link>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </main>
                </>
            );
        }
    }
}

export default MovieList;
