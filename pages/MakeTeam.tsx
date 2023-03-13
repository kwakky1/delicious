import React, { ChangeEvent, Fragment, useState } from "react";
import { Badge, Box, Button, Grid, TextField, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import makeGroup from "../src/components/util/makeGroup";

interface ListState {
  [index: string]: { name: string }[];
}
interface Props {
  setResult: (value: { name: string }[][]) => void;
}

const MakeTeam = (props: Props) => {
  const { setResult } = props;
  const defaultList = {
    it: [{ name: "애드워드" }, { name: "앤디" }],
    ms: [{ name: "엘라" }, { name: "제나" }, { name: "메이브" }],
    pd: [
      { name: "테드" },
      { name: "맥스" },
      { name: "루나" },
      { name: "비니" },
      { name: "폴" },
      { name: "제이콥" },
    ],
    m: [{ name: "하이" }, { name: "마틴" }, { name: "리버" }],
    d: [{ name: "헨리" }, { name: "에이미" }, { name: "마일로" }],
    pc: [{ name: "힘" }, { name: "엠지" }, { name: "찰리" }],
    ec: [{ name: "크리스" }, { name: "테오" }],
    dp: [{ name: "윌" }, { name: "젠마" }],
  };

  const [list, setList] = useState<ListState>(defaultList);
  const [teamName, setTeamName] = useState<string>("");

  const handleIncrease = (teamName: string) => {
    const total = list;
    total[teamName].push({ name: "" });
    setList({ ...total });
  };
  const handleIncreaseGroup = () => {
    // 대표라는 키가 이미 있는경우 alert
    //
    if (!teamName) {
      return alert("팀 이름을 적어주세요!");
    }
    if (Object.keys(list).includes(teamName)) {
      return alert("이미 존재하는 팀명입니다.");
    }
    let total = { ...list, [teamName]: [{ name: "" }] };
    setList({ ...total });
    setTeamName("");
  };

  const handleRemove = (teamName: string, index: number) => {
    // 지울때 위에 있던 값들을 한칸씩 앞으로 당겨야한다.
    let origin = list;
    origin[teamName].splice(index, 1);
    setList({ ...origin });
  };

  const handleRemoveGroup = (teamName: string) => {
    let origin = list;
    delete origin[teamName];
    setList({ ...origin });
  };

  const handleChange =
    (teamKey: string, personIndex: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newOne = { ...list };
      newOne[teamKey][personIndex].name = e.target.value;
      setList({ ...newOne });
    };

  const handleMakeGroup = () => {
    const result = makeGroup(list);
    setResult(result);
  };

  return (
    <>
      <Box p={2}>
        <TextField
          value={teamName}
          size={"small"}
          onChange={(e) => setTeamName(e.target.value)}
          sx={{ marginRight: 2 }}
          label={"팀명"}
        />
        <Button variant={"contained"} onClick={handleIncreaseGroup}>
          그룹늘리기
        </Button>
      </Box>
      {Object.entries(list).map(([teamKey, team]) => {
        return (
          <Fragment key={`${teamKey}`}>
            <Grid container spacing={1}>
              <Grid item xs={1} alignItems={"center"}>
                <Typography textAlign={"center"} alignItems={"center"}>
                  {teamKey}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant={"contained"}
                  onClick={() => handleRemoveGroup(teamKey)}
                  fullWidth
                >
                  그룹 삭제
                </Button>
              </Grid>
            </Grid>
            <Grid p={2} container spacing={2}>
              {team.map((value, index) => {
                return (
                  <Grid key={`${teamKey}-${value}-${index}`} item xs={1}>
                    <Badge
                      badgeContent={
                        index !== 0 && (
                          <CancelIcon
                            onClick={() => handleRemove(teamKey, index)}
                            color={"primary"}
                          />
                        )
                      }
                    >
                      <TextField
                        onChange={handleChange(teamKey, index)}
                        value={list[teamKey][index]["name"]}
                        size="small"
                        fullWidth
                      />
                    </Badge>
                  </Grid>
                );
              })}
              <Grid item xs={1}>
                <Button
                  variant={"contained"}
                  onClick={() => handleIncrease(teamKey)}
                  fullWidth
                >
                  인원늘리기
                </Button>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
      <Button onClick={handleMakeGroup}>조 만들기</Button>
    </>
  );
};

export default MakeTeam;
