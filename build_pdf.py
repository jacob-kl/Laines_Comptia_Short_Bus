from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

W, H = letter

# ─── COLORS ──────────────────────────────────────────────────────────────────
BG       = colors.HexColor('#0a0c10')
SURFACE  = colors.HexColor('#12151c')
SURFACE2 = colors.HexColor('#1a1e28')
BORDER   = colors.HexColor('#252a38')
ACCENT   = colors.HexColor('#00e5a0')
ACCENT2  = colors.HexColor('#7c6dfa')
ACCENT3  = colors.HexColor('#ff6b6b')
ACCENT4  = colors.HexColor('#ffd166')
TEXT     = colors.HexColor('#e8eaf0')
MUTED    = colors.HexColor('#6b7280')
WHITE    = colors.white

# ─── STYLES ──────────────────────────────────────────────────────────────────
def make_styles():
    base = dict(fontName='Courier', fontSize=9, textColor=TEXT,
                leading=14, spaceAfter=0)

    title_s = ParagraphStyle('Title', fontName='Helvetica-Bold',
                              fontSize=28, textColor=ACCENT,
                              leading=34, spaceAfter=6, alignment=TA_CENTER)
    sub_s   = ParagraphStyle('Sub', fontName='Courier',
                              fontSize=11, textColor=MUTED,
                              leading=16, spaceAfter=0, alignment=TA_CENTER)
    h1      = ParagraphStyle('H1', fontName='Helvetica-Bold',
                              fontSize=14, textColor=ACCENT,
                              leading=18, spaceBefore=18, spaceAfter=6,
                              borderPad=4)
    h2      = ParagraphStyle('H2', fontName='Helvetica-Bold',
                              fontSize=11, textColor=ACCENT2,
                              leading=15, spaceBefore=12, spaceAfter=4)
    body    = ParagraphStyle('Body', fontName='Courier',
                              fontSize=8.5, textColor=TEXT,
                              leading=13, spaceAfter=4)
    callout = ParagraphStyle('Callout', fontName='Courier-Bold',
                              fontSize=8.5, textColor=ACCENT,
                              leading=13, spaceAfter=4,
                              leftIndent=10, rightIndent=10)
    muted   = ParagraphStyle('Muted', fontName='Courier',
                              fontSize=8, textColor=MUTED,
                              leading=12, spaceAfter=2)
    label   = ParagraphStyle('Label', fontName='Courier-Bold',
                              fontSize=7, textColor=ACCENT4,
                              leading=10, spaceAfter=1)
    return title_s, sub_s, h1, h2, body, callout, muted, label

# ─── BACKGROUND CANVAS ───────────────────────────────────────────────────────
def bg_canvas(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # subtle grid
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.3)
    step = 30
    for x in range(0, int(W)+step, step):
        canvas.line(x, 0, x, H)
    for y in range(0, int(H)+step, step):
        canvas.line(0, y, W, y)
    # header bar
    canvas.setFillColor(SURFACE)
    canvas.rect(0, H - 0.55*inch, W, 0.55*inch, fill=1, stroke=0)
    # accent line under header
    canvas.setFillColor(ACCENT)
    canvas.rect(0, H - 0.57*inch, W, 0.025*inch, fill=1, stroke=0)
    # footer
    canvas.setFillColor(SURFACE)
    canvas.rect(0, 0, W, 0.3*inch, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont('Courier', 7)
    canvas.drawCentredString(W/2, 0.1*inch,
        f'SEC+ SY0-701 Cheat Sheet  //  Cryptographic Solutions & Security Architecture  //  Page {doc.page}')
    canvas.restoreState()

def first_page(canvas, doc):
    bg_canvas(canvas, doc)
    # top badge
    canvas.setFillColor(SURFACE2)
    canvas.roundRect(W/2 - 1.5*inch, H - 0.45*inch, 3*inch, 0.28*inch, 4, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.setFont('Courier-Bold', 8)
    canvas.drawCentredString(W/2, H - 0.31*inch, 'CompTIA Security+  ·  SY0-701  ·  Exam Prep')

def later_pages(canvas, doc):
    bg_canvas(canvas, doc)
    canvas.setFillColor(MUTED)
    canvas.setFont('Courier-Bold', 8)
    canvas.drawString(0.5*inch, H - 0.37*inch, 'SEC+ SY0-701 — Crypto & Architecture')
    canvas.drawRightString(W - 0.5*inch, H - 0.37*inch, f'Page {doc.page}')

# ─── TABLE HELPER ────────────────────────────────────────────────────────────
def make_table(headers, rows, col_widths, accent_col=ACCENT):
    data = [headers] + rows
    style = TableStyle([
        ('BACKGROUND',  (0,0), (-1,0),  SURFACE2),
        ('TEXTCOLOR',   (0,0), (-1,0),  accent_col),
        ('FONTNAME',    (0,0), (-1,0),  'Courier-Bold'),
        ('FONTSIZE',    (0,0), (-1,0),  7.5),
        ('BOTTOMPADDING',(0,0),(-1,0),  6),
        ('TOPPADDING',  (0,0), (-1,0),  6),
        ('BACKGROUND',  (0,1), (-1,-1), SURFACE),
        ('TEXTCOLOR',   (0,1), (-1,-1), MUTED),
        ('TEXTCOLOR',   (0,1), (0,-1),  TEXT),
        ('FONTNAME',    (0,1), (0,-1),  'Courier-Bold'),
        ('FONTNAME',    (1,1), (-1,-1), 'Courier'),
        ('FONTSIZE',    (0,1), (-1,-1), 7.5),
        ('TOPPADDING',  (0,1), (-1,-1), 5),
        ('BOTTOMPADDING',(0,1),(-1,-1), 5),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[SURFACE, SURFACE2]),
        ('LINEBELOW',   (0,0), (-1,0),  0.5, BORDER),
        ('LINEBELOW',   (0,1), (-1,-1), 0.3, BORDER),
        ('BOX',         (0,0), (-1,-1), 0.5, BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING',(0,0), (-1,-1), 6),
        ('VALIGN',      (0,0), (-1,-1), 'MIDDLE'),
        ('WORDWRAP',    (0,0), (-1,-1), True),
    ])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(style)
    return t

def callout_box(text, style, accent=ACCENT):
    return Table([[Paragraph(text, style)]],
                 colWidths=[6.5*inch],
                 style=TableStyle([
                     ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0d1a15')),
                     ('BOX',        (0,0), (-1,-1), 1, accent),
                     ('LEFTLINE',   (0,0), (0,-1),  3, accent),
                     ('TOPPADDING', (0,0), (-1,-1), 8),
                     ('BOTTOMPADDING',(0,0),(-1,-1),8),
                     ('LEFTPADDING',(0,0), (-1,-1), 12),
                     ('RIGHTPADDING',(0,0),(-1,-1), 12),
                 ]))

# ─── BUILD ───────────────────────────────────────────────────────────────────
def build():
    doc = SimpleDocTemplate(
        '/home/claude/secplus-study/secplus_cheatsheet.pdf',
        pagesize=letter,
        leftMargin=0.5*inch, rightMargin=0.5*inch,
        topMargin=0.7*inch,  bottomMargin=0.45*inch,
    )

    title_s, sub_s, h1, h2, body, callout_s, muted_s, label_s = make_styles()
    story = []

    def sp(n=6): return Spacer(1, n)
    def hr(): return HRFlowable(width='100%', thickness=0.5, color=BORDER, spaceAfter=10, spaceBefore=4)

    # ── COVER ──
    story += [
        sp(30),
        Paragraph('Crypto & Architecture', title_s),
        Paragraph('CompTIA Security+  ·  SY0-701  ·  Cheat Sheet', sub_s),
        sp(8),
        Paragraph('// Cryptographic Solutions  &amp;  Mitigation / Security Architecture', muted_s),
        sp(20),
        callout_box(
            '<b>HOW TO USE THIS:</b>  Two domains trip people up most. This sheet covers them both. '
            'Read the Exam Patterns callouts first — they\'re the scenario reasoning the exam tests. '
            'Then drill the tables until the algorithm-to-goal mapping is automatic.',
            callout_s, ACCENT),
        sp(24),
    ]

    # ═══════════════════════════════════════════════════════
    # SECTION 1: CRYPTOGRAPHIC SOLUTIONS
    # ═══════════════════════════════════════════════════════
    story.append(Paragraph('01 — CRYPTOGRAPHIC SOLUTIONS', h1))
    story.append(hr())

    story.append(callout_box(
        '<b>EXAM PATTERN:</b>  Every crypto scenario tests which security GOAL a tool serves.\n'
        'Encryption → Confidentiality   Hashing → Integrity   '
        'Digital Signature → Integrity + Authentication + Non-repudiation   '
        'PKI → Enables all of the above',
        callout_s, ACCENT))
    story.append(sp(10))

    # Symmetric vs Asymmetric
    story.append(Paragraph('Symmetric vs Asymmetric', h2))
    story.append(make_table(
        ['Type', 'Key Structure', 'Speed', 'Use Case', 'Examples'],
        [
            ['Symmetric', 'One shared key', 'FAST', 'Bulk data, disk encryption, VPN tunnel data', 'AES-256, ChaCha20, 3DES (legacy)'],
            ['Asymmetric', 'Public + Private key pair', 'SLOW', 'Key exchange, digital signatures, PKI', 'RSA, ECC/ECDSA, Diffie-Hellman'],
            ['Hybrid', 'Both — asym. for key exchange,\nsym. for data', 'Fast in practice', 'TLS, PGP, SSH', 'TLS 1.3: ECDH + AES-GCM'],
        ],
        [0.7*inch, 1.1*inch, 0.55*inch, 2.0*inch, 2.15*inch],
    ))
    story.append(sp(10))

    # Algorithm table
    story.append(Paragraph('Algorithm Quick Reference', h2))
    story.append(make_table(
        ['Algorithm', 'Type', 'Key/Output Size', 'Primary Use'],
        [
            ['AES-256', 'Symmetric block', '256-bit key', 'Disk encryption, VPN, TLS data'],
            ['ChaCha20', 'Symmetric stream', '256-bit key', 'Mobile/IoT where AES-NI unavailable'],
            ['3DES', 'Symmetric block', '168-bit effective', 'Legacy only — avoid in new systems'],
            ['RSA', 'Asymmetric', '2048–4096-bit key', 'Key exchange, signatures (slow)'],
            ['ECC / ECDSA', 'Asymmetric', '256-bit ≈ RSA 3072', 'Mobile, IoT, certificates — same strength, smaller key'],
            ['Diffie-Hellman', 'Key exchange', 'Variable', 'Establish shared secret over public channel'],
            ['SHA-256 / SHA-3', 'Hash', '256-bit output', 'File integrity, password hashing, certs'],
            ['HMAC', 'Hash + shared key', '—', 'Message auth — proves sender knows the key'],
            ['bcrypt / Argon2', 'Key stretching', '—', 'Password storage — deliberately slow, salted'],
        ],
        [1.1*inch, 1.05*inch, 1.1*inch, 3.25*inch],
    ))
    story.append(sp(10))

    # Digital Signatures
    story.append(Paragraph('Digital Signatures — How It Actually Works', h2))
    story.append(callout_box(
        '1. Alice HASHES the message (SHA-256 → digest)\n'
        '2. Alice ENCRYPTS the hash with her PRIVATE KEY = Signature\n'
        '3. Bob receives message + signature\n'
        '4. Bob DECRYPTS signature with Alice\'s PUBLIC KEY = recovers hash\n'
        '5. Bob independently hashes the message\n'
        '6. If hashes MATCH → message is authentic and unmodified\n\n'
        'Provides: Authentication (Alice\'s private key signed it)  +  Integrity (hash matches)  +  Non-repudiation (only Alice has her private key)\n'
        'Does NOT provide: Confidentiality — encrypt separately if needed',
        callout_s, ACCENT2))
    story.append(sp(10))

    # PKI
    story.append(Paragraph('PKI (Public Key Infrastructure)', h2))
    story.append(make_table(
        ['Component', 'Description'],
        [
            ['Root CA', 'Self-signed apex of trust. Should be OFFLINE / air-gapped. Signs intermediate CAs only.'],
            ['Intermediate CA', 'Signed by root. Online. Issues end-entity certificates. Compromise isolated from root.'],
            ['Certificate', 'Binds public key to identity. Contains: subject, SAN, validity period, key usage, issuer.'],
            ['CSR', 'Certificate Signing Request — entity generates keypair, sends public key + info to CA for signing.'],
            ['CRL', 'Certificate Revocation List — periodic list of revoked certs. Can be stale between publications.'],
            ['OCSP', 'Real-time single-cert revocation check. Better than CRL for freshness.'],
            ['OCSP Stapling', 'Server caches OCSP response and presents it in TLS handshake. Reduces OCSP server load.'],
            ['Wildcard cert', '*.domain.com — covers all subdomains. One compromise = all subdomains exposed.'],
            ['SAN cert', 'Subject Alternative Name — lists specific FQDNs. More granular and secure than wildcard.'],
            ['Key Escrow', 'A copy of a private key held by trusted third party for recovery or lawful access.'],
        ],
        [1.3*inch, 5.2*inch],
    ))
    story.append(sp(10))

    # Salting / Key Stretching
    story.append(Paragraph('Passwords: Salting & Key Stretching', h2))
    story.append(callout_box(
        '<b>Salt:</b> Random value appended to a password before hashing. Stored alongside the hash. '
        'Even if two users have "Summer2023", their hashes differ. DEFEATS rainbow tables.\n\n'
        '<b>Key Stretching</b> (bcrypt, PBKDF2, Argon2): Adds a configurable work factor (iterations). '
        'Brute-force is slowed proportionally — 1M guesses/sec becomes impractical. '
        'Argon2 is the current winner for new systems.',
        callout_s, ACCENT4))

    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════
    # SECTION 2: MITIGATION & SECURITY ARCHITECTURE
    # ═══════════════════════════════════════════════════════
    story.append(Paragraph('02 — MITIGATION & SECURITY ARCHITECTURE', h1))
    story.append(hr())

    story.append(callout_box(
        '<b>EXAM PATTERN:</b>  Architecture &amp; mitigation questions are SCENARIO-BASED. '
        'The exam gives a constraint (budget, environment type, threat vector) and asks which control fits. '
        'Zero Trust is heavily tested for 701. Know the control plane components by name.',
        callout_s, ACCENT))
    story.append(sp(10))

    # Mitigation techniques
    story.append(Paragraph('Mitigation Techniques — Scenario Mapping', h2))
    story.append(make_table(
        ['Technique', 'What It Does', 'When Exam Picks It'],
        [
            ['Segmentation', 'Divides network into isolated zones (VLANs, subnets, DMZ)', 'Contain lateral movement; isolate IoT/OT from corporate network'],
            ['Micro-segmentation', 'Granular workload-level segmentation, east-west traffic control', 'Zero trust data center; prevent lateral movement between servers'],
            ['Hardening', 'Disable unused ports/services, remove defaults, patch', 'New system deployment; reduce attack surface before going live'],
            ['Patching', 'Apply vendor fixes to known CVEs', 'Vulnerability management; specific CVE mentioned in scenario'],
            ['Least Privilege', 'Grant minimum permissions needed for the role', 'Insider threat; privilege escalation; role change scenario'],
            ['Access Control', 'RBAC/ABAC/MAC/DAC enforce who can do what', 'Wrong dept accessing sensitive data; need-to-know enforcement'],
            ['Isolation/Sandbox', 'Run untrusted code in contained environment', 'Malware analysis; legacy app; suspicious executable scenario'],
            ['Encryption at Rest', 'Protect stored data if media is stolen', 'Laptop theft; decommissioned drive; stolen backup tape'],
            ['Encryption in Transit', 'TLS/HTTPS protects data on the wire', 'MITM attack; plaintext credential capture on Wi-Fi'],
            ['Monitoring/SIEM', 'Centralized log collection and correlation for detection', 'Post-compromise detection; compliance; anomaly alerting'],
            ['Deception (Honeypot)', 'Fake systems to detect attackers — any connection = suspicious', 'Internal threat hunting; detect lateral movement post-breach'],
        ],
        [1.15*inch, 2.05*inch, 3.3*inch],
    ))
    story.append(sp(10))

    # Access Control Models
    story.append(Paragraph('Access Control Models', h2))
    story.append(make_table(
        ['Model', 'How Access Is Decided', 'Pick When...'],
        [
            ['RBAC', 'Permissions assigned to roles; users get roles', 'Scenario says "based on job role" — most common in enterprise'],
            ['ABAC', 'Access based on multiple attributes (dept, device, time, location)', 'Multiple dynamic conditions in scenario; fine-grained policy'],
            ['MAC', 'Security labels (Top Secret / Secret / Unclassified); mandatory', 'Military or government classification scenario'],
            ['DAC', 'Resource owner controls access (like file system permissions)', 'User shares their own file; owner grants access directly'],
        ],
        [0.7*inch, 2.4*inch, 3.4*inch],
    ))
    story.append(sp(10))

    # Zero Trust
    story.append(Paragraph('Zero Trust Architecture', h2))
    story.append(callout_box(
        '<b>Core principle:</b>  Never trust, always verify. No implicit trust based on network location. '
        'Every access request must be authenticated, authorized, and continuously validated — '
        'whether the request comes from inside or outside the perimeter.\n\n'
        '<b>vs. Traditional (perimeter/castle-and-moat):</b>  Once inside the firewall, you\'re trusted. '
        'Zero Trust eliminates this assumption entirely.',
        callout_s, ACCENT2))
    story.append(sp(6))
    story.append(make_table(
        ['ZT Component', 'Role'],
        [
            ['Policy Engine (PE)', 'Brain. Evaluates every access request against policy, user risk score, device health, and context.'],
            ['Policy Administrator (PA)', 'Issues or revokes session tokens based on Policy Engine decision. Gateway to access.'],
            ['Policy Enforcement Point (PEP)', 'Gatekeeper on data plane. Allows or blocks actual traffic based on PA token. Where enforcement happens.'],
            ['Adaptive Identity', 'Trust score adjusts dynamically. Unusual behavior (new country, odd hours) triggers step-up MFA or session termination.'],
            ['Micro-segmentation', 'Controls east-west (lateral) traffic between workloads. No implicit trust between servers on same network.'],
            ['Control Plane', 'Policy Engine + Policy Administrator. Makes decisions.'],
            ['Data Plane', 'Policy Enforcement Point. Executes decisions on real traffic.'],
        ],
        [1.5*inch, 5.0*inch],
    ))
    story.append(sp(10))

    # Cloud Models
    story.append(Paragraph('Cloud Service Models & Shared Responsibility', h2))
    story.append(make_table(
        ['Model', 'Customer Manages', 'Provider Manages', 'Security Implication'],
        [
            ['IaaS', 'OS, middleware, runtime, app, data', 'Physical hardware, hypervisor, network', 'Customer responsible for OS patching, firewall config, app security'],
            ['PaaS', 'Application code, data', 'OS, runtime, middleware + below', 'Customer must secure app logic and data; provider secures infrastructure'],
            ['SaaS', 'Data, user access', 'Everything else', 'Customer: configure access controls, classify data. Provider: everything else'],
        ],
        [0.65*inch, 1.55*inch, 1.7*inch, 2.6*inch],
    ))
    story.append(sp(10))

    # ICS / IoT
    story.append(Paragraph('ICS / SCADA / IoT Security', h2))
    story.append(callout_box(
        '<b>Why ICS is different:</b>  Proprietary OS, often unpatched (patching breaks vendor certification or causes downtime), '
        '24/7 operations, physical safety consequences of failure.\n\n'
        '<b>Mitigations:</b>  Air-gap or network segmentation (OT on separate VLAN).  '
        'Passive monitoring only — active scanning can crash PLCs.  '
        'Unidirectional security gateways (data diodes).  '
        'Strict change control for any updates.\n\n'
        '<b>IoT mitigations:</b>  Change default credentials.  Disable unused services/ports.  '
        'Segment IoT onto dedicated VLAN.  Keep firmware updated.  Prefer ECC over RSA for constrained devices.',
        callout_s, ACCENT3))
    story.append(sp(10))

    # Defense in Depth
    story.append(Paragraph('Defense in Depth vs Zero Trust', h2))
    story.append(make_table(
        ['Principle', 'Core Idea', 'Exam Trigger Words'],
        [
            ['Defense in Depth', 'Layered controls across technical, administrative, physical. No single point of failure.', '"Layered security", "multiple controls", "if firewall fails..."'],
            ['Zero Trust', 'No implicit trust. Verify every request regardless of location.', '"Never trust always verify", "identity-based", "continuous validation"'],
            ['Least Privilege', 'Minimum access needed for the role. Nothing more.', '"Need to know", "role change", "excessive permissions"'],
            ['Separation of Duties', 'Sensitive tasks divided among multiple people. No single person can complete alone.', '"Single person controls entire process", "fraud prevention", "financial controls"'],
        ],
        [1.3*inch, 2.4*inch, 2.8*inch],
    ))

    story.append(sp(14))

    # Scenario Cheat Sheet
    story.append(Paragraph('03 — SCENARIO DECISION GUIDE', h1))
    story.append(hr())
    story.append(Paragraph('Cryptographic Scenario Patterns', h2))
    story.append(make_table(
        ['If the scenario says...', 'The answer is...', 'Why'],
        [
            ['"Bulk data / disk / fast encryption"', 'AES (symmetric)', 'Symmetric = fast, designed for bulk data'],
            ['"Mobile or IoT, limited battery"', 'ECC (asymmetric)', 'ECC = small keys, low compute overhead'],
            ['"Prove who sent it + not tampered"', 'Digital Signature', 'Auth + Integrity + Non-repudiation'],
            ['"Real-time certificate revocation"', 'OCSP (not CRL)', 'OCSP = real-time; CRL = periodic/stale'],
            ['"Two users same password, different hashes"', 'Salting', 'Salt makes identical passwords hash differently'],
            ['"Brute-force resistant password storage"', 'bcrypt / Argon2', 'Key stretching = work factor slows brute-force'],
            ['"Key stored in hardware, never exposed"', 'HSM', 'Hardware Security Module = keys never leave plaintext'],
            ['"Data hidden inside an image file"', 'Steganography', 'Hides existence, not just meaning'],
            ['"Key recovery if employee leaves"', 'Key Escrow', 'Third-party holds copy of private key'],
        ],
        [2.0*inch, 1.5*inch, 3.0*inch],
    ))
    story.append(sp(10))

    story.append(Paragraph('Architecture Scenario Patterns', h2))
    story.append(make_table(
        ['If the scenario says...', 'The answer is...', 'Why'],
        [
            ['"IoT / OT on same network as workstations"', 'Segmentation / VLAN isolation', 'Limit blast radius; unpatched devices isolated'],
            ['"New server before going live"', 'Hardening', 'Disable defaults, close ports, patch before production'],
            ['"Run suspicious exe safely"', 'Sandboxing / isolation', 'Contained environment prevents real-system impact'],
            ['"Detect attacker already inside"', 'Honeypot', 'Decoy with no legit traffic = any access = alert'],
            ['"Never trust, always verify + identity"', 'Zero Trust', 'Explicit ZT language in question'],
            ['"Trust score changes based on behavior"', 'Adaptive Identity (ZT)', 'Dynamic trust in ZT model'],
            ['"Provider manages OS, customer manages app"', 'PaaS', 'Shared responsibility — PaaS boundary'],
            ['"Military classification labels"', 'MAC', 'Mandatory Access Control = label-based'],
            ['"Based on job role"', 'RBAC', 'Role = RBAC; attributes = ABAC'],
            ['"Multiple overlapping controls"', 'Defense in Depth', 'Layered redundant controls'],
        ],
        [2.0*inch, 1.6*inch, 2.9*inch],
    ))

    story.append(sp(20))
    story.append(Paragraph(
        '// Good luck on the exam — you got this.',
        ParagraphStyle('foot', fontName='Courier', fontSize=9, textColor=ACCENT,
                       alignment=TA_CENTER, leading=14)))

    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print('PDF built successfully.')

build()
