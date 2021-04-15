import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import FeedType from "./FeedType";
import SearchBar from "./SearchBar";
import MusicItem from "./MusicItem";
import loader from "../assets/images/loader.gif";

const Music = () => {
  const [albums, setAlbums] = useState(null);
  const [feedType, setFeedType] = useState("topalbums");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchAlbum = async () => {
    try {
      setErrorMessage(false);
      setIsLoading(true);

      const result = await axios.get(
        `https://itunes.apple.com/us/rss/${feedType}/limit=100/json`
      );
      setAlbums(result.data.feed);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(true);
      setIsLoading(false);
    }
  };

  const handleFeedType = (event) => {
    const {
      target: { value },
    } = event;
    setFeedType(value);
  };

  const data = useMemo(() => {
    if (!searchInput) {
      return albums?.entry;
    } else {
      return albums?.entry?.filter?.(
        (item) =>
          item["im:name"].label
            .toLowerCase()
            .includes(searchInput.trim().toLowerCase()) ||
          item["im:artist"].label
            .toLowerCase()
            .includes(searchInput.trim().toLowerCase()) ||
          item.category.attributes.label
            .toLowerCase()
            .includes(searchInput.trim().toLowerCase())
      );
    }
  }, [searchInput, albums]);

  useEffect(() => {
    fetchAlbum();
  }, [feedType]);

  return (
    <div>
      <Container fluid>
        <Row className="my-4">
          <Col md={6}>
            <FeedType handleFeedType={handleFeedType} />
          </Col>
          <Col md={6}>
            <SearchBar
              onSearch={setSearchInput}
              searchInput={searchInput}
              placeholder={
                feedType === "topalbums"
                  ? `Search for album`
                  : `Search for song`
              }
            />
          </Col>
        </Row>

        <div>
          <h2>{albums?.title?.label}</h2>
        </div>

        {isLoading && !errorMessage ? (
          <div className="my-5 d-flex justify-content-center">
            <img src={loader} alt="loader" />
          </div>
        ) : errorMessage ? (
          <div className="">Something went wrong</div>
        ) : (
          <Row>
            {data?.map((item) => (
              <MusicItem
                key={item.id.label}
                category={item.category.attributes.label}
                image={item["im:image"][2].label}
                feedType={feedType}
                name={item["im:name"].label}
                artist={item["im:artist"].label}
                price={item["im:price"].label}
                releasedDate={item["im:releaseDate"]?.attributes?.label}
              />
            ))}
          </Row>
        )}
        {!isLoading && data?.length === 0 && (
          <h2 className="d-flex justify-content-center align-items-center m-5">
            {feedType === "topalbums" ? `No Album Found` : `No Song Found`}
          </h2>
        )}
      </Container>
    </div>
  );
};

export default Music;
