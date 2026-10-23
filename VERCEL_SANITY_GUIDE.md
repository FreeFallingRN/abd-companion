# Vercel + Sanity Setup & Author Collaboration Guide

This companion application for **Absolute Beast Dominion** is built using **Next.js (App Router)** with **Embedded Sanity Studio** (`/studio`) and styled with an **Obsidian Grimoire** aesthetic.

Both Vercel and Sanity have **100% free tiers** with no credit card required.

---

## 1. Local Testing via Docker (Zero Local Dependencies Needed)

Since you don't have programming languages installed on your PC, Docker handles everything:

```bash
docker compose up
```

Once running:
- **Reader Companion App:** Open [http://localhost:3000](http://localhost:3000)
- **Sanity Studio CMS (Editor Frame):** Open [http://localhost:3000/studio](http://localhost:3000/studio)

*(The app operates in Offline/Local Mode out of the box using your extracted novel data, even before creating a Sanity project).*

---

## 2. Setting Up Your Free Sanity Project (3 Minutes)

1. Go to **[https://sanity.io](https://sanity.io)** and sign up for a free account.
2. Click **Create Project** (or run `npx sanity init` if you have CLI, but the web UI is even easier).
3. Name your project (e.g., `absolute-beast-dominion`).
4. Select the **Free Plan** (Includes 20 free user seats, 10,000 documents, 250k API calls).
5. In your project dashboard, copy your **Project ID** (e.g. `a1b2c3d4`).
6. Under **Settings → API → CORS Origins**, click **Add CORS origin**:
   - For local: `http://localhost:3000` (check "Allow credentials")
   - For Vercel: `https://*.vercel.app` (check "Allow credentials")

---

## 3. Deploying to Vercel (1-Click at $0)

1. Initialize git and push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Absolute Beast Dominion Codex"
   git remote add origin https://github.com/YOUR_USERNAME/ABD.git
   git push -u origin main
   ```
2. Log in to **[https://vercel.com](https://vercel.com)** (free Hobby plan).
3. Click **Add New... → Project**, and select your `ABD` GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `your_sanity_project_id`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
5. Click **Deploy**!

Your app will be live at `https://your-project.vercel.app`!

---

## 4. How the Author & Readers Update Information

### Inviting the Author and Readers
1. In the **Sanity Manage Dashboard** (`https://sanity.io/manage`), navigate to your project.
2. Click **Members → Invite Member**.
3. Type in the email of the novel's author (or fellow readers/moderators) and assign them the **Editor** role.
4. They accept the email invite and can immediately navigate to:
   ```
   https://your-project.vercel.app/studio
   ```
5. They log in and see intuitive, rich forms for:
   - **Beast Records:** Add new beasts, Star Ranks (1-10), Sub-ranks (Low to Peak), Bloodline Tiers, Cognition Stages (Feral to Transcendent), IQ, and Bond Stages (Chain, Blood, Soul).
   - **Tamer Dossiers:** Update Aurelius / Leo's stats, level, soul rank, and primordial talents.
   - **Skills Codex:** Add new abilities, mana costs, and effects tied to unlock chapters.
   - **Realm Lore:** Add Academies and Danger Zones.
   - **Chapter Timeline:** Add chapter milestones and summaries.

---

## 5. Free Tier Cost Safeguards

- **Vercel Hobby Plan:** Free forever for personal projects.
- **Sanity Free Plan:**
  - Up to **20 free user seats** (Author + 19 reader editors).
  - 10,000 documents (more than enough for the entire novel's lore).
  - No credit card required.
