# NEXUS // WORD DECRYPTION

> *"Analyze the clue. Decode the word. Break the system."*  
> A production-quality, futuristic cyber-intelligence word decryption web game built with React, Vite, and modern CSS.

---

## 📊 Question Database & Tier Segregation

NEXUS features **15 total missions** meticulously categorized into **3 difficulty tiers** (5 questions per tier), each with tailored stakes, score multipliers, and failure thresholds:

| Difficulty Tier | Total Questions | Letter Score | Failure Limit | Completion Bonus | Theme / Focus |
| :--- | :---: | :---: | :---: | :---: | :--- |
| 🟢 **SIMPLE (EASY)** | 5 | +100 PTS | 6 Tries | +500 PTS | Foundational technology & computing essentials |
| 🟡 **MEDIUM** | 5 | +150 PTS | 6 Tries | +750 PTS | Cyber systems, network architecture & operations |
| 🔴 **HARD** | 5 | +200 PTS | 5 Tries | +1,000 PTS | Advanced cryptography, zero-day exploits & stealth malware |

---

### 🟢 TIER 1: SIMPLE (EASY) — 5 Questions
1. **PYTHON** (`PROGRAMMING`)
   - *Clue*: "A high-level language widely used for artificial intelligence, automation, and backend development."
   - *Hints*: Named after Monty Python • Two stylized serpents in logo.
2. **FUTURE** (`CONCEPT & TECH`)
   - *Clue*: "The prospective chronological period projected to unfold beyond the present reality."
   - *Hints*: Envisioned in cyberpunk lore • Forward temporal direction.
3. **CODING** (`DEVELOPMENT`)
   - *Clue*: "The fundamental craft of writing syntactic instructions executed by computational hardware."
   - *Hints*: Software engineering or scripting • Converts human intent to machine code.
4. **SERVER** (`INFRASTRUCTURE`)
   - *Clue*: "A central computer hardware or software system that delivers data services to client machines."
   - *Hints*: Housed in data centers on metal racks • Pairs with client applications.
5. **ROUTER** (`NETWORKING`)
   - *Clue*: "A physical networking hardware device that directs data packets between disparate networks."
   - *Hints*: Finds the optimal network path • Connects home devices to the Internet.

---

### 🟡 TIER 2: MEDIUM — 5 Questions
6. **CYBER** (`SECURITY & NETWORK`)
   - *Clue*: "A foundational prefix relating to computer networks, digital systems, and virtual environments."
   - *Hints*: Greek root "kybernetes" (steersman) • Paired with warfare, space, punk.
7. **MATRIX** (`SCI-FI & COMPUTING`)
   - *Clue*: "A rectangular arrangement of numbers in rows and columns, or a vast simulated neural reality."
   - *Hints*: Dystopian simulation in 1999 • Red pill vs. blue pill.
8. **PACKET** (`TELECOMMUNICATIONS`)
   - *Clue*: "A discrete unit of formatted data routed between an origin and destination across the Internet."
   - *Hints*: Header with source/dest IP • Inspected by firewalls.
9. **TROJAN** (`MALWARE INTEL`)
   - *Clue*: "Malicious software disguised as legitimate utilities that secretly compromises system defenses."
   - *Hints*: Ancient wooden horse warfare tactic • Opens covert backdoors.
10. **KERNEL** (`OPERATING SYSTEMS`)
    - *Clue*: "The core foundational component of an OS with complete memory and hardware control."
    - *Hints*: Bridges user apps with physical CPU • Monolithic and micro variants in Linux.

---

### 🔴 TIER 3: HARD — 5 Questions
11. **CIPHER** (`CRYPTOGRAPHY`)
    - *Clue*: "An algorithmic mathematical function used for performing encryption or decryption on plaintext."
    - *Hints*: Caesar's rotational method • Symmetric block and stream variants.
12. **QUANTUM** (`NEXT-GEN COMPUTING`)
    - *Clue*: "A computational paradigm harnessing superposition and entanglement to break classical cryptosystems."
    - *Hints*: Subatomic qubits • Threatens RSA encryption keys.
13. **EXPLOIT** (`CYBER THREATS`)
    - *Clue*: "A specialized sequence of commands or payload taking advantage of software vulnerability bugs."
    - *Hints*: Zero-day variants • Deployed in penetration testing frameworks.
14. **ROOTKIT** (`STEALTH MALWARE`)
    - *Clue*: "A clandestine collection of stealth software designed to maintain privileged access while evading detection."
    - *Hints*: Hooks deep OS API calls • Requires low-level bootloader inspection.
15. **FIREWALL** (`NETWORK DEFENSE`)
    - *Clue*: "A network security perimeter barrier monitoring and filtering incoming and outgoing traffic rules."
    - *Hints*: Stateful packet inspection • Named after physical fire barriers.

---

## 🎖️ Proper Game Model & Progression

- **Campaign & Tier Select**: Operators can choose to play the **Full Progressive Campaign (15 Missions)** or filter directly into **Simple**, **Medium**, or **Hard** missions.
- **Operator Clearance Ranks**:
  - `CADET OPERATOR` (0–2 missions solved)
  - `CYBER SPECIALIST` (3–6 missions solved)
  - `ELITE OPERATOR` (7–11 missions solved)
  - `NEXUS ARCHITECT` (12–15 missions solved)
- **Persistent High Score & Career Stats**: Automatically stored in browser `localStorage`.
- **Keyboard Decryption**: Streamlined physical keyboard typing directly decoded into target slots without an on-screen keyboard cluttering the display.

---

## ⚡ 5 Advanced Cyber Warfare Features

1. **⏱️ Mission Countdown Timer & Speed Bonus**:
   - 60-second operational countdown per mission.
   - Visual urgency states: turns warning amber under 15 seconds, and flashing critical red under 8 seconds.
   - Decrypting before time expires awards a **Speed Bonus** of `+10 PTS per remaining second`.

2. **🔥 Decryption Streak & Combo Multiplier**:
   - Consecutive correct letter decryptions chain into combo multipliers (`x2 COMBO`, `x3 COMBO`).
   - Multiplies letter scores (e.g. up to **+600 PTS** per correct letter on Hard tier).
   - Erroneous keystrokes reset the combo back to x1.

3. **🛡️ Tactical Cyber Overrides (In-Game Power-Ups)**:
   - **TRACE BYPASS (1 Charge)**: Erases 1 security trace failure and restores integrity when mistakes occur.
   - **SCAN PULSE (1 Charge)**: Auto-decodes 1 unrevealed letter byte directly into the target slot.

4. **📖 Mission Intelligence Archive (Codex)**:
   - Built-in tactical dossier accessible anytime from the header (`BookOpen` icon).
   - Filter words across **All**, **Simple**, **Medium**, and **Hard** tiers.
   - Displays encrypted vs. decrypted status, categories, primary clues, and tactical hints.

5. **🎨 Cyberpunk Theme Switcher**:
   - One-click palette switching via the header palette button (`PAL`):
     - 🩵 **CYAN (Standard)**: High-tech neural deck aesthetic.
     - 💚 **MATRIX**: Iconic phosphor terminal green.
     - 💜 **VIOLET**: Neon synthwave ultraviolet.

---

## 🕹️ Quick Start & Running Locally

```bash
cd e:/project/codealpa/NEXUS
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

Production build:
```bash
npm run build
```

---

*NEXUS Security Systems // Analyze the clue. Decode the word. Break the system.*
