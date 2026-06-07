// ─────────────────────────────────────────────────────────────
//  MODULE 3: IDENTITY, ACCESS & AUTHENTICATION
// ─────────────────────────────────────────────────────────────

window.moduleConcepts = [
  { label:'Authentication', term:'MFA — Something You Know / Have / Are', def:'Multi-Factor Authentication requires two or more categories. Know: password, PIN, security question. Have: TOTP app (Google Authenticator), SMS OTP, hardware token (YubiKey), smart card. Are: fingerprint, iris scan, facial recognition, voice. Inherence (biometrics) is strongest for non-repudiation. SMS OTP is weakest (SIM swap attacks).', tags:['auth'] },
  { label:'Authentication', term:'TOTP vs HOTP vs Push vs FIDO2', def:'TOTP (Time-based OTP): 30-second rotating code tied to current time — Google Authenticator, Authy. HOTP (HMAC-based OTP): counter-based, doesn\'t expire. Push: app approval notification (Duo). FIDO2/WebAuthn: phishing-resistant hardware key or device authenticator — gold standard. Exam: FIDO2 = phishing-resistant.', tags:['auth'] },
  { label:'Federation', term:'SAML 2.0', def:'XML-based standard for SSO between Identity Provider (IdP) and Service Provider (SP). IdP authenticates user, issues signed SAML assertion to SP. SP trusts the assertion without re-authenticating. Used in enterprise SSO (Okta, ADFS). Flow: user → SP → redirect to IdP → authenticate → SAML assertion → SP grants access.', tags:['auth'] },
  { label:'Federation', term:'OAuth 2.0 vs OpenID Connect', def:'OAuth 2.0: authorization framework — grants limited access to a resource on behalf of user. NOT for authentication. Tokens are access tokens for API calls. OpenID Connect (OIDC): builds on OAuth 2.0 to ADD authentication. Issues ID token (JWT). Exam: OAuth = authorization/delegation. OIDC = authentication. Both use access tokens; OIDC also uses ID tokens.', tags:['auth','conf'] },
  { label:'Directory', term:'LDAP & Active Directory', def:'LDAP (Lightweight Directory Access Protocol): protocol for querying/modifying directory services. Port 389 (plain), 636 (LDAPS — SSL). Active Directory (AD): Microsoft\'s directory service using LDAP + Kerberos. Stores users, groups, computers, policies. GPOs (Group Policy Objects) enforce security settings across domain. AD is the most targeted enterprise asset.', tags:['auth'] },
  { label:'Authentication Protocol', term:'Kerberos', def:'Ticket-based authentication used in Active Directory. KDC (Key Distribution Center) = AS (Authentication Service) + TGS (Ticket Granting Service). Flow: user authenticates to AS → receives TGT → presents TGT to TGS → receives service ticket → presents to target service. Tickets expire (typically 10 hours). Kerberoasting: attacker requests service tickets and cracks service account passwords offline.', tags:['auth'] },
  { label:'Privileged Access', term:'PAM — Privileged Access Management', def:'Controls, monitors, and audits privileged accounts (admins, service accounts). Core features: just-in-time (JIT) access (temporary elevation, no standing admin), password vaulting (auto-rotate service account passwords, no one knows them), session recording (video of all privileged sessions), least privilege enforcement. Mitigates insider threat and compromised admin credentials.', tags:['auth','integ'] },
  { label:'Access Control', term:'Least Privilege & Need-to-Know', def:'Least privilege: grant only the minimum permissions required to perform a job function — nothing more. Need-to-know: even with the right clearance, access requires a business justification for that specific data. Implemented via RBAC, privilege review, account recertification campaigns. Violated by privilege creep (accumulating permissions over time).', tags:['auth','conf'] },
  { label:'Identity Lifecycle', term:'Provisioning, Deprovisioning & Recertification', def:'Provisioning: creating accounts and assigning access when someone joins. Deprovisioning: disabling/deleting accounts when someone leaves — critical to do IMMEDIATELY. Recertification (access review): periodic review of who has what access, managers certify their team\'s permissions. Catches privilege creep and dormant accounts.', tags:['auth'] },
  { label:'Zero Trust Identity', term:'Identity as the New Perimeter', def:'In Zero Trust, the network perimeter is gone. Identity becomes the control plane — every access decision starts with "who is this?" Strong identity = MFA + device posture + continuous verification. Passwordless auth (FIDO2, biometrics) eliminates the weakest factor. Conditional access policies evaluate identity + device + location + risk before granting access.', tags:['auth','conf'] },
  { label:'Biometrics', term:'Biometric Error Rates: FAR, FRR, CER', def:'FAR (False Acceptance Rate): imposter accepted as legitimate — security risk. FRR (False Rejection Rate): legitimate user rejected — usability problem. CER/EER (Crossover Error Rate): point where FAR = FRR — used to compare biometric systems. Lower CER = better overall system. Exam: FAR is the security-critical metric; FRR is the user experience metric.', tags:['auth'] },
  { label:'SSO', term:'Single Sign-On (SSO)', def:'Authenticate once, access many applications. User logs in to IdP → receives token/session → uses that credential across all connected SPs without re-authenticating. Benefits: fewer passwords = fewer phishing targets, centralized authentication control. Risk: SSO account compromise = access to all connected services. Mitigate with strong MFA on the SSO account.', tags:['auth'] },
  { label:'Account Types', term:'Service Accounts & Shared Accounts', def:'Service accounts: non-human identities running applications/services. High-value targets because they often have excessive privileges and rarely rotated passwords. PAM should vault and auto-rotate. Shared accounts: multiple people use one account — kills accountability, no audit trail, can\'t enforce MFA per person. Prohibited by most compliance frameworks.', tags:['auth','integ'] },
  { label:'Passwordless', term:'FIDO2 / WebAuthn / Passkeys', def:'Phishing-resistant authentication using public key cryptography. The private key never leaves the device. Credential is site-specific — can\'t be phished to a lookalike domain because the browser validates the origin. Passkeys = FIDO2 credentials synced via cloud (iCloud Keychain, Google Password Manager). Exam: FIDO2 = phishing-resistant by design.', tags:['auth','conf'] },
];

window.moduleBank = [
  {
    q: 'A user receives an SMS with a 6-digit OTP. An attacker calls the carrier, impersonates the user, and transfers the phone number to their own SIM, intercepting the OTP. What attack is this and what MFA type would prevent it?',
    choices: [
      { text:'Brute force; prevented by account lockout', correct:false, why:'Brute force guesses credentials repeatedly. SIM swapping transfers a phone number to the attacker\'s SIM — no guessing involved. Account lockout doesn\'t address carrier-level social engineering.' },
      { text:'SIM swap attack; prevented by FIDO2/hardware token', correct:true, why:'SIM swapping ports a victim\'s number to the attacker\'s SIM, intercepting SMS OTPs. FIDO2 (hardware key or passkey) uses device-bound public key crypto — the credential is tied to the device, not to a phone number. No SMS = immune to SIM swap.' },
      { text:'Pass-the-hash; prevented by Kerberos', correct:false, why:'Pass-the-hash reuses captured NTLM hashes for lateral movement. This attack targets SMS OTP delivery at the carrier level — a completely different threat vector.' },
      { text:'Credential stuffing; prevented by unique passwords', correct:false, why:'Credential stuffing tries username/password combos from previous breaches. This attack intercepts the OTP code itself by hijacking the phone number — the password is not the target.' },
    ]
  },
  {
    q: 'An employee uses one username and password to log into HR, finance, CRM, and email applications without re-entering credentials after the initial login. What technology enables this?',
    choices: [
      { text:'MFA (Multi-Factor Authentication)', correct:false, why:'MFA adds verification factors to authentication. It doesn\'t enable access to multiple applications with a single login — that\'s a different capability.' },
      { text:'Single Sign-On (SSO)', correct:true, why:'SSO lets a user authenticate once to an Identity Provider, then access all connected applications (Service Providers) without re-authenticating. The IdP issues a session token or assertion that each SP honors.' },
      { text:'PAM (Privileged Access Management)', correct:false, why:'PAM controls privileged administrative accounts and provides features like password vaulting and session recording. It\'s not designed for regular user authentication across multiple applications.' },
      { text:'LDAP synchronization', correct:false, why:'LDAP is a directory protocol for querying user attributes. While LDAP is used by SSO systems, LDAP synchronization itself doesn\'t provide SSO — it replicates directory data.' },
    ]
  },
  {
    q: 'An application needs to allow users to log in with their Google account without Google ever seeing the application\'s user database. The user is AUTHENTICATED by Google. What protocol handles this?',
    choices: [
      { text:'OAuth 2.0', correct:false, why:'OAuth 2.0 handles AUTHORIZATION — granting an application permission to access resources on behalf of a user. It does not define authentication or issue identity claims. You should never use OAuth alone for login.' },
      { text:'OpenID Connect (OIDC)', correct:true, why:'OpenID Connect builds on OAuth 2.0 to add authentication. The IdP (Google) issues an ID token (JWT) containing identity claims. The application uses this to authenticate the user without managing passwords. "Log in with Google" = OIDC.' },
      { text:'SAML 2.0', correct:false, why:'SAML 2.0 also enables federated authentication, but it\'s XML-based and typically used in enterprise SSO contexts. "Log in with Google" for consumer apps uses OIDC, not SAML.' },
      { text:'Kerberos', correct:false, why:'Kerberos is a ticket-based authentication protocol used within Windows/AD environments. It requires a KDC on the network — it doesn\'t handle web-based federation with external identity providers like Google.' },
    ]
  },
  {
    q: 'In Active Directory, a user is compromised and an attacker requests service tickets for high-privilege service accounts, then cracks them offline using a word list. What attack is this?',
    choices: [
      { text:'Pass-the-ticket', correct:false, why:'Pass-the-ticket steals an existing Kerberos ticket from memory and reuses it. Kerberoasting specifically REQUESTS legitimate service tickets and cracks the encrypted portion offline.' },
      { text:'Kerberoasting', correct:true, why:'Kerberoasting exploits the Kerberos ticket system: any domain user can request a service ticket for any SPN. The ticket is encrypted with the service account\'s password hash. Attackers extract and crack this hash offline. Mitigation: long, complex service account passwords (120+ chars) or managed service accounts (gMSA).' },
      { text:'Golden ticket attack', correct:false, why:'A golden ticket attack forges Kerberos TGTs using the KRBTGT account hash (requires domain admin or DC compromise). Kerberoasting works with any domain user account — much lower privilege requirement.' },
      { text:'LDAP injection', correct:false, why:'LDAP injection manipulates LDAP queries via unsanitized input, similar to SQL injection. It\'s an application attack, not a Kerberos ticket exploitation technique.' },
    ]
  },
  {
    q: 'An IT admin is given permanent domain admin rights when hired. Over three years, they accumulate access to finance systems, HR systems, and development environments too. What security problem does this represent?',
    choices: [
      { text:'Excessive MFA fatigue', correct:false, why:'MFA fatigue is when too many push notifications cause a user to approve one accidentally. The scenario describes accumulated excess permissions over time — a different problem entirely.' },
      { text:'Privilege creep', correct:true, why:'Privilege creep is the gradual accumulation of access rights beyond what\'s needed for current job duties. Caused by never revoking access when roles change. Mitigated by access recertification (periodic reviews where managers confirm their team\'s permissions are still appropriate).' },
      { text:'Lateral movement', correct:false, why:'Lateral movement is an attacker technique for moving between systems after initial compromise. The scenario describes a legitimate user accumulating too many permissions — not an attacker technique.' },
      { text:'Kerberoasting', correct:false, why:'Kerberoasting is a specific attack against Kerberos service ticket encryption. The scenario describes an administrative access management failure, not an attack technique.' },
    ]
  },
  {
    q: 'A company\'s help desk receives a call from someone claiming to be the CTO, asking to reset their password immediately without following the normal identity verification procedure. What threat does this represent?',
    choices: [
      { text:'Brute force attack', correct:false, why:'Brute force systematically guesses credentials. This caller is socially engineering the help desk to bypass verification — no credential guessing involved.' },
      { text:'Vishing / social engineering targeting account recovery', correct:true, why:'This is vishing (voice phishing) targeting the account recovery process. Attackers impersonate executives specifically because help desk staff are reluctant to challenge them. Every account recovery must follow the same verification procedure regardless of claimed identity.' },
      { text:'Insider threat', correct:false, why:'An insider threat comes from someone with existing authorized access. The caller appears to be an external attacker impersonating an executive — not someone who already has internal access.' },
      { text:'Pass-the-hash', correct:false, why:'Pass-the-hash reuses captured NTLM hash credentials for authentication. This attack is purely social — manipulating a human to bypass process.' },
    ]
  },
  {
    q: 'A company implements a system where privileged admin accounts are only created on-demand when needed, exist for 4 hours, then are automatically deleted. What PAM concept is this?',
    choices: [
      { text:'Password vaulting', correct:false, why:'Password vaulting stores and auto-rotates credentials so no one needs to know service account passwords. JIT access is about the existence and duration of the privileged account itself.' },
      { text:'Just-in-Time (JIT) access', correct:true, why:'JIT access eliminates standing privileged accounts — admins request temporary elevation for a specific task, access is granted for a limited time window, then automatically revoked. Dramatically reduces the attack surface: no persistent admin accounts means attackers can\'t steal and abuse them.' },
      { text:'Session recording', correct:false, why:'Session recording captures video/keystrokes of privileged sessions for audit purposes. It monitors existing privileged access — it doesn\'t control when accounts exist.' },
      { text:'Role-based access control', correct:false, why:'RBAC assigns permissions based on job roles. While RBAC governs what access is granted, JIT specifically refers to the time-limited, on-demand provisioning of that access.' },
    ]
  },
  {
    q: 'What is the primary security risk of shared accounts (multiple users sharing one username/password)?',
    choices: [
      { text:'Shared accounts are more likely to have weak passwords', correct:false, why:'Password strength is a separate issue. The fundamental security problem with shared accounts is identity-related, not password complexity.' },
      { text:'No individual accountability — actions cannot be attributed to a specific person', correct:true, why:'Shared accounts destroy audit trails. If a shared account performs a malicious action, you cannot determine which person was responsible. MFA per individual is also impossible. Most compliance frameworks (SOX, PCI-DSS, HIPAA) explicitly prohibit shared accounts.' },
      { text:'Shared accounts bypass MFA', correct:false, why:'While MFA is harder to implement for shared accounts, the PRIMARY security problem is the loss of individual accountability and audit trail, not specifically MFA bypass.' },
      { text:'Shared accounts have higher bandwidth usage', correct:false, why:'Bandwidth is not a security consideration for shared accounts. The core issue is accountability and auditability.' },
    ]
  },
  {
    q: 'An organization implements a policy where users\' access rights are reviewed every 90 days by their managers, who must approve or revoke each permission. What process is this?',
    choices: [
      { text:'Penetration testing', correct:false, why:'Penetration testing is active security testing by authorized testers probing for vulnerabilities. The scenario describes an administrative review of access rights — a governance process, not a technical security test.' },
      { text:'Access recertification (user access review)', correct:true, why:'Access recertification is a periodic formal process where managers review and certify that their employees\' access rights are still appropriate. Catches privilege creep, dormant accounts, and unauthorized accumulation of permissions. A compliance requirement in many frameworks (SOX, PCI-DSS).' },
      { text:'Just-in-Time access provisioning', correct:false, why:'JIT access creates temporary privileges on-demand. The scenario describes a periodic review of existing standing permissions — not dynamic, on-demand provisioning.' },
      { text:'Separation of duties enforcement', correct:false, why:'Separation of duties prevents one person from controlling an entire sensitive process. Access recertification is a review process — it might identify SoD violations, but the process itself is an access review.' },
    ]
  },
  {
    q: 'What makes FIDO2/WebAuthn authentication specifically resistant to phishing, unlike TOTP or SMS OTP?',
    choices: [
      { text:'FIDO2 codes rotate faster than OTP codes', correct:false, why:'FIDO2 doesn\'t use rotating codes at all. The phishing resistance comes from how the credential is bound — not from code speed.' },
      { text:'The credential is cryptographically bound to the specific website origin', correct:true, why:'FIDO2 credentials are created per-site and include the relying party ID (domain). When authenticating, the browser verifies the current domain matches the credential\'s origin. Even if a user visits phishing.paypal.com, the credential won\'t work — the origin doesn\'t match paypal.com.' },
      { text:'FIDO2 requires a separate device for every website', correct:false, why:'FIDO2 security keys (like YubiKey) work across all sites with one device. Passkeys can cover all sites stored in a password manager. No separate device per site is needed.' },
      { text:'FIDO2 is only available to administrators', correct:false, why:'FIDO2 is a consumer and enterprise standard available to all users. It\'s increasingly the default on major platforms (Apple, Google, Microsoft all support passkeys).' },
    ]
  },
  {
    q: 'In Kerberos authentication, what is the purpose of the TGT (Ticket Granting Ticket)?',
    choices: [
      { text:'It grants direct access to a specific service like a file share', correct:false, why:'Direct service access requires a service ticket (ST), not a TGT. The TGT is used to GET service tickets — it doesn\'t grant access to anything directly.' },
      { text:'It proves to the TGS that the user has already authenticated, enabling service ticket requests', correct:true, why:'The TGT is issued by the Authentication Service (AS) after initial login. The user presents the TGT to the Ticket Granting Service (TGS) to request service-specific tickets without re-authenticating. It\'s essentially a "you\'ve already logged in" proof.' },
      { text:'It stores the user\'s plaintext password for future use', correct:false, why:'Kerberos never stores or transmits plaintext passwords. Passwords are used to derive encryption keys. The TGT contains a session key and is encrypted with the KDC\'s secret — no plaintext passwords.' },
      { text:'It is used to perform LDAP queries against Active Directory', correct:false, why:'LDAP queries use LDAP bind operations with directory credentials. The TGT is a Kerberos concept for ticket-based authentication — separate from LDAP query operations.' },
    ]
  },
  {
    q: 'A security architect is designing an enterprise where employees should be able to access cloud SaaS apps using their on-premises Active Directory credentials. What solution enables this?',
    choices: [
      { text:'LDAP replication to the cloud', correct:false, why:'LDAP replication synchronizes directory data but doesn\'t provide web-based authentication for SaaS apps. SaaS apps don\'t speak LDAP directly over the internet.' },
      { text:'Federated identity using SAML 2.0 between AD FS and the SaaS apps', correct:true, why:'AD FS (Active Directory Federation Services) acts as the Identity Provider, authenticating users against on-premises AD and issuing SAML assertions. SaaS apps (Service Providers) trust these assertions. User authenticates once to on-premises AD, gets SAML assertions for all federated SaaS apps.' },
      { text:'VPN to route SaaS traffic through on-premises AD', correct:false, why:'VPN tunnels traffic — it doesn\'t make SaaS apps authenticate against AD. SaaS apps have their own authentication systems that need to be federated, not just tunneled through.' },
      { text:'Deploying PAM agents on every SaaS application', correct:false, why:'PAM agents monitor and control privileged sessions. They\'re not used for general employee authentication to SaaS apps and can\'t be deployed inside external SaaS platforms.' },
    ]
  },
  {
    q: 'Which biometric error rate is most critical from a SECURITY perspective, and why?',
    choices: [
      { text:'FRR (False Rejection Rate) — legitimate users being locked out creates risk', correct:false, why:'FRR is primarily a usability concern. Annoying and costly, but a rejected legitimate user can try again or use an alternate factor. An accepted impostor is the security failure.' },
      { text:'FAR (False Acceptance Rate) — impostors being incorrectly authenticated', correct:true, why:'FAR measures how often an unauthorized person is accepted as legitimate. This is a direct security failure — an attacker gaining access. Lower FAR = more secure. The trade-off: lowering FAR raises FRR (more rejections of real users). The CER/EER is where they cross.' },
      { text:'CER (Crossover Error Rate) — always prioritized over FAR', correct:false, why:'CER is used to compare biometric systems overall. But when specifically evaluating security risk, FAR is the critical metric — an equal-error-rate system is a comparison tool, not the primary security metric.' },
      { text:'Neither — biometrics are not used for security decisions', correct:false, why:'Biometrics are widely used for security decisions (Face ID, fingerprint unlock, border control). FAR and FRR are real metrics that affect security posture.' },
    ]
  },
  {
    q: 'An employee is terminated. The IT team disables their Active Directory account but forgets to revoke their VPN certificate, API keys for three cloud services, and their access to a contractor portal. What does this illustrate?',
    choices: [
      { text:'The need for a comprehensive offboarding checklist with identity lifecycle management', correct:true, why:'Incomplete deprovisioning leaves orphaned access across systems not managed by a central directory. Best practice: a formal offboarding checklist covering AD, SSO-federated apps, API keys, certificates, contractor portals, shared credentials, email, and any direct database access.' },
      { text:'The need for stronger MFA on those systems', correct:false, why:'The employee\'s existing valid credentials bypass MFA entirely. The issue is that their access was never revoked — stronger MFA for others doesn\'t address the departed employee\'s still-valid credentials.' },
      { text:'An insider threat from the current employee base', correct:false, why:'The scenario describes a terminated employee who still has access due to incomplete offboarding. While this IS an insider threat risk, the root cause is the identity lifecycle failure — incomplete deprovisioning.' },
      { text:'A Kerberos golden ticket attack', correct:false, why:'A golden ticket attack forges Kerberos tickets using the KRBTGT hash. The scenario describes simple access that was never revoked — no exploitation of Kerberos internals.' },
    ]
  },
  {
    q: 'What is the difference between identification, authentication, and authorization?',
    choices: [
      { text:'They are synonyms for the same process', correct:false, why:'They are three distinct steps in the access control process. Conflating them is a common exam trap.' },
      { text:'Identification: who you claim to be. Authentication: proving it. Authorization: what you\'re allowed to do.', correct:true, why:'Identification = stating your identity (entering a username). Authentication = proving that identity (password, MFA). Authorization = what resources/actions are permitted once authenticated (RBAC, ACLs). All three are required for complete access control.' },
      { text:'Authentication and authorization are the same; identification comes after', correct:false, why:'Identification must come first (you claim an identity). Authentication proves it. Authorization happens last (after you\'re confirmed as who you claim). Authentication ≠ authorization — they\'re separate steps with different controls.' },
      { text:'Authorization happens before authentication in Zero Trust', correct:false, why:'Even in Zero Trust, you must prove identity (authenticate) before the system can make an authorization decision. Zero Trust makes authorization more granular and continuous — it doesn\'t reorder the fundamental sequence.' },
    ]
  },
  {
    q: 'A company wants to ensure that service accounts used by applications never have their passwords known by any human, and that passwords rotate automatically every 24 hours. What PAM feature provides this?',
    choices: [
      { text:'Session recording', correct:false, why:'Session recording captures and stores privileged session activity for audit. It doesn\'t manage or rotate passwords.' },
      { text:'Password vaulting with automated rotation', correct:true, why:'PAM password vaults store service account credentials encrypted and can automatically rotate them on a schedule. The application retrieves the current password from the vault at runtime — no human ever sees or stores the actual password. Rotation means compromised credentials have a very short useful window.' },
      { text:'Just-in-time access provisioning', correct:false, why:'JIT access creates temporary accounts on demand and deletes them after use. Password vaulting is about securing and rotating credentials for persistent service accounts — a different capability.' },
      { text:'FIDO2 hardware keys for service accounts', correct:false, why:'FIDO2 is designed for human authentication using hardware tokens or biometrics. Service accounts (non-human identities running applications) use API keys or passwords managed by PAM, not hardware tokens.' },
    ]
  },
  {
    q: 'An organization enforces a policy that no single employee can both submit an expense report AND approve their own expense report. What access control principle does this implement?',
    choices: [
      { text:'Least privilege', correct:false, why:'Least privilege means having only the minimum access needed for a role. This policy divides a process between two people — even if both have full access to expense systems, they can\'t process their own.' },
      { text:'Separation of duties', correct:true, why:'Separation of duties (SoD) requires that critical transactions be split between multiple people so no single person can complete a sensitive action alone. Expense submission + approval = one person could commit fraud undetected. SoD forces a second person into the approval loop.' },
      { text:'Need-to-know', correct:false, why:'Need-to-know restricts access to information based on business justification. SoD is about dividing process steps — not about information access control.' },
      { text:'Zero Trust network access', correct:false, why:'Zero Trust is a network and identity architecture model. SoD is a process/administrative control about dividing sensitive duties — not an access architecture.' },
    ]
  },
  {
    q: 'In SAML 2.0 federation, what is the role of the Identity Provider (IdP)?',
    choices: [
      { text:'The IdP hosts the application the user wants to access', correct:false, why:'The Service Provider (SP) hosts the application. The IdP is a separate, dedicated authentication service — its only job is to authenticate users and issue assertions.' },
      { text:'The IdP authenticates the user and issues a signed SAML assertion', correct:true, why:'The IdP (e.g., Okta, ADFS, Azure AD) is the trusted authority that verifies user identity. It issues a digitally-signed SAML assertion containing the user\'s identity and attributes. The Service Provider trusts this assertion and grants access based on it.' },
      { text:'The IdP stores all user passwords on behalf of Service Providers', correct:false, why:'The IdP authenticates users against its own credential store, but it doesn\'t store passwords for Service Providers. SPs don\'t need passwords — they receive and trust signed assertions from the IdP.' },
      { text:'The IdP is responsible for database authorization decisions', correct:false, why:'Authorization (what specific actions a user can perform) is typically the SP\'s responsibility. The IdP handles authentication and may send attribute claims, but access control decisions are made at the SP.' },
    ]
  },
  {
    q: 'A user logs into their company laptop (Windows + Active Directory). They then open the CRM web app and are automatically logged in. They open the ERP system and are automatically logged in. No additional password prompts. What two protocols are most likely at work?',
    choices: [
      { text:'OAuth for the laptop, FIDO2 for the web apps', correct:false, why:'OAuth handles API authorization, not OS authentication. FIDO2 is a device-based auth standard. The seamless cross-app Windows SSO scenario uses specific protocols designed for Windows environments.' },
      { text:'Kerberos for the Windows login, SAML for web app federation', correct:true, why:'Kerberos handles OS-level authentication in AD environments (the laptop login). SAML 2.0 enables the federated SSO to web applications via the corporate IdP — the user\'s Windows identity is extended to cloud/web apps through SAML assertions. This is the classic enterprise SSO stack.' },
      { text:'LDAP for the laptop, OAuth for the web apps', correct:false, why:'LDAP is a directory query protocol, not an authentication protocol used for OS login. Windows uses Kerberos (and NTLM fallback). OAuth handles API authorization — web app SSO in enterprise contexts uses SAML or OIDC.' },
      { text:'RADIUS for the laptop, OpenID Connect for web apps', correct:false, why:'RADIUS handles network access authentication (VPN, Wi-Fi 802.1X). Windows domain login uses Kerberos, not RADIUS.' },
    ]
  },
  {
    q: 'What is MFA fatigue, and what is the targeted attack that exploits it?',
    choices: [
      { text:'Users forgetting their MFA codes; exploited by phishing', correct:false, why:'Forgetting codes is a usability issue, not a security attack vector. MFA fatigue refers to a specific attack where the sheer volume of push notifications overwhelms the user.' },
      { text:'Flooding a user with MFA push notifications until they approve one to make the requests stop', correct:true, why:'MFA push bombing (also called MFA fatigue) sends repeated authentication push notifications to a victim. After receiving dozens of notifications, the user may approve one to stop the interruption — granting the attacker access. Mitigation: number matching (user must type a number shown on screen into the push) or context-aware MFA that alerts on unusual requests.' },
      { text:'An attacker stealing the MFA hardware token from the user', correct:false, why:'Physical theft of a hardware token is a separate threat. MFA fatigue specifically describes the social engineering/persistence tactic of overwhelming a user with push notifications.' },
      { text:'Session expiration forcing excessive re-authentication', correct:false, why:'Frequent session timeouts are a usability issue. MFA fatigue is a targeted attack technique deliberately overwhelming a specific user with MFA requests.' },
    ]
  },
  {
    q: 'Which authentication factor category does a fingerprint scanner represent, and why is it considered strong for non-repudiation?',
    choices: [
      { text:'Something you have; because the finger is a physical object', correct:false, why:'"Something you have" refers to a physical token you carry (YubiKey, smart card, phone). A fingerprint is a physical characteristic of your body — that\'s a different category.' },
      { text:'Something you are (inherence); because it\'s biologically tied to a specific individual', correct:true, why:'Biometrics fall under "something you are" (inherence). A fingerprint is biologically unique to the individual and physically present. It provides strong non-repudiation because it\'s very hard for someone else to present your biometric — harder to share than a password or lend like a card.' },
      { text:'Something you know; because you memorized your fingerprint pattern', correct:false, why:'"Something you know" is a secret in your memory (password, PIN, security answer). A fingerprint is not memorized — it\'s an inherent physical characteristic.' },
      { text:'Something you do; because fingerprinting is an action', correct:false, why:'"Something you do" (behavioral biometrics) refers to patterns like typing rhythm or gait analysis. A fingerprint is a physical characteristic — it belongs to "something you are."' },
    ]
  },
  {
    q: 'An application authenticates users with passwords stored as unsalted MD5 hashes. A breach exposes the hash database. Why are users at immediate risk even for users with long, complex passwords?',
    choices: [
      { text:'MD5 is a symmetric encryption algorithm that can be decrypted', correct:false, why:'MD5 is a hash function, not encryption — it cannot be decrypted in the traditional sense. The risk is that MD5 is fast and pre-computed rainbow tables exist for it.' },
      { text:'MD5 is cryptographically broken and fast; rainbow tables can instantly reverse common hashes; no salt means identical passwords share hashes', correct:true, why:'MD5 is broken (collision attacks) and extremely fast (billions of hashes/second). Without salting, identical passwords produce identical hashes — if one is cracked, all matching hashes are cracked. Rainbow tables precompute MD5s for billions of common strings. Long passwords help but don\'t compensate for MD5\'s speed and the missing salt.' },
      { text:'The attackers will use the MD5 hashes to decrypt the user\'s other accounts', correct:false, why:'A hash cannot be "used to decrypt" other accounts. The risk is that attackers CRACK the hash to find the original password, then try that password elsewhere (credential stuffing).' },
      { text:'MD5 hashes expire after 24 hours making them usable only briefly', correct:false, why:'Hash values don\'t expire. A stolen hash database is permanently useful to an attacker unless users change passwords.' },
    ]
  },
  {
    q: 'A company issues every developer a personal API key for accessing internal services. A developer leaves the company. What is the minimum access control action required?',
    choices: [
      { text:'Disable only their Active Directory account', correct:false, why:'Disabling the AD account handles domain login but not standalone API keys. If the API keys are separate credentials (not derived from AD), they remain valid.' },
      { text:'Revoke all credentials issued to that individual — AD account, API keys, certificates, VPN access', correct:true, why:'Complete deprovisioning must cover all issued credentials. Personal API keys are standalone credentials that require separate revocation. Missing even one leaves a persistent access path. Identity lifecycle management means tracking all issued identities and credentials per person.' },
      { text:'Change the company\'s API gateway master key', correct:false, why:'Rotating a master key would affect all developers and cause outages. The targeted action is revoking only that specific developer\'s personal key.' },
      { text:'Require all developers to change their passwords', correct:false, why:'A company-wide password change doesn\'t revoke the specific API key issued to the departing developer, nor their certificates or other credentials.' },
    ]
  },
  {
    q: 'A company requires all remote users to authenticate via a system where the authentication server issues a challenge, the user\'s token generates a response, and the server validates it without ever transmitting the user\'s password over the network. What authentication mechanism is this?',
    choices: [
      { text:'Basic authentication over HTTPS', correct:false, why:'Basic authentication encodes credentials (not encrypts) and sends them in every HTTP request. HTTPS encrypts the transport, but the password itself is transmitted. This scenario describes a challenge-response system where the password never crosses the wire.' },
      { text:'Challenge-response authentication (e.g., CHAP or TOTP)', correct:true, why:'Challenge-response systems have the server issue a challenge; the client uses a shared secret or private key to compute a response. The secret never leaves the client. CHAP (network auth) and TOTP (the time + seed produces the OTP without transmitting the seed) both fit this pattern.' },
      { text:'LDAP bind with StartTLS', correct:false, why:'LDAP bind with StartTLS encrypts the LDAP connection but still transmits the user\'s credentials (password or hash) to the LDAP server. The password crosses the wire, encrypted.' },
      { text:'Kerberos ticket forwarding', correct:false, why:'Kerberos ticket forwarding forwards TGTs to remote systems (useful for service delegation). While Kerberos never sends passwords, this specific mechanism describes something different from generic challenge-response.' },
    ]
  },
];
