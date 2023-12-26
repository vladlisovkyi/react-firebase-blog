import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import CarouselWidget from "../../utils/carousel";
import { fetchPosts } from "../../store/actions";
import Masonry from "react-masonry-css";
import { Container, Card } from "react-bootstrap";

const Home = ({ dispatch, reviews }) => {
  useEffect(() => {
    dispatch(fetchPosts(6, null));
  }, [dispatch]);

  const renderFeaturesPosts = () =>
    reviews.posts
      ? reviews.posts.map((item, i) => (
          <Card key={i}>
            <Card.Header>
              Created at{" "}
              {moment.unix(item.createdAt.seconds).format("MM/DD/YYYY")}
            </Card.Header>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.excerpt}</Card.Text>
              <Link to={`/reviews/${item.id}`}>Read more</Link>
            </Card.Body>
          </Card>
        ))
      : null;

  return (
    <>
      <CarouselWidget />
      <Container>
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderFeaturesPosts()}
        </Masonry>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default connect(mapStateToProps)(Home);
