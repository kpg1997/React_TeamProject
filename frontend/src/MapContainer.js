// MapContainer.js

import React, { useEffect } from "react";
import styled from "styled-components";

// const KakaoMapPage = styled.div`
//   @media (min-width: 325px) {
//     #myMap {
//       margin: 0 auto 5px auto;
//       border-radius: 15px;
//       width: 280px;
//       height: 300px;
//     }
//   }
//   @media (min-width: 375px) {
//     #myMap {
//       margin: 0 auto 5px auto;
//       border-radius: 15px;
//       width: 280px;
//       height: 300px;
//     }
//   }
// `;

const { kakao } = window;
let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div
      id="myMap"
      // style={{
      //   zIndex:-3
      // }}
    ></div>
  );
};

export default MapContainer;
