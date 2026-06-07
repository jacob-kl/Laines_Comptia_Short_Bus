# SEC+ SY0-701 — Crypto & Architecture Study Lab

An interactive study site for the two domains that trip people up most on the CompTIA Security+ (SY0-701) exam: **Cryptographic Solutions** and **Mitigation & Security Architecture**.

**→ [Live Site](https://your-username.github.io/secplus-study-lab)**

---

## What's Inside

### Interactive Labs

| Tab | What It Does |
|---|---|
| **Crypto Concepts** | 14 expandable concept cards with CIA goal tags |
| **Crypto Quiz** | 8 randomly drawn questions from a bank of 24. New set every attempt. Full explanation for every answer — correct AND wrong. |
| **Architecture** | 14 expandable concept cards covering Zero Trust, cloud models, access control, ICS/IoT, and more |
| **Arch Quiz** | 8 random questions from another bank of 24. Same full-explanation format. |
| **Diagrams** | Three interactive diagrams (see below) |
| **Match-Up Lab** | Drag-and-drop: sort algorithms by type; match scenarios to techniques. Shuffles on reset. |
| **Flashcards** | 22 cards filterable by domain with shuffle support |
| **Quick Reference** | Full cheat tables: algorithms, PKI, Zero Trust components, access control models, scenario decision guides |
| **PDF** | Inline viewer + download for the printable cheat sheet |

### Interactive Diagrams

- **Blockchain Hashing** — Edit a block's data live and watch how it breaks every subsequent block. The core of how blockchain uses SHA-256 for immutability.
- **Zero Trust Architecture** — Annotated control/data plane flow diagram. Hover each component for detailed explanation.
- **PKI Chain of Trust** — Full trust hierarchy from Root CA through Intermediate CAs to end-entity certificates. Hover nodes for context.

---

## Domains Covered

### Cryptographic Solutions
- Symmetric vs. asymmetric (AES, RSA, ECC, ChaCha20, 3DES)
- Hashing and integrity (SHA-256, SHA-3, HMAC)
- Digital signatures — how they work, what three goals they provide
- PKI: Root CA, Intermediate CA, certificates, CSR, CRL, OCSP, OCSP Stapling
- Password security: salting, key stretching (bcrypt, Argon2, PBKDF2)
- Forward secrecy (PFS) and why it matters
- Hardware: TPM vs HSM
- Steganography, key escrow, TLS handshake flow, Diffie-Hellman
- Blockchain hashing and immutability

### Mitigation & Security Architecture
- Mitigation techniques: segmentation, hardening, patching, least privilege, sandboxing, deception
- Access control models: RBAC, ABAC, MAC, DAC — and when the exam picks each
- Zero Trust: Policy Engine, Policy Administrator, Policy Enforcement Point, adaptive identity, micro-segmentation
- Cloud models and shared responsibility: IaaS, PaaS, SaaS
- ICS / SCADA / IoT security constraints and mitigations
- Defense in depth, separation of duties
- SDN, DMZ, honeypots, honeynets

---

## File Structure

```
secplus-study-lab/
├── index.html                  # Main shell — navigation and layout
├── secplus_cheatsheet.pdf      # Printable cheat sheet (linked from site)
├── .nojekyll                   # Tells GitHub Pages to skip Jekyll
├── .gitignore
├── README.md
│
├── css/
│   └── style.css               # All styles
│
├── js/
│   ├── crypto.js               # Crypto concepts + 24-question bank
│   ├── arch.js                 # Architecture concepts + 24-question bank
│   ├── quiz.js                 # Quiz engine (randomize, score, explanations)
│   ├── flashcards.js           # Flashcard data + flip/nav/filter/shuffle logic
│   └── dragdrop.js             # Drag-and-drop lab logic
│
└── diagrams/
    ├── blockchain.html         # Interactive blockchain hashing demo
    ├── zerotrust.html          # Zero Trust architecture diagram
    └── pki.html                # PKI chain of trust diagram
```

---

## Deploy to GitHub Pages

```bash
# 1. Create a new GitHub repo (e.g. secplus-study-lab)
# 2. Clone it locally and copy these files in, then:

git add .
git commit -m "initial commit"
git push origin main

# 3. In the repo: Settings → Pages → Deploy from branch → main → / (root) → Save
# 4. Live in ~60 seconds at https://your-username.github.io/secplus-study-lab
```

No build step. No frameworks. No dependencies beyond Google Fonts. It's static HTML/CSS/JS.

---

## Exam Quick Facts (SY0-701)

| | |
|---|---|
| Questions | 90 (MCQ + performance-based) |
| Time | 90 minutes |
| Passing score | 750 / 900 |
| First-attempt pass rate | ~70–80% with structured prep |

---

## External Resources

- [Professor Messer SY0-701 (free YouTube)](https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/)
- [CompTIA Official Exam Objectives](https://www.comptia.org/training/resources/exam-objectives)
- [Flashgenius Free Practice Tests](https://flashgenius.net/sample-tests/comptia-security)
- [CertificationPractice.com — 540 free questions](https://certificationpractice.com/practice-exams/comptia-security)
- [Union Test Prep Study Guides](https://uniontestprep.com/comptia-security/study-guide)

---

*Plain HTML/CSS/JS + ReportLab for the PDF. No frameworks, no build tools.*
