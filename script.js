let timeRemaining = 300; // 300 seconds
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose one of 8 suspects
let currentClueIndex = 0;

// Populate backstory on the story page
document.getElementById("story").textContent = `
The prestigious Frostworth Manor charity gala, renowned for its opulent gatherings and high-profile guests, took a shocking turn this year when the most valuable auction items vanished without a trace. A sudden and fierce snowstorm enveloped the manor, cutting off all communication and trapping everyone inside the sprawling estate.

The atmosphere turned tense as whispers of betrayal and greed filled the grand halls. Among the suspects are the dedicated staff, charismatic performers, and distinguished guests, each harboring secrets and motives that could unravel the mystery. Was it an elaborate inside job, a moment of desperation, or a well-planned act of deceit?

With time slipping away and the storm showing no signs of relenting, the truth lies hidden in a web of lies, alibis, and subtle clues. Can you piece together the evidence and unmask the culprit before it's too late?
`;

// Start the timer when the page loads
window.onload = function () {
  const timerMain = document.getElementById("timer-main");
  const timerSecondary = document.getElementById("timer-secondary");
  const timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerMain.textContent = timeRemaining;
      timerSecondary.textContent = timeRemaining;
    } else {
      clearInterval(timerInterval);
      endGame(false); // End the game when time runs out
    }
  }, 1000);
};

const suspects = [
  {
    name: "Lisa Evergreen",
    backstory: "Known for her extravagant lifestyle, Lisa has recently faced financial difficulties. She was seen lingering near the gifts for too long, perhaps plotting her move?",
    clues: [
      "A strand of tinsel and faint glitter marks were found near the scene.",
      "A smudge of lipstick was found on a discarded wine glass near the vault.",
      "A faint perfume scent, expensive and floral, lingered in the air.",
      "A receipt for a pawn shop was found crumpled near the fireplace."
    ]
  },
  {
    name: "Khervy Frost",
    backstory: "The long-time groundskeeper knows every nook and cranny of Frostworth Manor. With years of unresolved disputes with the family, could this be his revenge?",
    clues: [
      "Footprints led to the back door, but they overlapped, making it impossible to determine whose they were.",
      "A faint scent of pine, consistent with tree maintenance, was noted near the vault.",
      "A pair of work gloves, dusted with snow, were left near the kitchen.",
      "An old skeleton key was found hidden behind a curtain."
    ]
  },
  {
    name: "Leslie Bright",
    backstory: "The charity organizer was under immense pressure to deliver a successful event. With her financial struggles, could the stolen gifts have been her way out?",
    clues: [
      "A chewed-up pen was left on a nearby table.",
      "A faint scent of peppermint surrounded the vault area.",
      "A clipboard, filled with lists of auction items, had scribbles of possible alternate plans.",
      "Several gift tags with her handwriting were scattered on the floor."
    ]
  },
  {
    name: "Q Claus",
    backstory: "Dressed as Frosty, Q charmed the guests, but no one recalls inviting him. Was his happy demeanor just a clever disguise for a cunning thief?",
    clues: [
      "A torn piece of white fabric was found near the vault.",
      "Boot prints, partially melted from the snow, trailed through the hallway.",
      "A mitten, smeared with black dust, was discovered near the locked safe.",
      "Guests reported a man with a top hat near the valuables."
    ]
  },
  {
    name: "Carissa Singer",
    backstory: "The caroler’s captivating voice entertained the crowd, but her tendency to overhear conversations raised suspicions. Could she have taken advantage of the chaos?",
    clues: [
      "A scarf was left draped on a chair near the vault.",
      "Traces of glitter were scattered near the piano.",
      "A music sheet with scribbled notes was found near the study.",
      "A faint hum was reported during the heist."
    ]
  },
  {
    name: "Sierra Garland",
    backstory: "The event planner and Frostworth family cousin, Sierra's career was riding on the gala’s success. Under immense pressure, did she resort to desperate measures?",
    clues: [
      "Traces of frosting from the dessert table were near the vault.",
      "A broken communication device was found in the hallway.",
      "A ribbon matching the gift wrapping was tied around her clipboard.",
      "A schedule with suspiciously revised timings was left behind."
    ]
  },
  {
    name: "Jared Blitzen",
    backstory: "The delivery driver claimed to be stranded by the snowstorm, but his odd questions about the gifts raised eyebrows. Was he more than just a passerby?",
    clues: [
      "A faint scent of leather, consistent with his jacket, was noted in the area.",
      "Boot prints leading to the back entrance matched his shoes.",
      "A torn tag with his company logo was left on a discarded box.",
      "A delivery receipt was found near the vault."
    ]
  },
  {
    name: "Michelle Garland",
    backstory: "Sierra’s younger cousin, Michelle, is notorious for pulling holiday pranks. Could this heist have been her attempt at creating the ultimate gala chaos?",
    clues: [
      "A partially eaten candy cane was left near the scene.",
      "Tiny footprints in the snow led toward the stables.",
      "A red bow from the gifts was tied around her wrist earlier in the evening.",
      "A scribbled prank idea was found in her notebook, left behind near the fireplace."
    ]
  }
];

// Populate suspects on the suspects page
const suspectsList = document.getElementById("suspects-list");
suspects.forEach((suspect, index) => {
  const suspectDiv = document.createElement("div");
  suspectDiv.classList.add("suspect");
  suspectDiv.innerHTML = `
    <h4>${suspect.name}</h4>
    <p>${suspect.backstory}</p>
    <button class="suspect-button" data-index="${index}">Accuse</button>
  `;
  suspectsList.appendChild(suspectDiv);
});

// Start the game
document.getElementById("start-game").addEventListener("click", () => {
  document.getElementById("story-page").classList.add("hidden");
  document.getElementById("suspects-page").classList.remove("hidden");
});

// Suspect accusation logic
document.querySelectorAll(".suspect-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const suspectIndex = parseInt(event.target.dataset.index);
    if (suspectIndex === correctSuspect) {
      score += 15;
      endGame(true);
    } else {
      score -= 10;
      document.getElementById("score").textContent = score;
      alert("Incorrect suspect! Try again.");
    }
  });
});

// Hint button functionality
document.getElementById("hint-button").addEventListener("click", () => {
  if (hintCount < maxHints) {
    const hint = suspects[correctSuspect].clues[currentClueIndex];
    document.getElementById("hint-text").textContent = `Hint ${hintCount + 1}: ${hint}`;
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5;
    document.getElementById("score").textContent = score;
  } else {
    document.getElementById("hint-text").textContent = "No more hints available!";
  }
});

// End game logic
function endGame(won) {
  document.getElementById("suspects-page").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  const suspect = suspects[correctSuspect];
  document.getElementById("end-message").innerHTML = won
    ? `Congratulations! You solved the mystery! The culprit was ${suspect.name}.<br>Final Score: ${score}`
    : `Time's up! The culprit was ${suspect.name}.<br>Final Score: ${score}`;
}
