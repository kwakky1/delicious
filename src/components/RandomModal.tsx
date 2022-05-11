import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { RestaurantType } from "../../pages/api/restaurant/fetch";
import { RandomReveal } from "react-random-reveal";
import { useRouter } from "next/router";

interface RandomModalProps {
  restaurantList?: RestaurantType[];
  modal: boolean;
  setModal: (value: boolean) => void;
}

const RandomModal = ({ restaurantList, modal, setModal }: RandomModalProps) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [result, setResult] = useState<RestaurantType | null>(null);
  const randomValue = useRef(null);
  const handleClose = () => {
    setModal(false);
    setIsPlaying(true);
  };

  const storeNameList = restaurantList?.map((store) => store.name);

  useEffect(() => {
    if (!isPlaying) {
      const selectedStore = restaurantList?.filter(
        (store) => store.name === randomValue.current?.["innerText"]
      ) as RestaurantType[];
      setResult(selectedStore[0]);
    }
  }, [isPlaying, restaurantList]);

  const handleDetail = () => {
    if (result && !isPlaying) {
      router.push({
        pathname: "/restaurant/[id]",
        query: { id: result.id },
      });
    } else {
      alert("랜덤뽑기를 완료해주세요!");
    }
  };

  return (
    <>
      <Dialog open={modal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          오늘의 추천 메뉴는?
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                ref={randomValue}
                color={"blueviolet"}
                textAlign={"center"}
                sx={{ fontSize: 30, fontFamily: "bold" }}
              >
                <RandomReveal
                  characterSet={storeNameList}
                  characters={" "}
                  duration={Infinity}
                  isPlaying={isPlaying}
                />
                {/*{!isPlaying ? " 🎉" : ""}*/}
              </Typography>
              {!isPlaying && (
                <Typography sx={{ fontSize: 30, fontFamily: "bold" }}>
                  🎉
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              my={3}
            >
              <Button
                sx={{
                  borderRadius: 50,
                }}
                variant={"contained"}
                color={"error"}
                size={"large"}
                onClick={() => setIsPlaying(false)}
              >
                STOP
              </Button>
            </Box>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  onClick={() => setIsPlaying(true)}
                  style={{ backgroundColor: "#C4C4C4" }}
                  fullWidth
                >
                  메뉴 다!다시
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant={"contained"} fullWidth onClick={handleDetail}>
                  자세히보기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RandomModal;
