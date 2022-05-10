import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import kakaoMap from "../../public/kakaomap.png";
import naverMap from "../../public/navermap.png";
import { RestaurantType } from "../../pages/api/restaurant/fetch";

declare global {
  interface Window {
    kakao: any;
  }
}

interface mapProps {
  restaurant: RestaurantType;
  code: string;
}

interface positionType {
  lat: number;
  lng: number;
}

const SingleMap = (props: mapProps) => {
  const {
    restaurant: { name, address },
  } = props;

  const [position, setPosition] = useState<positionType>({ lat: 0, lng: 0 });

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
              setPosition({ lat: result[0].y, lng: result[0].x });

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
  }, [address]);

  const handleGuide = (e: React.MouseEvent<HTMLImageElement>, name: string) => {
    switch (name) {
      case "kakaoMap":
        window.location.href = `https://map.kakao.com/link/to/${props.restaurant.name},${position.lat},${position.lat}`;
        break;
      case "naverMap":
        window.location.href = `http://app.map.naver.com/launchApp/?version=11&menu=walk&elat=${position.lat}&elng=${position.lng}&etitle=${props.restaurant.name}`;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div id={"map"} style={{ width: "100%", height: 300 }} />
      <Box sx={{ display: "flex", justifyContent: "space-around", pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image
              width={50}
              height={50}
              src={kakaoMap}
              alt="kakaoMap"
              onClick={(e) => handleGuide(e, "kakaoMap")}
            />
          </Box>
          <Typography pt={1}>카카오지도</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image
              width={50}
              height={50}
              src={naverMap}
              alt="naverMap"
              onClick={(e) => handleGuide(e, "naverMap")}
            />
          </Box>
          <Typography pt={1}>네이버지도</Typography>
        </Box>
      </Box>
    </>
  );
};

export default SingleMap;
