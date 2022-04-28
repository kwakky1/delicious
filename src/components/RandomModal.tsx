import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { RestaurantType } from "../../pages/api/restaurant/fetch";
import { RandomReveal } from "react-random-reveal";

interface RandomModalProps {
  restaurantList?: RestaurantType[];
  modal: boolean;
  setModal: (value: boolean) => void;
}

const RandomModal = ({ restaurantList, modal, setModal }: RandomModalProps) => {
  const handleClose = () => {
    setModal(false);
  };
  const storeNameList = restaurantList?.map((store) => store.name);
  return (
    <Dialog open={modal} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>뭐가나올까요?</DialogTitle>
      <DialogContent>
        <RandomReveal
          characterSet={storeNameList}
          characters={[" "]}
          duration={5}
          isPlaying
        />
      </DialogContent>
    </Dialog>
  );
};

export default RandomModal;
