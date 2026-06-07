const QUIZ_SIZE = 8;
const quizState = { threats:{ bank:[], queue:[], idx:0, score:0 } };

function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function buildQuizQueue(bank) {
  return shuffle(bank).slice(0,QUIZ_SIZE).map(q=>{
    const indexed = q.choices.map((c,i)=>({...c,origIdx:i}));
    const shuffled = shuffle(indexed);
    const correctShuffledIdx = shuffled.findIndex(c=>c.correct);
    return {...q, shuffledChoices:shuffled, correctShuffledIdx};
  });
}

function initQuiz(domain) {
  const s = quizState[domain];
  s.bank  = window.threatBank;
  s.queue = buildQuizQueue(s.bank);
  s.idx=0; s.score=0;
  renderQuiz(domain);
}

function renderQuiz(domain) {
  const s=quizState[domain];
  const pfx='th';
  document.getElementById(`${pfx}-progress`).style.width = (s.idx/QUIZ_SIZE*100)+'%';
  document.getElementById(`${pfx}-counter`).textContent = s.idx<QUIZ_SIZE ? `Question ${s.idx+1} of ${QUIZ_SIZE}` : 'Complete!';
  document.getElementById(`${pfx}-score-live`).textContent = s.idx<QUIZ_SIZE ? `Score: ${s.score}/${s.idx}` : `Final: ${s.score}/${QUIZ_SIZE}`;

  const box = document.getElementById(`${pfx}-box`);
  if(s.idx>=QUIZ_SIZE){ renderScoreScreen(domain,pfx,box); return; }

  const q=s.queue[s.idx];
  box.innerHTML=`
    <div class="scenario-box">
      <div class="scenario-prompt"><strong>SCENARIO:</strong> ${q.q}</div>
      <div class="choices" id="${pfx}-choices">
        ${q.shuffledChoices.map((c,i)=>`
          <div>
            <button class="choice-btn" data-idx="${i}" onclick="handleAnswer('${domain}',${i})">
              ${String.fromCharCode(65+i)}. ${c.text}
            </button>
            <div class="choice-explain ${c.correct?'correct-exp':'wrong-exp'}" id="${pfx}-exp-${i}">
              ${c.correct?'✓ ':'✗ '}${c.why}
            </div>
          </div>`).join('')}
      </div>
      <button class="next-btn" id="${pfx}-next">
        ${s.idx+1<QUIZ_SIZE ? 'Next Question →' : 'See Results →'}
      </button>
    </div>`;
}

function handleAnswer(domain,chosenIdx) {
  const s=quizState[domain]; const pfx='th';
  const q=s.queue[s.idx];
  document.querySelectorAll(`#${pfx}-choices .choice-btn`).forEach(b=>b.disabled=true);
  const isCorrect=chosenIdx===q.correctShuffledIdx;
  if(isCorrect) s.score++;

  q.shuffledChoices.forEach((c,i)=>{
    const btn=document.querySelector(`#${pfx}-choices .choice-btn[data-idx="${i}"]`);
    const exp=document.getElementById(`${pfx}-exp-${i}`);
    if(i===q.correctShuffledIdx){ btn.classList.add('correct'); exp.classList.add('show'); }
    else if(i===chosenIdx){ btn.classList.add('wrong'); exp.classList.add('show'); }
    else { exp.classList.add('show'); }
  });

  document.getElementById(`${pfx}-score-live`).textContent=`Score: ${s.score}/${s.idx+1}`;
  const nextBtn=document.getElementById(`${pfx}-next`);
  nextBtn.classList.add('show');
  nextBtn.textContent = s.idx+1<QUIZ_SIZE ? 'Next Question →' : 'See Results →';
  nextBtn.onclick=()=>{ s.idx<QUIZ_SIZE-1 ? (s.idx++, renderQuiz(domain)) : (s.idx++, renderQuiz(domain)); };
}

function renderScoreScreen(domain,pfx,box) {
  const s=quizState[domain];
  const pct=Math.round(s.score/QUIZ_SIZE*100);
  let grade,gradeClass,msg;
  if(pct>=88){grade='A';gradeClass='grade-A';msg='Exam-ready on this domain.';}
  else if(pct>=75){grade='B';gradeClass='grade-B';msg='Good — review the questions you missed.';}
  else{grade='C';gradeClass='grade-C';msg='Keep drilling — review every explanation carefully.';}

  document.getElementById(`${pfx}-progress`).style.width='100%';
  box.innerHTML=`<div style="text-align:center;padding:32px 0;">
    <div style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Quiz Complete</div>
    <div style="font-size:3.5rem;font-weight:800;font-family:var(--sans);color:var(--accent);line-height:1;">${s.score}<span style="font-size:1.5rem;color:var(--muted);">/${QUIZ_SIZE}</span></div>
    <div style="font-family:var(--mono);font-size:1.1rem;margin:8px 0;"><span class="${gradeClass}" style="font-weight:700;">Grade ${grade}</span> · ${pct}%</div>
    <div style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-top:8px;">${msg}</div>
    <button class="restart-btn" style="margin-top:28px;" onclick="initQuiz('${domain}')">New Random Quiz →</button>
  </div>`;
}

window.initQuiz=initQuiz; window.handleAnswer=handleAnswer;
