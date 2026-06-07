// ─────────────────────────────────────────────────────────────
//  FLASHCARD DATA + LOGIC
// ─────────────────────────────────────────────────────────────

window.allFlashcards = [
  // CRYPTO
  { q:'What is the difference between hashing and encryption?', a:'Hashing is ONE-WAY — you cannot reverse it. It produces a fixed-length digest for integrity verification. Encryption is TWO-WAY — data can be decrypted with the right key. Hashing = integrity. Encryption = confidentiality.', cat:'crypto' },
  { q:'What three security goals does a digital signature provide?', a:'Authentication (who sent it) + Integrity (was it changed?) + Non-repudiation (sender cannot deny it). Does NOT inherently provide confidentiality — combine with encryption if needed.', cat:'crypto' },
  { q:'Why is ECC preferred over RSA for IoT and mobile?', a:'256-bit ECC ≈ 3072-bit RSA in security strength. Smaller keys = less compute = less battery = faster. Critical for resource-constrained devices.', cat:'crypto' },
  { q:'What is the purpose of salting a password hash?', a:'A salt is a random value added before hashing. Even identical passwords produce different hashes. Defeats rainbow tables and precomputed hash attacks. Stored alongside the hash in the database.', cat:'crypto' },
  { q:'What is OCSP Stapling and why is it better than plain OCSP?', a:'Server caches its own OCSP response and presents it in the TLS handshake. Client doesn\'t need to contact the OCSP responder directly. Reduces latency, removes OCSP responder as a dependency, improves privacy.', cat:'crypto' },
  { q:'Root CA vs Intermediate CA — key difference?', a:'Root CA: self-signed, top of trust chain, should be OFFLINE/air-gapped. Intermediate CA: signed by root, online, issues end-entity certs. Intermediate compromise is isolated — root remains trusted.', cat:'crypto' },
  { q:'HSM vs TPM — what\'s the key difference?', a:'HSM: dedicated enterprise appliance for crypto ops at scale. Keys never leave in plaintext. Used by CAs, banks, cloud providers. TPM: chip on a motherboard for device-level key storage, secure boot, attestation — personal/workstation use.', cat:'crypto' },
  { q:'Steganography vs encryption — what\'s the difference?', a:'Encryption hides MEANING (scrambles data). Steganography hides EXISTENCE (embeds data in a carrier file). A stego\'d image looks like a normal photo. An encrypted file is obviously ciphertext.', cat:'crypto' },
  { q:'What is key escrow and why is it controversial?', a:'A copy of a private key held by a trusted third party for recovery or lawful access. Controversial because: (1) the escrow copy is a high-value target, (2) government access can be abused.', cat:'crypto' },
  { q:'In TLS, asymmetric crypto is used first — then what?', a:'Asymmetric (ECDH or RSA) establishes a shared secret during the handshake. Both sides derive symmetric session keys (AES). All bulk data encrypts with AES — asymmetric is too slow for ongoing traffic.', cat:'crypto' },
  { q:'What is Forward Secrecy (PFS) and why does it matter?', a:'Ephemeral session keys are generated per-session and discarded after. If the long-term private key is compromised later, past sessions cannot be decrypted because the session keys no longer exist.', cat:'crypto' },
  { q:'What does HMAC add that a plain hash does not?', a:'HMAC incorporates a shared secret key into the hash computation. A plain hash proves integrity only (anyone can hash anything). HMAC proves integrity AND that the sender knows the shared key.', cat:'crypto' },
  // ARCH
  { q:'What are the three Zero Trust control plane components?', a:'Policy Engine (PE): evaluates access decisions. Policy Administrator (PA): issues/revokes session tokens. Policy Enforcement Point (PEP): gatekeeper that allows or blocks actual traffic. PE+PA = control plane. PEP = data plane.', cat:'arch' },
  { q:'What is adaptive identity in Zero Trust?', a:'Trust score adjusts dynamically based on risk signals: location, time, device health, behavior. Unusual login → step-up MFA. Risky behavior → session termination. Trust is never permanently granted.', cat:'arch' },
  { q:'IaaS vs PaaS vs SaaS — who manages what?', a:'IaaS: customer manages OS→app→data. Provider manages physical+hypervisor. PaaS: customer manages app+data. Provider manages OS+runtime+below. SaaS: customer manages data and user access only.', cat:'arch' },
  { q:'Why can\'t you just patch an ICS/SCADA system like a normal server?', a:'Proprietary/legacy OS, no vendor patching support, can\'t tolerate downtime (24/7 industrial ops), patching can void vendor certification, active scanning can crash PLCs. Mitigations: isolate, passive monitor, unidirectional gateways.', cat:'arch' },
  { q:'RBAC vs ABAC — when does the exam pick each?', a:'RBAC: "based on job role/function" — most common in enterprise. ABAC: scenario describes multiple simultaneous conditions (dept AND device type AND time AND location). Multiple dynamic conditions = ABAC.', cat:'arch' },
  { q:'Honeypot vs sandbox — what\'s the difference?', a:'Honeypot: decoy SYSTEM to detect attackers — any connection is suspicious. Detection tool. Sandbox: isolated ENVIRONMENT to safely execute untrusted code. Analysis/containment tool.', cat:'arch' },
  { q:'What is defense in depth?', a:'Multiple overlapping security controls across technical, administrative, and physical layers. If one fails, others compensate. No single point of reliance. Firewall + IDS + EDR + DLP + training = defense in depth.', cat:'arch' },
  { q:'What is micro-segmentation?', a:'Granular workload-level segmentation. Controls east-west (lateral) traffic between individual servers — not just perimeter north-south traffic. A compromised server can only reach explicitly permitted destinations. Core Zero Trust data center control.', cat:'arch' },
  { q:'What is separation of duties?', a:'Divides sensitive tasks among multiple people so no single person can complete a high-risk action alone. Example: one person initiates a wire transfer, a different person approves it. Prevents fraud and insider threats.', cat:'arch' },
  { q:'What is the shared responsibility model in cloud?', a:'Security duties split between provider and customer. Provider: physical security, hypervisor, core infrastructure. Customer: data classification, access management, app security. Boundary shifts per model: IaaS > PaaS > SaaS = more provider responsibility.', cat:'arch' },
];

// ─── FLASHCARD STATE ───────────────────────────────────────────
let fcState = {
  all:  [...window.allFlashcards],
  deck: [...window.allFlashcards],
  idx:  0,
  flipped: false,
};

function renderFC() {
  const card = document.getElementById('flashcard');
  card.classList.remove('flipped');
  fcState.flipped = false;
  const cur = fcState.deck[fcState.idx];
  document.getElementById('fc-question').textContent = cur.q;
  document.getElementById('fc-answer').textContent   = cur.a;
  document.getElementById('fc-progress').textContent = `${fcState.idx + 1} / ${fcState.deck.length}`;
}

function flipCard() {
  fcState.flipped = !fcState.flipped;
  document.getElementById('flashcard').classList.toggle('flipped', fcState.flipped);
}

function nextCard() {
  document.getElementById('flashcard').classList.remove('flipped');
  fcState.flipped = false;
  setTimeout(() => {
    fcState.idx = (fcState.idx + 1) % fcState.deck.length;
    const cur = fcState.deck[fcState.idx];
    document.getElementById('fc-question').textContent = cur.q;
    document.getElementById('fc-answer').textContent   = cur.a;
    document.getElementById('fc-progress').textContent = `${fcState.idx + 1} / ${fcState.deck.length}`;
  }, 250);
}

function prevCard() {
  document.getElementById('flashcard').classList.remove('flipped');
  fcState.flipped = false;
  setTimeout(() => {
    fcState.idx = (fcState.idx - 1 + fcState.deck.length) % fcState.deck.length;
    const cur = fcState.deck[fcState.idx];
    document.getElementById('fc-question').textContent = cur.q;
    document.getElementById('fc-answer').textContent   = cur.a;
    document.getElementById('fc-progress').textContent = `${fcState.idx + 1} / ${fcState.deck.length}`;
  }, 250);
}

function filterCards(cat) {
  document.querySelectorAll('.fc-filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`filter-${cat}`).classList.add('active');
  fcState.deck = cat === 'all' ? [...fcState.all] : fcState.all.filter(c => c.cat === cat);
  fcState.idx  = 0;
  renderFC();
}

function shuffleCards() {
  fcState.deck = [...fcState.deck].sort(() => Math.random() - 0.5);
  fcState.idx  = 0;
  renderFC();
}

// Expose
window.flipCard    = flipCard;
window.nextCard    = nextCard;
window.prevCard    = prevCard;
window.filterCards = filterCards;
window.shuffleCards= shuffleCards;
window.renderFC    = renderFC;
