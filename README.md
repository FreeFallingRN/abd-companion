# Absolute Beast Dominion — Companion Codex & Sanctuary

An interactive companion and grimoire codex for the progression fantasy novel **Absolute Beast Dominion**. Built using **Next.js 14**, **Embedded Sanity Studio CMS**, and containerized for zero-dependency local development via **Docker**.

---

## 🌟 Key Features

- **Anti-Spoiler Chapter Scrubber:** Readers slide the chapter tracker (Ch. 1 to 150) to dynamically recalculate stats, abilities, and lock/unlock beasts based on reading progress.
- **Dominion Sanctuary:** View contracted beasts (Shyra, Krik, Dryad, Agnivar, Nyxa, Howl) with Star Ranks (1–10), Sub-ranks, Bloodline purity meters, Cognition stages (IQ), and Bond sync rates.
- **Pact Master Dossier:** Aurelius / Leo's dual-soul cores, attribute progression (Vitality, Strength, Agility, Spirit), and unlocked Primordial Talents.
- **Embedded Sanity Studio (`/studio`):** Visual CMS dashboard where the novel's author and readers/moderators can update beasts, skills, and lore directly with 20 free editor seats on Sanity.
- **100% Zero-Cost Hosting:** Pre-configured for free Vercel deployment with zero database costs.
- **Offline / Local Fallback:** Operates out-of-the-box using the bundled canonical novel JSON dataset even before connecting a Sanity cloud project.

---

## 🚀 Quick Start (Local Development via Docker)

No local programming languages or dependencies required:

```bash
docker compose up
```

- **Companion Web App:** [http://localhost:3000](http://localhost:3000)
- **Sanity Studio CMS:** [http://localhost:3000/studio](http://localhost:3000/studio)

---

## ☁️ Deployment & Sanity Setup

See [VERCEL_SANITY_GUIDE.md](./VERCEL_SANITY_GUIDE.md) for 1-click deployment to Vercel and setting up your free Sanity project ID.

---

## 📁 Repository Structure

```
├── app/                  # Next.js App Router (Pages, Studio Route & Grimoire CSS)
├── data/                 # Canonical novel dataset (Beasts, Characters, Skills, Realms)
├── docs/                 # Architecture specifications & mechanics documentation
├── img/                  # Logos and branding assets
├── sanity/               # Sanity schemas, client, and data service
├── sanity.config.ts      # Studio configuration
├── docker-compose.yml    # Container orchestration for local dev
├── Dockerfile            # Container build definition
└── VERCEL_SANITY_GUIDE.md# Deployment and author collaboration instructions
```
