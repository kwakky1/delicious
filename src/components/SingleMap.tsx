import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface mapProps {
  address: string;
  code: string;
}

const SingleMap = (props: mapProps) => {
  const { address } = props;
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            37.54539986598497,
            126.95249620249871
          ), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          `${address}`,
          function (result: { x: number; y: number }[], status: string) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              marker.setMap(map);
            }
          }
        );
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <>
      <div id={"map"} style={{ width: "100%", height: 300 }} />
    </>
  );
};

export default SingleMap;
