import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { platformTvKeysMeth } from "../../constants/tvKey";
import { ROUTES } from "../../constants/routeConstant";

const SplashPage: React.FC<any> = (props) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    btnRef.current && btnRef.current!.focus();
  }, []);

  const buttonClick = (event: any) => {
    navigate(ROUTES.HOME);
  };

  const getStartedHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();

    const element = e.target as HTMLElement;
    switch (e.keyCode) {
      case keys.KEY_ENTER:
        buttonClick(e);
        break;

      default:
    }
  };

  const onFocus = (event: any) => {
    event.preventDefault();
    let currentElement = event.target;
    if (currentElement) {
      [...currentElement.parentElement.children].forEach((el) =>
        el.classList.remove("focus")
      );
      currentElement?.classList.add("focus");
    }
  };

  return (
    <div className="splash-page">
      <div className="background-shapes">
        <div className="left-circle"></div>
        <div className="right-circle"></div>
        <div className="bottom-triangle"></div>
        <div className="upper-triangle"></div>
      </div>
      <div className="content">
        <h1 className="headline">Discover the Magic</h1>
        <p className="subtext">of Video</p>
        <div
          className="get-started-button"
          tabIndex={0}
          ref={btnRef}
          onClick={(e: any) => buttonClick(e)}
          onFocus={(e: any) => onFocus(e)}
          onKeyDown={(e: any) => getStartedHandler(e)}
        >
          <span className="text-get-started">Get Started</span>
        </div>

        <img
          className="videoplayer-icon"
          src="https://cdn-icons-png.flaticon.com/512/6188/6188818.png?ga=GA1.1.905303271.1691248398"
          alt="videoplayer-icon"
        />
      </div>
    </div>
  );
};

export default SplashPage;
