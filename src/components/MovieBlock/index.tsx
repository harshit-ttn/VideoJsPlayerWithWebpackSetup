import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { platformTvKeysMeth } from "../../constants/tvKey";
import { ROUTES } from "../../constants/routeConstant";
import { useDispatch } from "react-redux";
import {
  playBackUrl,
  playBackFormat,
  contentName,
  drmValues,
} from "../../slices/player-slice";
import { movieList } from "../../slices/home-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MovieBlock: React.FC<any> = (props) => {
  const { data } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [index, setIndex] = React.useState<any>(0);

  const movieBlockIndex = useSelector<RootState, any>(
    (state: any) => state.homePage.movieListIndex
  );

  useEffect(() => {
    if (movieBlockIndex) {
      setIndex(movieBlockIndex);
    } else {
      setIndex(0);
    }
  }, [movieBlockIndex]);

  const attributes: {
    ref: React.Ref<HTMLDivElement>;
  } = {
    ref: null,
  };
  if (props?.index === index) {
    attributes.ref = divRef;
  }

  useEffect(() => {
    divRef.current && divRef.current!.focus();
  }, [index]);

  const onClick = () => {
    dispatch(movieList(props?.index));
    dispatch(playBackUrl(data?.playback_url));
    dispatch(playBackFormat(data?.format));
    dispatch(contentName(data?.content_name));
    dispatch(drmValues(data?.drmKeyValues));
    navigate(ROUTES.PLAYER);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();

    const element = e.target as HTMLElement;
    switch (e.keyCode) {
      case keys.KEY_RETURN:
      case keys.KEY_BACK:
        dispatch(movieList(0));
        history.back();
        break;

      case keys.KEY_UP:
        if (element?.classList?.contains("focus")) {
          element?.classList?.remove("focus");
        }
        element?.parentElement?.children[props?.index - 6] &&
          (
            element?.parentElement?.children[props?.index - 6] as HTMLElement
          ).focus();

        break;

      case keys.KEY_DOWN:
        if (element?.classList?.contains("focus")) {
          element?.classList?.remove("focus");
        }
        element?.parentElement?.children[props?.index + 6] &&
          (
            element?.parentElement?.children[props?.index + 6] as HTMLElement
          ).focus();

        break;

      case keys.KEY_RIGHT:
        if (element?.classList?.contains("focus")) {
          element?.classList?.remove("focus");
        }
        element?.nextSibling && (element?.nextSibling as HTMLElement)?.focus();
        break;

      case keys.KEY_LEFT:
        if (element?.classList?.contains("focus")) {
          element?.classList?.remove("focus");
        }
        element?.previousSibling &&
          (element?.previousSibling as HTMLElement)?.focus();
        break;

      case keys.KEY_ENTER:
        onClick();
        break;

      default:
    }
  };

  return (
    <div
      key={props?.index}
      className="movie-block"
      onKeyDown={(e: any) => handleKeyDown(e)}
      onClick={onClick}
      onFocus={(e: any) => onFocus(e)}
      tabIndex={0}
      {...attributes}
    >
      <img className="poster" src={data?.poster_url} alt="Movie-Poster" />
      <div className="play-button">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4028/4028570.png"
          alt="Play Button"
        />
      </div>
    </div>
  );
};

export default MovieBlock;
