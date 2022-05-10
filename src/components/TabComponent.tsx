import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from "./TabPanel";
import MenuSwiper from "./MenuSwiper";
import SingleMap from "./SingleMap";
import { RestaurantType } from "../../pages/api/restaurant/fetch";

interface TabComponentProps {
  restaurant: RestaurantType;
}

const TabComponent = ({ restaurant }: TabComponentProps) => {
  const { img, review } = restaurant;
  const [value, setValue] = React.useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabPanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="리 뷰" {...a11yProps(0)} />
          <Tab label="지 도" {...a11yProps(1)} />
          <Tab label="메 뉴" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box>
          <Typography>{review ? review : "리뷰가 없습니다."}</Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SingleMap restaurant={restaurant} code={"kakao_map"} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MenuSwiper img={img} />
      </TabPanel>
    </Box>
  );
};

export default TabComponent;
