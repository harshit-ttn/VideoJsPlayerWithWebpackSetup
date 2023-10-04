import React, { useEffect, useRef } from "react";
import "./index.scss";
import WidgetBlock from "../../components/WidgetBlock";

const contentList = [
  {
    heading: "DRM Contents",
    bgUrl:
      "https://i.pinimg.com/736x/61/45/51/6145514f3ca2de85d5a136413b6385f5.jpg",
  },
  {
    heading: "NON-DRM Contents",
    bgUrl:
      "https://i.pinimg.com/736x/53/e9/a0/53e9a0e84f1cfb7c93abb4119efe66e7.jpg",
  },
  {
    heading: "LIVE Contents",
    bgUrl:
      "https://i.pinimg.com/originals/4a/a8/7f/4aa87fb76e0355db7654985cde9677e8.jpg",
  },
];

const HomePage: React.FC<any> = (props) => {
  return (
    <div className="home-page">
      <div className="background-shapes">
        <div className="left-circle"></div>
        <div className="right-circle"></div>
        <div className="bottom-triangle"></div>
        <div className="upper-triangle"></div>

        <h1 className="content-title">Choose Your Favourite Content 😎</h1>

        <div className="widget-block-containers">
          {contentList?.map((item: any, index: number) => {
            return <WidgetBlock key={index} index={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
