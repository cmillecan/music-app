const noteModels = [
  { name: "C", isWhite: true, value: 0 },
  { name: "C#", isWhite: false, value: 1 },
  { name: "D", isWhite: true, value: 2 },
  { name: "D#", isWhite: false, value: 3 },
  { name: "E", isWhite: true, value: 4 },
  { name: "F", isWhite: true, value: 5 },
  { name: "F#", isWhite: false, value: 6 },
  { name: "G", isWhite: true, value: 7 },
  { name: "G#", isWhite: false, value: 8 },
  { name: "A", isWhite: true, value: 9 },
  { name: "A#", isWhite: false, value: 10 },
  { name: "B", isWhite: true, value: 11 },
];

export const generateMajorTriad = (root) => {
  return new Set([
    root.value,
    noteModels[(root.value + 4) % 12].value,
    noteModels[(root.value + 7) % 12].value,
  ]);
};

export const generateMinorTriad = (root) => {
  return new Set([
    root.value,
    noteModels[(root.value + 3) % 12].value,
    noteModels[(root.value + 7) % 12].value,
  ]);
};

export const generateDiminishedTriad = (root) => {
  return new Set([
    root.value,
    noteModels[(root.value + 3) % 12].value,
    noteModels[(root.value + 6) % 12].value,
  ]);
};

export const generateAugmentedTriad = (root) => {
  return new Set([
    root.value,
    noteModels[(root.value + 4) % 12].value,
    noteModels[(root.value + 8) % 12].value,
  ]);
};

export const qualities = [
  { label: "Major", generateTriad: generateMajorTriad },
  { label: "Minor", generateTriad: generateMinorTriad },
  { label: "Diminished", generateTriad: generateDiminishedTriad },
  { label: "Augmented", generateTriad: generateAugmentedTriad },
];

export default noteModels;
