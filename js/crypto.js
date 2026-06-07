// ─────────────────────────────────────────────────────────────
//  CRYPTO CONCEPTS
// ─────────────────────────────────────────────────────────────
window.cryptoConcepts = [
  { label:'Symmetric', term:'AES (Advanced Encryption Standard)', def:'Block cipher using a single shared key. Supports 128, 192, or 256-bit key sizes. Fast — designed for bulk data. Used in full-disk encryption, VPNs, TLS bulk data transfer. Both sides must securely share the key beforehand.', tags:['conf'] },
  { label:'Asymmetric', term:'RSA', def:'Uses a public/private key pair. Public key encrypts or verifies signatures; private key decrypts or signs. Slow — not used for bulk data. Used for key exchange and digital signatures. Minimum secure key size today: 2048-bit.', tags:['conf','auth'] },
  { label:'Asymmetric', term:'ECC (Elliptic Curve Cryptography)', def:'Achieves equivalent strength to RSA with far smaller keys. 256-bit ECC ≈ 3072-bit RSA. Much less compute = less battery drain. Ideal for mobile, IoT, embedded systems. ECDSA = signing. ECDH = key agreement.', tags:['conf','auth'] },
  { label:'Hashing', term:'SHA-256 / SHA-3', def:'One-way function producing a fixed-length digest. Cannot be reversed. Used for file integrity, password hashing, certificate fingerprints. SHA-3 (Keccak) uses a different internal algorithm (sponge construction) than SHA-2 — different algorithm family, not just a version bump.', tags:['integ'] },
  { label:'Auth + Integrity', term:'Digital Signature', def:'Hash the message → encrypt hash with private key = signature. Verifier decrypts signature with sender\'s public key, independently hashes the message, and compares. Proves: who sent it (auth), unchanged (integrity), sender cannot deny it (non-repudiation). Does NOT inherently provide confidentiality.', tags:['integ','auth','nonrep'] },
  { label:'PKI', term:'Certificate Authority (CA)', def:'Issues digital certificates binding a public key to an identity. Root CA = trust anchor, should be OFFLINE/air-gapped, signs only intermediate CAs. Intermediate CA = online, issues end-entity certs. Chain of trust: leaf cert → intermediate → root.', tags:['auth'] },
  { label:'PKI', term:'OCSP vs CRL', def:'Both handle certificate revocation. CRL = download the full revocation list periodically (can be stale). OCSP = real-time status check for a single cert. OCSP Stapling = server caches the OCSP response and presents it in the TLS handshake, reducing load on OCSP servers and preventing downtime issues.', tags:['auth','integ'] },
  { label:'Key Management', term:'Key Escrow', def:'A copy of a private key held by a trusted third party for lawful recovery. Allows access if an employee leaves or a key is lost. Controversial because the escrow copy is itself a high-value attack target, and government access provisions can be abused.', tags:['conf'] },
  { label:'Key Stretching', term:'bcrypt / PBKDF2 / Argon2', def:'Deliberately slow hashing functions for passwords. Adds a configurable work factor (iteration count) so brute-force is computationally expensive even if the hash database is stolen. Salting adds a random value per-password — defeats rainbow tables even when two users share the same password.', tags:['auth'] },
  { label:'Hardware', term:'TPM vs HSM', def:'TPM: chip embedded on a motherboard. Stores keys, measures boot integrity (secure boot, attestation), used for device-level trust. HSM: dedicated high-security appliance for enterprise crypto at scale. Keys never leave in plaintext. Used by CAs, banks, payment processors.', tags:['conf','integ','auth'] },
  { label:'Protocol', term:'TLS Handshake', def:'Negotiates cipher suite → server authenticates via certificate → asymmetric key exchange (ECDH or RSA) establishes shared secret → both sides derive symmetric session keys (AES) → all bulk data encrypted with AES. TLS 1.3 removed RSA key exchange and all weak ciphers.', tags:['conf','auth','integ'] },
  { label:'Obfuscation', term:'Steganography', def:'Hides data within a carrier file (image, audio, video) so its existence is concealed. Not encryption — the data is hidden, not scrambled. Exam contrast: encryption hides MEANING; steganography hides EXISTENCE. A steganographic image looks like a normal photo.', tags:['conf'] },
  { label:'Hashing', term:'HMAC', def:'Hash-based Message Authentication Code. Combines a cryptographic hash with a shared secret key. Unlike a plain hash, HMAC proves both integrity AND that the sender knows the shared key. Common in API authentication and TLS record layer.', tags:['integ','auth'] },
  { label:'Key Exchange', term:'Diffie-Hellman / ECDH', def:'Allows two parties to establish a shared secret over a public channel without transmitting the secret itself. Neither party sends the key — they each contribute a public value and compute the shared secret independently. ECDH is the elliptic curve variant (used in TLS 1.3).', tags:['conf'] },
];

// ─────────────────────────────────────────────────────────────
//  CRYPTO QUESTION BANK (24 questions, 8 drawn per quiz)
// ─────────────────────────────────────────────────────────────
window.cryptoBank = [
  {
    q: 'A company needs to encrypt 10TB of stored data. Speed is critical — decryption must be fast. Which algorithm is the correct choice?',
    choices: [
      { text:'RSA-4096', correct:false, why:'RSA is asymmetric and extremely slow — it\'s designed for small payloads like key exchange, not bulk data.' },
      { text:'AES-256', correct:true,  why:'AES is symmetric encryption, specifically designed for bulk data. It\'s fast and the industry standard for disk/data encryption.' },
      { text:'SHA-256', correct:false, why:'SHA-256 is a hash function, not encryption. Hashing is one-way — you can\'t decrypt it to recover the original data.' },
      { text:'ECDSA',   correct:false, why:'ECDSA is a digital signature algorithm. It provides authentication and integrity, not confidentiality.' },
    ]
  },
  {
    q: 'Alice wants to send Bob a message and prove she sent it. Bob needs to verify it wasn\'t tampered with. What should she use?',
    choices: [
      { text:'Encrypt with AES using a shared key', correct:false, why:'Symmetric encryption with a shared key provides confidentiality, but doesn\'t prove Alice specifically sent it — anyone with the shared key could have.' },
      { text:'Apply a digital signature using her private key', correct:true, why:'A digital signature uses Alice\'s private key. Bob verifies with Alice\'s public key. This provides authentication, integrity, and non-repudiation.' },
      { text:'Hash the message with SHA-256 and send the hash', correct:false, why:'Anyone can hash a message. Without the private key, there\'s no way to prove Alice specifically created the hash.' },
      { text:'Encrypt with Bob\'s public key', correct:false, why:'Encrypting with Bob\'s public key gives confidentiality (only Bob can decrypt), but doesn\'t prove Alice sent it.' },
    ]
  },
  {
    q: 'A certificate is discovered to be compromised. Clients need to stop trusting it immediately. What is the most real-time revocation mechanism?',
    choices: [
      { text:'Certificate Revocation List (CRL)', correct:false, why:'CRL downloads a full list of revoked certs periodically. Between publications it can be stale — a compromised cert may still appear valid.' },
      { text:'OCSP (Online Certificate Status Protocol)', correct:true, why:'OCSP queries revocation status for a single certificate in real-time, providing an immediate response on whether the cert is still valid.' },
      { text:'Download a new root CA bundle', correct:false, why:'Root CA bundles update infrequently and are managed by OS/browser vendors. This doesn\'t address individual certificate revocation.' },
      { text:'Renew the certificate', correct:false, why:'Renewing creates a new certificate. It doesn\'t revoke the compromised one — attackers could still use the old cert until it expires.' },
    ]
  },
  {
    q: 'A mobile payment app needs strong asymmetric encryption but devices have limited battery and processing power. Which algorithm is most appropriate?',
    choices: [
      { text:'RSA-4096', correct:false, why:'RSA-4096 has very large key sizes and high computational overhead, making it impractical for battery-constrained mobile devices.' },
      { text:'ECC (Elliptic Curve Cryptography)', correct:true, why:'ECC achieves equivalent security to RSA with much smaller keys (256-bit ECC ≈ 3072-bit RSA), requiring far less compute and battery. Ideal for mobile and IoT.' },
      { text:'3DES', correct:false, why:'3DES is symmetric encryption — a different category (and a legacy one at that). It doesn\'t address the key exchange problem that asymmetric crypto solves.' },
      { text:'MD5', correct:false, why:'MD5 is a hash function that is also cryptographically broken. It provides integrity checks, not encryption, and should never be used for security.' },
    ]
  },
  {
    q: 'Two users have the same password "Summer2023". An attacker obtains the password hash database and runs a rainbow table attack. What would have prevented this?',
    choices: [
      { text:'Using SHA-256 instead of MD5', correct:false, why:'A stronger hash algorithm doesn\'t stop rainbow tables — attackers just precompute rainbow tables using SHA-256. The algorithm alone isn\'t the solution.' },
      { text:'Salting the passwords before hashing', correct:true, why:'A salt is a random value added to each password before hashing. Even identical passwords produce different hashes, making precomputed rainbow tables useless.' },
      { text:'Encrypting the database with AES', correct:false, why:'Encrypting the database at rest protects against physical media theft, but doesn\'t change how passwords are hashed. A database breach still exposes the hashes.' },
      { text:'Using digital certificates', correct:false, why:'Certificates provide identity authentication and key distribution (PKI). They\'re unrelated to how passwords are stored and hashed in a database.' },
    ]
  },
  {
    q: 'A private key is stored in a dedicated hardware device that performs all cryptographic operations internally, never exposing the key in plaintext. What device is this?',
    choices: [
      { text:'TPM (Trusted Platform Module)', correct:false, why:'A TPM is a chip embedded on a motherboard for device-level key storage and secure boot/attestation. It\'s a personal device component, not a dedicated enterprise crypto appliance.' },
      { text:'HSM (Hardware Security Module)', correct:true, why:'An HSM is a purpose-built enterprise appliance for cryptographic operations at scale. Keys are generated inside and never exported in plaintext. Used by CAs, banks, and cloud providers.' },
      { text:'Smart card', correct:false, why:'Smart cards store keys and perform crypto operations but are personal tokens (credit card–sized). They\'re not scalable enterprise infrastructure.' },
      { text:'BIOS chip', correct:false, why:'The BIOS chip holds firmware and boot configuration. It\'s not a cryptographic security device and doesn\'t protect private keys.' },
    ]
  },
  {
    q: 'An image file is sent between two parties. The recipient suspects it contains hidden data being used to exfiltrate information, even though it looks like a normal photo. What technique is suspected?',
    choices: [
      { text:'Encryption', correct:false, why:'Encrypted data is visibly scrambled and identifiable as ciphertext. A normal-looking image wouldn\'t be the result of simple encryption.' },
      { text:'Steganography', correct:true, why:'Steganography embeds data within a carrier file (image, audio) so its existence is concealed. Unlike encryption, which hides meaning, steganography hides the fact that any data exists.' },
      { text:'Hashing', correct:false, why:'Hashing produces a fixed-length digest for integrity verification. It\'s not used to hide or embed data inside another file.' },
      { text:'Key escrow', correct:false, why:'Key escrow involves storing a copy of a private key with a third party. It has nothing to do with hiding data inside image files.' },
    ]
  },
  {
    q: 'A government agency requires that all private keys used by employees can be recovered by IT if an employee leaves or a key is lost. What mechanism does this describe?',
    choices: [
      { text:'Certificate Pinning', correct:false, why:'Certificate pinning restricts which certificates a client trusts for a specific domain. It\'s a defense against MITM attacks, not a key recovery mechanism.' },
      { text:'Key Escrow', correct:true, why:'Key escrow stores a copy of private keys with a trusted third party (or internal authority), enabling lawful recovery when needed. Controversial because the escrow itself is a high-value target.' },
      { text:'OCSP Stapling', correct:false, why:'OCSP Stapling is a performance optimization for certificate revocation checking. The server caches the OCSP response and sends it to clients. Unrelated to key recovery.' },
      { text:'Root CA offline storage', correct:false, why:'Keeping a Root CA offline protects the trust anchor from compromise. It\'s a PKI security best practice, not a mechanism for recovering employee private keys.' },
    ]
  },
  {
    q: 'In TLS, asymmetric cryptography is used first. What happens after the handshake completes?',
    choices: [
      { text:'RSA continues to encrypt all traffic', correct:false, why:'RSA is too slow for bulk data. TLS 1.3 actually removed RSA key exchange entirely. Even in older versions, RSA is only used during the handshake, not for ongoing traffic.' },
      { text:'Both sides switch to symmetric AES for bulk data', correct:true, why:'The asymmetric handshake establishes a shared secret, from which symmetric session keys (AES) are derived. All subsequent data is encrypted with AES — fast and efficient.' },
      { text:'Hashing replaces encryption for the session', correct:false, why:'Hashing provides integrity, not confidentiality. You can\'t use a hash function to encrypt traffic — it\'s one-way and produces no ciphertext that can be decrypted.' },
      { text:'The connection becomes unencrypted for performance', correct:false, why:'TLS maintains encryption for the entire session. Dropping encryption after the handshake would defeat the entire purpose of TLS.' },
    ]
  },
  {
    q: 'What is the primary difference between SHA-2 (SHA-256) and SHA-3?',
    choices: [
      { text:'SHA-3 uses a longer key', correct:false, why:'Hashing algorithms don\'t use keys. Both SHA-2 and SHA-3 can produce the same output lengths (256-bit, etc.). The difference is internal algorithm design, not key length.' },
      { text:'SHA-3 uses a completely different internal algorithm (sponge construction)', correct:true, why:'SHA-3 (Keccak) uses a "sponge construction" — a fundamentally different algorithm family than SHA-2. NIST standardized SHA-3 as an alternative in case weaknesses were found in SHA-2.' },
      { text:'SHA-3 is faster than SHA-2 in all contexts', correct:false, why:'SHA-3 is generally slower than SHA-2 in software. SHA-2 benefits from hardware acceleration on most modern CPUs. Speed depends heavily on context and implementation.' },
      { text:'SHA-2 is deprecated and should not be used', correct:false, why:'SHA-2 (including SHA-256) remains secure and widely used. There are no known practical attacks against it. It is not deprecated.' },
    ]
  },
  {
    q: 'What distinguishes HMAC from a regular cryptographic hash?',
    choices: [
      { text:'HMAC uses asymmetric keys', correct:false, why:'HMAC uses a shared symmetric secret key, not asymmetric keys. It\'s specifically designed for use with a shared key between two parties.' },
      { text:'HMAC incorporates a secret key, proving the sender knows it', correct:true, why:'HMAC combines a hash function with a shared key. Unlike a plain hash (which anyone can compute), HMAC proves both integrity AND that the sender possesses the shared key.' },
      { text:'HMAC is reversible like encryption', correct:false, why:'HMAC is not reversible. It\'s a hash — the output is a fixed-length digest. The key is incorporated, but the output cannot be reversed to retrieve the original message or key.' },
      { text:'HMAC eliminates the need for TLS', correct:false, why:'HMAC is one component used within protocols like TLS. It provides message authentication but doesn\'t replace TLS, which handles key exchange, authentication, and confidentiality together.' },
    ]
  },
  {
    q: 'A web server presents a cached OCSP response as part of the TLS handshake instead of making clients contact the OCSP responder directly. What is this technique?',
    choices: [
      { text:'Certificate Pinning', correct:false, why:'Certificate pinning hardcodes which certificates a client will accept for a domain. It\'s a defense against rogue CAs, not a revocation performance optimization.' },
      { text:'CRL Distribution Point', correct:false, why:'A CRL Distribution Point is a field in a certificate pointing to where the CRL can be downloaded. It\'s related to CRL, not OCSP, and is not a server-side caching mechanism.' },
      { text:'OCSP Stapling', correct:true, why:'OCSP Stapling has the server periodically fetch and cache the OCSP response for its own certificate, then present it during the TLS handshake. This removes the need for clients to contact the OCSP responder directly.' },
      { text:'Certificate Transparency', correct:false, why:'Certificate Transparency is a logging mechanism where CAs publish issued certificates to public logs, allowing detection of misissued certs. It\'s not a revocation or caching mechanism.' },
    ]
  },
  {
    q: 'An organization is evaluating whether to use a wildcard certificate (*.domain.com) or a SAN certificate for their web properties. What is the key security tradeoff?',
    choices: [
      { text:'Wildcard certs are more expensive so they must be more secure', correct:false, why:'Cost is not a security property. Wildcard certificates carry a specific security risk regardless of cost.' },
      { text:'A wildcard cert compromise exposes all subdomains; SAN certs are more granular', correct:true, why:'If the private key of a wildcard cert is compromised, every subdomain is affected. SAN certs list specific FQDNs, so a compromise only affects those explicitly listed domains.' },
      { text:'SAN certificates cannot be used with HTTPS', correct:false, why:'SAN (Subject Alternative Name) certificates are widely used with HTTPS and are actually required for modern browsers to avoid warnings on multi-domain sites.' },
      { text:'Wildcard certs provide stronger encryption than SAN certs', correct:false, why:'The type of certificate (wildcard vs SAN) has no bearing on encryption strength. Encryption is determined by the cipher suite negotiated during the TLS handshake.' },
    ]
  },
  {
    q: 'Two parties need to establish a shared secret over an untrusted public network without transmitting the secret itself. What protocol accomplishes this?',
    choices: [
      { text:'AES key wrapping', correct:false, why:'AES key wrapping encrypts one key with another for secure transport. It requires a pre-existing shared key — it doesn\'t help establish an initial shared secret from scratch.' },
      { text:'Diffie-Hellman key exchange', correct:true, why:'Diffie-Hellman allows two parties to compute a shared secret independently using publicly exchanged values. The actual secret is never transmitted. ECDH is the elliptic curve variant used in TLS 1.3.' },
      { text:'RSA encryption of the session key', correct:false, why:'RSA key transport (one party encrypts the key with the other\'s public key and sends it) does transmit key material. It\'s also been removed from TLS 1.3 because it lacks forward secrecy.' },
      { text:'SHA-256 hashing of the shared password', correct:false, why:'Hashing a shared password doesn\'t establish a key over an untrusted channel — it requires the parties to already share the password, and hashing alone has no key exchange properties.' },
    ]
  },
  {
    q: 'A security engineer wants to store user passwords so that even if the database is stolen, brute-force attacks will be extremely slow. Which approach is BEST?',
    choices: [
      { text:'AES-256 encryption of each password', correct:false, why:'Encrypting passwords means they can be decrypted. If the encryption key is compromised, all passwords are immediately exposed. Passwords should be hashed, not encrypted.' },
      { text:'SHA-256 hash of each password', correct:false, why:'SHA-256 is cryptographically secure but fast — a GPU can compute billions of SHA-256 hashes per second. This makes brute-force attacks practical against a leaked database.' },
      { text:'bcrypt or Argon2 with a work factor', correct:true, why:'bcrypt and Argon2 are purpose-built for passwords. They incorporate a configurable work factor that makes each hash computation slow, making brute-force attacks infeasible even with modern hardware.' },
      { text:'Base64 encoding of each password', correct:false, why:'Base64 is encoding, not encryption or hashing. It\'s trivially reversible and provides zero security.' },
    ]
  },
  {
    q: 'What does a digital certificate actually contain that makes it useful for establishing trust?',
    choices: [
      { text:'The subject\'s private key, encrypted by the CA', correct:false, why:'Private keys are NEVER included in a certificate. If they were, the security model of PKI would collapse. The certificate contains only the public key.' },
      { text:'The subject\'s public key, signed by the CA\'s private key', correct:true, why:'A certificate binds a subject\'s identity to their public key, and this binding is signed by the CA\'s private key. Anyone can verify this with the CA\'s public key, establishing trust transitively.' },
      { text:'A hash of the subject\'s password', correct:false, why:'Certificates have no relationship to passwords. They bind cryptographic keys to identities in a PKI trust chain.' },
      { text:'The symmetric session key for the TLS connection', correct:false, why:'Session keys are ephemeral and negotiated per-session during the TLS handshake. They are never stored in or transmitted via a certificate.' },
    ]
  },
  {
    q: 'A forensic investigator is analyzing a network capture. She sees an image file transferred in plaintext. She suspects it contains hidden data despite looking normal. What should she investigate?',
    choices: [
      { text:'Ransomware encryption', correct:false, why:'Ransomware encrypts files, making them unreadable. The file in question appears normal, which is inconsistent with ransomware encryption.' },
      { text:'Steganographic content within the image', correct:true, why:'Steganography conceals data within carrier files so they appear normal to casual inspection. Specialized tools can detect statistical anomalies or LSB (least significant bit) manipulation used to embed data.' },
      { text:'Broken TLS certificate', correct:false, why:'The file was transferred in plaintext — TLS is not in play. A TLS certificate issue would relate to the transport layer, not the file content itself.' },
      { text:'Key escrow violation', correct:false, why:'Key escrow relates to the storage and recovery of cryptographic keys, not covert data embedding within files.' },
    ]
  },
  {
    q: 'What is the purpose of a Certificate Signing Request (CSR)?',
    choices: [
      { text:'To request revocation of an existing certificate', correct:false, why:'Revocation is handled via CRL or OCSP. A CSR is specifically for requesting a NEW certificate, not revoking an existing one.' },
      { text:'To generate and transmit a private key to the CA', correct:false, why:'The private key is generated locally and NEVER sent to the CA. Only the public key is included in the CSR. The security model depends on the private key staying private.' },
      { text:'To submit a public key and identity info to a CA for signing', correct:true, why:'The entity generates a keypair, packages the public key with identity information (organization, domain, etc.) in a CSR, and sends it to the CA. The CA signs it and returns the certificate.' },
      { text:'To update the expiration date on an existing certificate', correct:false, why:'Certificates cannot be modified after issuance. To extend validity, a new certificate must be issued — typically involving a new or renewed CSR.' },
    ]
  },
  {
    q: 'Which cryptographic goal does encryption provide, and which does hashing provide?',
    choices: [
      { text:'Encryption: integrity; Hashing: confidentiality', correct:false, why:'This is backwards. Encryption scrambles data for confidentiality. Hashing verifies data hasn\'t changed for integrity.' },
      { text:'Encryption: confidentiality; Hashing: integrity', correct:true, why:'Encryption transforms data so only authorized parties can read it (confidentiality). Hashing produces a digest for detecting changes (integrity). These are distinct, complementary goals.' },
      { text:'Both provide non-repudiation', correct:false, why:'Non-repudiation is specifically provided by digital signatures (asymmetric crypto). Neither plain encryption nor hashing alone provides non-repudiation.' },
      { text:'Both provide authentication', correct:false, why:'Authentication requires proving identity. Plain encryption with a shared key doesn\'t prove which party sent data. Plain hashing doesn\'t prove who created the hash. Authentication requires signatures or HMAC.' },
    ]
  },
  {
    q: 'A Root CA\'s private key is kept on an air-gapped computer that is only connected to the network to sign intermediate CA certificates, then disconnected again. Why?',
    choices: [
      { text:'To save electricity when not in use', correct:false, why:'While air-gapping does reduce network exposure, the reason is security, not power savings. The Root CA is kept offline to protect the trust anchor from network-based attacks.' },
      { text:'To protect the trust anchor — Root CA compromise invalidates the entire PKI', correct:true, why:'If the Root CA\'s private key is compromised, every certificate in the entire trust chain is untrusted. By keeping it offline, network-based attackers have no attack surface.' },
      { text:'Because Root CAs cannot issue certificates at all', correct:false, why:'Root CAs CAN issue certificates — specifically to intermediate CAs. They just do it rarely and carefully, offline, not continuously.' },
      { text:'To comply with OCSP Stapling requirements', correct:false, why:'OCSP Stapling is a server-side TLS optimization unrelated to how a Root CA is physically operated or stored.' },
    ]
  },
  {
    q: 'An organization uses a system where network traffic between internal services is controlled and authenticated even though all servers are on the same physical network. What approach is this?',
    choices: [
      { text:'DMZ architecture', correct:false, why:'A DMZ places public-facing servers in a separate zone between two firewalls. It doesn\'t control east-west traffic between internal services on the same network.' },
      { text:'Mutual TLS (mTLS) with micro-segmentation', correct:true, why:'mTLS requires both client and server to present certificates, authenticating each connection. Combined with micro-segmentation, this implements zero-trust principles for internal service-to-service communication.' },
      { text:'VLAN tagging', correct:false, why:'VLANs segment network traffic at layer 2, but don\'t provide cryptographic authentication between services. A compromised host on a VLAN can still attack others in the same VLAN.' },
      { text:'CRL distribution', correct:false, why:'CRL distribution is a certificate revocation mechanism. It checks whether a certificate has been revoked but doesn\'t control or authenticate inter-service network traffic.' },
    ]
  },
  {
    q: 'What cryptographic property ensures that even if a long-term private key is later compromised, past session traffic cannot be decrypted?',
    choices: [
      { text:'Certificate pinning', correct:false, why:'Certificate pinning restricts which certificates a client accepts. It protects against rogue CAs but does not protect past sessions if a long-term key is compromised.' },
      { text:'Forward Secrecy (Perfect Forward Secrecy)', correct:true, why:'PFS uses ephemeral key exchange (like ECDH) so each session gets a unique key that\'s discarded after the session ends. Compromising the long-term key doesn\'t expose past sessions because those session keys no longer exist.' },
      { text:'Key escrow', correct:false, why:'Key escrow intentionally allows key recovery — which is the opposite of what forward secrecy aims to achieve. Escrow means a third party CAN decrypt past traffic if needed.' },
      { text:'SHA-3 hashing', correct:false, why:'SHA-3 is a hash function providing integrity. It has no role in session key lifecycle or protecting past sessions from future key compromise.' },
    ]
  },
  {
    q: 'A blockchain network uses hashing to link each block to the previous one. An attacker attempts to alter a transaction in block 50. What happens?',
    choices: [
      { text:'Only block 50 is affected; other blocks remain valid', correct:false, why:'Each block contains the hash of the previous block. Changing block 50 changes its hash, which invalidates block 51 (which stored the old hash of block 50), and cascades forward through every subsequent block.' },
      { text:'The hash of block 50 changes, invalidating all subsequent blocks', correct:true, why:'This is the immutability guarantee of blockchain. Each block\'s hash covers its content AND the previous block\'s hash. Altering any block breaks the chain from that point forward — detectable by any node.' },
      { text:'The blockchain automatically corrects the alteration', correct:false, why:'Blockchains don\'t automatically correct data. What they do is make tampering detectable. In a distributed network, consensus mechanisms reject altered chains because they don\'t match the majority.' },
      { text:'AES encryption prevents the hash from changing', correct:false, why:'Blockchain integrity relies on hashing, not AES encryption. AES might protect data in transit, but the immutability property comes from the chained hash structure.' },
    ]
  },
  {
    q: 'An organization wants to verify that a software package downloaded from the internet has not been tampered with. The vendor publishes a SHA-256 hash of the installer. What does this verify?',
    choices: [
      { text:'That the vendor is who they claim to be', correct:false, why:'A published hash alone doesn\'t verify identity — anyone could publish a hash. Identity verification requires a digital signature from a trusted certificate authority.' },
      { text:'That the downloaded file is identical to what the vendor published', correct:true, why:'Cryptographic hashing provides integrity. If you compute SHA-256 of the downloaded file and it matches the published hash, the file is byte-for-byte identical to what the vendor hashed.' },
      { text:'That the file is encrypted and safe to run', correct:false, why:'A hash doesn\'t indicate encryption or safety. It only detects modification. Malware can have a perfectly valid hash if the malware itself is what the vendor hashed.' },
      { text:'That the file has been signed by a CA', correct:false, why:'A bare hash value is not the same as a digital signature. A signature requires asymmetric crypto with a private key. A hash is just a checksum anyone can compute.' },
    ]
  },
];
