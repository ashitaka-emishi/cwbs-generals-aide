// Fire Combat Tables - Page 35
// Fire Determination Chart
const smallArmsFirePointTable = {
  A: [8, 4, 2],
  B: [4, 2, 1],
  C: [2, 1, 0.5]
}

const smallArmsPlusFirePointTable = {
  A: [12, 6, 2],
  B: [6, 3, 1],
  C: [3, 2, 0.5]
}

function getSmallArmsFirePonts(fireLevel, range, hasPlusWeapons) {
  if ('ABC'.indexOf(fireLevel) == -1) throw new Error('fireLevel must be A, B, or C.')
  if (range > 2) throw Error('Small arms fire limited to range of 2 hexes.')

  return (hasPlusWeapons ? smallArmsPlusFirePointTable : smallArmsFirePointTable)[fireLevel][range]
}

const artileryFirePointTable = [
  [2.0, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0],
  [4.0, 2.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0],
  [6.0, 3.0, 2.0, 2.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0],
  [8.0, 4.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0.5],
  [10.0, 5.0, 3.0, 3.0, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0.5]
]
// Artillery x1 vs wagons and guns
// Artillery x1/2 vs infantry and cav at 4+ hexes

function getArtilleryFirePoints(gunPoints, range, targetType) {
  if ('ICWA'.indexOf(targetType) == -1) throw new Error('Target type must be I, C, W, or A.')
  if (!Number.isInteger(gunPoints) || gunPoints < 1 || gunPoints > 5)
    throw new Error('Artillery has between 1 and 5 gun points.')
  if (range > 10) throw Error('Artillery fire limited to range of 10 hexes.')

  const modifier = (targetType == 'I' || targetType == 'C') && range >= 4 ? 0.5 : 1.0
  return artileryFirePointTable[gunPoints - 1][range] * modifier
}

// Combat table
/*
Column Shifts.
Each line is used only once, even if
multiple conditions on the line are true.
-1 Up Slope or Extreme Slope, in either case Firer must be at
lower elevation than target
-1 Target in Sunken Road or Trench
-2 Night
-1 One or more Firers is Low Ammo
+2 Target is Column, Limbered, Flank, Disorganized, or Routed
+3 Mounted Target
-3 Defender’s fire in Close Combat, if attacked from a Flank
*/
const fireCombatTable = [
  [-3, -3, -3, -3, -3, -2, -1, 0, 0.5, 0.5, 0.5], // <1
  [-3, -3, -3, -3, -2, -1, 0, 0.5, 1, 1, 1], // 1
  [-3, -2, -2, -1, 0, 0.5, 1, 1, 1, 1, 1.5], // 2
  [-1, -1, 0.5, 0.5, 0.5, 1, 1, 1, 1.5, 1.5, 2], // 3-4
  [0.5, 0.5, 0.5, 1, 1, 1, 1.5, 1.5, 1.5, 2, 2], // 5-6
  [0.5, 1, 1, 1, 1, 1.5, 1.5, 1.5, 2, 2, 2.5], // 7-8
  [1, 1, 1, 1, 1.5, 1.5, 1.5, 2, 2, 2.5, 2.5], // 9-11
  [1, 1, 1, 1.5, 1.5, 1.5, 2, 2, 2.5, 2.5, 3], // 12-14
  [1, 1, 1.5, 1.5, 1.5, 2, 2, 2.5, 2.5, 3, 3.5], // 15-17
  [1, 1.5, 1.5, 1.5, 2, 2, 2.5, 2.5, 3, 3.5, 3.5], // 18-20
  [1.5, 1.5, 1.5, 2, 2, 2.5, 2.5, 3, 3.5, 3.5, 4] // >20
]

export function getFireCombatResult(roll, roll2, fireColumn) {
  let val = fireCombatTable[parseInt(fireColumn)][roll - 2]
  let losses = 0
  const useStraggle2 = !!(val >= 1.5)
  const checkStragglers = !!(val > 0)
  if (Math.floor(val) != val) {
    losses = roll2 < 4 ? Math.floor(val) : Math.ceil(val)
  } else {
    losses = val
  }
  console.log(`Roll ${roll}/${roll2} damage ${val}/${losses}`)

  return {
    damage: val,
    isMiss: val == -3,
    moraleShift: val >= -2 && val < 0 ? val : 0,
    losses,
    checkStragglers,
    useStraggle2
  }
}

function checkForLeaderLoss(roll) {
  return {
    isKilled: roll == 2,
    isWounded: roll >= 11
  }
}

const straggler1 = {
  A: [0, 0, 0, 0, 0, 1, 1, 1],
  B: [0, 0, 0, 1, 1, 1, 1, 2],
  C: [0, 0, 1, 1, 1, 1, 2, 2],
  D: [1, 1, 1, 1, 1, 2, 2, 2],
  E: [1, 1, 1, 2, 2, 2, 3, 3]
}

const straggler2 = {
  A: [0, 0, 0, 1, 1, 1, 2, 2],
  B: [1, 1, 1, 1, 2, 2, 3, 3],
  C: [1, 1, 1, 2, 2, 3, 3, 3],
  D: [1, 2, 2, 3, 3, 3, 4, 4],
  E: [2, 2, 2, 3, 3, 3, 4, 4]
}

export function checkStragglers(roll, morale, useStraggle2) {
  if (useStraggle2) return straggler2[morale][roll]
  return straggler1[morale][roll]
}
