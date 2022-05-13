import React, { useEffect } from "react";
import { RestaurantType } from "../../pages/api/restaurant/fetch";
import { useRouter } from "next/router";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";

interface TotalMapProps {
  restaurantList: RestaurantType[] | undefined;
}

const TotalMap = ({ restaurantList }: TotalMapProps) => {
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const breezmPosition = {
    lat: 37.54539986598497,
    lng: 126.95249620249871,
  };
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
            breezmPosition.lat,
            breezmPosition.lng
          ), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();

        restaurantList?.forEach((store) => {
          geocoder.addressSearch(
            `${store.address}`,
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

                window.kakao.maps.event.addListener(
                  marker,
                  "click",
                  function () {
                    router.push({
                      pathname: "/restaurant/[id]",
                      query: { id: store.id },
                    });
                  }
                );

                marker.setMap(map);
              }
            }
          );
        });
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [breezmPosition.lat, breezmPosition.lng, restaurantList, router]);
  return (
    <>
      <div
        id={"map"}
        style={{ width: "100%", height: matches ? "65vh" : "50vh" }}
      />
    </>
  );
};

export default TotalMap;
