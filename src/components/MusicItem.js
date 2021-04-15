import { Fragment } from "react";
import { Col } from "react-bootstrap";

const MusicItem = ({
  category,
  image,
  feedType,
  name,
  artist,
  price,
  releasedDate,
}) => {
  return (
    <Fragment>
      <Col lg={4} md={4} sm={6} xl={3} className="my-4 col-name">
        <div className="feed-name p-4">
          <div>
            <p className="feedType-category">
              <span>Category: </span>
              <span>{category}</span>
            </p>
          </div>
          <div className="image-div">
            <img className="feedType-image" src={image} alt="Album cover" />
          </div>
          <div className="">
            <div className="mt-2">
              <span className="font-weight-bold">
                {feedType === "topalbums" ? `Album Name:` : `Song Name:`}{" "}
              </span>
              {name}
            </div>
            <div>
              <span className="font-weight-bold">Artist: </span>
              {artist}
            </div>
            <div>
              <span className="font-weight-bold">Price: </span>
              {price}
            </div>
            <div>
              <span className="font-weight-bold">Released Date: </span>
              {releasedDate}
            </div>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

export default MusicItem;
