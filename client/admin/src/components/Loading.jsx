import "./Loading.css";

const Loading = () => {
  return (
    <section>
      <h3>Loading...</h3>
      <div className="loading-container">
        <div className="progress">
          <div className="color"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
