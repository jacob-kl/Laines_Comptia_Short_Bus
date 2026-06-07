// ─────────────────────────────────────────────────────────────
//  DRAG & DROP LAB
// ─────────────────────────────────────────────────────────────

let dragItem = null;

function setupDrag(el) {
  el.addEventListener('dragstart', () => { dragItem = el; el.classList.add('dragging'); });
  el.addEventListener('dragend',   () => { dragItem = null; el.classList.remove('dragging'); });
}

function setupDrop(zone) {
  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', ()  => zone.classList.remove('over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('over');
    if (dragItem) {
      const lbl = zone.querySelector('.drop-zone-label');
      if (lbl) lbl.remove();
      zone.appendChild(dragItem);
      setupDrag(dragItem);
    }
  });
}

// ─── ROUND 1: Sym / Asym / Hash ───────────────────────────────
const dd1Items = [
  { text:'AES-256',        cat:'sym'  },
  { text:'RSA-2048',       cat:'asym' },
  { text:'SHA-256',        cat:'hash' },
  { text:'ECC / ECDSA',    cat:'asym' },
  { text:'ChaCha20',       cat:'sym'  },
  { text:'MD5',            cat:'hash' },
  { text:'Diffie-Hellman', cat:'asym' },
  { text:'3DES',           cat:'sym'  },
  { text:'HMAC-SHA256',    cat:'hash' },
];

function buildDragDrop1() {
  const src = document.getElementById('dd-source-1');
  src.innerHTML = '';
  [...dd1Items].sort(() => Math.random() - 0.5).forEach(item => {
    const el = document.createElement('div');
    el.className = 'drag-item';
    el.draggable = true;
    el.textContent = item.text;
    el.dataset.cat = item.cat;
    setupDrag(el);
    src.appendChild(el);
  });
  ['dz-sym','dz-asym','dz-hash'].forEach(id => {
    const dz = document.getElementById(id);
    dz.innerHTML = '<div class="drop-zone-label">Drop here</div>';
    setupDrop(dz);
  });
  const fb = document.getElementById('dd1-feedback');
  fb.className = 'feedback';
  fb.innerHTML  = '';
  document.querySelectorAll('#drag-round-1 .drag-item').forEach(el => el.classList.remove('correct','wrong'));
}

function checkDragDrop1() {
  let correct = 0;
  const total = dd1Items.length;
  ['dz-sym','dz-asym','dz-hash'].forEach(dzId => {
    document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el => {
      const ok = el.dataset.cat === document.getElementById(dzId).dataset.cat;
      el.classList.add(ok ? 'correct' : 'wrong');
      if (ok) correct++;
    });
  });
  const fb = document.getElementById('dd1-feedback');
  fb.className = `feedback show ${correct === total ? 'correct' : 'wrong'}`;
  fb.innerHTML = correct === total
    ? `✓ Perfect! All ${total} items correctly sorted.`
    : `<strong>${correct}/${total} correct.</strong> Red items are in the wrong column.<br>
       Symmetric: AES-256, 3DES, ChaCha20<br>
       Asymmetric: RSA-2048, ECC/ECDSA, Diffie-Hellman<br>
       Hashing: SHA-256, MD5, HMAC-SHA256`;
}

function resetDragDrop1() { buildDragDrop1(); }

// ─── ROUND 2: Mitigation matching ─────────────────────────────
const dd2Items = [
  { text:'Isolate IoT from workstations',       cat:'seg'  },
  { text:'Disable Telnet, close port 23',       cat:'hard' },
  { text:'Finance role can\'t access HR files', cat:'ac'   },
  { text:'Contain OT network from corporate',  cat:'seg'  },
  { text:'Remove default guest account',        cat:'hard' },
  { text:'RBAC limits admin rights',            cat:'ac'   },
  { text:'Place public server in DMZ',          cat:'seg'  },
  { text:'Apply latest OS security patches',    cat:'hard' },
];

function buildDragDrop2() {
  const src = document.getElementById('dd-source-2');
  src.innerHTML = '';
  [...dd2Items].sort(() => Math.random() - 0.5).forEach(item => {
    const el = document.createElement('div');
    el.className = 'drag-item';
    el.draggable = true;
    el.textContent = item.text;
    el.dataset.cat = item.cat;
    setupDrag(el);
    src.appendChild(el);
  });
  ['dz-seg','dz-hard','dz-ac'].forEach(id => {
    const dz = document.getElementById(id);
    dz.innerHTML = '<div class="drop-zone-label">Drop here</div>';
    setupDrop(dz);
  });
  const fb = document.getElementById('dd2-feedback');
  fb.className = 'feedback';
  fb.innerHTML  = '';
}

function checkDragDrop2() {
  let correct = 0;
  const total = dd2Items.length;
  ['dz-seg','dz-hard','dz-ac'].forEach(dzId => {
    document.getElementById(dzId).querySelectorAll('.drag-item').forEach(el => {
      const ok = el.dataset.cat === document.getElementById(dzId).dataset.cat;
      el.classList.add(ok ? 'correct' : 'wrong');
      if (ok) correct++;
    });
  });
  const fb = document.getElementById('dd2-feedback');
  fb.className = `feedback show ${correct === total ? 'correct' : 'wrong'}`;
  fb.innerHTML = correct === total
    ? `✓ Perfect! All techniques correctly matched.`
    : `<strong>${correct}/${total} correct.</strong><br>
       Segmentation: isolate networks, zones, DMZ<br>
       Hardening: disable/remove defaults, patch<br>
       Access Control: restrict permissions by role or policy`;
}

function resetDragDrop2() { buildDragDrop2(); }

// Expose
window.buildDragDrop1  = buildDragDrop1;
window.checkDragDrop1  = checkDragDrop1;
window.resetDragDrop1  = resetDragDrop1;
window.buildDragDrop2  = buildDragDrop2;
window.checkDragDrop2  = checkDragDrop2;
window.resetDragDrop2  = resetDragDrop2;
