import React from "react";

// reactstrap components
import {
    Form,
    Button,
    Card,
    CardImg,
    FormGroup,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import StarRatings from 'react-star-ratings';
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections

class MovieDetail extends React.Component {
    state = {
        error: null,
        isLoaded: true,
        movie_id: this.props.match.params.id,
        item: {},
        my_review: {
            rating: 4.5,
            comment:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
        }
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        //  API to get movie detail
        // let x = "5f7a4b43f70b7938306eed8d"//"localStorage.getItem('movie_id')"
        // fetch('http://localhost:3000/movies/5f7a4b43f70b7938306eed8d', {
        //     // body: JSON.stringify(this.state),
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        // })
        fetch("http://localhost:3000/movies/5f7a4b43f70b7938306eed8d")
        .then(res => res.json())
        .then(
                (result) => {
                    console.log(result);
                    console.log(result.item);
                    this.setState({
                        isLoaded: true,
                        item: result
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

    handleRatingChange = event =>{
        this.setState({ my_review : {
                    ...this.state.my_review,
                    rating: event.target.value
                }
            }
        );
    }
    handleCommentChange = event =>{
        this.setState({ my_review : {
                    ...this.state.my_review,
                    comment: event.target.value
                }
            }
        );
    }

    //  API to save your review
    handleSubmit = (event) => {
        alert('A form was submitted: ' + this.state.my_review);
        console.log( this.state.my_review);
        fetch('https://your-node-server-here.com/api/endpoint', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(function(response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }


    render() {
        const {error, isLoaded, item , my_review} = this.state;
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
                            <section className="text-center">
                                <img src={item.img} height="300px"
                                     width="100%"
                                     alt="..."/>
                            </section>
                        </div>
                        <section className="section bg-secondary">
                            <Container>
                                <Row className="row-grid">
                                    <Col md="6">
                                        <Card className="bg-default shadow border-0">
                                            <CardImg
                                                alt="..."
                                                src={item.img}
                                                top
                                            />

                                        </Card>
                                    </Col>
                                    <Col md="6">
                                        <div className="pl-md-5">
                                            <h3>{item.title} </h3>
                                            <p className="lead">   {item.description}  </p>
                                            <hr/>
                                            <h4> Rating </h4>
                                            <p>
                                            <StarRatings
                                                rating={item.rating}
                                                starRatedColor="gold"
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="15px"
                                            /> </p>
                                            <div>
                                                <h4> DIRECTED BY </h4>
                                                <p> {item.movieDirector} </p>
                                            </div>
                                            <h4> WRITTEN BY </h4>
                                            <p> {item.written_by} </p>
                                            <h4> PRODUCED BY </h4>
                                            <p> {item.produce_by} </p>
                                            <h4> CAST </h4>
                                            <p>  {item.cast} </p>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md="8">
                                        <h2>User Reviews</h2>
                                        {/* {item.comments.map(cmt => (
                                            
                                            <row>
                                                <p>
                                                <StarRatings
                                                    rating={item.rating}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    starDimension="20px"
                                                    starSpacing="15px"
                                                /> </p>
                                                <p>{cmt.comment}</p>
                                                <hr/>
                                            </row>

                                        ))} */}
                                    </Col>
                                    <Col md="4">
                                        <Form onSubmit={this.handleSubmit}>
                                            <h2> Your Review </h2>
                                            <FormGroup>
                                                <Input
                                                    id="exampleFormControlInput1"
                                                    placeholder="4.2"
                                                    type="number"
                                                    step="0.1"
                                                    max="5"
                                                    min="0"
                                                    value={my_review.rating}
                                                    onChange={this.handleRatingChange}
                                                />
                                            </FormGroup>
                                            <Input
                                                id="exampleFormControlTextarea1"
                                                placeholder="Write your comment ..."
                                                rows="5"
                                                type="textarea"
                                                value={my_review.comment}
                                                onChange={this.handleCommentChange}
                                            />
                                            <Button
                                                className="my-4"
                                                color="primary"
                                                type="submit"
                                            >
                                               Submit
                                            </Button>
                                        </Form>
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

export default MovieDetail;
