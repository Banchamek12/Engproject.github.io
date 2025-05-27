 function search() {
  const word = document.getElementById('wordInput').value.trim().toLowerCase();
  const lang = document.getElementById('languageSelect').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!word) return;

  if (!allowedWords.includes(word)) {
    const errorCard = document.createElement('div');
    errorCard.className = 'card error';
    errorCard.textContent = `The word "${word}" is not allowed.`;
    resultsContainer.appendChild(errorCard);
    return;
  }

  const translation = translations[word][lang] || "Translation not available.";

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <span><strong>${word}</strong> in ${langMap[lang]}: ${translation}</span>
    <button onclick="speak('${translation}', '${getLangCode(lang)}')">🔊</button>
  `;
  resultsContainer.appendChild(card);
}
function getLangCode(lang) {
  const langMapForSpeech = {
    th: 'th-TH',   // ภาษาไทย
    ch: 'zh-CN',   // ภาษาจีนกลาง
    eng: 'en-US'   // ภาษาอังกฤษ
  };
  return langMapForSpeech[lang] || 'en-US';
}



function speak(text, langCode) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;

  const voices = speechSynthesis.getVoices();
  const matchedVoice = voices.find(voice => voice.lang === langCode);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  speechSynthesis.speak(utterance);
}
document.addEventListener('DOMContentLoaded', () => {
  speechSynthesis.getVoices(); // preload voice list
});

    document.addEventListener('DOMContentLoaded', () => {
      const input = document.getElementById('wordInput');
      input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          search();
        }
      });
    });
    document.addEventListener("DOMContentLoaded", () => {
  const speakButton = document.querySelector(".speak-button");
  const resultText = document.getElementById("resultText");

  speakButton.addEventListener("click", () => {
    const text = resultText.textContent;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "th-TH";

    // พยายามเลือกเสียงภาษาไทย
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(voice => voice.lang === 'th-TH');
    if (thaiVoice) {
      utter.voice = thaiVoice;
    }

    window.speechSynthesis.speak(utter);
  });
});

