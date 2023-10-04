import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { platformTvKeysMeth } from "../../constants/tvKey";
import { ROUTES } from "../../constants/routeConstant";
import { useDispatch } from "react-redux";
import { contentList } from "../../slices/home-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const WidgetBlock: React.FC<any> = (props) => {
  const { data } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [index, setIndex] = React.useState<any>(0);

  const listIndex = useSelector<RootState, any>(
    (state: any) => state.homePage.contentListIndex
  );

  useEffect(() => {
    if (listIndex) {
      setIndex(listIndex);
    } else {
      setIndex(0);
    }
  }, [listIndex]);

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
    dispatch(contentList(props?.index));
    navigate(ROUTES.LIST);
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
        dispatch(contentList(0));
        history.back();
        break;

      case keys.KEY_UP:
        if (!props?.fromDrm) {
          if (element?.classList?.contains("focus")) {
            element?.classList?.remove("focus");
          }
          const ele =
            element?.parentElement?.parentElement?.children?.[2].firstChild;

          if (ele) {
            ele && (ele as HTMLElement)?.focus();
          }
        }
        break;

      case keys.KEY_DOWN:
        if (props?.fromDrm) {
          if (element?.classList?.contains("focus")) {
            element?.classList?.remove("focus");
          }
          const ele =
            element?.parentElement?.parentElement?.children?.[4].firstChild;

          if (ele) {
            ele && (ele as HTMLElement)?.focus();
          }
        }
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
      className="widget-block"
      onKeyDown={(e: any) => handleKeyDown(e)}
      onClick={onClick}
      onFocus={(e: any) => onFocus(e)}
      tabIndex={0}
      {...attributes}
    >
      <img className="content-poster" src={data?.bgUrl} alt="Content-Poster" />

      <h1 className="content-heading">{data?.heading}</h1>
    </div>
  );
};

export default WidgetBlock;
