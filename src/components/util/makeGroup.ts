interface Person {
  name: string;
}

type Group = Person[][];
type ListState = { [team: string]: Person[] };

const makeGroup = (list: ListState, teamPersonnel: number) => {
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
  const dishTeamLength = Math.ceil(total / teamPersonnel);
  const listByDish: any[][] = Array.from(
    Array(dishTeamLength),
    () => new Array(teamPersonnel)
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

function calculateSimilarity(group1: Group, group2: Group): number {
  let similarity = 0;
  for (const team1 of group1) {
    for (const team2 of group2) {
      const set1 = new Set(team1.map((person) => person.name));
      const set2 = new Set(team2.map((person) => person.name));
      const intersection = new Set([...set1].filter((x) => set2.has(x)));
      similarity += intersection.size;
    }
  }
  return similarity;
}

function createGroup(list: ListState, teamPersonnel: number): Group {
  // 여기에는 makeGroup 함수의 로직이 들어가야 합니다.
  return makeGroup(list, teamPersonnel);
}

export function createDiverseGroup(
  list: ListState,
  previousGroups: Group[],
  teamPersonnel: number,
  attempts: number = 100
): Group {
  let bestGroup = createGroup(list, teamPersonnel);
  let bestSimilarity = previousGroups.reduce(
    (acc, group) => acc + calculateSimilarity(bestGroup, group),
    0
  );

  for (let i = 0; i < attempts - 1; i++) {
    const newGroup = createGroup(list, teamPersonnel);
    const newSimilarity = previousGroups.reduce(
      (acc, group) => acc + calculateSimilarity(newGroup, group),
      0
    );

    if (newSimilarity < bestSimilarity) {
      bestGroup = newGroup;
      bestSimilarity = newSimilarity;
    }
  }

  return bestGroup;
}

export default makeGroup;
