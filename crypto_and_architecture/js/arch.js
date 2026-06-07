// ─────────────────────────────────────────────────────────────
//  ARCHITECTURE CONCEPTS
// ─────────────────────────────────────────────────────────────
window.archConcepts = [
  { label:'Zero Trust', term:'Never Trust, Always Verify', def:'No implicit trust based on network location. Every access request is authenticated, authorized, and continuously validated regardless of source — inside or outside the perimeter. Eliminates the "castle-and-moat" assumption.', tags:['integ','auth'] },
  { label:'Zero Trust Component', term:'Policy Engine / PA / PEP', def:'Policy Engine (PE): brain — evaluates access against policy, user risk, device health, context. Policy Administrator (PA): issues/revokes session tokens based on PE decision. Policy Enforcement Point (PEP): gatekeeper on the data plane — allows or blocks actual traffic. Control plane = PE+PA. Data plane = PEP.', tags:['auth'] },
  { label:'Zero Trust', term:'Adaptive Identity', def:'Trust score adjusts dynamically based on behavioral signals. Anomalous behavior (new country, odd hours, unusual data volume) triggers step-up authentication or session termination. Trust is never permanently granted.', tags:['auth'] },
  { label:'Segmentation', term:'Network Segmentation / Micro-segmentation', def:'Segmentation divides networks into zones (VLANs, subnets, DMZ). Micro-segmentation applies granular control to individual workloads — controls east-west traffic. Limits lateral movement after breach. IoT/OT should be isolated from corporate networks.', tags:['conf','integ'] },
  { label:'Cloud', term:'IaaS / PaaS / SaaS', def:'IaaS: customer manages OS up; provider manages physical+hypervisor. PaaS: customer manages app+data; provider manages runtime+below. SaaS: customer manages data and access only; provider manages everything else. Each tier shifts security responsibility.', tags:['conf'] },
  { label:'Cloud', term:'Shared Responsibility Model', def:'In cloud, security duties are split. Provider: physical security, hypervisor, core infrastructure. Customer: data classification, access management, application security. The boundary shifts depending on whether it\'s IaaS, PaaS, or SaaS.', tags:['conf','integ'] },
  { label:'Hardening', term:'System Hardening', def:'Reduce attack surface before production: disable unused ports/services, remove unnecessary software, change default credentials, apply patches, enable host-based firewall, configure audit logging. CIS Benchmarks provide step-by-step hardening guides per OS/application.', tags:['integ'] },
  { label:'Access Control', term:'RBAC / ABAC / MAC / DAC', def:'RBAC: permissions to roles (most common in enterprise). ABAC: access via multiple attributes (dept, device, time). MAC: security labels (Top Secret/Secret) — government/military model. DAC: resource owner controls access (file system permissions). Exam: "job role" = RBAC, "multiple conditions" = ABAC.', tags:['auth'] },
  { label:'Embedded / ICS', term:'SCADA / ICS / IoT Security', def:'ICS/SCADA: legacy OS, often unpatched (patching breaks vendor certification), proprietary protocols, physical safety impact. Mitigations: air-gap or segment, passive monitoring only (active scanning can crash PLCs), unidirectional gateways. IoT: change defaults, isolate on separate VLAN, firmware updates.', tags:['conf','integ'] },
  { label:'Deception', term:'Honeypot / Honeynet', def:'Honeypot: fake system with no legitimate use — any connection is suspicious. Honeynet: network of honeypots. Used for early detection of lateral movement, threat intelligence gathering, slowing attackers. No real data = any access is an indicator.', tags:['integ'] },
  { label:'Infrastructure', term:'SDN (Software-Defined Networking)', def:'Separates control plane (routing decisions) from data plane (packet forwarding). Centralized controller enables dynamic policy enforcement, automated network segmentation, rapid response to incidents — all via software, not physical hardware changes.', tags:['conf','integ'] },
  { label:'Mitigation', term:'Isolation / Sandboxing', def:'Run untrusted code or processes in a contained environment with limited system access. Prevents malware from escaping to the host. Used for: malware analysis, browser security, legacy application containment, email attachment detonation.', tags:['conf','integ'] },
  { label:'Resilience', term:'Defense in Depth', def:'Multiple overlapping security controls across technical, administrative, and physical layers. No single point of failure — if one control fails, others compensate. Examples: firewall + IDS + EDR + DLP + security training + physical access control.', tags:['conf','integ','auth'] },
  { label:'Resilience', term:'Separation of Duties', def:'Critical tasks divided among multiple individuals so no single person can complete a sensitive action alone. Prevents fraud and insider threats. Example: one person initiates a wire transfer, a different person approves it.', tags:['auth'] },
];

// ─────────────────────────────────────────────────────────────
//  ARCHITECTURE QUESTION BANK (24 questions, 8 drawn per quiz)
// ─────────────────────────────────────────────────────────────
window.archBank = [
  {
    q: 'A hospital has medical IoT devices (infusion pumps, MRI controllers) that cannot be patched and run proprietary protocols. They are on the same VLAN as workstations. What is the BEST mitigation?',
    choices: [
      { text:'Deploy an IDS on the VLAN', correct:false, why:'An IDS detects and alerts on suspicious traffic but doesn\'t prevent attacks. Unpatched IoT devices can still be compromised and pivot to workstations on the same VLAN.' },
      { text:'Segment IoT devices onto a separate isolated VLAN', correct:true, why:'Network segmentation isolates unpatched IoT devices. A breach of an infusion pump can\'t reach workstations or patient records. This is the foundational mitigation for unmanageable devices.' },
      { text:'Encrypt all traffic on the VLAN', correct:false, why:'Encryption protects data in transit but doesn\'t prevent lateral movement between devices on the same segment. A compromised device can still attack others even if traffic is encrypted.' },
      { text:'Require MFA for all IoT devices', correct:false, why:'Medical IoT devices typically cannot support MFA — they often have no user interface or authentication mechanism. This is not a practical mitigation for these devices.' },
    ]
  },
  {
    q: 'A user logs into a corporate system from an unusual country. The system automatically requires a second authentication factor and reduces the user\'s access level temporarily. What zero trust concept is this?',
    choices: [
      { text:'Micro-segmentation', correct:false, why:'Micro-segmentation controls east-west network traffic between workloads. It\'s a network-layer control, not a dynamic identity trust adjustment mechanism.' },
      { text:'Adaptive identity', correct:true, why:'Adaptive identity continuously evaluates risk signals (location, behavior, device posture) and adjusts authentication requirements dynamically. Unusual login = elevated risk = step-up auth triggered.' },
      { text:'Policy Enforcement Point', correct:false, why:'The PEP is the gatekeeper that enforces access decisions. It\'s the mechanism that would block or allow access, but the CONCEPT of dynamically adjusting trust based on behavior is adaptive identity.' },
      { text:'VLAN segmentation', correct:false, why:'VLAN segmentation is a static network control. It doesn\'t dynamically adjust based on user behavior or risk signals.' },
    ]
  },
  {
    q: 'An organization wants to detect attackers who have already bypassed the perimeter firewall and are moving laterally through the internal network. They deploy fake systems with no legitimate traffic. What is this technique?',
    choices: [
      { text:'IDS (Intrusion Detection System)', correct:false, why:'An IDS monitors real network traffic for suspicious patterns. It has legitimate traffic flowing through it. A honeypot specifically has NO legitimate traffic — every connection is suspicious by definition.' },
      { text:'Honeypot', correct:true, why:'A honeypot is a decoy system with no legitimate purpose. Any connection to it is inherently suspicious, making it highly effective at detecting lateral movement from an attacker already inside the network.' },
      { text:'Sandbox', correct:false, why:'A sandbox is an isolated environment for safely executing untrusted code. It\'s used for malware analysis, not for detecting attackers moving through a network.' },
      { text:'Vulnerability scanner', correct:false, why:'A vulnerability scanner actively probes systems to find weaknesses. It\'s a proactive assessment tool, not a passive detection mechanism for attackers already inside the network.' },
    ]
  },
  {
    q: 'A developer needs to execute a suspicious executable to analyze its behavior. The environment must prevent the malware from affecting production systems. Which technique BEST meets this requirement?',
    choices: [
      { text:'Network segmentation', correct:false, why:'Network segmentation controls which network zones can communicate. While useful, it doesn\'t isolate code execution — malware can still affect the local system it runs on and potentially escape through allowed network paths.' },
      { text:'Sandboxing / isolation', correct:true, why:'A sandbox is specifically designed to contain untrusted code execution. The malware runs in an isolated environment where it cannot access real system resources, make persistent changes, or affect production.' },
      { text:'System hardening', correct:false, why:'Hardening reduces attack surface before deployment. It doesn\'t create an isolated execution environment for safely running known-malicious code.' },
      { text:'Patching', correct:false, why:'Patching addresses known CVEs in software. It doesn\'t provide an isolated environment for safely analyzing malicious executables.' },
    ]
  },
  {
    q: 'A company deploys an application in the cloud. The provider manages the physical servers and hypervisor. The company manages the OS, application, and data. What cloud model is this?',
    choices: [
      { text:'SaaS', correct:false, why:'In SaaS, the provider manages everything including the application. The customer only configures the application and manages their data — they don\'t manage the OS.' },
      { text:'PaaS', correct:false, why:'In PaaS, the provider manages the OS and runtime too. The customer only manages application code and data — they don\'t manage the OS.' },
      { text:'IaaS', correct:true, why:'IaaS: provider manages physical infrastructure and hypervisor. Customer manages everything from the OS up — OS, middleware, runtime, application, and data. The scenario describes this split perfectly.' },
      { text:'FaaS (Function as a Service)', correct:false, why:'FaaS (serverless) is even more abstracted than PaaS. Developers deploy individual functions — they manage only the code logic, not OS, runtime, or server configuration.' },
    ]
  },
  {
    q: 'An employee in the finance department can access HR records they shouldn\'t need for their job. The company decides to restrict access based on each user\'s job function. Which access control model are they implementing?',
    choices: [
      { text:'MAC (Mandatory Access Control)', correct:false, why:'MAC uses security classification labels (Top Secret, Secret, etc.) enforced by the OS. It\'s used in military/government environments, not typically for corporate HR/Finance access control.' },
      { text:'DAC (Discretionary Access Control)', correct:false, why:'DAC lets resource OWNERS control who can access their resources. The scenario describes centralized policy enforcement based on role, not owner-controlled access.' },
      { text:'RBAC (Role-Based Access Control)', correct:true, why:'RBAC assigns permissions to roles (Finance role, HR role). Users are assigned to roles. The Finance role doesn\'t include HR data access. This is the most common model in enterprise environments.' },
      { text:'ABAC (Attribute-Based Access Control)', correct:false, why:'ABAC uses multiple dynamic attributes (dept AND device type AND time AND location). The scenario specifically describes restricting by job role/function — that\'s RBAC, not multi-attribute ABAC.' },
    ]
  },
  {
    q: 'After deploying a new server, a security admin disables Telnet, closes ports 21 and 23, removes the default guest account, and installs the latest OS patches. What is this process called?',
    choices: [
      { text:'Vulnerability scanning', correct:false, why:'Vulnerability scanning identifies existing weaknesses through active probing. It discovers problems but doesn\'t fix them. What\'s described is the remediation process — actually implementing fixes.' },
      { text:'System hardening', correct:true, why:'System hardening systematically reduces attack surface: disabling unnecessary services, closing unused ports, removing default accounts, and patching. The goal is to minimize exposure before the system goes into production.' },
      { text:'Network segmentation', correct:false, why:'Network segmentation divides the network into zones. It\'s a network-layer control. What\'s described — closing ports, removing accounts, patching — is host-level hardening, not network architecture.' },
      { text:'Threat modeling', correct:false, why:'Threat modeling is a design-phase process of identifying threats and attack vectors before building a system. What\'s described is the operational implementation of security controls, not a modeling exercise.' },
    ]
  },
  {
    q: 'A company implements a firewall, IDS, endpoint protection, DLP, and mandatory security awareness training. No single control is solely relied upon. What security principle does this describe?',
    choices: [
      { text:'Zero Trust', correct:false, why:'Zero Trust is specifically about eliminating implicit network-location-based trust and requiring continuous verification of identity. Layering multiple different types of controls is a separate principle.' },
      { text:'Least Privilege', correct:false, why:'Least privilege means granting only the minimum access needed for a role. The scenario describes a philosophy about control layering, not access minimization.' },
      { text:'Defense in Depth', correct:true, why:'Defense in Depth layers multiple, different security controls across technical, administrative, and physical domains. If one fails (the firewall), another compensates (IDS catches it, EDR contains it). Redundancy of controls is the key idea.' },
      { text:'Separation of Duties', correct:false, why:'Separation of Duties divides sensitive tasks among multiple people to prevent fraud. The scenario is about layering security technologies, not dividing human responsibilities.' },
    ]
  },
  {
    q: 'An SCADA system controls water treatment plant pumps. A security team wants to monitor its network traffic for anomalies without disrupting operations. Which approach is MOST appropriate?',
    choices: [
      { text:'Run a Nessus vulnerability scan against the SCADA controllers weekly', correct:false, why:'Active scanning of ICS/SCADA systems can cause PLCs and controllers to crash or malfunction — potentially causing physical consequences. Active scanning is dangerous in OT environments.' },
      { text:'Passive network monitoring with IDS tuned for ICS protocols', correct:true, why:'Passive monitoring captures and analyzes traffic without sending any probes. ICS-aware IDS signatures (for protocols like Modbus, DNP3) can detect anomalies without risking system stability.' },
      { text:'Apply all vendor patches immediately as released', correct:false, why:'ICS systems often can\'t be patched on vendor release schedules — patching may require downtime, vendor approval, and recertification. Immediate patching without extensive testing can break certified configurations.' },
      { text:'Place the SCADA system on the corporate VLAN for easier management', correct:false, why:'The exact opposite — OT/SCADA systems should be isolated on their own segment or air-gapped. Placing them on the corporate VLAN dramatically increases their exposure to IT-side threats.' },
    ]
  },
  {
    q: 'What is the PRIMARY difference between the Zero Trust model and the traditional perimeter (castle-and-moat) security model?',
    choices: [
      { text:'Zero Trust uses more firewalls', correct:false, why:'Zero Trust is an architectural philosophy, not a technology count. It can involve fewer perimeter firewalls and more identity-based controls. More firewalls ≠ Zero Trust.' },
      { text:'Zero Trust eliminates implicit trust based on network location', correct:true, why:'Traditional perimeter security trusts anything inside the network boundary. Zero Trust assumes no implicit trust regardless of location — every request is authenticated and authorized, whether from inside or outside.' },
      { text:'Traditional security doesn\'t use encryption', correct:false, why:'Traditional security absolutely uses encryption. The difference is about trust models and where the trust boundary is drawn, not whether encryption is used.' },
      { text:'Zero Trust only applies to cloud environments', correct:false, why:'Zero Trust is an architecture applicable to on-premises, cloud, hybrid, and remote work environments. It\'s a philosophy about trust, not a cloud-specific technology.' },
    ]
  },
  {
    q: 'In a Zero Trust architecture, which component is responsible for actually allowing or blocking traffic based on an access decision?',
    choices: [
      { text:'Policy Engine (PE)', correct:false, why:'The Policy Engine evaluates whether access should be granted — it\'s the decision maker. But it doesn\'t directly allow or block traffic. That\'s the enforcement layer\'s job.' },
      { text:'Policy Administrator (PA)', correct:false, why:'The Policy Administrator issues and revokes session tokens based on the Policy Engine\'s decision. It communicates the decision but doesn\'t directly enforce it on network traffic.' },
      { text:'Policy Enforcement Point (PEP)', correct:true, why:'The PEP is the gatekeeper on the data plane. It receives authorization from the Policy Administrator and physically allows or blocks actual network traffic. This is where enforcement happens.' },
      { text:'SIEM', correct:false, why:'A SIEM aggregates logs and generates alerts. It\'s a monitoring and detection tool — it doesn\'t make or enforce access control decisions in real-time.' },
    ]
  },
  {
    q: 'An organization needs users to prove their identity using their department, device compliance status, time of day, AND location simultaneously. Which access control model fits?',
    choices: [
      { text:'RBAC', correct:false, why:'RBAC grants access based on role alone. It doesn\'t natively handle multiple dynamic conditions like device compliance or time of day.' },
      { text:'MAC', correct:false, why:'MAC uses fixed security labels (Top Secret / Secret / Unclassified). It doesn\'t dynamically evaluate multiple context attributes simultaneously.' },
      { text:'ABAC', correct:true, why:'ABAC (Attribute-Based Access Control) evaluates multiple attributes simultaneously: department, device posture, time, location. Access is granted only when ALL specified conditions are met. Perfect for complex, dynamic policy.' },
      { text:'DAC', correct:false, why:'DAC lets resource owners control access to their own resources. It\'s owner-centric, not policy-centric. It doesn\'t evaluate multiple dynamic context attributes.' },
    ]
  },
  {
    q: 'A company is migrating to a SaaS HR platform. Under the shared responsibility model, what security responsibilities remain with the company?',
    choices: [
      { text:'Patching the underlying OS and database', correct:false, why:'In SaaS, the provider manages everything from the OS through the application layer. The customer never touches the OS, database, or infrastructure.' },
      { text:'Data classification, user access management, and configuration of the application', correct:true, why:'In SaaS, the customer is responsible for: classifying their data, controlling who can access it (user provisioning/deprovisioning), and configuring the application\'s security settings.' },
      { text:'Physical datacenter security', correct:false, why:'Physical security is always the cloud provider\'s responsibility. The customer has no access to or control over the physical infrastructure.' },
      { text:'Hypervisor maintenance', correct:false, why:'The hypervisor is provider-managed in all cloud service models. Customers never have access to or responsibility for the hypervisor layer.' },
    ]
  },
  {
    q: 'A single employee in accounting has the ability to create vendors, approve invoices, and initiate wire transfers all by themselves. What security principle is violated?',
    choices: [
      { text:'Least privilege', correct:false, why:'Least privilege is about having only the minimum access needed. While related, the specific concern here is that one person can complete an entire sensitive financial transaction from start to finish — that\'s a different principle.' },
      { text:'Separation of duties', correct:true, why:'Separation of duties requires that critical/sensitive tasks be divided among multiple people so no single person can complete a high-risk action alone. Here, one person controls the entire financial process — enabling fraud without detection.' },
      { text:'Defense in depth', correct:false, why:'Defense in depth is about layering multiple security controls. The issue here is about distributing human authority over sensitive transactions, not about control layering.' },
      { text:'Zero Trust', correct:false, why:'Zero Trust relates to network access and identity verification. While access controls are part of ZT, the principle specifically violated here is the division of sensitive duties among multiple people.' },
    ]
  },
  {
    q: 'An organization deploys a network of interconnected fake systems designed to engage and study attackers over an extended period. What is this called?',
    choices: [
      { text:'Honeypot', correct:false, why:'A honeypot is a single decoy system. The scenario describes multiple interconnected fake systems operating as a network — that\'s a honeynet.' },
      { text:'Honeynet', correct:true, why:'A honeynet is a network of honeypots and supporting infrastructure designed to attract and monitor attacker behavior over time. It provides richer threat intelligence than a single honeypot.' },
      { text:'DMZ', correct:false, why:'A DMZ (Demilitarized Zone) is a real network segment for public-facing servers, protected by firewalls. It\'s a legitimate part of the network architecture, not a deception system.' },
      { text:'Sandbox', correct:false, why:'A sandbox isolates code or processes for safe execution. It\'s a technical containment control, not a deception-based detection mechanism.' },
    ]
  },
  {
    q: 'An organization separates its network control functions (routing decisions) from its packet forwarding functions, managed centrally via software. What technology is this?',
    choices: [
      { text:'VLAN', correct:false, why:'VLANs logically segment a network at layer 2. They don\'t separate control plane from data plane or centralize routing decisions.' },
      { text:'SDN (Software-Defined Networking)', correct:true, why:'SDN separates the control plane (routing/policy decisions) from the data plane (packet forwarding). A centralized controller manages policies, enabling dynamic, software-driven network configuration.' },
      { text:'DMZ', correct:false, why:'A DMZ is a network zone between the internet and internal network for hosting public-facing services. It\'s an architectural placement strategy, not a control/data plane separation technology.' },
      { text:'IDS', correct:false, why:'An IDS monitors traffic for suspicious patterns and generates alerts. It doesn\'t manage or separate network control functions.' },
    ]
  },
  {
    q: 'An IoT vendor provides smart thermostats that ship with the default username "admin" and password "admin". What is the FIRST hardening step that should be applied?',
    choices: [
      { text:'Segment the devices on their own VLAN', correct:false, why:'Segmentation is an excellent secondary control, but it doesn\'t address the immediate vulnerability — the default credentials that any attacker can use to log in once they reach the device.' },
      { text:'Change the default credentials immediately', correct:true, why:'Default credentials are one of the most commonly exploited vulnerabilities in IoT. Changing them is the first and most fundamental hardening step. Many large-scale IoT botnets (like Mirai) exploited unchanged default credentials.' },
      { text:'Enable full-disk encryption on the thermostat', correct:false, why:'Thermostats typically have no user-accessible file system and no full-disk encryption capability. This isn\'t a realistic or available control for most IoT devices.' },
      { text:'Deploy an HSM to manage the thermostat\'s keys', correct:false, why:'HSMs are enterprise-grade devices for managing cryptographic keys at scale. Deploying them for consumer IoT thermostats is not practical or necessary as a first hardening step.' },
    ]
  },
  {
    q: 'A company wants to prevent a single compromised server in the data center from being able to attack all other servers, even those on the same subnet. What control achieves this?',
    choices: [
      { text:'Perimeter firewall', correct:false, why:'Perimeter firewalls control north-south traffic (entering/leaving the network). They don\'t control east-west traffic between servers on the same internal subnet.' },
      { text:'Micro-segmentation', correct:true, why:'Micro-segmentation applies granular, workload-level access controls to east-west traffic within the data center. Each server can only communicate with explicitly permitted destinations, limiting lateral movement.' },
      { text:'VLAN tagging only', correct:false, why:'VLANs segment at layer 2 by grouping ports, but all devices in the same VLAN can freely communicate. Micro-segmentation provides finer granularity down to individual workloads.' },
      { text:'Disabling ICMP network-wide', correct:false, why:'Disabling ICMP prevents ping, but attackers can still move laterally using TCP/UDP on allowed ports. This is a minor inconvenience, not a segmentation control.' },
    ]
  },
  {
    q: 'A security team is reviewing cloud architecture. The provider manages the runtime, middleware, and OS. The customer manages the application and data. What service model is in use?',
    choices: [
      { text:'IaaS', correct:false, why:'In IaaS, the customer manages the OS. If the provider manages the OS, it\'s a higher abstraction level.' },
      { text:'PaaS', correct:true, why:'In PaaS, the provider manages physical infrastructure, hypervisor, OS, runtime, and middleware. The customer manages only the application code and data. This is the classic PaaS boundary.' },
      { text:'SaaS', correct:false, why:'In SaaS, the provider manages the application too. The customer only uses the application and manages their data and user access settings.' },
      { text:'On-premises', correct:false, why:'On-premises means the organization manages everything from physical hardware up. If a provider is managing OS and runtime, it\'s a cloud model.' },
    ]
  },
  {
    q: 'What is the key security advantage of keeping a Root CA offline (air-gapped)?',
    choices: [
      { text:'It makes certificate issuance faster', correct:false, why:'An offline Root CA actually makes issuance slower — the CA must be brought online manually for each operation. The benefit is security, not speed.' },
      { text:'Compromise of the Root CA would invalidate the entire PKI trust chain', correct:true, why:'The Root CA\'s private key is the ultimate trust anchor. If compromised, every certificate in the entire hierarchy would be untrusted. Keeping it offline removes all network attack surface.' },
      { text:'It reduces the cost of certificate issuance', correct:false, why:'Air-gapping a Root CA adds operational complexity and cost. The motivation is security, not cost reduction.' },
      { text:'It enables OCSP Stapling on all certificates', correct:false, why:'OCSP Stapling is a server-side TLS optimization. It has no relationship to whether the Root CA is online or offline.' },
    ]
  },
  {
    q: 'An employee is terminated. Which immediate access control action is most critical from a security perspective?',
    choices: [
      { text:'Changing the company\'s firewall rules', correct:false, why:'Firewall rules control network-level access but are typically not user-specific. Changing them doesn\'t prevent the former employee from using existing credentials through legitimate channels.' },
      { text:'Revoking all accounts, credentials, and access tokens immediately', correct:true, why:'Immediate deprovisioning — disabling accounts, revoking certificates/tokens/API keys, removing VPN access — is the critical first step. The longer credentials remain active, the greater the insider threat window.' },
      { text:'Running a vulnerability scan on their workstation', correct:false, why:'A vulnerability scan identifies security weaknesses in software configurations. It doesn\'t address the access rights of the terminated employee.' },
      { text:'Re-imaging their workstation immediately', correct:false, why:'Re-imaging eventually should happen, but it\'s not the most critical immediate action. The pressing risk is active credentials, not the workstation itself.' },
    ]
  },
  {
    q: 'A company\'s security policy requires that no single IT administrator can both make changes to production systems AND approve those changes without a second person\'s sign-off. What principle does this implement?',
    choices: [
      { text:'Least privilege', correct:false, why:'Least privilege ensures users have only the minimum access needed. This policy is about dividing approval authority, not about minimizing access levels.' },
      { text:'Separation of duties', correct:true, why:'Separation of duties prevents a single person from controlling an entire sensitive process. Here, making AND approving changes are separated — preventing unauthorized changes and reducing insider threat risk.' },
      { text:'Defense in depth', correct:false, why:'Defense in depth is about layering multiple security controls. This policy is specifically about dividing human authority over a critical task.' },
      { text:'Mandatory Access Control', correct:false, why:'MAC uses classification labels enforced by the OS (Top Secret, Secret, etc.). It\'s not about approval workflows for IT change management.' },
    ]
  },
  {
    q: 'A security architect is designing a system where internal services authenticate each other even though they\'re on the same private network, using certificates for every connection. What model does this follow?',
    choices: [
      { text:'Perimeter security — strong border is sufficient', correct:false, why:'Perimeter security assumes internal traffic is trusted. This design explicitly rejects that assumption by requiring authentication even between internal services.' },
      { text:'Zero Trust — never trust, always verify', correct:true, why:'Zero Trust requires authentication for every connection regardless of network location. Requiring mutual TLS certificate authentication between internal services implements ZT principles — no implicit trust even inside the network.' },
      { text:'Defense in depth — adding internal firewalls', correct:false, why:'Adding internal firewalls is one component of defense in depth, but certificate-based mutual authentication between services is specifically a Zero Trust identity verification mechanism.' },
      { text:'RBAC — role-based traffic control', correct:false, why:'RBAC controls what authenticated users can do. Certificate-based service authentication is about verifying SERVICE identity, not human role assignment.' },
    ]
  },
  {
    q: 'A company discovers that a threat actor has been living inside their network for weeks, moving between servers. Which detection control is specifically designed to catch this type of lateral movement?',
    choices: [
      { text:'Perimeter firewall with strict egress rules', correct:false, why:'A perimeter firewall controls traffic entering and leaving the network. An attacker already inside who is moving laterally between internal servers wouldn\'t be caught by perimeter controls.' },
      { text:'Honeypots placed inside the internal network', correct:true, why:'Internal honeypots are specifically designed to detect lateral movement. An attacker moving between servers will eventually encounter a honeypot — any connection to it is immediately suspicious since legitimate users never access it.' },
      { text:'SSL certificate inspection at the gateway', correct:false, why:'SSL inspection decrypts and inspects TLS traffic at the network boundary. It doesn\'t detect internal lateral movement between servers.' },
      { text:'Disabling unnecessary user accounts', correct:false, why:'Disabling unused accounts reduces the attack surface but doesn\'t detect an attacker already operating with compromised credentials inside the network.' },
    ]
  },
];
