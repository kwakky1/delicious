const makeGroup = () => {
  const list = {
    it: ["애드워드", "앤디", "데이비드"],
    ms: ["엘라", "제나", "메이브"],
    pd: ["테드", "맥스", "루나", "엘리", "비니", "폴"],
    m: ["하이", "마틴", "일라", "리버", "벤"],
    d: ["헨리", "에이미", "마일로"],
    pc: ["힘", "엠지", "찰리"],
    ec: ["크리스", "테오"],
    dp: ["윌", "젠마"],
  };
  function shuffle(array: string[][]) {
    return array.map((el) => {
      return el.sort(() => Math.random() - 0.5);
    });
  }

  const total = [...Object.values(list)].flat().length;

  let listByTeam = [...Object.values(list)].sort(() => Math.random() - 0.5);
  // 배열의 배열 랜덤 셔플
  const shuffledListByTeam = shuffle(listByTeam);
  const dishTeamLength = Math.ceil(total / 4);
  const listByDish: any[][] = Array.from(
    Array(dishTeamLength),
    () => new Array(4)
  );
  shuffledListByTeam.forEach((team, teamIndex) => {
    team.forEach((value, index) => {
      if (index >= dishTeamLength) {
        const findIndexValue = index % dishTeamLength;
        if (findIndexValue !== undefined) {
          const possibleIndex = listByDish[findIndexValue]?.findIndex(
            (el) => !el
          );
          listByDish[findIndexValue][possibleIndex] = value;
        }
      } else {
        if (listByDish[index][3]) {
          const possibleIndex = listByDish
            .map((el) => el.filter((element) => element !== undefined))
            .map((el) => el.length)
            .findIndex((el, index, array) => el === Math.min(...array));
          if (possibleIndex !== undefined) {
            const findIndexValue = listByDish[possibleIndex]?.findIndex(
              (el) => !el
            );
            if (findIndexValue !== undefined) {
              listByDish[possibleIndex][findIndexValue] = value;
            }
          }
        } else {
          const smallLengthIndex = listByDish
            .map((el) => el.filter((element) => element !== undefined))
            .map((el) => el.length)
            .findIndex((el, index, array) => el === Math.min(...array));
          const lastIndex = listByDish[smallLengthIndex].findIndex((el) => !el);
          listByDish[smallLengthIndex][lastIndex] = value;
        }
      }
    });
  });

  return shuffle(listByDish);
};

export default makeGroup;
