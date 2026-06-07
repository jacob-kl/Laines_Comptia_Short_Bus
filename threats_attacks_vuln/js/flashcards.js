window.allFlashcards = [
  { q:'What is the difference between phishing, spear phishing, and whaling?', a:'Phishing: mass email with generic lure. Spear phishing: targeted at a specific person using researched personal details. Whaling: spear phishing specifically targeting executives (CEO, CFO, board members). All use impersonation to steal credentials or deliver malware.', cat:'se' },
  { q:'What is a watering hole attack and why is it hard to defend against?', a:'Attacker compromises a website frequented by the target group and injects malware. Hard to defend: the victim trusts the compromised site (industry forum, supplier portal). Defenders have no direct control over third-party sites. Detection: web proxy logs, EDR alerts on drive-by downloads.', cat:'se' },
  { q:'What is Business Email Compromise (BEC) and what are the red flags?', a:'BEC spoofs or compromises executive email to authorize fraudulent wire transfers or data disclosure. Red flags: urgency, requests for secrecy, slight domain misspelling, bypass of normal approval process. Mitigation: out-of-band verification, DMARC/SPF/DKIM, enforce wire transfer controls.', cat:'se' },
  { q:'What is double-extortion ransomware and why does it defeat the backup strategy?', a:'Single extortion: encrypt files, ransom for key → backups defeat this. Double extortion: encrypt AND exfiltrate data, threatening to publish if ransom isn\'t paid → even with good backups, the stolen data can still be leaked. Requires DLP and network segmentation as additional mitigations.', cat:'malware' },
  { q:'What makes a rootkit different from other malware?', a:'A rootkit hides itself and other malware at the OS or kernel level by intercepting system calls. It can mask processes, files, and network connections from antivirus and EDR. Kernel-level (Ring 0) rootkits are the hardest to detect. Detection requires offline scanning, TPM attestation, or Secure Boot.', cat:'malware' },
  { q:'How does ARP poisoning enable a MITM attack?', a:'ARP resolves IP addresses to MAC addresses on a LAN. ARP poisoning sends fake ARP replies, associating the attacker\'s MAC with the default gateway\'s IP. All victim traffic destined for the gateway now flows through the attacker — enabling interception, modification, and forwarding.', cat:'network' },
  { q:'SQL injection vs XSS — what\'s the key difference?', a:'SQLi: injects SQL syntax into database queries. Target: the DATABASE. Fix: parameterized queries. XSS: injects JavaScript that runs in users\' browsers. Target: OTHER USERS\'s browsers/sessions. Fix: output encoding + Content Security Policy (CSP). Both exploit insufficient input validation but attack completely different targets.', cat:'app' },
  { q:'What is a zero-day vulnerability?', a:'A vulnerability unknown to the software vendor — "zero days" to patch because no patch exists. Exploited by APTs and nation-states before disclosure. Once disclosed it becomes a CVE. No patch = primary mitigations are defense in depth, behavioral EDR, and network segmentation — not patching.', cat:'vuln' },
  { q:'What is a supply chain attack and what makes it so effective?', a:'Attacking a vendor, software update mechanism, or third-party library used by the actual target. Effective because: (1) the target trusts the vendor, (2) malicious code arrives pre-authenticated, (3) bypasses all perimeter defenses. Examples: SolarWinds SUNBURST, Log4Shell, typosquatting npm packages.', cat:'vuln' },
  { q:'What are the three insider threat types?', a:'Malicious: intentionally steals/sabotages (has access AND intent). Negligent: accidental breach through carelessness (clicks phishing, misconfigures S3 bucket). Compromised: credentials stolen, attacker uses legitimate access. Mitigations: least privilege, UEBA, DLP, separation of duties, offboarding procedures.', cat:'vuln' },
  { q:'What is C2 beaconing and how do defenders detect it?', a:'Malware regularly contacts its Command & Control server at a fixed interval (beacon interval) to receive instructions. Detection: regular outbound connections to external IPs at consistent intervals, small data transfers, connections to newly registered domains, DNS queries with unusually long subdomains (DNS tunneling).', cat:'network' },
  { q:'What is DNS tunneling and why does it bypass firewalls?', a:'Encodes exfiltrated data within DNS query/response packets. Bypasses firewalls because DNS traffic (port 53) is almost never blocked — it\'s required for normal internet operation. Defenders look for: high DNS query volume from single host, unusually long subdomain strings, queries to rare external domains.', cat:'network' },
  { q:'Stored XSS vs Reflected XSS — key difference?', a:'Stored (Persistent): malicious script saved to the database, served to EVERY visitor who views the infected page. Most dangerous — no crafted link needed. Reflected: script in URL, executes only for the victim who clicks that specific link. Both steal session cookies and bypass same-origin policy — fix is output encoding + CSP.', cat:'app' },
  { q:'What mitigations protect against buffer overflow?', a:'ASLR (Address Space Layout Randomization): randomizes memory layout so attacker can\'t predict where to jump. DEP/NX (Data Execution Prevention): marks stack non-executable, blocks shellcode. Stack canaries: sentinel values detect overflow before return. Safe functions: use bounds-checking alternatives to strcpy, gets, etc.', cat:'app' },
  { q:'Virus vs worm — key difference?', a:'Virus: requires a host file AND user action to spread (open infected document, run program). Worm: standalone, self-replicates autonomously across networks by exploiting vulnerabilities. No user action needed. Worms spread faster. Both can carry the same payloads (ransomware, RAT) — the difference is propagation mechanism.', cat:'malware' },
  { q:'What is a SYN flood and how does it work?', a:'Sends many TCP SYN packets to a server but never completes the three-way handshake (never sends ACK). Server allocates resources for each half-open connection and waits. Connection table fills up. Legitimate users can\'t connect. Mitigation: SYN cookies (server doesn\'t allocate resources until ACK received), rate limiting.', cat:'network' },
  { q:'What is typosquatting?', a:'Registering domain names or package names that closely mimic legitimate ones, relying on typos. Web: paypa1.com, arnazon.com. npm/pip packages: lodash-utils, reqeusts. Goal: capture traffic/installations from users who mistype. Supply chain variant is especially dangerous in software development.', cat:'se' },
  { q:'What does UEBA stand for and what threat does it specifically address?', a:'User and Entity Behavior Analytics. Establishes behavioral baselines for users and systems, then alerts on anomalies: unusual login times/locations, abnormal data access volume, unexpected system-to-system communication. Specifically addresses: insider threats, compromised credentials, APT lateral movement that evades signature-based detection.', cat:'vuln' },
];

let fcState = { all:[...window.allFlashcards], deck:[...window.allFlashcards], idx:0, flipped:false };

function renderFC() {
  const card = document.getElementById('flashcard');
  if(!card) return;
  card.classList.remove('flipped');
  fcState.flipped = false;
  const cur = fcState.deck[fcState.idx];
  document.getElementById('fc-question').textContent = cur.q;
  document.getElementById('fc-answer').textContent = cur.a;
  document.getElementById('fc-progress').textContent = `${fcState.idx+1} / ${fcState.deck.length}`;
}
function flipCard() { fcState.flipped=!fcState.flipped; document.getElementById('flashcard').classList.toggle('flipped',fcState.flipped); }
function nextCard() {
  document.getElementById('flashcard').classList.remove('flipped'); fcState.flipped=false;
  setTimeout(()=>{ fcState.idx=(fcState.idx+1)%fcState.deck.length; renderFC(); },250);
}
function prevCard() {
  document.getElementById('flashcard').classList.remove('flipped'); fcState.flipped=false;
  setTimeout(()=>{ fcState.idx=(fcState.idx-1+fcState.deck.length)%fcState.deck.length; renderFC(); },250);
}
function filterCards(cat) {
  document.querySelectorAll('.fc-filter-btn').forEach(b=>b.classList.remove('active'));
  const btn = document.getElementById(`filter-${cat}`);
  if(btn) btn.classList.add('active');
  fcState.deck = cat==='all' ? [...fcState.all] : fcState.all.filter(c=>c.cat===cat);
  fcState.idx=0; renderFC();
}
function shuffleCards() {
  fcState.deck=[...fcState.deck].sort(()=>Math.random()-.5); fcState.idx=0; renderFC();
}
window.flipCard=flipCard; window.nextCard=nextCard; window.prevCard=prevCard;
window.filterCards=filterCards; window.shuffleCards=shuffleCards; window.renderFC=renderFC;
