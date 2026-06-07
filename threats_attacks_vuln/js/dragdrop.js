let dragItem = null;

function setupDrag(el) {
  el.addEventListener('dragstart', () => { dragItem=el; el.classList.add('dragging'); });
  el.addEventListener('dragend',   () => { dragItem=null; el.classList.remove('dragging'); });
}
function setupDrop(zone) {
  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', ()  => zone.classList.remove('over'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('over');
    if (dragItem) { const lbl=zone.querySelector('.drop-zone-label'); if(lbl)lbl.remove(); zone.appendChild(dragItem); setupDrag(dragItem); }
  });
}

const dd1Items = [
  {text:'Spear phishing email',cat:'sym'},
  {text:'Ransomware',cat:'asym'},
  {text:'SQL injection',cat:'hash'},
  {text:'Watering hole site',cat:'sym'},
  {text:'Rootkit',cat:'asym'},
  {text:'SYN flood',cat:'hash'},
  {text:'Pretexting phone call',cat:'sym'},
  {text:'Keylogger',cat:'asym'},
  {text:'ARP poisoning',cat:'hash'},
];

function buildDragDrop1() {
  const src=document.getElementById('dd-source-1'); src.innerHTML='';
  [...dd1Items].sort(()=>Math.random()-.5).forEach(item=>{
    const el=document.createElement('div'); el.className='drag-item'; el.draggable=true; el.textContent=item.text; el.dataset.cat=item.cat; setupDrag(el); src.appendChild(el);
  });
  ['dz-sym','dz-asym','dz-hash'].forEach(id=>{ const dz=document.getElementById(id); dz.innerHTML='<div class="drop-zone-label">Drop here</div>'; setupDrop(dz); });
  const fb=document.getElementById('dd1-feedback'); fb.className='feedback'; fb.innerHTML='';
}

function checkDragDrop1() {
  let correct=0,total=dd1Items.length;
  ['dz-sym','dz-asym','dz-hash'].forEach(dzId=>{
    document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el=>{
      const ok=el.dataset.cat===document.getElementById(dzId).dataset.cat; el.classList.add(ok?'correct':'wrong'); if(ok)correct++;
    });
  });
  const fb=document.getElementById('dd1-feedback');
  fb.className=`feedback show ${correct===total?'correct':'wrong'}`;
  fb.innerHTML=correct===total?`✓ Perfect! All ${total} attacks correctly categorized.`:`<strong>${correct}/${total} correct.</strong> Social Engineering: phishing, watering hole, pretexting. Malware: ransomware, rootkit, keylogger. Network/App: SQLi, SYN flood, ARP poisoning.`;
}
function resetDragDrop1(){ buildDragDrop1(); }

const dd2Items = [
  {text:'Credential-stealing keylogger',cat:'seg'},
  {text:'SQL injection dumps user table',cat:'seg'},
  {text:'Attacker modifies firewall config',cat:'hard'},
  {text:'Ransomware encrypts all files',cat:'ac'},
  {text:'MITM alters transaction amount',cat:'hard'},
  {text:'DDoS takes down web store',cat:'ac'},
  {text:'Spyware captures PII',cat:'seg'},
  {text:'Worm corrupts system files',cat:'hard'},
];

function buildDragDrop2() {
  const src=document.getElementById('dd-source-2'); src.innerHTML='';
  [...dd2Items].sort(()=>Math.random()-.5).forEach(item=>{
    const el=document.createElement('div'); el.className='drag-item'; el.draggable=true; el.textContent=item.text; el.dataset.cat=item.cat; setupDrag(el); src.appendChild(el);
  });
  ['dz-seg','dz-hard','dz-ac'].forEach(id=>{ const dz=document.getElementById(id); dz.innerHTML='<div class="drop-zone-label">Drop here</div>'; setupDrop(dz); });
  const fb=document.getElementById('dd2-feedback'); fb.className='feedback'; fb.innerHTML='';
}

function checkDragDrop2() {
  let correct=0,total=dd2Items.length;
  ['dz-seg','dz-hard','dz-ac'].forEach(dzId=>{
    document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el=>{
      const ok=el.dataset.cat===document.getElementById(dzId).dataset.cat; el.classList.add(ok?'correct':'wrong'); if(ok)correct++;
    });
  });
  const fb=document.getElementById('dd2-feedback');
  fb.className=`feedback show ${correct===total?'correct':'wrong'}`;
  fb.innerHTML=correct===total?`✓ Perfect! CIA triad impact correctly matched.`:`<strong>${correct}/${total} correct.</strong> Confidentiality: steal/expose data. Integrity: modify/corrupt data. Availability: prevent access (DoS, ransomware).`;
}
function resetDragDrop2(){ buildDragDrop2(); }

window.buildDragDrop1=buildDragDrop1; window.checkDragDrop1=checkDragDrop1; window.resetDragDrop1=resetDragDrop1;
window.buildDragDrop2=buildDragDrop2; window.checkDragDrop2=checkDragDrop2; window.resetDragDrop2=resetDragDrop2;
