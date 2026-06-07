// ─────────────────────────────────────────────────────────────
//  MODULE 4: NETWORK SECURITY & INFRASTRUCTURE
// ─────────────────────────────────────────────────────────────

window.moduleConcepts = [
  { label:'Firewall', term:'Stateful vs Stateless vs NGFW', def:'Stateless: filters packets by static rules (IP, port, protocol) — doesn\'t track connection state. Stateful: tracks TCP connection state — allows return traffic for established connections. NGFW (Next-Gen): adds deep packet inspection (DPI), application awareness, IPS, TLS inspection, user identity integration. Exam: NGFW is the correct modern choice for any scenario requiring application-level visibility.', tags:['conf','integ'] },
  { label:'Network Segmentation', term:'DMZ (Demilitarized Zone)', def:'A network zone between the internet and internal network, protected by firewalls on both sides. Hosts public-facing services (web servers, mail relays, DNS). If a DMZ server is compromised, the attacker can\'t directly reach internal systems — they face another firewall. Screened subnet = another name for DMZ.', tags:['conf'] },
  { label:'IDS / IPS', term:'IDS vs IPS — Detection vs Prevention', def:'IDS (Intrusion Detection System): passive — monitors and alerts, doesn\'t block. NIDS: network-based. HIDS: host-based. IPS (Intrusion Prevention System): inline — actively blocks detected threats. False positive = legitimate traffic blocked. False negative = real attack missed. HIDS detects local file changes, process anomalies. NIDS watches network traffic. Rule-based (signatures) vs anomaly-based (behavioral baseline).', tags:['integ','conf'] },
  { label:'VPN', term:'VPN Types: Site-to-Site vs Remote Access', def:'Site-to-site: connects two network locations permanently over encrypted tunnel (IPSec). Remote access: individual users connect to corporate network (IPSec or TLS/SSL VPN). Split tunneling: only corporate-destined traffic goes through VPN, internet traffic goes direct (performance benefit, security risk). Always-on VPN = all traffic tunneled regardless. Full tunnel = all traffic through VPN.', tags:['conf'] },
  { label:'VPN Protocol', term:'IPSec: AH vs ESP, Tunnel vs Transport', def:'AH (Authentication Header): provides integrity and auth, no encryption. ESP (Encapsulating Security Payload): provides encryption + integrity + auth. Transport mode: encrypts payload only, original IP header preserved. Tunnel mode: encrypts entire original packet, wraps in new IP header — used for site-to-site VPN. Exam: ESP + Tunnel mode = most common, most secure. IKE/ISAKMP = key exchange for IPSec.', tags:['conf','integ'] },
  { label:'Wireless', term:'WPA2 vs WPA3 Enterprise vs Personal', def:'WPA2-Personal: pre-shared key (PSK) — same password for everyone, no per-user identity. WPA2-Enterprise: 802.1X authentication with RADIUS — per-user credentials, EAP protocols. WPA3: enhanced DRAGONFLY handshake (SAE) — no offline dictionary attacks, forward secrecy per session. WPA3-Enterprise: 192-bit security mode. Exam: Enterprise mode always better for organizations — individual accountability via RADIUS.', tags:['conf','auth'] },
  { label:'Wireless Attack', term:'Evil Twin / Rogue AP / Deauth', def:'Evil Twin: attacker creates AP with same SSID as legitimate network — clients connect to attacker instead. Deauthentication attack: sends spoofed 802.11 deauth frames forcing clients to disconnect, then reconnect to evil twin. Rogue AP: unauthorized AP on corporate network. Mitigations: 802.1X (requires auth to network before connecting), wireless IDS, certificate-based WPA3-Enterprise.', tags:['conf','integ'] },
  { label:'Network Protocol', term:'DNS Security: DNSSEC vs DoH vs DoT', def:'DNSSEC: signs DNS records with public key crypto — verifies records haven\'t been tampered with. Doesn\'t encrypt queries. DoH (DNS over HTTPS): encrypts DNS queries inside HTTPS — prevents ISP/middlebox visibility. DoT (DNS over TLS): encrypts DNS over TLS port 853 — visible as DNS traffic but encrypted. Exam: DNSSEC = integrity. DoH/DoT = privacy/confidentiality.', tags:['integ','conf'] },
  { label:'Load Balancing', term:'Network Load Balancing & High Availability', def:'Distributes traffic across multiple servers — availability and performance. Round-robin: sequential distribution. Least connections: send to least-loaded server. Session persistence (sticky sessions): same client always hits same server. Active-active: all nodes serve traffic simultaneously. Active-passive: standby node activates only on failure. Clustered services provide redundancy.', tags:['avail'] },
  { label:'NAC', term:'Network Access Control (NAC)', def:'Controls which devices can connect to a network and what they can access based on posture assessment. Checks: OS patch level, antivirus status, disk encryption, configuration compliance. Non-compliant devices sent to remediation VLAN. 802.1X: port-based NAC using RADIUS for authentication before allowing LAN access. Supplicant (client) + Authenticator (switch) + Authentication Server (RADIUS).', tags:['conf','integ'] },
  { label:'Proxy', term:'Forward Proxy vs Reverse Proxy', def:'Forward proxy: client-side. Sits between internal clients and internet. Used for content filtering, caching, anonymization, SSL inspection. Employees\' internet traffic goes through forward proxy. Reverse proxy: server-side. Sits in front of web servers. Hides server infrastructure, handles TLS termination, load balancing, WAF. Clients don\'t know the real server address.', tags:['conf'] },
  { label:'Monitoring', term:'NetFlow / IPFIX / Packet Capture', def:'Packet capture (Wireshark/tcpdump): captures full packet content — high fidelity, high storage. NetFlow/IPFIX: captures flow metadata (src/dst IP, port, bytes, duration) — no payload content. Lower storage, sufficient for traffic analysis, anomaly detection, bandwidth monitoring. SIEM ingests NetFlow for baseline/anomaly correlation. Useful even for encrypted traffic (metadata patterns reveal behavior).', tags:['integ'] },
  { label:'Zero Trust Network', term:'ZTNA — Zero Trust Network Access', def:'Replaces traditional VPN with identity-based, per-application access. User accesses specific application, not the whole network. No implicit trust from being "on VPN." Each connection: authenticate → verify device posture → authorize per application. Reduces blast radius vs VPN (which gives broad network access). SDP (Software-Defined Perimeter) is the underlying architecture.', tags:['conf','auth'] },
  { label:'Protocol Ports', term:'Key Ports to Know', def:'20/21 FTP (unencrypted), 22 SSH (encrypted remote + SFTP), 23 Telnet (unencrypted, avoid), 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 110 POP3, 143 IMAP, 389 LDAP, 636 LDAPS, 445 SMB, 3389 RDP, 1433 MS SQL, 3306 MySQL, 8080/8443 alt HTTP/HTTPS. Exam: know encrypted vs unencrypted pairs — SSH replaces Telnet/FTP/rlogin; HTTPS replaces HTTP; LDAPS replaces LDAP.', tags:['conf'] },
];

window.moduleBank = [
  {
    q: 'A firewall is configured with rules based only on source IP, destination IP, and port number. It cannot distinguish between an established TCP connection and a new one. What type of firewall is this?',
    choices: [
      { text:'NGFW (Next-Generation Firewall)', correct:false, why:'NGFWs do deep packet inspection, understand application context, and are stateful. They\'re far more capable than described here.' },
      { text:'Stateless packet filter', correct:true, why:'A stateless firewall filters based on static rules (IP/port/protocol) without tracking TCP connection state. It can\'t differentiate a SYN packet from a data packet on the same port, which makes it vulnerable to attacks that forge return traffic.' },
      { text:'Stateful inspection firewall', correct:false, why:'A stateful firewall DOES track TCP connection state — it knows which connections are established and only allows return traffic for those. The scenario explicitly says it can\'t distinguish established from new connections.' },
      { text:'Application-layer gateway', correct:false, why:'An application-layer gateway (proxy firewall) operates at Layer 7, understanding application protocols like HTTP. The described firewall is limited to Layers 3-4 rules only.' },
    ]
  },
  {
    q: 'A company hosts a public web server and an internal HR database. They want the web server exposed to the internet while the HR database is completely isolated from external access. What architecture achieves this?',
    choices: [
      { text:'Place both servers on the same VLAN with strong ACLs', correct:false, why:'Co-locating public and sensitive servers on the same VLAN creates unnecessary risk — a compromise of the web server could reach the HR database without crossing any firewall boundary.' },
      { text:'Place the web server in a DMZ; the HR database remains on the internal network', correct:true, why:'A DMZ places the public-facing web server between two firewalls. If it\'s compromised, the attacker hits the internal firewall before reaching the HR database. The internal network stays isolated. This is the textbook DMZ architecture.' },
      { text:'Encrypt the HR database and expose it through the same interface as the web server', correct:false, why:'Encryption protects data at rest but doesn\'t prevent access over the network. Placing both on the same internet-facing segment is fundamentally unsound architecture.' },
      { text:'Deploy an IDS in front of the web server to catch attacks', correct:false, why:'An IDS detects attacks but doesn\'t block them — and detection doesn\'t provide the isolation the scenario requires. Architecture (DMZ) is the correct solution.' },
    ]
  },
  {
    q: 'An IPS is generating frequent alerts for legitimate traffic — the security team is spending hours investigating false alarms. What is this called, and what is the main risk of it?',
    choices: [
      { text:'False negatives; risk is alert fatigue and missed real attacks', correct:false, why:'False negatives are attacks that go UNDETECTED (missed alerts). The scenario describes legitimate traffic generating alerts — these are false positives, not false negatives.' },
      { text:'False positives; risk is alert fatigue leading to real attacks being ignored or dismissed', correct:true, why:'False positives are incorrect detections of benign activity as threats. In high volume, they cause alert fatigue — analysts start ignoring alerts, which is exactly when a real attack slips through. Tuning IPS signatures to reduce false positives is essential.' },
      { text:'True positives; this is correct IPS behavior', correct:false, why:'True positives are correctly detected real attacks. The scenario describes legitimate traffic being flagged — that\'s incorrect detection, not correct detection.' },
      { text:'Signature drift; caused by outdated IPS rules', correct:false, why:'Signature drift isn\'t a standard security term. The correct term for legitimate traffic triggering alerts is false positive.' },
    ]
  },
  {
    q: 'A remote employee connects to corporate resources and their personal internet browsing (YouTube, banking, etc.) goes DIRECTLY to the internet without passing through the company VPN. What VPN configuration is this?',
    choices: [
      { text:'Full tunnel VPN', correct:false, why:'Full tunnel VPN routes ALL traffic through the VPN, including personal browsing. The scenario describes only corporate traffic going through the VPN.' },
      { text:'Split tunneling', correct:true, why:'Split tunneling routes only corporate-bound traffic through the VPN. Personal internet traffic goes directly out the local connection. Performance benefit (less VPN load), security risk (internet threats can reach the device and potentially the corporate tunnel from unprotected traffic).' },
      { text:'Site-to-site VPN', correct:false, why:'Site-to-site VPN connects two network locations (office to office) permanently. This is a remote user connecting from home — remote access VPN, not site-to-site.' },
      { text:'Always-on VPN', correct:false, why:'Always-on VPN activates automatically when the device connects to any network, with all traffic tunneled. The scenario specifically describes personal traffic going direct — not always-on behavior.' },
    ]
  },
  {
    q: 'In IPSec, which protocol provides BOTH encryption AND integrity for the packet payload?',
    choices: [
      { text:'AH (Authentication Header)', correct:false, why:'AH provides integrity and authentication but NO encryption. It proves the packet hasn\'t been tampered with but doesn\'t prevent anyone from reading the content.' },
      { text:'ESP (Encapsulating Security Payload)', correct:true, why:'ESP provides encryption (confidentiality), integrity, and authentication. For most IPSec deployments requiring privacy, ESP is the correct choice. It can operate in transport mode (payload only) or tunnel mode (entire packet) depending on the use case.' },
      { text:'IKE (Internet Key Exchange)', correct:false, why:'IKE (ISAKMP/IKE) handles the key exchange and SA (Security Association) negotiation for IPSec. It establishes the cryptographic parameters — it\'s the setup protocol, not the data protection protocol.' },
      { text:'GRE (Generic Routing Encapsulation)', correct:false, why:'GRE is a tunneling protocol that encapsulates packets for routing across different networks. It provides no encryption or integrity on its own — it\'s often combined with IPSec for encrypted tunnels.' },
    ]
  },
  {
    q: 'A coffee shop provides free Wi-Fi. An attacker sets up an access point with the same SSID as the legitimate network. Customers connect to the attacker\'s AP without realizing it. What attack is this?',
    choices: [
      { text:'Rogue AP on the corporate network', correct:false, why:'A rogue AP is an unauthorized AP physically plugged into a corporate network. This attack involves an external AP mimicking a public network\'s SSID from outside — that\'s an evil twin.' },
      { text:'Evil twin attack', correct:true, why:'An evil twin (also called a rogue hotspot or honeypot AP) mimics a legitimate network\'s SSID. Clients auto-connect because the SSID matches. The attacker can then perform MITM on all client traffic. Mitigation: always use HTTPS/TLS, VPN on public Wi-Fi, avoid auto-connecting to open networks.' },
      { text:'Deauthentication attack', correct:false, why:'A deauth attack sends spoofed 802.11 deauthentication frames to disconnect clients. While deauth can be used in conjunction with an evil twin attack, the described scenario is specifically the evil twin — clients choosing the attacker\'s AP.' },
      { text:'WPS brute force', correct:false, why:'WPS (Wi-Fi Protected Setup) brute force attacks the 8-digit PIN for WPS-enabled routers. This attack creates a duplicate SSID to attract clients — completely unrelated to WPS.' },
    ]
  },
  {
    q: 'An organization wants to verify that DNS responses haven\'t been tampered with by a man-in-the-middle. They don\'t need to hide the DNS queries from their ISP. What technology addresses this?',
    choices: [
      { text:'DoH (DNS over HTTPS)', correct:false, why:'DoH encrypts DNS queries inside HTTPS, hiding them from ISPs and middleboxes — but the scenario says they don\'t need to hide queries. DoH provides privacy, not necessarily integrity verification via cryptographic signing.' },
      { text:'DNSSEC', correct:true, why:'DNSSEC adds digital signatures to DNS records. When a client receives a response, DNSSEC allows verification that the record was signed by the authoritative zone owner — detecting tampering or poisoning. It doesn\'t encrypt queries, but it does verify integrity.' },
      { text:'DoT (DNS over TLS)', correct:false, why:'DoT encrypts DNS queries over TLS port 853 — provides privacy by hiding queries from middleboxes. Like DoH, it addresses confidentiality of the query, not cryptographic verification of the response\'s authenticity.' },
      { text:'Split DNS', correct:false, why:'Split DNS serves different DNS responses to internal vs external clients (internal servers get private IPs, external clients get public IPs). It\'s a configuration strategy, not a security mechanism for verifying DNS integrity.' },
    ]
  },
  {
    q: 'A switch port is configured to check that a device\'s OS is fully patched and has endpoint protection running before granting network access. Noncompliant devices are placed in a remediation VLAN. What technology is this?',
    choices: [
      { text:'VLAN segmentation only', correct:false, why:'VLANs segment networks but don\'t perform compliance checks on connecting devices. A device is simply assigned to a VLAN by configuration, not by health assessment.' },
      { text:'Network Access Control (NAC)', correct:true, why:'NAC performs posture assessment — checking device health (patch level, AV status, encryption) before granting network access. Non-compliant devices are quarantined to a remediation VLAN. 802.1X is the port-based NAC standard using RADIUS.' },
      { text:'IDS sensor on each switch port', correct:false, why:'An IDS monitors traffic for suspicious patterns. It doesn\'t evaluate device health before connection or enforce remediation VLANs.' },
      { text:'DLP (Data Loss Prevention)', correct:false, why:'DLP monitors and prevents unauthorized data transfers. It operates at the content level — not at the device health assessment level before network admission.' },
    ]
  },
  {
    q: 'A web application is fronted by a device that terminates TLS, inspects HTTP requests for SQL injection and XSS patterns, then forwards clean requests to the backend server. What is this device?',
    choices: [
      { text:'IDS (Intrusion Detection System)', correct:false, why:'An IDS passively monitors traffic and generates alerts. It doesn\'t terminate TLS, inspect application content, and forward clean requests. That\'s an active, inline security device.' },
      { text:'WAF (Web Application Firewall) acting as reverse proxy', correct:true, why:'A WAF inspects HTTP/HTTPS traffic at Layer 7, looking for application-layer attacks (SQLi, XSS, path traversal). As a reverse proxy, it terminates client TLS, inspects the decrypted request, and forwards legitimate traffic to backend servers — hiding the real server address.' },
      { text:'Forward proxy', correct:false, why:'A forward proxy sits between internal clients and the internet (client-side). The described device sits in front of a web server, inspecting inbound requests — that\'s a reverse proxy.' },
      { text:'Stateless packet filter', correct:false, why:'A stateless firewall operates at Layers 3-4 (IP/port) and cannot inspect application-layer content like SQL syntax or JavaScript injection patterns.' },
    ]
  },
  {
    q: 'A corporate WPA2 wireless network is configured so each employee uses their Active Directory username and password to connect, with a RADIUS server verifying credentials. What is this configuration?',
    choices: [
      { text:'WPA2-Personal', correct:false, why:'WPA2-Personal uses a Pre-Shared Key (PSK) — one password shared with everyone. All users on the same PSK can\'t be individually identified or held accountable.' },
      { text:'WPA2-Enterprise (802.1X with RADIUS)', correct:true, why:'WPA2-Enterprise uses 802.1X authentication, where each user authenticates with individual credentials. A RADIUS server validates against Active Directory. Per-user accountability, centralized revocation, and supports EAP protocols for MFA.' },
      { text:'WPA3-SAE', correct:false, why:'WPA3-SAE (Simultaneous Authentication of Equals, also called DRAGONFLY) is the WPA3-Personal handshake mechanism — it\'s still pre-shared key but resistant to offline dictionary attacks. It doesn\'t use RADIUS or per-user credentials.' },
      { text:'Open network with captive portal', correct:false, why:'An open network has no wireless authentication. A captive portal is a web-based redirect for terms acceptance — not comparable to 802.1X enterprise authentication with RADIUS.' },
    ]
  },
  {
    q: 'What is the key difference between ZTNA (Zero Trust Network Access) and a traditional remote-access VPN?',
    choices: [
      { text:'VPN uses more encryption than ZTNA', correct:false, why:'Both use strong encryption. The difference is architectural — what access is granted after authentication, not how data is encrypted in transit.' },
      { text:'VPN grants broad network access; ZTNA grants access to specific applications only', correct:true, why:'Traditional VPN puts users on the corporate network — once on VPN, lateral movement is possible. ZTNA grants per-application access after continuous identity and device verification. Compromising one ZTNA session doesn\'t give access to the rest of the network.' },
      { text:'ZTNA is only for mobile devices', correct:false, why:'ZTNA works for any device type. The distinction is the access model (per-application vs per-network), not the device form factor.' },
      { text:'ZTNA doesn\'t require authentication', correct:false, why:'ZTNA requires strong continuous authentication — identity, device posture, and context verification before each connection. Authentication is MORE rigorous in ZTNA, not absent.' },
    ]
  },
  {
    q: 'A company captures NetFlow data from their core router instead of full packet captures. What can security analysts DO with NetFlow that full packet capture cannot easily provide?',
    choices: [
      { text:'Reconstruct the full content of encrypted TLS sessions', correct:false, why:'NetFlow only captures metadata (IPs, ports, bytes, duration) — no packet payload. Full packet capture would be needed for content, and even that can\'t decrypt TLS sessions without the session keys.' },
      { text:'Identify traffic volume trends and communication patterns over long retention periods', correct:true, why:'NetFlow is compact — capturing months of flow data is practical. Full PCAP is enormous and typically retained for days. NetFlow enables long-term trend analysis, baseline establishment, anomaly detection, and bandwidth monitoring at scale. Even for encrypted traffic, metadata reveals behavioral patterns.' },
      { text:'Identify specific SQL queries sent to a database', correct:false, why:'Seeing application-layer content like SQL queries requires full packet capture AND the ability to see plaintext (no encryption). NetFlow only provides flow-level metadata.' },
      { text:'Decrypt and inspect HTTPS traffic', correct:false, why:'Neither NetFlow nor basic PCAP decrypts TLS. TLS inspection requires the private key or session keys, typically done at an inline SSL proxy/NGFW — not a packet capture technology.' },
    ]
  },
  {
    q: 'Which port and protocol combination is used by LDAPS (LDAP over SSL/TLS) for secure directory queries?',
    choices: [
      { text:'Port 389, TCP', correct:false, why:'Port 389 is plain, unencrypted LDAP. Traffic on port 389 is transmitted in cleartext — credentials can be captured by anyone with access to the network segment.' },
      { text:'Port 636, TCP', correct:true, why:'LDAPS (LDAP over SSL/TLS) uses port 636. It wraps the LDAP protocol in TLS, encrypting directory queries and authentication. Port 389 = unsecured, Port 636 = secured. Always use LDAPS in production environments.' },
      { text:'Port 445, TCP', correct:false, why:'Port 445 is SMB (Server Message Block) — used for Windows file sharing, printer sharing, and Active Directory Kerberos in some configurations. Not LDAP.' },
      { text:'Port 3389, TCP', correct:false, why:'Port 3389 is RDP (Remote Desktop Protocol). Not related to directory services or LDAP.' },
    ]
  },
  {
    q: 'An organization wants to ensure that if their primary data center fails, web traffic is automatically directed to a secondary site with no manual intervention. What technology provides this?',
    choices: [
      { text:'RAID storage', correct:false, why:'RAID protects against disk failure within a single server. It doesn\'t redirect traffic between data centers or provide network-level availability across sites.' },
      { text:'Active-passive load balancing with health checks and automatic failover', correct:true, why:'Active-passive load balancing keeps a secondary site in standby. Health checks detect primary site failure and automatically redirect traffic to the passive site — no manual intervention. Active-active distributes load across both sites simultaneously.' },
      { text:'Full packet capture on the primary site', correct:false, why:'Packet capture is a monitoring/forensics tool. It records traffic but doesn\'t redirect it or provide redundancy.' },
      { text:'Stateless firewall at each site', correct:false, why:'Stateless firewalls filter packets by rules. They don\'t perform health checks on upstream services or redirect traffic to backup sites on failure.' },
    ]
  },
  {
    q: 'A Wireshark capture of corporate network traffic reveals an employee is using Telnet to manage a remote server instead of SSH. Why is this a security problem?',
    choices: [
      { text:'Telnet is slower than SSH', correct:false, why:'Performance is not the security issue. Telnet transmits all data in plaintext — that\'s the critical problem regardless of speed.' },
      { text:'Telnet sends all data including credentials in plaintext, visible to anyone capturing traffic', correct:true, why:'Telnet has no encryption. Everything — keystrokes, passwords, commands, command output — is transmitted in plain text. Anyone on the same network segment or with access to network infrastructure can capture and read the session. SSH encrypts the entire session.' },
      { text:'Telnet uses UDP, which is unreliable', correct:false, why:'Telnet uses TCP (port 23), which is reliable. The security problem is the lack of encryption, not the transport protocol.' },
      { text:'Telnet doesn\'t support authentication', correct:false, why:'Telnet does support authentication (username/password). The problem is that authentication and all subsequent session data are transmitted in cleartext.' },
    ]
  },
  {
    q: 'An attacker sends hundreds of 802.11 deauthentication frames with a spoofed source MAC of the legitimate access point. Clients disconnect and some reconnect to the attacker\'s AP. What is the first part of this attack called?',
    choices: [
      { text:'ARP poisoning', correct:false, why:'ARP poisoning manipulates Layer 2 ARP tables to redirect LAN traffic. This attack targets wireless association using 802.11 management frames — a different protocol layer entirely.' },
      { text:'Deauthentication attack', correct:true, why:'A deauthentication (deauth) attack sends spoofed 802.11 deauth management frames. In WPA2, these frames are unauthenticated, so anyone can spoof them. The AP\'s clients disconnect involuntarily. This is often the first stage of an evil twin attack — force clients off the real AP, then offer the evil twin.' },
      { text:'WPS PIN brute force', correct:false, why:'WPS PIN brute force attacks the 8-digit WPS setup PIN. It\'s a slow attack requiring many attempts against the AP itself — not a deauthentication technique.' },
      { text:'KARMA attack', correct:false, why:'A KARMA attack responds to probe requests from devices looking for any saved network. Different from a deauth attack, though both relate to wireless deception.' },
    ]
  },
  {
    q: 'What is the 802.1X authentication framework, and who are the three parties involved?',
    choices: [
      { text:'A VPN standard; client, VPN server, and ISP', correct:false, why:'802.1X is a port-based network access control standard, not a VPN standard. VPNs operate at a different layer with different components.' },
      { text:'Port-based NAC; Supplicant (client), Authenticator (switch/AP), Authentication Server (RADIUS)', correct:true, why:'802.1X has three roles: Supplicant = the device wanting access. Authenticator = the network device controlling access (switch port or wireless AP). Authentication Server = RADIUS server that verifies credentials against a directory. The authenticator doesn\'t grant access until RADIUS approves.' },
      { text:'A wireless encryption standard; AP, WPA controller, cloud dashboard', correct:false, why:'802.1X is about network access control and authentication, not encryption. WPA encryption is a separate layer.' },
      { text:'A load balancing protocol; primary server, backup server, load balancer', correct:false, why:'Load balancing distributes traffic across servers. 802.1X controls who can access the network at all — it operates before any application traffic is allowed.' },
    ]
  },
  {
    q: 'A security engineer reviews traffic logs and sees regular HTTPS connections from an internal workstation to an external IP that resolved to a newly-registered domain. The connections happen every 4 minutes, each transferring a small amount of data. What does this indicate?',
    choices: [
      { text:'Normal software update behavior', correct:false, why:'Software updates are infrequent and typically large data transfers. Regular 4-minute beaconing to a newly-registered domain is not consistent with legitimate software update behavior.' },
      { text:'C2 beaconing from malware on the workstation', correct:true, why:'Regular short-interval connections (beacon interval) to newly-registered domains transferring small amounts of data is a classic C2 (Command and Control) beaconing pattern. Malware checks in with its C2 server for instructions. Newly-registered domain = indicator of attacker infrastructure.' },
      { text:'DDoS traffic originating from this workstation', correct:false, why:'DDoS traffic would be high-volume outbound flooding, not small regular beaconing. C2 beaconing is characterized by regularity and small data size.' },
      { text:'Normal DNS resolver activity', correct:false, why:'DNS resolver traffic goes to DNS servers on port 53, not HTTPS connections to a single external IP. DNS queries are very frequent and go to many destinations, not one specific IP every 4 minutes.' },
    ]
  },
  {
    q: 'A company needs a connection between their on-premises datacenter and their AWS VPC that doesn\'t traverse the public internet, uses dedicated bandwidth, and provides lower latency than a standard VPN. What solution fits?',
    choices: [
      { text:'Site-to-site IPSec VPN over the internet', correct:false, why:'IPSec VPN still traverses the public internet — the traffic is encrypted but shares bandwidth with all internet traffic, introducing variable latency and contention.' },
      { text:'AWS Direct Connect (or equivalent cloud private interconnect)', correct:true, why:'AWS Direct Connect (and equivalent services from other cloud providers) establishes a dedicated private network connection from your datacenter to the cloud provider\'s network, bypassing the public internet entirely. Consistent low latency, dedicated bandwidth, and lower data transfer costs for high-volume connections.' },
      { text:'Split tunneling VPN', correct:false, why:'Split tunneling routes only some traffic through the VPN — the rest still goes over the public internet. Doesn\'t address dedicated bandwidth or bypassing the internet.' },
      { text:'MPLS network connecting to the cloud', correct:false, why:'MPLS is a private WAN technology typically connecting enterprise offices, not generally used for cloud connectivity (though some providers offer it). AWS Direct Connect is the standard answer for dedicated cloud connectivity.' },
    ]
  },
  {
    q: 'What makes WPA3\'s SAE (Simultaneous Authentication of Equals) more secure than WPA2\'s PSK handshake?',
    choices: [
      { text:'WPA3 uses a longer password requirement', correct:false, why:'WPA3 doesn\'t mandate longer passwords. The security improvement comes from the mathematical handshake mechanism, not password length requirements.' },
      { text:'SAE uses a zero-knowledge proof resistant to offline dictionary attacks, with forward secrecy per session', correct:true, why:'WPA2-PSK\'s 4-way handshake can be captured and subjected to offline dictionary attacks — an attacker captures the handshake and tries password after password offline. SAE\'s DRAGONFLY handshake uses cryptographic commitment that cannot be attacked offline. Each session also gets a unique key (forward secrecy) so capturing old traffic doesn\'t help if the password is later known.' },
      { text:'WPA3 only allows certificate-based authentication', correct:false, why:'WPA3-Personal still uses a pre-shared password (not certificates). WPA3-Enterprise uses 802.1X. The improvement in Personal mode is the SAE handshake mechanism.' },
      { text:'WPA3 uses symmetric encryption for the key exchange', correct:false, why:'Symmetric encryption requires pre-sharing a key — it\'s not suitable for key exchange. SAE uses asymmetric cryptographic operations (discrete logarithm) to enable the zero-knowledge proof.' },
    ]
  },
  {
    q: 'A forward proxy is deployed on the corporate network. What security function can it perform that a simple firewall cannot?',
    choices: [
      { text:'Block traffic by IP address', correct:false, why:'IP-based blocking is a basic firewall function — firewalls do this more efficiently at the packet level than a proxy.' },
      { text:'Inspect HTTPS content after SSL/TLS decryption for malware and policy violations', correct:true, why:'A forward proxy with SSL inspection (SSL bump/intercept) decrypts TLS traffic, inspects the content for malware, data leakage, policy violations (blocking streaming sites, etc.), then re-encrypts and forwards. A simple packet-filtering firewall can only see that port 443 traffic is encrypted — not what\'s inside.' },
      { text:'Perform stateful tracking of TCP connections', correct:false, why:'Stateful inspection is a firewall capability. Proxies do terminate and re-establish connections (making them inherently application-aware), but stateful TCP tracking is the firewall\'s domain.' },
      { text:'Route traffic between VLANs', correct:false, why:'VLAN routing is performed by Layer 3 switches or routers. A proxy operates at the application layer and doesn\'t handle Layer 3 routing.' },
    ]
  },
  {
    q: 'Which of the following BEST represents the purpose of a screened subnet architecture?',
    choices: [
      { text:'Encrypt traffic between servers in the same network segment', correct:false, why:'A screened subnet is a network architecture (placement of servers between firewalls), not an encryption mechanism. Encryption within a segment is handled by TLS or IPSec.' },
      { text:'Place public-facing servers in a zone isolated from the internal network by firewalls on both sides', correct:true, why:'A screened subnet (DMZ) places public-facing services between an external and internal firewall. Compromise of a DMZ server doesn\'t grant direct access to internal systems — the attacker faces the internal firewall. Same concept as DMZ, just another name the exam uses.' },
      { text:'Provide redundant internet connections for failover', correct:false, why:'Redundant internet connections are handled by dual ISP connections, BGP routing, or SD-WAN — not by a screened subnet architecture.' },
      { text:'Filter traffic based on user identity rather than IP address', correct:false, why:'Identity-based filtering is done by NGFWs with user integration or ZTNA solutions. A screened subnet is a physical/logical network segmentation architecture.' },
    ]
  },
  {
    q: 'A security team wants to monitor all traffic entering and leaving a specific server without affecting its performance. Where should they place a network TAP or SPAN port?',
    choices: [
      { text:'On the server itself, running packet capture software', correct:false, why:'Running PCAP software on the server consumes CPU and memory, affecting server performance. It also only captures traffic after the server\'s network stack processes it — not a true passive tap.' },
      { text:'On the network switch, mirroring the server\'s port to a dedicated monitoring interface', correct:true, why:'A SPAN (Switch Port Analyzer) or mirror port copies all traffic to/from the server\'s switch port to a monitoring interface. The server sees no additional load. A hardware network TAP is even better — completely passive, no performance impact, and captures traffic even if the switch fails.' },
      { text:'Between the internet router and the first firewall', correct:false, why:'Placing a tap before the first firewall captures all internet traffic, not just traffic to/from a specific server. This creates enormous data volumes and doesn\'t isolate the server of interest.' },
      { text:'On the server\'s firewall rule logging', correct:false, why:'Firewall logs record allowed/denied connections by rule — they don\'t capture full packet content for traffic analysis and forensics.' },
    ]
  },
  {
    q: 'An organization is implementing NAC using 802.1X. A device connects to a switch port but the RADIUS server is unreachable. What should the switch do according to secure design principles?',
    choices: [
      { text:'Grant full network access as a fallback to avoid service disruption', correct:false, why:'Failing open (granting access when authentication fails) completely defeats the purpose of NAC. Any device could gain access simply by blocking RADIUS traffic.' },
      { text:'Place the device in a restricted VLAN or deny access until RADIUS is reachable', correct:true, why:'Secure design principle: fail closed. If the authentication server is unreachable, default to a restricted state (remediation VLAN with limited access) or deny access entirely. This prevents attackers from bypassing NAC by blocking RADIUS traffic.' },
      { text:'Allow access but log the RADIUS failure for review', correct:false, why:'Logging without enforcement is detection without prevention. An attacker who knows RADIUS is down (by timing or causing the failure) could connect during that window. Fail-closed is the correct posture.' },
      { text:'Reset the switch to factory defaults', correct:false, why:'Factory resetting a production switch on RADIUS failure would be catastrophically disruptive. The correct response is fail-closed — restrict access, not reset infrastructure.' },
    ]
  },
];
