"use client";

import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Badge, Box, Button, Grid, TextField, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import makeGroup, { createDiverseGroup } from "@/components/util/makeGroup";
import axios from "axios";

interface ListState {
  [index: string]: { name: string }[];
}
interface Props {
  setResult: (value: { name: string }[][]) => void;
}

const MakeTeam = (props: Props) => {
  const { setResult } = props;

  const [list, setList] = useState<ListState>({});
  const [personnel, setPersonnel] = useState<number>(4);
  const [teamName, setTeamName] = useState<string>("");

  useEffect(() => {
    axios.get("/api/staff/fetch").then((res) => {
      const {
        data: { staff },
      } = res;
      console.log(staff);
      setList(staff);
    });
  }, []);

  const handleIncrease = (teamName: string) => {
    const total = list;
    total[teamName].push({ name: "" });
    setList({ ...total });
  };
  const handleIncreaseGroup = () => {
    // 대표라는 키가 이미 있는경우 alert
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
    const result = makeGroup(list, personnel);
    console.log(result);
    setResult(result);
  };

  const handleMakeBestGroup = () => {
    const previousGroups = [
      [
        [
          { name: "월리" },
          { name: "맥스" },
          { name: "에이미" },
          { name: "하이" },
        ],
        [
          { name: "크리스" },
          { name: "애드워드" },
          { name: "테드" },
          { name: "마틴" },
        ],
        [
          { name: "리버" },
          { name: "루나" },
          { name: "알파" },
          { name: "케빈" },
        ],
        [{ name: "앨리슨" }, { name: "앤디" }, { name: "존" }],
        [
          { name: "엠지" },
          { name: "엘라" },
          { name: "마일로" },
          { name: "테오" },
        ],
        [
          { name: "브루노" },
          { name: "윌" },
          { name: "폴" },
          { name: "데이지" },
        ],
        [
          { name: "헨리" },
          { name: "젠마" },
          { name: "올리비아" },
          { name: "제이콥" },
        ],
      ],
      [
        [
          { name: "마일로" },
          { name: "폴" },
          { name: "올리비아" },
          { name: "테오" },
        ],
        [{ name: "존" }, { name: "헨리" }, { name: "알파" }, { name: "엘라" }],
        [
          { name: "에이미" },
          { name: "마틴" },
          { name: "크리스" },
          { name: "데이지" },
        ],
        [
          { name: "케빈" },
          { name: "엠지" },
          { name: "제이콥" },
          { name: "하이" },
        ],
        [
          { name: "애드워드" },
          { name: "찰리" },
          { name: "테드" },
          { name: "리버" },
        ],
        [
          { name: "브루노" },
          { name: "월리" },
          { name: "젠마" },
          { name: "맥스" },
        ],
        [{ name: "앤디" }, { name: "윌" }, { name: "루나" }],
      ],
    ];
    const result = createDiverseGroup(list, previousGroups, 4);
    console.log(result);
    setResult(result);
  };

  const handleSaveGroup = () => {
    axios
      .post("/api/staff/update", {
        id: "64c5ee7adf1fa3a578cbabf3",
        staff: list,
      })
      .then((res) => {
        if (res.data.success) {
          alert("저장 되었습니다.");
        }
      })
      .catch(() => {
        alert("저장실패, 다시한번 시도해주세요.");
      });
  };

  return (
    <Box py={10}>
      <Box p={2}>
        <TextField
          value={teamName}
          size={"small"}
          onChange={(e) => setTeamName(e.target.value)}
          sx={{ marginRight: 2 }}
          label={"팀명"}
        />
        <Button
          variant={"contained"}
          onClick={handleIncreaseGroup}
          sx={{ mr: 2 }}
        >
          그룹늘리기
        </Button>
        <TextField
          type={"number"}
          value={personnel}
          size={"small"}
          onChange={(e) => setPersonnel(Number(e.target.value))}
          sx={{ marginRight: 2 }}
          label={"팀 인원수"}
        />
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
      <Button onClick={handleMakeBestGroup}>베스트 조 만들기</Button>
      <Button onClick={handleSaveGroup}>저장하기</Button>
    </Box>
  );
};

export default MakeTeam;
