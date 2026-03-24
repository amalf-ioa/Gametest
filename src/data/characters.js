export const CHARACTERS = {
  luna: {
    id: 'luna',
    name: 'Luna',
    emoji: '👩',
    color: '#FFB6C1',
    dialogues: {
      greeting: [
        "Hi there! Welcome to Pet Paradise!",
        "Great to see you again! Ready to help our pets?",
        "The animals are waiting for us!",
      ],
      levelStart: [
        "Let's go! Match those tiles!",
        "Focus! The pets are counting on us!",
        "You've got this! Show them your skills!",
      ],
      levelComplete: [
        "Amazing! The pets are so happy!",
        "Brilliant work! You're a natural!",
        "Woohoo! Another step closer to paradise!",
      ],
      levelFail: [
        "Don't worry, we'll try again!",
        "So close! Give it another shot!",
        "The pets believe in you! Try again!",
      ],
      renovation: [
        "This place is really coming together!",
        "The pets love the changes you're making!",
        "Beautiful choice! The animals approve!",
      ],
    },
  },
  max: {
    id: 'max',
    name: 'Max',
    emoji: '🐕',
    color: '#CD853F',
    dialogues: {
      greeting: ["Woof! Let's play!", "*wags tail* Ready for adventure!"],
      levelComplete: ["Arf arf! Best day ever!", "*happy barking* You did it!"],
    },
  },
  whiskers: {
    id: 'whiskers',
    name: 'Whiskers',
    emoji: '🐈',
    color: '#9370DB',
    dialogues: {
      greeting: ["Meow... I suppose you'll do.", "*purrs* Welcome back."],
      levelComplete: ["Purrfect job.", "*slow blink* I'm impressed."],
    },
  },
};

export function getRandomDialogue(characterId, type) {
  const character = CHARACTERS[characterId];
  if (!character) return '';
  const lines = character.dialogues[type];
  if (!lines || lines.length === 0) return '';
  return lines[Math.floor(Math.random() * lines.length)];
}
