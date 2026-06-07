# SEC+ SY0-701 — Crypto & Architecture Study Lab

An interactive study site for the two domains that trip people up most on the CompTIA Security+ (SY0-701) exam: **Cryptographic Solutions** and **Mitigation & Security Architecture**.

**→ [Live Site](https://your-username.github.io/secplus-study-lab)**

---

## What's Inside

| Tab | What It Does |
|---|---|
| **Crypto Concepts** | 12 expandable concept cards with CIA goal tags (Confidentiality / Integrity / Authentication / Non-repudiation) |
| **Crypto Scenarios** | 8 scored exam-style scenario questions with detailed answer explanations |
| **Architecture** | 12 expandable cards covering Zero Trust, cloud models, access control, ICS/IoT, and more |
| **Arch Scenarios** | 8 more scenario questions focused on mitigation and architecture decisions |
| **Match-Up Lab** | Two rounds of drag-and-drop: sort algorithms by type, match scenarios to techniques |
| **Flashcards** | 20 cards filterable by domain (Crypto / Architecture / All) |
| **Quick Reference** | Full cheat-sheet tables for exam day — algorithms, PKI components, access control models, Zero Trust components, scenario patterns |
| **PDF Download** | Printable dark-themed cheat sheet accessible directly from the site |

---

## Domains Covered

### Cryptographic Solutions
- Symmetric vs. asymmetric encryption (AES, RSA, ECC, ChaCha20)
- Hashing and integrity (SHA-256, SHA-3, HMAC)
- Digital signatures — how they work and what goals they serve
- PKI: Root CA, Intermediate CA, certificates, CSR, CRL, OCSP, OCSP Stapling
- Password security: salting, key stretching (bcrypt, Argon2, PBKDF2)
- Hardware security: TPM vs HSM
- Steganography, key escrow, TLS handshake flow

### Mitigation & Security Architecture
- Mitigation techniques: segmentation, hardening, patching, least privilege, sandboxing, deception
- Access control models: RBAC, ABAC, MAC, DAC
- Zero Trust: Policy Engine, Policy Administrator, Policy Enforcement Point, adaptive identity, micro-segmentation
- Cloud models and shared responsibility: IaaS, PaaS, SaaS
- ICS / SCADA / IoT security considerations
- Defense in depth, separation of duties
- Scenario decision guide: exam prompt → correct answer mapping

---

## Deploying to GitHub Pages

1. Fork or clone this repo
2. In your repo → **Settings → Pages**
3. Set source to **Deploy from a branch → main → / (root)**
4. Save — your site will be live at `https://your-username.github.io/secplus-study-lab` within a minute

That's it. No build step, no dependencies — it's a single HTML file.

---

## Files

```
secplus-study-lab/
├── index.html              # Interactive study site (self-contained)
├── secplus_cheatsheet.pdf  # Printable cheat sheet (linked from site)
├── build_pdf.py            # ReportLab script used to generate the PDF
└── README.md
```

---

## Exam Quick Facts

- **Exam code:** SY0-701
- **Questions:** 90 (mix of multiple choice and performance-based)
- **Time:** 90 minutes
- **Passing score:** 750 / 900
- **First-attempt pass rate:** ~70–80% with structured prep

---

## Resources

- [Professor Messer SY0-701 (free YouTube)](https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/)
- [CompTIA Official Exam Objectives](https://www.comptia.org/training/resources/exam-objectives)
- [Flashgenius Free Practice Tests](https://flashgenius.net/sample-tests/comptia-security)
- [CertificationPractice.com (540 free questions)](https://certificationpractice.com/practice-exams/comptia-security)

---

*Built with plain HTML/CSS/JS and ReportLab. No frameworks, no build tools, no nonsense.*
