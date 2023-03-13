interface ListState {
  [index: string]: { name: string }[];
}

const makeGroup = (list: ListState) => {
  function shuffle(array: { name: string }[][]) {
    return array.map((el) => {
      return el.sort(() => Math.random() - 0.5);
    });
  }

  const total = [...Object.values(list || {})].flat().length;

  let listByTeam = [...Object.values(list || {})].sort(
    () => Math.random() - 0.5
  );
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
