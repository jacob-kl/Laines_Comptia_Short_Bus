// ─────────────────────────────────────────────────────────────
//  MODULE 2: THREATS, ATTACKS & VULNERABILITIES
//  Concepts + 24-question bank for each quiz domain
// ─────────────────────────────────────────────────────────────

window.threatConcepts = [
  { label:'Social Engineering', term:'Phishing / Spear Phishing / Whaling', def:'Phishing: mass email impersonating trusted entity to steal credentials or deliver malware. Spear phishing: targeted at a specific person using personalized info. Whaling: spear phishing specifically targeting executives (CEO, CFO). Vishing = phone-based. Smishing = SMS-based.', tags:['integ'] },
  { label:'Social Engineering', term:'Pretexting & Impersonation', def:'Attacker fabricates a scenario (pretext) to manipulate a target into revealing information. Example: calling IT helpdesk pretending to be an executive who forgot their password. Impersonation = posing as a specific trusted entity (vendor, IT, law enforcement).', tags:['integ'] },
  { label:'Social Engineering', term:'Business Email Compromise (BEC)', def:'Attacker compromises or spoofs a business email account — often an executive — to redirect wire transfers, change payment details, or authorize fraudulent transactions. Extremely high-dollar attack vector. Hard to detect because it often exploits legitimate trust relationships.', tags:['integ'] },
  { label:'Social Engineering', term:'Watering Hole Attack', def:'Attacker compromises a website frequently visited by the target group (an industry forum, supplier portal). Anyone who visits gets served malware. Named after predators waiting at water sources. Hard to detect — targets a trusted site, not the victim directly.', tags:['integ'] },
  { label:'Malware', term:'Ransomware', def:'Encrypts victim files and demands payment for the decryption key. Modern ransomware is double-extortion: encrypt AND exfiltrate data, threatening to publish it if ransom is unpaid. Delivered via phishing, RDP exploits, or supply chain. Mitigate: offline backups, EDR, network segmentation.', tags:['avail','conf'] },
  { label:'Malware', term:'RAT / Trojan / Backdoor', def:'RAT (Remote Access Trojan): malware that gives attacker remote control over infected system. Trojan: malware disguised as legitimate software. Backdoor: hidden access mechanism installed by malware or malicious insider. All provide persistent unauthorized access.', tags:['conf','integ'] },
  { label:'Malware', term:'Rootkit', def:'Malware that hides itself and other malware at the OS or firmware level — can intercept system calls to mask its presence from AV/EDR. Ring 0 (kernel) rootkits are the hardest to detect. Bootkits infect the boot sector. Detection: offline scanning, TPM attestation, secure boot.', tags:['conf','integ'] },
  { label:'Malware', term:'Keylogger & Spyware', def:'Keylogger: records keystrokes to capture credentials, credit cards, PII. Spyware: broader surveillance malware that collects browsing history, screenshots, microphone/webcam access. Both operate silently. Mitigation: EDR, application allowlisting, MFA (even if password is captured, second factor blocks login).', tags:['conf'] },
  { label:'Network Attack', term:'Man-in-the-Middle (MITM)', def:'Attacker positions between two communicating parties, intercepting and potentially modifying traffic. Examples: ARP poisoning on LAN, rogue Wi-Fi hotspot, SSL stripping. Mitigation: TLS with certificate pinning, HSTS, MFA, network monitoring for ARP anomalies.', tags:['conf','integ'] },
  { label:'Network Attack', term:'DoS / DDoS', def:'DoS: overwhelm a target with traffic/requests to make it unavailable. DDoS: distributed — uses botnet of compromised systems. Types: volumetric (bandwidth flood), protocol (SYN flood, Smurf), application layer (HTTP flood targeting app logic). Mitigation: CDN, rate limiting, upstream filtering, BGP blackholing.', tags:['avail'] },
  { label:'Network Attack', term:'DNS Attacks', def:'DNS Poisoning/Spoofing: corrupt DNS cache to redirect users to malicious sites. DNS Hijacking: alter DNS records at registrar or resolver level. DNS Tunneling: encode data in DNS queries to exfiltrate data through DNS (bypasses firewalls). DNSSEC protects against poisoning.', tags:['integ','conf'] },
  { label:'Application Attack', term:'SQL Injection (SQLi)', def:'Attacker injects malicious SQL into input fields to manipulate the database. Can bypass authentication (\'OR\'1\'=\'1), dump tables, modify data, or execute OS commands. Mitigation: parameterized queries (prepared statements), input validation, WAF, least-privilege DB accounts.', tags:['conf','integ'] },
  { label:'Application Attack', term:'Cross-Site Scripting (XSS)', def:'Attacker injects malicious JavaScript into a web page that executes in victims\' browsers. Stored XSS: persisted in DB, served to every visitor. Reflected XSS: in URL, executes when victim clicks link. DOM-based: modifies DOM without server involvement. Mitigation: output encoding, Content Security Policy (CSP), input validation.', tags:['conf','integ'] },
  { label:'Application Attack', term:'Buffer Overflow', def:'Attacker writes more data to a buffer than it can hold, overwriting adjacent memory — including return addresses. Can enable arbitrary code execution. Classic attack against C/C++ programs without bounds checking. Mitigations: ASLR (randomizes memory layout), DEP/NX (marks stack non-executable), stack canaries, safe functions.', tags:['integ','avail'] },
  { label:'Vulnerability', term:'CVE & Zero-Day', def:'CVE (Common Vulnerabilities and Exposures): standardized identifier for known vulnerabilities. CVSS: scoring system (0-10) for severity. Zero-day: vulnerability unknown to the vendor — no patch exists. Exploited by APTs and nation-states. Mitigation for zero-days: defense in depth, behavioral EDR, network segmentation (can\'t patch what you don\'t know about).', tags:['integ','conf'] },
  { label:'Vulnerability', term:'Supply Chain Attack', def:'Attacker compromises a vendor, software update mechanism, or third-party library used by the target. The target installs the compromised software thinking it\'s legitimate. Examples: SolarWinds (malicious update), Log4Shell (vulnerable library), typosquatting (fake npm package). Hard to defend: you trust the source.', tags:['integ','conf'] },
  { label:'Insider Threat', term:'Insider Threat Types', def:'Malicious insider: intentionally steals data or sabotages systems. Negligent insider: accidentally causes breach (clicks phishing link, misconfigures storage). Compromised insider: credential stolen, attacker uses it. Mitigations: least privilege, separation of duties, UBA/UEBA (behavioral analytics), DLP, offboarding procedures.', tags:['conf','integ'] },
  { label:'Indicators', term:'IoC — Indicators of Compromise', def:'Evidence that a system has been breached: unusual outbound traffic, unexpected processes, modified system files, new admin accounts, lateral movement patterns, C2 beaconing, large data transfers. SIEM correlates IoCs. Threat intelligence feeds provide known malicious IPs/hashes/domains.', tags:['integ'] },
];

window.threatBank = [
  {
    q: 'A financial controller receives an email appearing to be from the CEO, urgently requesting a wire transfer to a new vendor account. The email domain is slightly misspelled. What attack is this?',
    choices: [
      { text:'Vishing', correct:false, why:'Vishing is voice phishing — conducted over phone calls. This attack used email, not a phone call.' },
      { text:'Business Email Compromise (BEC)', correct:true, why:'BEC involves spoofing or compromising a business email (often an executive\'s) to authorize fraudulent financial transactions. The urgency, wire transfer, and executive impersonation are classic BEC indicators.' },
      { text:'Watering hole attack', correct:false, why:'A watering hole attack compromises a website frequented by targets. This attack arrived via email directly targeting the financial controller.' },
      { text:'SQL injection', correct:false, why:'SQL injection is an application-layer attack targeting databases via input fields. It has nothing to do with email-based financial fraud.' },
    ]
  },
  {
    q: 'An attacker compromises a popular security conference website that many pentesters visit. Malicious code is injected so that any visitor automatically downloads malware. What attack type is this?',
    choices: [
      { text:'Spear phishing', correct:false, why:'Spear phishing sends targeted emails. This attack doesn\'t involve email — visitors are compromised just by visiting a website.' },
      { text:'Watering hole attack', correct:true, why:'A watering hole attack compromises a website frequently visited by the target group. Like a predator waiting at a water source, the attacker waits for victims to come to them. The security conference site is the "watering hole" for pentesters.' },
      { text:'Pretexting', correct:false, why:'Pretexting involves fabricating a scenario to manipulate someone into revealing information. This is a passive technical attack on a website, not a social manipulation scenario.' },
      { text:'Ransomware', correct:false, why:'Ransomware encrypts files for ransom. While ransomware could be the payload delivered, the attack TYPE described — compromising a site frequented by targets — is a watering hole attack.' },
    ]
  },
  {
    q: 'A user\'s files have been encrypted and they receive a message demanding cryptocurrency payment. The attackers also claim to have stolen the files and will publish them if payment is not received. What describes this threat?',
    choices: [
      { text:'Single-extortion ransomware', correct:false, why:'Single-extortion ransomware only encrypts files. The scenario describes BOTH encryption AND data theft with publication threat — that\'s double-extortion.' },
      { text:'Double-extortion ransomware', correct:true, why:'Double-extortion ransomware both encrypts files (demanding ransom for decryption key) AND exfiltrates data (threatening publication if ransom is unpaid). This dramatically increases pressure on victims and makes backups alone insufficient.' },
      { text:'Spyware', correct:false, why:'Spyware silently collects information but does not encrypt files or demand ransom. It\'s a surveillance tool, not an extortion mechanism.' },
      { text:'Rootkit', correct:false, why:'A rootkit hides malware at the OS/kernel level. While ransomware might use a rootkit component, the defining characteristics described — file encryption plus extortion — define ransomware, not rootkit.' },
    ]
  },
  {
    q: 'A security tool detects malware that has modified the OS kernel and is intercepting system calls to hide its processes from the task manager and antivirus. What type of malware is this?',
    choices: [
      { text:'Keylogger', correct:false, why:'A keylogger records keystrokes. It operates at the application or driver level but doesn\'t typically modify the kernel or intercept system calls to hide other processes.' },
      { text:'Rootkit', correct:true, why:'A rootkit hides itself and other malware at the OS or kernel level by intercepting system calls. This allows it to mask processes, files, and network connections from security tools. Kernel-level (Ring 0) rootkits are the hardest to detect and remove.' },
      { text:'Worm', correct:false, why:'A worm self-replicates across networks. While worms can carry other payloads, the defining characteristic here — hiding at the kernel level via system call interception — is a rootkit.' },
      { text:'Spyware', correct:false, why:'Spyware collects information about a user. While it may operate stealthily, it doesn\'t typically modify the OS kernel or intercept system calls to hide other processes.' },
    ]
  },
  {
    q: 'An attacker on the same local network segment as a victim sends crafted ARP replies, associating the attacker\'s MAC address with the default gateway\'s IP. All victim traffic now flows through the attacker\'s machine. What is this attack?',
    choices: [
      { text:'DNS poisoning', correct:false, why:'DNS poisoning corrupts DNS cache entries to redirect users to malicious IPs. ARP (Address Resolution Protocol) operates at Layer 2 to resolve IP addresses to MAC addresses — a separate mechanism.' },
      { text:'ARP poisoning (MITM)', correct:true, why:'ARP poisoning sends fake ARP replies to associate the attacker\'s MAC with a legitimate IP (like the default gateway). All traffic destined for that IP now flows through the attacker, enabling a Man-in-the-Middle (MITM) attack on the local network.' },
      { text:'SYN flood', correct:false, why:'A SYN flood is a DoS attack that exhausts server resources by sending many TCP SYN packets without completing the handshake. It doesn\'t intercept traffic or involve ARP.' },
      { text:'Smurf attack', correct:false, why:'A Smurf attack amplifies traffic by sending ICMP echo requests to a broadcast address, spoofing the victim\'s IP so all replies flood the victim. It\'s a DoS/DDoS amplification attack, not an interception attack.' },
    ]
  },
  {
    q: 'A developer writes a login form where user input is directly concatenated into a SQL query: SELECT * FROM users WHERE username=\'[input]\'. An attacker enters: \' OR \'1\'=\'1. What attack is this and what is the correct fix?',
    choices: [
      { text:'XSS; fix with output encoding', correct:false, why:'XSS injects JavaScript that runs in a browser. This attack injects SQL that runs against a database. Different attack, different fix.' },
      { text:'SQL injection; fix with parameterized queries', correct:true, why:'SQL injection manipulates database queries by injecting SQL via input fields. The input \' OR \'1\'=\'1 causes the WHERE clause to always be true, bypassing authentication. Parameterized queries (prepared statements) separate SQL code from data, making injection impossible.' },
      { text:'Buffer overflow; fix with ASLR', correct:false, why:'Buffer overflow overwrites memory by exceeding buffer capacity. This attack manipulates a SQL query via a web form input, not by writing past memory boundaries.' },
      { text:'CSRF; fix with anti-CSRF tokens', correct:false, why:'CSRF (Cross-Site Request Forgery) tricks an authenticated user\'s browser into making unintended requests. This attack manipulates database queries via input injection — a different attack requiring a different fix.' },
    ]
  },
  {
    q: 'An attacker injects malicious JavaScript into a product review field on an e-commerce site. Every user who views that product page now executes the script, which steals their session cookies. What type of XSS is this?',
    choices: [
      { text:'Reflected XSS', correct:false, why:'Reflected XSS is in a URL — the script is "reflected" off the server when a victim clicks a crafted link. It only affects the user who clicks that specific link, not every visitor to a page.' },
      { text:'Stored (Persistent) XSS', correct:true, why:'Stored XSS occurs when malicious script is saved to the database (in this case, a product review) and served to every user who views that page. It\'s the most dangerous XSS type because it doesn\'t require a crafted link — anyone visiting the page is affected.' },
      { text:'DOM-based XSS', correct:false, why:'DOM-based XSS modifies the browser\'s Document Object Model without the payload going to the server. In this case, the script was saved server-side in a database, making it Stored XSS.' },
      { text:'SQL injection', correct:false, why:'SQL injection targets database queries. XSS injects scripts that execute in users\' browsers. These are distinct attack types even though both involve injection into web applications.' },
    ]
  },
  {
    q: 'An organization receives threat intelligence that an APT group exploited a vulnerability in their network management software for 6 months before the vendor was aware it existed. What type of vulnerability was exploited?',
    choices: [
      { text:'CVE vulnerability', correct:false, why:'A CVE is a known, catalogued vulnerability with a published identifier. If the vendor wasn\'t aware of it, it cannot have been catalogued as a CVE yet.' },
      { text:'Zero-day vulnerability', correct:true, why:'A zero-day is a vulnerability unknown to the software vendor — "zero days" to patch. APT groups and nation-states stockpile zero-days for targeted attacks. No patch exists. The primary mitigations are defense in depth and behavioral detection, not patching.' },
      { text:'Unpatched CVE', correct:false, why:'An unpatched CVE is a known vulnerability for which a patch exists but hasn\'t been applied. If the vendor wasn\'t aware, no patch could exist — making this a zero-day.' },
      { text:'Buffer overflow', correct:false, why:'Buffer overflow describes an attack technique (overflowing memory). The question asks about the vulnerability STATUS (known vs unknown to vendor) — which is zero-day.' },
    ]
  },
  {
    q: 'An attacker creates a malicious npm package named "lodash-utils" (a real, widely-used library is called "lodash"). Developers who mistype the package name install the malicious version. What attack is this?',
    choices: [
      { text:'Watering hole attack', correct:false, why:'A watering hole attack compromises a site frequented by targets. This attack tricks users into installing a malicious package via a misspelled name — a different mechanism.' },
      { text:'Typosquatting (supply chain attack)', correct:true, why:'Typosquatting registers malicious packages, domains, or accounts with names close to legitimate ones, relying on user typos. In a software supply chain context, this poisons the development environment through a fake dependency. It\'s a form of supply chain attack.' },
      { text:'DNS hijacking', correct:false, why:'DNS hijacking alters DNS records to redirect users. This attack exploits the package name resolution in a package manager (npm), not DNS.' },
      { text:'Backdoor installation', correct:false, why:'A backdoor is the potential RESULT of this attack (the malicious package might install a backdoor). The attack TYPE — using a misspelled name to trick users into installing a malicious package — is typosquatting.' },
    ]
  },
  {
    q: 'A company\'s SIEM alerts on an endpoint that is making regular HTTPS requests to an external IP every 4 minutes, transferring small amounts of data. The beacon interval is consistent. What does this most likely indicate?',
    choices: [
      { text:'Normal software update traffic', correct:false, why:'Software updates don\'t beacon at regular intervals with small data transfers. Update traffic is typically infrequent and larger. Regular, consistent intervals are a hallmark of malware design, not legitimate software.' },
      { text:'Command and Control (C2) beaconing', correct:true, why:'Malware regularly contacts its Command and Control server at a fixed interval (beacon interval) to receive instructions. The regular timing, small data size, and external IP are classic IoC (Indicator of Compromise) patterns for C2 beaconing.' },
      { text:'DDoS attack originating from this endpoint', correct:false, why:'A DDoS attack sends large volumes of traffic. The described traffic is small and regular — consistent with beaconing home to a C2 server, not outbound flooding.' },
      { text:'DNS tunneling', correct:false, why:'DNS tunneling encodes data in DNS queries. The scenario describes HTTPS traffic specifically, not DNS queries. While both can be used for exfiltration, the described pattern (regular HTTPS beaconing to a fixed IP) is C2 beaconing.' },
    ]
  },
  {
    q: 'A legitimate software vendor\'s build server is compromised. The attacker inserts malicious code into a software update that is then digitally signed by the vendor and distributed to thousands of customers. What attack is this?',
    choices: [
      { text:'Watering hole', correct:false, why:'A watering hole compromises a site to target its visitors. This attack compromised the vendor\'s build process — the attack is upstream in the software supply chain, not at a website visited by targets.' },
      { text:'Supply chain attack', correct:true, why:'A supply chain attack targets a trusted third party (vendor, supplier, developer) rather than the end victim directly. By compromising the build server and signing the malicious update with the vendor\'s legitimate key, the attacker bypasses all endpoint defenses — the software appears fully trusted.' },
      { text:'Ransomware distribution', correct:false, why:'While ransomware could be the payload, the attack TYPE is a supply chain attack. The defining feature is compromising the vendor\'s distribution mechanism — not the nature of the payload.' },
      { text:'Spear phishing', correct:false, why:'Spear phishing targets specific individuals via email. This attack compromised the vendor\'s infrastructure directly — no phishing email was sent to end customers.' },
    ]
  },
  {
    q: 'An employee accidentally emails a spreadsheet containing 50,000 customer records to an external address, thinking it was an internal recipient. What insider threat category does this represent?',
    choices: [
      { text:'Malicious insider', correct:false, why:'A malicious insider intentionally steals or sabotages. The employee accidentally sent the file — there was no malicious intent. Intent matters for categorizing insider threats.' },
      { text:'Negligent insider', correct:true, why:'A negligent insider unintentionally causes a security incident through carelessness, mistakes, or lack of awareness. Accidentally emailing sensitive data to the wrong recipient is a classic negligent insider scenario.' },
      { text:'Compromised insider', correct:false, why:'A compromised insider is one whose credentials or account have been taken over by an external attacker. In this case, the employee themselves made the mistake — their account wasn\'t compromised.' },
      { text:'Social engineering victim', correct:false, why:'While social engineering can turn someone into a negligent insider, this scenario describes a simple mistake (wrong email address) without any evidence of manipulation by an attacker.' },
    ]
  },
  {
    q: 'Which mitigation is MOST effective against credential capture attacks where an attacker has successfully recorded a user\'s password via a keylogger?',
    choices: [
      { text:'Requiring complex passwords (uppercase, numbers, symbols)', correct:false, why:'Password complexity affects brute-force resistance, not keylogging. A keylogger captures exactly what the user types — whether the password is "abc" or "X@k#9mP2" makes no difference.' },
      { text:'Multi-Factor Authentication (MFA)', correct:true, why:'MFA requires a second factor (OTP, push notification, hardware key) in addition to the password. Even with the captured password, the attacker cannot authenticate without the second factor — which they don\'t have.' },
      { text:'Endpoint antivirus software', correct:false, why:'Antivirus may detect known keyloggers, but sophisticated or novel keyloggers evade signature-based AV. The question asks what\'s most effective GIVEN the credential has already been captured — meaning AV didn\'t prevent it.' },
      { text:'Full-disk encryption', correct:false, why:'Full-disk encryption protects data if a device is stolen but doesn\'t help once an attacker is already on the system capturing keystrokes. It has no effect against live credential capture.' },
    ]
  },
  {
    q: 'A web application firewall (WAF) is blocking requests containing SQL syntax. An attacker encodes their SQL injection payload in hexadecimal, which the WAF doesn\'t detect. What technique is the attacker using?',
    choices: [
      { text:'SQL injection with WAF bypass via encoding', correct:true, why:'Attackers often obfuscate injection payloads using encoding (hex, Unicode, URL encoding, double encoding) to evade signature-based WAF rules. The underlying attack is still SQL injection, but the evasion technique is encoding-based WAF bypass.' },
      { text:'Stored XSS', correct:false, why:'XSS injects JavaScript for browser execution. This attack specifically uses SQL syntax against a database, encoded to bypass a WAF.' },
      { text:'CSRF', correct:false, why:'CSRF tricks authenticated users into making unintended requests via their browser. This is a direct injection attack against the application\'s database, not a cross-site request forgery.' },
      { text:'DNS tunneling', correct:false, why:'DNS tunneling encodes data in DNS queries for exfiltration. This attack encodes SQL in HTTP requests to evade a WAF — a completely different mechanism.' },
    ]
  },
  {
    q: 'An attacker sends millions of SYN packets to a web server, never completing the TCP three-way handshake. The server\'s connection table fills up and legitimate users can\'t connect. What attack is this?',
    choices: [
      { text:'Ping of Death', correct:false, why:'Ping of Death sends oversized ICMP packets that crash systems when reassembled. This attack specifically abuses the TCP handshake process by not completing it — a different mechanism.' },
      { text:'SYN flood (DoS)', correct:true, why:'A SYN flood sends many SYN packets but never sends the final ACK to complete the three-way handshake. The server allocates resources for each half-open connection until its connection table fills, making it unable to accept legitimate connections. Classic resource exhaustion DoS.' },
      { text:'Smurf attack', correct:false, why:'A Smurf attack sends ICMP echo requests to a broadcast address with a spoofed source (victim\'s IP), causing all hosts to reply to the victim. It\'s an amplification attack using ICMP, not TCP SYN flooding.' },
      { text:'DDoS volumetric attack', correct:false, why:'A volumetric DDoS attack overwhelms bandwidth. This attack exhausts a specific server resource (connection table) using SYN packets — it\'s a protocol-layer attack, not a bandwidth-volumetric attack, and appears to be from a single source.' },
    ]
  },
  {
    q: 'An attacker registers "paypa1.com" (using the digit 1 instead of lowercase L) to phish users who mistype PayPal\'s URL. What social engineering technique does this use?',
    choices: [
      { text:'Pretexting', correct:false, why:'Pretexting involves fabricating a scenario to manipulate someone via direct interaction. Registering a look-alike domain is passive — the attacker waits for users to make the typo, not direct manipulation.' },
      { text:'Typosquatting', correct:true, why:'Typosquatting registers domain names that mimic legitimate sites with minor variations: swapped characters, added numbers, different TLDs. The goal is capturing traffic from users who mistype the legitimate URL.' },
      { text:'Vishing', correct:false, why:'Vishing is voice phishing — conducted over phone calls. A fraudulent website doesn\'t involve phone calls.' },
      { text:'Watering hole', correct:false, why:'A watering hole compromises a LEGITIMATE site frequented by targets. Typosquatting registers a NEW fraudulent domain. Different mechanism.' },
    ]
  },
  {
    q: 'A SIEM alert fires because a user account that normally logs in from New York is suddenly accessing finance servers at 2 AM from Eastern Europe, downloading 20GB of data. What IoC category does this represent?',
    choices: [
      { text:'Vulnerability scan result', correct:false, why:'Vulnerability scans identify system weaknesses. This is runtime behavioral data — the account is actively doing something unusual, not a scan result.' },
      { text:'Behavioral indicator of compromise (UEBA alert)', correct:true, why:'User and Entity Behavior Analytics (UEBA) establishes baselines and alerts on deviations: unusual geography, time, accessed resources, and data volumes. All four anomalies here — location, time, resource, volume — together form a strong behavioral IoC suggesting account compromise.' },
      { text:'Firewall signature match', correct:false, why:'Firewall signature matching blocks based on known malicious patterns in traffic. This is behavioral analysis of a user account\'s access patterns, not traffic signature matching.' },
      { text:'Hash-based malware detection', correct:false, why:'Hash-based detection compares file hashes against known malware databases. This IoC is behavioral — the suspicious activity is who is accessing what from where, not a file signature.' },
    ]
  },
  {
    q: 'What is the primary difference between a virus and a worm?',
    choices: [
      { text:'Viruses encrypt files; worms steal data', correct:false, why:'This conflates different malware types. File encryption is ransomware behavior. Data theft is spyware/RAT behavior. The virus/worm distinction is specifically about self-replication mechanism.' },
      { text:'Viruses require human action to spread; worms self-propagate across networks', correct:true, why:'A virus requires a host file and user action to spread (opening an infected file, running a program). A worm self-replicates autonomously across networks by exploiting vulnerabilities, requiring no user interaction. Worms can spread much faster as a result.' },
      { text:'Worms require a host file; viruses do not', correct:false, why:'This is backwards. Viruses attach to host files. Worms are standalone — they don\'t need a host file. They exploit network services and vulnerabilities to self-propagate.' },
      { text:'Viruses only affect Windows; worms are cross-platform', correct:false, why:'Both viruses and worms can affect multiple operating systems. The OS scope depends on implementation, not the virus/worm categorization.' },
    ]
  },
  {
    q: 'An organization wants to detect if an attacker is using DNS queries to exfiltrate data from a compromised host. The host can\'t make direct outbound connections but DNS traffic is unrestricted. What attack should they look for?',
    choices: [
      { text:'ARP poisoning', correct:false, why:'ARP poisoning is a Layer 2 local network attack to intercept traffic. It doesn\'t involve DNS and doesn\'t enable data exfiltration via DNS queries.' },
      { text:'DNS tunneling', correct:true, why:'DNS tunneling encodes exfiltrated data within DNS query and response packets. Since DNS traffic is rarely blocked, it provides a covert channel through firewalls. Defenders look for: unusually long subdomains, high DNS query volume from a single host, and queries to uncommon domains.' },
      { text:'DNS hijacking', correct:false, why:'DNS hijacking modifies DNS records to redirect users to malicious sites. It\'s an attack ON DNS, not a technique that uses DNS as a covert channel for exfiltration.' },
      { text:'Whaling', correct:false, why:'Whaling is targeted spear phishing against executives. It\'s a social engineering attack delivered via email — completely unrelated to DNS query manipulation.' },
    ]
  },
  {
    q: 'Which of the following BEST describes a Trojan horse in the context of malware?',
    choices: [
      { text:'Malware that replicates itself across networks without user interaction', correct:false, why:'Self-replication across networks without user interaction describes a WORM. Trojans don\'t self-replicate — they rely on users installing them.' },
      { text:'Malware disguised as legitimate software that contains a hidden malicious payload', correct:true, why:'A Trojan (named after the mythological wooden horse) appears to be legitimate, useful software. The user installs it voluntarily, but it contains a hidden malicious component — RAT, backdoor, ransomware, etc.' },
      { text:'Malware that encrypts files and demands ransom', correct:false, why:'File encryption with ransom demand describes RANSOMWARE. Ransomware can be delivered as a Trojan, but the ransomware behavior is the payload, not what defines a Trojan.' },
      { text:'Malware that hides at the kernel level to evade detection', correct:false, why:'Kernel-level hiding describes a ROOTKIT. A Trojan is defined by its disguise-as-legitimate-software delivery mechanism, not by stealth at the OS level.' },
    ]
  },
  {
    q: 'A security researcher discovers that a widely-used open-source logging library has a critical vulnerability allowing remote code execution. Millions of applications use this library. What type of vulnerability is this an example of?',
    choices: [
      { text:'Insider threat', correct:false, why:'Insider threats involve people with authorized access causing harm. A vulnerability in a shared library is a technical flaw in software, not a people-based threat.' },
      { text:'Supply chain / third-party library vulnerability', correct:true, why:'Applications that import vulnerable third-party libraries inherit their vulnerabilities. This is a supply chain risk. Log4Shell (Log4j) is the real-world example this describes — a logging library used everywhere had an RCE flaw, affecting millions of applications.' },
      { text:'Zero-day in proprietary software', correct:false, why:'A zero-day is unknown to the vendor. The scenario describes a vulnerability that has been DISCOVERED (by a researcher) and is now being disclosed — it\'s moving from zero-day to CVE status. The key characteristic here is the supply chain risk of third-party libraries.' },
      { text:'Social engineering', correct:false, why:'Social engineering manipulates people. A code vulnerability in a library is a purely technical flaw — no human manipulation is involved.' },
    ]
  },
  {
    q: 'Which control specifically addresses the threat of a malicious insider with privileged access exfiltrating data over time?',
    choices: [
      { text:'Firewall rules blocking outbound traffic', correct:false, why:'Firewalls block based on network-level rules. A malicious insider with legitimate system access can use allowed channels (web, email, USB) to exfiltrate. Firewalls won\'t catch authorized users doing unauthorized things.' },
      { text:'User and Entity Behavior Analytics (UEBA) with DLP', correct:true, why:'UEBA establishes behavioral baselines and alerts on anomalies (unusual access patterns, off-hours activity, excessive data access). DLP prevents unauthorized data transfer via email, web, USB. Together they detect and block insider exfiltration that bypasses perimeter controls.' },
      { text:'DNSSEC', correct:false, why:'DNSSEC protects DNS record integrity against poisoning/spoofing. It has no relevance to monitoring or preventing insider data exfiltration.' },
      { text:'Patching systems on a regular schedule', correct:false, why:'Patching addresses known vulnerabilities in software. A malicious insider with legitimate credentials doesn\'t need to exploit a vulnerability — they already have authorized access.' },
    ]
  },
  {
    q: 'An attacker sends a specially crafted packet to a legacy C application. The packet\'s data is 500 bytes, but the buffer it\'s written to is only 200 bytes. The overflow overwrites the return address on the stack. What is happening?',
    choices: [
      { text:'SQL injection via network packet', correct:false, why:'SQL injection manipulates database queries via input fields. This describes memory corruption via exceeding buffer capacity — a completely different attack mechanism at the memory/binary level.' },
      { text:'Buffer overflow allowing arbitrary code execution', correct:true, why:'A buffer overflow occurs when more data is written to a buffer than it can hold. The excess data overwrites adjacent memory including the stack return address. By controlling the return address, an attacker redirects execution to arbitrary code (shellcode). Mitigations: ASLR, DEP/NX, stack canaries.' },
      { text:'SYN flood', correct:false, why:'A SYN flood sends incomplete TCP handshakes to exhaust server connection tables. This attack involves malformed application-layer data overflowing memory — completely different mechanism.' },
      { text:'Cross-Site Scripting', correct:false, why:'XSS injects JavaScript that executes in a browser. This attack operates at the binary/memory level of a C application, not in a web browser context.' },
    ]
  },
  {
    q: 'What distinguishes spear phishing from regular phishing?',
    choices: [
      { text:'Spear phishing uses phone calls instead of email', correct:false, why:'Phone-based phishing is called vishing (voice phishing). Both regular phishing and spear phishing typically use email.' },
      { text:'Spear phishing is personalized and targeted at a specific individual using researched information', correct:true, why:'Regular phishing is mass email with generic lures ("Your account has been suspended"). Spear phishing uses researched, personal details (name, employer, colleague names, recent activity) to craft convincing targeted messages. Much higher success rate but requires more effort.' },
      { text:'Spear phishing always delivers ransomware', correct:false, why:'Spear phishing is a delivery mechanism, not tied to a specific payload. It can deliver any malware, credential harvesters, or social engineering lures. The payload varies.' },
      { text:'Spear phishing targets exclusively financial institutions', correct:false, why:'Spear phishing targets any valuable individual — executives, engineers, government employees, researchers. The defining characteristic is personalization and targeting of a specific person, not the victim\'s industry.' },
    ]
  },
];

// ─── Threat Indicators & Response Question Bank (second quiz pool) ───────────
window.threatBank2 = window.threatBank; // use same bank, different random draw
