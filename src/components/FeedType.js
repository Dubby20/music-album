const FeedType = ({ handleFeedType }) => {
  return (
    <div>
      <div className="feedtype-dropdown-container">
        <span>Show: </span>
        <select
          className="feedtype-dropdown cursor-pointer"
          onChange={handleFeedType}
        >
          <option value="topalbums">Top Albums</option>
          <option value="topsongs">Top Songs</option>
        </select>
      </div>
    </div>
  );
};

export default FeedType;
