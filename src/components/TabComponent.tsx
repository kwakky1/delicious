import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  Grid,
  Paper,
  Popper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TabPanel from "./TabPanel";
import MenuSwiper from "./MenuSwiper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { server } from "../config";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import AutoComplete from "./form/AutoComplete";

/*export const fetchUserList = async (): Promise<UserType[]> => {
  const res = await fetch(`${server}/api/fetchUsers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("FetchRestaurantList Network response not ok");
};*/

/*const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: RestaurantType) => updateRestaurant(data, "picker"),
    {
      onMutate: (data) => {
        queryClient.setQueryData(["restaurantList", { id: data.id }], data);
      },
    }
  );
};*/

const TabComponent = () => {
  /*const { data: userList }: UseQueryResult<UserType[], Error> = useQuery<
    UserType[],
    Error
  >("userList", fetchUserList);

  const { img, review, picker, id } = restaurant;
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabPanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddReview = () => {
    setModal(true);
  };

  const { mutate } = useUpdateRestaurant();

  const handleChipDelete = (picker: { id: string; label: string }) => {
    const copyRestaurant = restaurant;
    copyRestaurant.picker = copyRestaurant.picker.filter(
      (pick) => pick.id !== picker.id
    );
    updateRestaurant(copyRestaurant, "picker").then((res) => {
      mutate(res);
    });
  };

  const handleAddPicker = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };*/

  return (
    <>
      <Box sx={{ width: "100%" }}></Box>
      {/*<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          <Typography fontWeight={"bold"} fontSize={16}>
            이곳을 추천하는 브리즈머
          </Typography>
          <Box py={2}>
            <Grid container spacing={1}>
              {picker
                ? picker.map((pick, index) => (
                    <Grid item key={pick.id}>
                      <Chip
                        variant={"outlined"}
                        color={"primary"}
                        label={pick.label}
                        onDelete={() => handleChipDelete(pick)}
                      />
                    </Grid>
                  ))
                : null}
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleIcon
                  sx={{ cursor: "pointer" }}
                  color={"primary"}
                  onClick={(e) => handleAddPicker(e)}
                />
              </Grid>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <AutoComplete restaurant={restaurant} setOpen={setOpen} />
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Grid>
          </Box>
          <Divider light />
          <Box mt={2} sx={{ height: "40vh" }}>
            <Typography style={{ whiteSpace: "pre-line" }}>
              {review ? review : "리뷰가 없습니다."}
            </Typography>
          </Box>
          <Button variant={"contained"} fullWidth onClick={handleAddReview}>
            리뷰 남기기
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SingleMap restaurant={restaurant} code={"kakao_map"} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MenuSwiper img={img} />
        </TabPanel>
      </Box>*/}
      {/*<ReviewModal restaurant={restaurant} modal={modal} setModal={setModal} />*/}
    </>
  );
};

export default TabComponent;
