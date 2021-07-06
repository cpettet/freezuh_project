import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import style from "./RackZoom.module.css";
import { getRacks } from "../../store/rack";

function RackZoom() {
  const { rackId } = useParams();
  const dispatch = useDispatch();
  const rack = useSelector((state) => state.racks.byId[rackId]);
  const numRows = 5;
  const numCols = 5;

  useEffect(() => {
    dispatch(getRacks());
  }, [dispatch]);

  return (
    <div>
      <Link to="/racks">Return to all racks</Link>
      <div class={style.rack}>
        <div class={style["rack__top-handles"]}>
          <div
            class={`${style.handle} ${style.handle__top} ${style.handle__1}`}
          ></div>
          <div
            class={`${style.handle} ${style.handle__top} ${style.handle__2}`}
          ></div>
          <div
            class={`${style.handle} ${style.handle__top} ${style.handle__3}`}
          ></div>
          <div
            class={`${style.handle} ${style.handle__top} ${style.handle__4}`}
          ></div>
          <div
            class={`${style.handle} ${style.handle__top} ${style.handle__5}`}
          ></div>
        </div>
        <div class={style.rack__main}>
          <div class={`${style.handle} ${style.handle__left}`}></div>
          <div class={`${style.column} ${style.column__1}`}>
            <div class={`${style.item} ${style.filled}`}></div>
            <div class={`${style.item} ${style.filled}`}></div>
            <div class={`${style.item} ${style.empty}`}></div>
            <div class={`${style.item} ${style.empty}`}></div>
            <div class={`${style.item} ${style.empty}`}></div>
          </div>
          <div class={`${style.column} ${style.column__2}`}></div>
          <div class={`${style.column} ${style.column__3}`}></div>
          <div class={`${style.column} ${style.column__4}`}></div>
          <div class={`${style.column} ${style.column__5}`}></div>
          <div class={`${style.handle} ${style.handle__right}`}></div>
        </div>
      </div>
    </div>
  );
}

export default RackZoom;
