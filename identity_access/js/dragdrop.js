let dragItem=null;
function setupDrag(el){
  el.addEventListener('dragstart',()=>{dragItem=el;el.classList.add('dragging');});
  el.addEventListener('dragend',()=>{dragItem=null;el.classList.remove('dragging');});
  // Touch support for mobile
  el.addEventListener('touchstart',e=>{dragItem=el;el.classList.add('dragging');e.preventDefault();},{passive:false});
  el.addEventListener('touchend',e=>{
    el.classList.remove('dragging');
    const touch=e.changedTouches[0];
    const target=document.elementFromPoint(touch.clientX,touch.clientY);
    const zone=target&&(target.classList.contains('drop-zone')?target:target.closest('.drop-zone'));
    if(zone&&dragItem){const lbl=zone.querySelector('.drop-zone-label');if(lbl)lbl.remove();zone.appendChild(dragItem);setupDrag(dragItem);}
    dragItem=null;
    e.preventDefault();
  },{passive:false});
}
function setupDrop(zone){
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('over');});
  zone.addEventListener('dragleave',()=>zone.classList.remove('over'));
  zone.addEventListener('drop',e=>{
    e.preventDefault();zone.classList.remove('over');
    if(dragItem){const lbl=zone.querySelector('.drop-zone-label');if(lbl)lbl.remove();zone.appendChild(dragItem);setupDrag(dragItem);}
  });
}

// Round 1: MFA categories — Know / Have / Are
// Zones: dz-sym=know, dz-asym=have, dz-hash=are
const dd1Items=[
  {text:'Password + TOTP code',cat:'mfa-combo'},   // special: spans 2 categories — counts as MFA
  {text:'PIN code only',cat:'know'},
  {text:'Fingerprint scan',cat:'are'},
  {text:'YubiKey hardware token',cat:'have'},
  {text:'SMS OTP code',cat:'have'},
  {text:'Iris scan',cat:'are'},
  {text:'Password only',cat:'know'},
  {text:'Smart card',cat:'have'},
  {text:'Facial recognition',cat:'are'},
];

// Simplified: sort into Know / Have / Are (combos aside)
// We'll use 3 zones: know, have, are. Remove the combo item — replace with clearer ones
const dd1Revised=[
  {text:'PIN or passphrase',cat:'know'},
  {text:'Security question answer',cat:'know'},
  {text:'YubiKey / hardware token',cat:'have'},
  {text:'TOTP app (Google Auth)',cat:'have'},
  {text:'Smart card',cat:'have'},
  {text:'Fingerprint',cat:'are'},
  {text:'Iris scan',cat:'are'},
  {text:'Facial recognition',cat:'are'},
  {text:'SMS OTP code',cat:'have'},
];

function buildDragDrop1(){
  const src=document.getElementById('dd-source-1');src.innerHTML='';
  [...dd1Revised].sort(()=>Math.random()-.5).forEach(item=>{
    const el=document.createElement('div');el.className='drag-item';el.draggable=true;
    el.textContent=item.text;el.dataset.cat=item.cat;setupDrag(el);src.appendChild(el);
  });
  ['dz-sym','dz-asym','dz-hash'].forEach(id=>{
    const dz=document.getElementById(id);dz.innerHTML='<div class="drop-zone-label">Drop here</div>';setupDrop(dz);
  });
  document.getElementById('dd1-feedback').className='feedback';
  document.getElementById('dd1-feedback').innerHTML='';
}

function checkDragDrop1(){
  // zones: dz-sym=know, dz-asym=have, dz-hash=are
  let correct=0,total=dd1Revised.length;
  ['dz-sym','dz-asym','dz-hash'].forEach(dzId=>{
    document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el=>{
      const ok=el.dataset.cat===document.getElementById(dzId).dataset.cat;
      el.classList.add(ok?'correct':'wrong');if(ok)correct++;
    });
  });
  const fb=document.getElementById('dd1-feedback');
  fb.className=`feedback show ${correct===total?'correct':'wrong'}`;
  fb.innerHTML=correct===total
    ? `✓ Perfect! All MFA factors correctly classified.`
    : `<strong>${correct}/${total} correct.</strong> Know: PIN, security question, passphrase. Have: hardware token, TOTP app, smart card, SMS OTP. Are (biometrics): fingerprint, iris, face. MFA = combining two DIFFERENT categories.`;
}
function resetDragDrop1(){buildDragDrop1();}

// Round 2: IAM concept matching — SSO/Federation, Kerberos, PAM
// Zones: dz-seg=SSO/Federation, dz-hard=Kerberos, dz-ac=PAM
const dd2Items=[
  {text:'Authenticate once, use all apps',cat:'seg'},
  {text:'Service ticket from TGS',cat:'hard'},
  {text:'SAML assertion to Service Provider',cat:'seg'},
  {text:'Temporary admin — auto-deleted in 4h',cat:'ac'},
  {text:'TGT issued after login by KDC',cat:'hard'},
  {text:'"Sign in with Google" (OIDC)',cat:'seg'},
  {text:'Password vault — nobody knows it',cat:'ac'},
  {text:'Kerberoasting targets service accounts',cat:'hard'},
  {text:'Session recording of privileged admin',cat:'ac'},
];

function buildDragDrop2(){
  const src=document.getElementById('dd-source-2');src.innerHTML='';
  [...dd2Items].sort(()=>Math.random()-.5).forEach(item=>{
    const el=document.createElement('div');el.className='drag-item';el.draggable=true;
    el.textContent=item.text;el.dataset.cat=item.cat;setupDrag(el);src.appendChild(el);
  });
  ['dz-seg','dz-hard','dz-ac'].forEach(id=>{
    const dz=document.getElementById(id);dz.innerHTML='<div class="drop-zone-label">Drop here</div>';setupDrop(dz);
  });
  document.getElementById('dd2-feedback').className='feedback';
  document.getElementById('dd2-feedback').innerHTML='';
}

function checkDragDrop2(){
  let correct=0,total=dd2Items.length;
  ['dz-seg','dz-hard','dz-ac'].forEach(dzId=>{
    document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el=>{
      const ok=el.dataset.cat===document.getElementById(dzId).dataset.cat;
      el.classList.add(ok?'correct':'wrong');if(ok)correct++;
    });
  });
  const fb=document.getElementById('dd2-feedback');
  fb.className=`feedback show ${correct===total?'correct':'wrong'}`;
  fb.innerHTML=correct===total
    ? `✓ Perfect! IAM concepts correctly matched.`
    : `<strong>${correct}/${total} correct.</strong> SSO/Federation: authenticate once/all apps, SAML assertions, OIDC. Kerberos: TGT, TGS service tickets, Kerberoasting. PAM: JIT (temp admin), password vaulting, session recording.`;
}
function resetDragDrop2(){buildDragDrop2();}

window.buildDragDrop1=buildDragDrop1;window.checkDragDrop1=checkDragDrop1;window.resetDragDrop1=resetDragDrop1;
window.buildDragDrop2=buildDragDrop2;window.checkDragDrop2=checkDragDrop2;window.resetDragDrop2=resetDragDrop2;
