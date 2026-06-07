let dragItem=null;
function setupDrag(el){el.addEventListener('dragstart',()=>{dragItem=el;el.classList.add('dragging');});el.addEventListener('dragend',()=>{dragItem=null;el.classList.remove('dragging');});}
function setupDrop(zone){zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('over');});zone.addEventListener('dragleave',()=>zone.classList.remove('over'));zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('over');if(dragItem){const lbl=zone.querySelector('.drop-zone-label');if(lbl)lbl.remove();zone.appendChild(dragItem);setupDrag(dragItem);}});}

const dd1Items=[
  {text:'HTTP (port 80)',cat:'insecure'},{text:'SSH (port 22)',cat:'secure'},
  {text:'Telnet (port 23)',cat:'insecure'},{text:'HTTPS (port 443)',cat:'secure'},
  {text:'LDAP (port 389)',cat:'insecure'},{text:'LDAPS (port 636)',cat:'secure'},
  {text:'FTP (port 21)',cat:'insecure'},{text:'SFTP (port 22)',cat:'secure'},
  {text:'SNMPv1',cat:'insecure'},{text:'RDP with NLA',cat:'secure'},
];
function buildDragDrop1(){
  const src=document.getElementById('dd-source-1');src.innerHTML='';
  [...dd1Items].sort(()=>Math.random()-.5).forEach(item=>{const el=document.createElement('div');el.className='drag-item';el.draggable=true;el.textContent=item.text;el.dataset.cat=item.cat;setupDrag(el);src.appendChild(el);});
  ['dz-sym','dz-asym'].forEach(id=>{const dz=document.getElementById(id);dz.innerHTML='<div class="drop-zone-label">Drop here</div>';setupDrop(dz);});
  document.getElementById('dd1-feedback').className='feedback';document.getElementById('dd1-feedback').innerHTML='';
}
function checkDragDrop1(){
  let correct=0,total=dd1Items.length;
  ['dz-sym','dz-asym'].forEach(dzId=>{document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el=>{const ok=el.dataset.cat===document.getElementById(dzId).dataset.cat;el.classList.add(ok?'correct':'wrong');if(ok)correct++;});});
  const fb=document.getElementById('dd1-feedback');
  fb.className=`feedback show ${correct===total?'correct':'wrong'}`;
  fb.innerHTML=correct===total?`✓ Perfect! All protocols correctly classified.`:`<strong>${correct}/${total} correct.</strong> Insecure: HTTP, Telnet, LDAP, FTP, SNMPv1 — all cleartext. Secure: SSH, HTTPS, LDAPS, SFTP, RDP with NLA.`;
}
function resetDragDrop1(){buildDragDrop1();}

const dd2Items=[
  {text:'Client-side, filters outbound web traffic',cat:'seg'},
  {text:'Server-side, TLS termination + WAF',cat:'hard'},
  {text:'Blocks/allows traffic by IP + port + state',cat:'seg'},
  {text:'DPI, app-aware, user identity',cat:'hard'},
  {text:'Per-app access, no network-level trust',cat:'ac'},
  {text:'Device posture check before network join',cat:'ac'},
  {text:'Passive copy of traffic to monitoring port',cat:'seg'},
  {text:'Inline, blocks detected attacks',cat:'hard'},
];
function buildDragDrop2(){
  const src=document.getElementById('dd-source-2');src.innerHTML='';
  [...dd2Items].sort(()=>Math.random()-.5).forEach(item=>{const el=document.createElement('div');el.className='drag-item';el.draggable=true;el.textContent=item.text;el.dataset.cat=item.cat;setupDrag(el);src.appendChild(el);});
  ['dz-seg','dz-hard','dz-ac'].forEach(id=>{const dz=document.getElementById(id);dz.innerHTML='<div class="drop-zone-label">Drop here</div>';setupDrop(dz);});
  document.getElementById('dd2-feedback').className='feedback';document.getElementById('dd2-feedback').innerHTML='';
}
function checkDragDrop2(){
  let correct=0,total=dd2Items.length;
  ['dz-seg','dz-hard','dz-ac'].forEach(dzId=>{document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el=>{const ok=el.dataset.cat===document.getElementById(dzId).dataset.cat;el.classList.add(ok?'correct':'wrong');if(ok)correct++;});});
  const fb=document.getElementById('dd2-feedback');
  fb.className=`feedback show ${correct===total?'correct':'wrong'}`;
  fb.innerHTML=correct===total?`✓ Perfect!`:`<strong>${correct}/${total} correct.</strong> Forward proxy/SPAN port/stateful firewall = network controls. Reverse proxy+WAF/NGFW/IPS = inspection/prevention. ZTNA/NAC = access control.`;
}
function resetDragDrop2(){buildDragDrop2();}
window.buildDragDrop1=buildDragDrop1;window.checkDragDrop1=checkDragDrop1;window.resetDragDrop1=resetDragDrop1;
window.buildDragDrop2=buildDragDrop2;window.checkDragDrop2=checkDragDrop2;window.resetDragDrop2=resetDragDrop2;
