import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import DaumPostcode, { Address } from "react-daum-postcode";
import { useRecoilState } from "recoil";
import openAddressState from "../atom/openAddressState";

interface KakaoPostProps {
  setValue: (field: string, value: string) => void;
}

function KakaoPost(props: KakaoPostProps) {
  const { setValue } = props;

  const [open, setOpen] = useRecoilState(openAddressState);
  const handleComplete = (data: Address) => {
    const { address } = data;
    const postcode = String(data.zonecode);

    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }
    setValue("address", address);
    setValue("extraAddress", extraAddress);
    setValue("postcode", postcode);
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <DialogTitle>주소검색</DialogTitle>
      <DialogContent>
        <DaumPostcode onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}

export default KakaoPost;
