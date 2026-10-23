# Absolute Beast Dominion: Core Mechanics & System Reference Manual

Comprehensive mechanics, progression formulas, bonding systems, stat calculators, and data models extracted from _Absolute Beast Dominion_.

---

## Table of Contents

1. [Core World System & Soul Foundations](#1-core-world-system--soul-foundations)
2. [Tamer & Character Mechanics](#2-tamer--character-mechanics)
   - [Primary Attributes](#21-primary-attributes)
   - [Derived Stats & Core Formulas](#22-derived-stats--core-formulas)
   - [Experience Curve & Leveling](#23-experience-curve--leveling)
   - [Combat & Kill XP Bonus Matrix](#24-combat--kill-xp-bonus-matrix)
3. [Soul Rank & Limiter System](#3-soul-rank--limiter-system)
   - [Soul Rank Multipliers & Contract Slots](#31-soul-rank-multipliers--contract-slots)
   - [Dual-Soul Dynamics](#32-dual-soul-dynamics)
4. [Beast Classification & Progression System](#4-beast-classification--progression-system)
   - [Star Ranks & Sub-Stages](#41-star-ranks--sub-stages)
   - [Bloodline Tiers, Purity & Potential](#42-bloodline-tiers-purity--potential)
   - [Intelligence Stages & IQ](#43-intelligence-stages--iq)
   - [Specialties (Passive Traits) & Active Skills](#44-specialties-passive-traits--active-skills)
5. [Bonding & Contract Architecture](#5-bonding--contract-architecture)
   - [Bond Progression Stages](#51-bond-progression-stages)
   - [Blood Bond Trait Sharing Matrix](#52-blood-bond-trait-sharing-matrix)
   - [Bond Benefits & Discounts](#53-bond-benefits--discounts)
6. [Unique Talents & Class Modifiers](#6-unique-talents--class-modifiers)
7. [Nurturing, Evolution & Beast Space Dominion](#7-nurturing-evolution--beast-space-dominion)
   - [General World Beast Nurturing](#71-general-world-beast-nurturing-universal-system)
   - [Leo's Exclusive Core Synthesis](#72-leos-exclusive-ability-core-synthesis--instant-fusion-bestiary-of-souls-6)
   - [Evolution Requirements & Catalysts](#73-evolution-requirements--catalysts-universal-system)
   - [Beast Space Mechanics](#74-beast-space--spiritual-space-mechanics)
8. [World Structure, Societal Hierarchy & Dimensional Lore](#8-world-structure-societal-hierarchy--dimensional-lore)
   - [Sovereign Powers, Dragons & Demons](#81-sovereign-civilizations-the-dragon-race--extradimensional-demons)
   - [Societal Hierarchy, Peerage & Commoners](#82-societal-hierarchy-feudal-peerage--nobility)
   - [City Structure, Defensive Tiers & Beast Tides](#83-city-structure-defensive-tiers--beast-tides)
   - [Dimensional Architecture & World Mergers](#84-dimensional-architecture-secret-realms-realm-gates--world-mergers)
   - [Economy & Elements](#85-economy-currencies--elements)
   - [Aurelius Academy Internal Systems & Territories](#86-aurelius-beast-academy-internal-systems--territory-management)
   - [Academies & Inter-Academy League](#87-academic-institutions--the-inter-academy-league)
   - [Hunter Guilds & Danger Tiers](#88-hunter-guilds--wild-danger-classifications)
9. [Canon Bestiary Reference (Story Companions)](#9-canon-bestiary-reference-story-companions)

---

## 1. Core World System & Soul Foundations

Five hundred years ago, the world was overrun by magical beasts. Humanity's survival hinges on individuals awakening a talent for **Beast Taming**, **Spirit Calling**, and related soul-bound arts.

The system governs power distribution through three interrelated pillars:

1. **Soul Rank:** The tamer's innate container quality that dictates mana capacity, maximum contract slots, and the physical threshold of power that can be channeled from contracted beasts.
2. **Beast Star Rank & Bloodline:** The intrinsic rank (1★ to 10★), sub-rank (Low, Mid, High, Peak), and lineage (Ordinary $\to$ Divine) of beasts.
3. **Bond Tier:** The resonance depth between tamer and beast (Chain $\to$ Blood $\to$ Soul), which unlocks stat sharing, skill mana reductions, and trait transference.

---

## 2. Tamer & Character Mechanics

### 2.1 Primary Attributes

Every tamer and beast possesses 5 fundamental physical and mental attributes:

| Attribute        | Abbreviation | Core Function                                                                                  |
| :--------------- | :----------- | :--------------------------------------------------------------------------------------------- |
| **Vitality**     | `VIT`        | Governs maximum health, physical toughness, wound recovery, and resistance to toxins/bleeding. |
| **Strength**     | `STR`        | Dictates kinetic striking force, physical damage output, muscle density, and lifting capacity. |
| **Agility**      | `AGI`        | Determines movement speed, reaction time, reflex speed, dynamic balance, and acceleration.     |
| **Stamina**      | `STA`        | Controls sustained physical combat endurance, stamina depletion rate, and fatigue threshold.   |
| **Intelligence** | `INT`        | Governs mental calculation speed, perception, tactical comprehension, and base Mana scaling.   |

---

### 2.2 Derived Stats & Core Formulas

#### A. Maximum Mana Capacity Formula

$$\text{Max Mana} = \text{Intelligence} \times \text{Soul Rank Value} \times 10$$

- **Early Game (Leo - Dual Soul: Common [1] + Mythical [7] = 8):**
  $$\text{INT } 1.2 \times 8 \times 10 = 96 \text{ Mana}$$
- **Mid Game (Leo - Ascended Soul: Rare [3] + Mythical [7] = 10):**
  $$\text{INT } 25 \times 10 \times 10 = 2,500 \text{ Mana}$$

---

### 2.3 Experience Curve & Leveling

The system utilizes a 30% exponential compounding progression curve per level:

$$\text{XP Required for Level } (n + 1) = \text{XP Required for Level } n \times 1.30$$

#### Stat Point Allocation & Growth Dynamics

1. **Base Level-Up Stat Points:**
   - **+4 Free / Unassigned Stat Points** awarded for each individual level gained (e.g., Level 3 $\to$ 4: $+4$ points; Level 17 $\to$ 18: $+4$ points).
   - **Multi-Level Jumps:** When high-XP bounties or boss kills cause multi-level advancements at once, stat points accumulate proportionally:
     - $+2$ Levels at once $\longrightarrow$ **+8 Unassigned Stat Points** (e.g. Level 1 $\to$ 3 or Level 15 $\to$ 17)
     - $+5$ Levels at once $\longrightarrow$ **+20 Unassigned Stat Points** (e.g. Level 4 $\to$ 9)
2. **Beast Breakthrough & Level-Up Stat Feedback:**
   - When contracted beasts level up or break through minor sub-ranks (e.g., Low $\to$ Mid $\to$ High), the tamer receives direct attribute feedback bonuses (e.g., $+5$ to Stamina/Intelligence upon beast breakthrough).
3. **Passive Combat & Exertion Stat Growth:**
   - In addition to leveling points, attributes grow organically through extreme combat conditions:
     - Continuous body damage & healing $\longrightarrow$ Natural increases to `VIT` and `STA`.
     - Heavy mana expenditure & mental pressure $\longrightarrow$ Natural increases to `INT`.
4. **Soul Rank Stat Limiter (Soft Caps):**
   - Natural stat gains from personal growth, elixirs, and berries are governed by a soft-cap ceiling tied to the tamer's **Soul Rank**:
     $$\text{Max Natural Stat Ceiling} = \text{Star Rank Base Pool} \times (\text{Soul Rank Value} \times 10\%)$$
   - _Example:_ In Pseudo 3-Star (100 base stat benchmark), a tamer with a Super Rare Soul (Value 4) can naturally acquire up to 40 stats before hitting severe diminishing returns.

```
Single Level Up (+1 Level)  ───►  +4 Unassigned Stat Points
Double Level Up (+2 Levels) ───►  +8 Unassigned Stat Points
5-Level Surge   (+5 Levels) ───►  +20 Unassigned Stat Points
Beast Breakthrough Feedback ───►  Direct Stat Feed (+5 Points / Sub-Rank)
```

---

### 2.4 Combat & Kill XP Bonus Matrix

XP is earned by defeating/killing beasts and opposing masters. The system awards base XP according to target rank, with substantial bonus multipliers when defeating higher-ranked adversaries:

| Target Tier & Sub-Rank                     | Base XP Reward                      | Higher-Rank Bonus Modifiers                            |
| :----------------------------------------- | :---------------------------------- | :----------------------------------------------------- |
| **Mid 1★ Beast**                           | 50 XP                               | Standard kill                                          |
| **Peak 1★ Beast**                          | 200 XP                              | Standard kill                                          |
| **Low 2★ Beast / Great Knight**            | 1,000 XP                            | **+1,000 XP** if target is an immediate higher rank    |
| **Peak 2★ Beast (e.g. Mistprowler Tiger)** | 6,000 XP                            | **+2,000 XP** additional bonus for defeating peak tier |
| **3★ & Above**                             | Scales exponentially ($15,000+$ XP) | Exponential threat-tier bonus multipliers              |

---

## 3. Soul Rank & Limiter System

### 3.1 Soul Rank Multipliers, Contract Slots & Caps

A tamer's **Soul Rank** is the fundamental governor of their magical potential, talent limits, skill holding capacity, and beast contract slots.

| Soul Rank               | Calculation Value ($x$) | Max Contract Slots  | Max Talent Star Cap | Stat Limiter / Soft Cap | Personal Skill Capacity ($2x + 5$) | World Rarity               |
| :---------------------- | :---------------------: | :-----------------: | :-----------------: | :---------------------: | :--------------------------------: | :------------------------- |
| **Common**              |            1            |  1 Beast / Spirit   |      Up to 5★       |           10%           |              7 Skills              | Commoners                  |
| **Uncommon**            |            2            | 2 Beasts / Spirits  |      Up to 6★       |           20%           |              9 Skills              | Apprentices / Minor Nobles |
| **Rare**                |            3            | 3 Beasts / Spirits  |      Up to 7★       |           30%           |             11 Skills              | Academy Elite              |
| **Super Rare**          |            4            | 4 Beasts / Spirits  |      Up to 8★       |           40%           |             13 Skills              | High Nobles / Prodigies    |
| **Epic**                |            5            | 5 Beasts / Spirits  |      Up to 9★       |           50%           |             15 Skills              | Renowned Masters           |
| **Legendary**           |            6            | 6 Beasts / Spirits  |      Up to 10★      |           60%           |             17 Skills              | Continental Legends        |
| **Mythical**            |            7            | 7+ Beasts / Spirits |   10★+ (Uncapped)   |           70%           |             19 Skills              | Primordial Entities        |
| **Divine / Primordial** |         8 – 10          |      Uncapped       |      Uncapped       |          100%           |             21+ Skills             | Gods / True Primordials    |

#### Additional Soul Rank Rules:

1. **Talent Suppression:** If a person's awakened talent is 8★ (e.g. _Spirit Caller_), but their soul rank is only Rare (Value 3), the talent's manifested output is capped at 7★ until their soul rank ascends to Super Rare (Value 4).
2. **Personal Skill Slot Formula:** The number of recorded personal skills a soul can hold without memory/soul strain follows the rule:
   $$\text{Skill Slots} = 2x + 5 \quad (\text{where } x = \text{Soul Rank Value})$$
3. **Copy / Stolen Skill Slots (Protagonist Case):** Leo's ability to copy skills and talents scales directly with the sum of his dual soul values (e.g. Mythical [7] + Super Rare [4] = 11 total copy slots).

---

### 3.2 Dual-Soul Dynamics

- Individuals with soul anomalies or transmigrated souls can hold **Dual Soul Ranks**.
- **Leo's Soul Composition:**
  - **Mortal Soul:** Starts at **Common (1)** $\longrightarrow$ Ascends to **Uncommon (2)** $\longrightarrow$ **Rare (3)** $\longrightarrow$ **Super Rare (4)** $\longrightarrow$ **Epic (5)** via rare soul catalysts (e.g., _Primordial Grove Dryad Petals_).
  - **Primordial Soul:** Fixed at **Mythical (7)**.
  - **Effective Soul Multiplier:** Sum of both souls:
    $$(1 + 7) = 8 \quad \longrightarrow \quad (2 + 7) = 9 \quad \longrightarrow \quad (3 + 7) = 10 \quad \longrightarrow \quad (4 + 7) = 11$$

---

## 4. Beast Classification & Progression System

### 4.1 Star Ranks & Sub-Stages

Beasts, Tamers, and Cores are graded across 10 Star Ranks ($1\bigstar$ to $10\bigstar$). Each Star Rank is divided into four sub-stages:

$$\text{Low } \bigstar \quad \longrightarrow \quad \text{Mid } \bigstar \quad \longrightarrow \quad \text{High } \bigstar \quad \longrightarrow \quad \text{Peak } \bigstar$$

- **1★ – 3★:** Novice to Elite beasts (Academy trials, regional wilderness, basic dungeons).
- **4★ – 6★:** Commander to Calamity beasts (City-scale threats, master-level tamers).
- **7★ – 8★:** Monarch to Sovereign beasts (Continental calamities, true dragons, ancient wyverns).
- **9★ – 10★:** Primordial & Divine beings (World arbiters).

---

### 4.2 Bloodline Tiers, Purity & Potential

The world categorizes all magical beasts into **6 definitive Bloodline Ranks** that govern their natural growth limits, stat scaling, and racial majesty (established in Chapter 7):

```
Ordinary (Max 2★) ──► Mortal (Max 3-4★) ──► Super (Max 5-6★) ──► Noble (Max 7★) ──► Royal (Max 8★) ──► Divine (9-10★ / God Beast)
```

| Bloodline Rank         |  Natural Star Ceiling  | Typical World Threats / Examples                 | Description & Growth Limits                                                 |
| :--------------------- | :--------------------: | :----------------------------------------------- | :-------------------------------------------------------------------------- |
| **Ordinary Bloodline** |       **Max 2★**       | Grey Slimes, Goblins, Kobolts (base)             | Common wild monsters; growth strictly caps at 2 Stars.                      |
| **Mortal Bloodline**   | **Max 3★** _(Rare 4★)_ | Windbreath Hounds, Ironhide Boars, Orcs          | Standard hunting beasts; caps at 3 Stars (extreme mutations reach 4★).      |
| **Super Bloodline**    | **Max 5★** _(Rare 6★)_ | Mistprowler Tigers, Cedar Treants, Flame Wyverns | High-tier predators; naturally reaches 5 Stars (rare chance of 6★).         |
| **Noble Bloodline**    |       **Max 7★**       | Obsidian Panthers, Shadowstripe Lynxes           | Aristocratic beast lineages; ceiling extends up to 7 Stars.                 |
| **Royal Bloodline**    |       **Max 8★**       | Primordial Grove Dryads, High Monarch lines      | 7 Stars easily achieved; inherently capable of breaking into 8 Stars.       |
| **Divine Bloodline**   |      **9★ – 10★**      | Primordial Entities, World Arbiters              | 9 Stars standard; capable of ascending into a true **God Beast** over time. |

#### Bloodline Growth Mechanics:

1. **Bloodline Potential ($\bigstar$ to $10\bigstar$):** The specific star cap assigned to an individual beast (e.g. `★★★★★★ (rare chance of 7★)` for Noble Shyra; `★★★★★★★★ (8★)` for Royal Dryad).
2. **Bloodline Purity ($0\% \to 100\%$):** Indicates the density of pure ancestral blood. When Purity reaches **100%**, the bloodline ascends to the next rank (e.g. Mortal $\to$ Super $\to$ Noble), unlocking higher star potential.

---

### 4.3 Intelligence Stages & Cognition Rules

Magical beasts advance through 5 distinct cognitive stages that directly determine bonding, naming, and talent replication:

```
Feral / Instinctual  ──►  Juvenile  ──►  Adolescent (IQ 100+)  ──►  Mature / Adult  ──►  Awakened / Humanoid
```

1. **Feral / Instinctual Stage (Pre-Juvenile):**
   - Driven purely by hunger, territory, and survival instincts. In the wild, beasts without guidance or mutations typically take **up to 50 years (5 decades)** of survival to naturally cross into the Juvenile stage.
2. **Juvenile Stage:**
   - Understands basic tamer commands and forms standard Chain Bonds.
   - _System Limitation:_ The tamer **cannot copy talents or active skills** from a Juvenile beast (e.g. Leo could not copy Ashira's 6★ _Cradle of Cinders_ until she matured). Direct soul bonding upon naming is suppressed.
3. **Adolescent Stage (IQ 100+):**
   - Emergence of distinct personality, emotional nuance, and tactical reasoning.
   - _System Unlocks:_ Tamers can now **copy talents and skills** from the beast. Enables direct soul bond ascension upon true naming (e.g. Agnivar).
4. **Mature / Adult Stage:**
   - Human-equivalent or superior tactical calculation, independent spellcasting, and autonomous battlefield leadership over pack members.
5. **Awakened / Humanoid Stage:**
   - High-rank ancient and divine beasts gain fluent human speech, deep spell weaving, and the ability to take humanoid form while retaining beast power.

---

### 4.4 Specialties (Passive Traits) & Active Skills

#### A. Specialties (Passive Racial Traits)

- Permanent biological and spiritual traits determined by species and bloodline (e.g., _Obsidian Hide_, _Feline Agility_, _Fast Regeneration_, _Infernal Core_, _Lesser Draconic Majesty_, _Pack Instinct_, _Faint Draconic Bloodline_).
- Can be channeled by the tamer via **Blood Bond (60%+ unlocks)** or wielded passively at 100% strength via **[Primordial Beast Taming]**.

#### B. Active Skills & Mastery Hierarchy

- Skills possess a **Proficiency Percentage (0% to 100%)** across six progressive mastery tiers:
  $$\text{Low} \quad \longrightarrow \quad \text{Intermediate / Mid} \quad \longrightarrow \quad \text{High} \quad \longrightarrow \quad \text{Peak} \quad \longrightarrow \quad \text{Master} \quad \longrightarrow \quad \text{Grandmaster}$$
- Reaching 100% in a tier breaks through into the next tier at 0%–1% (e.g., `[Stealth] - 100% Low` $\to$ `[Stealth] - 2% Intermediate` $\to$ `[Stealth] - 2% Peak`).

#### C. Skill Transfer Constraints & Training Efficiency

1. **Recipient Level Compatibility:** When extracting or transferring skills (via _Bestiary of Souls_), the recipient beast must meet level and bloodline thresholds, or the system rejects the transfer with `[Skill Level too low for recipient beast]`.
2. **Spiritual Space Training Discrepancy:** While resting in the Beast/Spiritual Space accelerates physical and mana recovery by $3\times-5\times$, **skill mastery training efficiency is reduced by ~99%** compared to real-world physical combat. Practical combat is required to advance mastery.

---

### 5.1 Bond Progression Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BOND STAGES & PROGRESSION                       │
├───────────────────┬─────────────┬──────────────────────────────────────┤
│ Bond Stage        │ Threshold   │ Universal World Effects              │
├───────────────────┼─────────────┼──────────────────────────────────────┤
│ **Chain Bond**    │ 0% – 100%   │ • Basic command execution.           │
│                   │             │ • Storage / recall to Beast Space.   │
│                   │             │ • Fundamental telepathic connection. │
├───────────────────┼─────────────┼──────────────────────────────────────┤
│ **Blood Bond**    │ 1% – 100%   │ • 50% Mana Cost Reduction on skills. │
│                   │             │ • Enhanced sensory resonance.        │
│                   │             │ • (Trait sharing via unique talents).│
├───────────────────┼─────────────┼──────────────────────────────────────┤
│ **Soul Bond**     │ 100% (Max)  │ • Bidirectional mana replenishment.  │
│                   │             │ • Complete spiritual synchronization.│
│                   │             │ • Fusion Mode unlocked.              │
└───────────────────┴─────────────┴──────────────────────────────────────┘
```

---

### 5.2 Trait Sharing & Partial Usage Rules (Chapter 109)

There is a fundamental difference between standard world tamers and special talent wielders regarding trait access:

1. **Standard World Tamers:**
   - Forming a Blood Bond **only** grants a **50% mana cost reduction** for casting beast skills.
   - Standard tamers **cannot** access or share beast passive traits at any blood bond percentage. They can only temporarily assimilate stats at the Soul Bond stage by casting an active Fusion skill.
2. **[Primordial Beast Taming] Progressive Trait Unlocks:**
   - Leo's talent unlocks direct physical and spiritual access to the beast's passive specialties starting in the Blood Bond stage, gated by percentage thresholds:

| Blood Bond %  |     Trait Availability      | Mechanical Functionality                                                                                                                                                                                                                 |
| :-----------: | :-------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1% – 59%**  | **Partial Usage (1 Trait)** | **"Half-Baked" Manifestation:** The tamer experiences a weakened, diminished effect of only a single primary trait (e.g. at 49% with Shyra or 54% with Niri, wound recovery is incomplete and weak-spot reflex perception is imprecise). |
| **60% – 69%** |  **1 Trait (100% Power)**   | First passive specialty operates at **100% full strength**, toggleable at will.                                                                                                                                                          |
| **70% – 79%** |  **2 Traits (100% Power)**  | Two passive specialties can be active simultaneously at full potency.                                                                                                                                                                    |
| **80% – 89%** |  **3 Traits (100% Power)**  | Three passive specialties fully operational.                                                                                                                                                                                             |
| **90% – 99%** |  **4 Traits (100% Power)**  | Four passive specialties active simultaneously.                                                                                                                                                                                          |
|   **100%**    | **Ascension to Soul Bond**  | All passive specialties, complete stat resonance, and fusion unlocked.                                                                                                                                                                   |

---

### 5.3 Soul Bond, Fusion, Death & Soul Backlash Mechanics

#### A. Soul Bond Powers & Soulmate Resonance

- **Bidirectional Mana Replenishment:** Partners connected by a Soul Bond can directly transfer mana reserves to one another through physical touch or soul focus (Ch 621).
- **Cross-Element Skill Sharing:** At the pinnacle of a Soulmate bond, partners can cast each other's active skills without being restricted by elemental affinities (Ch 673).
- **Fusion Mode Discrepancy:**
  - _Normal Tamers:_ Fusion is an active spell that consumes massive continuous mana to grant temporary 100% beast stats, without granting traits.
  - _[Primordial Beast Taming]:_ Wields 100% beast stats and traits **passively at all times (0 mana upkeep)**. Activating Fusion Mode results in **+200% Stat Amplification**.

#### B. Death, Destruction & Soul Backlash

- **Physical Beast Masters (Mortal Beasts):** If a contracted beast is killed in battle, the contract is violently torn from the tamer's soul space, causing severe **Soul Backlash** (soul cracking, intense physical pain, and crippled cultivation that requires long meditation and soul treasures to mend).
- **Spirit Callers (Immortal Spirits):** Contracted spirits (like Lily's) are **immortal**. If destroyed in combat, they do not die; they disperse into spiritual mana particles and reform safely inside the spiritual space, causing **zero fatal backlash** to the summoner.

---

## 6. Unique Talents & Class Modifiers

```
┌────────────────────────────────────────────────────────────────────────┐
│                          TALENT CLASSIFICATIONS                        │
├────────────────────────────┬──────────┬────────────────────────────────┤
│ Talent Name                │ Star Tier│ Core Mechanical Effect         │
├────────────────────────────┼──────────┼────────────────────────────────┤
│ [Primordial Beast Taming]  │ 10★ Myth │ • Passive 100% stat & trait    │
│ (Leo)                      │          │   sharing with all beasts.     │
│                            │          │ • Fusion Mode: +200% Stat      │
│                            │          │   Amplification.               │
│                            │          │ • Bypasses world taming limits.│
├────────────────────────────┼──────────┼────────────────────────────────┤
│ [Spirit Caller]            │ 8★       │ • Contracts Spirits from cores.│
│ (Lily)                     │          │ • Passive +50% of Spirit physical│
│                            │          │   stats (VIT, STR, AGI, STA).  │
│                            │          │ • Passive +100% Spirit INT.    │
│                            │          │ • Massive natural mana pool.   │
├────────────────────────────┼──────────┼────────────────────────────────┤
│ [Bestiary of Souls]        │ 6★       │ • Full System Inspection HUD   │
│ (Leo)                      │          │   (bloodlines, hidden formulas)│
│                            │          │ • Core Synthesis & Core Fusion.│
│                            │          │ • Skill & Soul Extraction.     │
├────────────────────────────┼──────────┼────────────────────────────────┤
│ [Cradle of Cinders]        │ 6★       │ • Dual Flame Aura:             │
│ (Ashira - Flame Wyvern)    │          │   - Heals & invigorates allies.│
│                            │          │   - Destroys & burns enemies.  │
└────────────────────────────┴──────────┴────────────────────────────────┘
```

---

## 7. Nurturing, Evolution & Beast Space Dominion

### 7.1 General World Beast Nurturing (Universal System)

In the wider world, ordinary Beast Masters and Tamers nurture their beasts through conventional, time-intensive methods:

1. **Dietary Core Ingestion:** Beasts consume physical Beast Cores matching their elemental affinity. Digesting a core takes days to weeks, gradually releasing mana and bloodline energy into the beast's physique.
2. **Digestion Rank Constraints:** Beasts cannot safely consume cores far above their current Star Rank; doing so causes violent mana overload, internal rupture, or death.
3. **Herbs & Alchemical Concoctions:** Tamers purchase specialized alchemical pills, beast nourishment powders, and elemental berries to gradually stimulate growth and heal internal injuries.
4. **Natural Growth Pacing:** Advancing a beast through a single star tier typically takes months or years of consistent feeding and combat training.

---

### 7.2 Leo's Exclusive Ability: Core Synthesis & Instant Fusion ([Bestiary of Souls] 6★)

Unlike standard tamers, Leo possesses the unique 6★ talent **[Bestiary of Souls]**, which bypasses natural feeding and digestion limitations:

1. **Instant Core Synthesis:** Direct spiritual fusion of multiple lower-tier/sub-rank cores into higher-tier concentrated cores with zero material loss (e.g. merging Low 2★ and Peak 1★ cores into pure Mid/High 2★ elemental cores).
2. **Direct Spiritual Infusion:** Instantly feeds synthesized core energy directly into contracted beasts and spirits (such as Lily's spirits or Shyra), bypassing physical digestion time and immediately triggering realm jumps.
3. **Hidden Evolution Recipes & Diagnostics:** Displays exact percentage thresholds for bloodline purity, missing elemental catalysts, and step-by-step evolution recipes invisible to ordinary analysts.

---

### 7.3 Evolution Requirements & Catalysts (Universal System)

To trigger an evolution from one Star Rank to the next, any beast must fulfill three core prerequisites:

1. **Sub-Rank Cap:** The beast must reach the **Peak Sub-Rank** of its current Star (e.g., Peak 1★ $\to$ Low 2★; Peak 2★ $\to$ Low 3★).
2. **Bloodline Purity Threshold:** Bloodline Purity must reach **100%** through consistent core absorption and combat breakthroughs.
3. **Catalytic Breakthrough Materials:**
   - Elemental Beast Cores of matching/complementary attributes.
   - Rare elemental herbs, alchemical breakthrough elixirs, or specific environmental catalysts.
   - High-tier soul produce (e.g., _Dryad Soul Petals_ for soul-tier ascension).

---

### 7.4 Beast Space / Spiritual Space Mechanics

- **Internal Soul Biome:** A pocket dimension housed in the tamer's soul where contracted beasts rest, shelter, and recover.
- **Mana Density Scaling:** The richer the tamer's personal mana capacity, the higher the ambient mana density inside the Beast Space, accelerating passive recovery.
- **Accelerated Healing:** Wounded or exhausted beasts resting in the Beast Space recover HP, Stamina, and minor soul injuries at $3\times - 5\times$ natural speed.
- **Skill Training Limitation:** While physical healing is hyper-accelerated, **skill mastery training efficiency inside the Beast Space is reduced by ~99%** compared to physical world practice (Ch 659). Practical combat application is required to level up active skills.

---

## 8. World Structure, Societal Hierarchy & Dimensional Lore

### 8.1 Sovereign Civilizations, The Dragon Race & Extradimensional Demons

Following centuries of cataclysm and dimensional convergence, the power balance of the world is shaped by two major native mortal empires, the ancient apex Dragon Race, and the existential threat of invading Abyss Demons:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SOVEREIGN POWERS & FACTIONS                          │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ Faction / Race     │ Power Type         │ Societal & Military Focus    │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ **Human Empire**   │ Mortal Empire      │ • Ruled by the Human Emperor.│
│ (Velerath)         │                    │ • Driven by Beast Tamers,    │
│                    │                    │   Great Knights & Academies. │
│                    │                    │ • Feudal & meritocratic.     │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ **Elven Empire**   │ Mortal Empire      │ • Ruled by Empress Cyrandel. │
│ (Aeloria)          │                    │ • High Spirit Caller density.│
│                    │                    │ • World Tree & Nature mana.  │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ **The Dragon Race**│ Ancient Apex       │ • Sovereign apex clan.       │
│ (True Dragons)     │ Hegemony           │ • Humanoid forms with horns  │
│                    │                    │   and wings (e.g. Vulcarion).│
│                    │                    │ • Absolute bloodline majesty │
│                    │                    │   over all draconic beasts.  │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ **Abyss Demons**   │ Extradimensional   │ • Invaders from the Abyss.   │
│ (Nether Invaders)  │ Invaders           │ • Infiltrate via Realm Gates │
│                    │                    │   and sacrificial arrays.    │
│                    │                    │ • Feed on negative emotions  │
│                    │                    │   to possess mortal hosts.   │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

#### Major Races & Hierarchy:

1. **Humans:** Diverse potential; heavily reliant on the Beast Hall awakening trials, hunter guilds, and imperial academy leagues.
2. **Elves:** High spiritual resonance, extended lifespan, innate talent for Spirit Calling, and stewardship of ancient World Tree flora.
3. **The Dragon Race (True Dragons & Draconic Hierarchy):**
   - The undisputed apex sovereign race inhabiting isolated high-tier dragon domains and mountainous realms.
   - **Draconic Bloodline Hierarchy:**
     - _Trace Lineage:_ Kobolts and cave lizards (possess faint draconic traits like darkvision, keen smell, pack coordination).
     - _Inferior Draconic Species:_ Drakes and Wyverns (e.g., Pyroclast Drakes, Flame Wyverns like Agnivar/Ashira; possess lesser draconic physique and hoarding instincts).
     - _True Dragons (Apex Sovereigns):_ Massive entities and humanoid draconic warriors (displaying fiery horns and wings). Possess overwhelming physical kinetic power, draconic breath, and crushing bloodline suppression that forces lesser reptiles, drakes, and wyverns to instantly cower in absolute submission.
4. **Abyss Demons (Extradimensional Invaders):**
   - Demons do **not** maintain a terrestrial mortal empire in this world; they are **extradimensional invaders** originating from the Abyss.
   - Infiltrate through dimensional fractures, secret sacrificial altars, and unstable Realm Gates.
   - Feed on negative mental states (despair, wrath, fear) to weaken soul defenses, possess mortal bodies, and incarnate demonic forces into the physical plane.
5. **Dwarves & Beastmen:** Resilient craftspersons, forge masters, miners, and physically formidable auxiliary warriors.
6. **Monstrous Sub-Races:** Goblins, Orcs, and Kobolts (frequently subjugated as heavy labor or hunted as wild pests in border zones).

---

### 8.2 Societal Hierarchy, Feudal Peerage & Nobility

Human society operates under a strict feudal structure where personal combat potential dictates political status:

```
Commoners (No Surname) ──► Knights / Great Knights ──► Barons ──► Viscounts ──► Counts ──► Marquises ──► Dukes ──► The Emperor
```

1. **Commoner Status & Surnames:**
   - Commoners are legally **forbidden from holding surnames** (e.g. Leo starts simply as "Leo").
   - Commoners are treated as second-class citizens, expendable infantry, or manual labor unless they awaken a talent.
2. **Awakening & Social Elevation:**
   - Awakening any Beast Taming or Spirit Calling talent instantly grants **Nobility Status**, the legal right to claim a surname, and tax/military privileges.
3. **Feudal Noble Hierarchy:**
   - **Knights & Knight Commanders:** Martial officers who have reached at least 1★/2★ power and lead garrison forces.
   - **Barons:** Govern border settlements and minor towns (e.g., Baron James over Kendru City).
   - **Viscounts & Counts:** Govern Tier 3 and Tier 4 cities and control regional trading routes (e.g., Count Ember).
   - **Marquises & Dukes:** High nobility commanding provincial capitals, large legions, and regional Beast Halls.
   - **The Emperor / Imperial Royal Family:** Holds apex executive authority, commands the Imperial Guard, finances premier academies, and issues Imperial Edicts.

---

### 8.3 City Structure, Defensive Tiers & Beast Tides

Cities are engineered as defensive fortresses designed to withstand wilderness incursions:

1. **City Defensive Tiers (Tier 1 to Tier 5):**
   - Cities are graded by population size, defensive barrier array potency, and the Star Rank of the governing lord:
     - _Border / Tier 4–5 Cities:_ Guarded by 2★ to 3★ Knight Commanders or Barons. Vulnerable to sudden regional beast swarms.
     - _Main / Tier 1–2 Cities:_ Guarded by 5★ or 6★ powerhouses with layered mana barrier arrays capable of surviving regional calamities.
2. **City Layout & Architecture:**
   - **Perimeter Defense Walls:** Massive reinforced stone and iron-infused walls lined with siege weaponry and tamer lookout towers.
   - **Outer City Quarters:** High-density slums and merchant streets where commoners and unawakened citizens reside.
   - **Inner City & Noble Districts:** Mana-dense, secure zones protected by secondary internal barrier wards housing nobility, guild halls, and high-end alchemical shops.
   - **Central Beast Hall / Awakening Arena:** The civic center where annual talent awakening ceremonies, beast registration, and bounty boards are managed.
3. **Beast Tides / Beast Waves:**
   - Periodic massive stampedes of monsters driven from the wild by territorial shifts, dungeon overflows, or alpha beast commands. If a city wall is breached or its lord falls, the entire settlement can be annihilated overnight.

---

### 8.4 Dimensional Architecture: Secret Realms, Realm Gates & World Mergers

The world's cosmology expands dynamically through dimensional convergence:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   DIMENSIONAL CLASSIFICATIONS                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Dimension Type     │ Environmental & Temporal Rules                    │
├────────────────────┼───────────────────────────────────────────────────┤
│ **Secret Realm**   │ • Pocket dimension that sustains life on its own  │
│                    │   for a limited/extended duration.                │
│                    │ • Accessible via temporal-aligned Realm Gates.    │
├────────────────────┼───────────────────────────────────────────────────┤
│ **Realm Dungeon**  │ • Self-sustaining pocket dimension that sustains  │
│                    │   life permanently with its own internal ecology. │
├────────────────────┼───────────────────────────────────────────────────┤
│ **Natural Dungeon**│ • Monster nexus and resource hub located directly │
│                    │   on the primary mortal plane.                    │
└────────────────────┴───────────────────────────────────────────────────┘
```

1. **Realm Gates & Temporal Alignment:**
   - Realm Gates appear as swirling vortexes of purple spatial energy.
   - _Temporal Synchronization Rule:_ A Realm Gate only opens when the internal time flow of the pocket dimension synchronizes exactly with a fixed temporal point in the outside world (e.g., opening at a precise hour such as 7:00 PM when time flow ratios align).
2. **World Mergers & Dimensional Spawning:**
   - When new races, ancient civilizations, or foreign dimensional fragments join or collide with the world, the planetary reality fractures, spawning new **Pocket Dimensions**, **Secret Realms**, and isolated biomes containing ancient beast bloodlines.
3. **World Cores & World Baptism:**
   - Each race is linked to a **World Core**, the primordial wellspring from which talents, racial authorities, and elemental blessings originate.
   - _World Baptism Threshold:_ When an individual's personal attributes surpass the **10,000 stat point benchmark**, they undergo **World Baptism**, removing mortal restrictions and allowing them to interface directly with their race's World Core as a racial champion/representative.

---

### 8.5 Economy, Currencies & Elements

#### A. Currency Hierarchy

- **1 Gold Coin** = $100$ Silver Coins ($10,000$ Bronze/Copper Coins)
- **1 Silver Coin** = $100$ Bronze / Copper Coins
- **Beast Cores (1★ to 10★):** Universal high-value currency used in high-tier auctions, academy trades, and black markets.

#### B. Elemental Affinities Matrix

```
Shadow ◄────────► Holy / Light
Fire   ◄────────► Water / Ice
Earth  ◄────────► Wind / Thunder
Nature ◄────────► Poison / Decay
Space  ◄────────► Time / Soul
        Draconic (Universal Apex)
```

---

### 8.6 Aurelius Beast Academy: Internal Systems & Territory Management

Aurelius Beast Academy operates not merely as a school, but as a sovereign academic city-state featuring competitive territory management, student-led fiefdoms, and an internal digital economy:

```
┌────────────────────────────────────────────────────────────────────────┐
│             AURELIUS BEAST ACADEMY INTERNAL ARCHITECTURE               │
├────────────────────┬───────────────────────────────────────────────────┤
│ System Pillar      │ Core Mechanics & Rules                            │
├────────────────────┼───────────────────────────────────────────────────┤
│ **Territories**    │ • Personal wilderness fiefs registered by students│
│                    │ • Centered around a vulnerable Territory Beacon.  │
│                    │ • Defended against student raids & beast bounties.│
├────────────────────┼───────────────────────────────────────────────────┤
│ **Prosperity**     │ • Metric determining territory rank & resources.  │
│ **Points**         │ • Gained via farming, population, and defense.    │
│                    │ • Defeating the 1st Ranker grants 10,000 Points!  │
├────────────────────┼───────────────────────────────────────────────────┤
│ **Aurelius Credits**│ • Digital currency (AC) for trading & resources. │
│ **(AC)**           │ • Beast cores converted to AC via fixed rates.    │
│                    │ • Buys teleportation bracelets, scrolls, slaves.  │
├────────────────────┼───────────────────────────────────────────────────┤
│ **Slave Market**   │ • Imperial law: non-humans can only exist as slaves│
│                    │ • Elves & beastmen purchased for territory labor. │
│                    │ • Contracted labor manages farms, mines, and walls│
├────────────────────┼───────────────────────────────────────────────────┤
│ **Mentorship**     │ • High-ranking professors adopt personal disciples│
│                    │ • Unlocks restricted library floors & techniques. │
│                    │ • Advanced Soul Training (e.g. Professor Gunther).│
└────────────────────┴───────────────────────────────────────────────────┘
```

#### A. The Student Territory & Beacon System

1. **Territory Registration:** Students who achieve recognized rank can claim wilderness plots within the academy's massive outer domain to construct private personal fiefdoms.
2. **The Territory Beacon:** The core anchor of every territory. If a rival faction destroys a territory's Beacon during sanctioned bounty events, the territory falls, losing its registered status and accumulated land.
3. **Territory Defense & Population:** Successful territories recruit specialists, non-combatants, and guard beasts (e.g. Leo's territory utilizes Stoneleaf Plum orchards, druidic python traps, golem defenders, and hybrid guard serpents).
4. **Territory Bounties:** Periodic sanctioned academy events where rival territories raid one another. Affiliated members present during successful beacon defense earn **+10 Prosperity Points** each.

#### B. Prosperity Points & Territory Tiers

- **Prosperity Rating:** Determines a territory's official standing, tax discounts, and resource allotments from the academy treasury:
  $$\text{Unranked} \longrightarrow \text{Low-Bronze} \longrightarrow \text{Silver} \longrightarrow \text{Low-Blue} \longrightarrow \text{High-Blue} \longrightarrow \text{Gold Tier}$$
- **Earning Prosperity Points:**
  - Agricultural cultivation (harvesting magic fruit seeds, medicinal herbs, and rare crops).
  - Infrastructure expansion, defensive fortifications, and housing population growth.
  - High-Rank Student Bounties:
    - Defeating the **1st-Ranked Student (Leo)** awards **+10,000 Prosperity Points** (instantly elevates an attacking territory to Low-Blue tier).
    - Defeating the **2nd-Ranked Student (Kaelion)** awards **+9,000 Prosperity Points**.

#### C. Academy Currency: Aurelius Credits (AC)

The academy operates on a digital token economy known as **Aurelius Credits (AC)**:

| Beast Core Grade / Sub-Rank | AC Exchange Rate |
| :-------------------------- | :--------------: |
| **Low 2★ Core**             |     1,000 AC     |
| **Mid 2★ Core**             |     2,000 AC     |
| **High 2★ Core**            |     4,000 AC     |
| **Peak 2★ Core**            |     6,000 AC     |
| **Pseudo 3★ Core**          |     8,000 AC     |
| **Low 3★ Core**             |    10,000 AC     |
| **Mid 3★ Core**             |    20,000 AC     |
| **High 3★ Core**            |    30,000 AC     |
| **Peak 3★ Core**            |    40,000 AC     |

- **Key AC Purchases:**
  - _Emergency Teleportation Bracelet:_ 10,000 AC (1 free personal bracelet given; extra bracelets for beasts or subordinates cost 10,000 AC each).
  - _Inter-City / Remote Teleportation:_ 100,000 AC per transit.

#### D. Slave Market & Non-Human Labor Laws

1. **Imperial Non-Human Decrees:** Under human imperial law, non-humans (Elves, Beastmen, Dwarves, Kobolts) are legally prohibited from roaming freely within the empire as citizens; they can only exist lawfully as **registered slaves**, placing them socially below commoners.
2. **Slave Acquisition & Labor:**
   - Rescued elves and captured non-humans from secret realms or border raids are sold in the academy's Slave Market for AC (prices range from 10,000 AC for unskilled laborers to millions of AC for high-potential elves).
   - Student territories heavily employ non-human slaves for farm labor (e.g. tending magic fruit fields, building fortifications, mining mana stones).
   - Slaves wear mana-suppression collars, but humane treatment in elite student territories (such as Leo's) fosters voluntary loyalty and high productivity.

#### E. Mentorship & Faculty Governance

- **Professor & Disciple Contracts:** Senior faculty (e.g. Professor Brant [Dean], Professor Katherine, Professor Gunther [Soul Specialist]) personally select promising students as direct disciples.
- **Mentorship Privileges:**
  - Access to restricted high-floor library archives (such as the 5th-floor Abyss and Demon codices).
  - Specialized physical and spiritual training (e.g., Gunther's sensory-deprivation waterfall training, forced soul suppression, and _Spiritual Sense_ awakening).
  - Transmission of advanced **Soul Techniques** (e.g., _Soul Concealment_, _Spiritual Sense_, soul-blocking barriers).
  - Immunity against corrupt instructor extortion or noble faction retaliation.

#### F. Student Status & Leaderboard Hierarchy

- **1st-Ranker / Top Ranker Status:** The #1 student on the academy leaderboard holds supreme authority, priority access to secret realm expeditions, leadership over Inter-Academy squads, and special imperial recognition from the Emperor.
- **Meritocracy over Nobility:** While nobles arrive with vast family funds, the academy's open bounty system and leaderboard allow commoner geniuses to dominate territory rankings.

---

### 8.7 Academic Institutions & The Inter-Academy League

The highest tier of martial and magical development occurs within the **Imperial Academies**. Every term, the three sovereign powers compete in the grand **Inter-Academy Competition**, a multi-phase territorial conquest and stronghold-defense war that determines continental funding, World Core access, and prestige.

```
┌────────────────────────────────────────────────────────────────────────┐
│             MAJOR ACADEMIES OF THE THREE SOVEREIGN NATIONS             │
├────────────────────┬──────────────┬────────────────────────────────────┤
│ Academy Name       │ Realm/Empire │ Ranks & Specialization Focus       │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Valencrest**     │ Human        │ • **1st-Ranked Human Academy.**    │
│ Royal Academy      │ (Velerath)   │ • Elite imperial scions, maximum   │
│                    │              │   direct funding from the Emperor. │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Velerath Grand** │ Human        │ • **2nd-Ranked Human Academy.**    │
│ Academy            │ (Velerath)   │ • Focuses on large-scale military  │
│                    │              │   tamer tactics & fortress arrays. │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Aurelius Beast** │ Human        │ • **3rd-Ranked Human Academy.**    │
│ Academy            │ (Velerath)   │ • Leo & Lily's institution. Top-tier│
│                    │              │   Taming, Spirit Calling, and Soul │
│                    │              │   Research (Professors Gunther/    │
│                    │              │   Brant/Katherine).                │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Ardent**         │ Human        │ • **6th-Ranked Human Academy.**    │
│ Sovereign Hall     │ (Velerath)   │ • Martial weapons & offensive      │
│                    │              │   tamer synergy (Crossed Swords).  │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Soul Astra**     │ Human        │ • **7th-Ranked Human Academy.**    │
│ Academy            │ (Velerath)   │ • Recruits talentless youths with  │
│                    │              │   exceptionally high Soul Ranks.   │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Sylvaris Grand** │ Elven        │ • **1st-Ranked Elven Academy.**    │
│ Academy            │ (Aeloria)    │ • Supreme royal elven spirit users │
│                    │              │   backed by Empress Cyrandel.      │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Lunareth**       │ Elven        │ • **3rd-Ranked Elven Academy.**    │
│ Academy            │ (Aeloria)    │ • Lunar spirit arts and celestial  │
│                    │              │   mana manipulation.               │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Evergrove**      │ Elven        │ • **4th-Ranked Elven Academy.**    │
│ Sovereign Academy  │ (Aeloria)    │ • Ancient forest spirits, plant    │
│                    │              │   taming, and terrain mana fields. │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Sunborn**        │ Dragon       │ • **1st-Ranked Dragon Academy.**   │
│ Royal Academy      │ (Sunborn)    │ • Apex draconic scions & True      │
│                    │              │   Dragons (led by Vulcarion).      │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Drakensoul**     │ Dragon       │ • **2nd-Ranked Dragon Academy.**   │
│ Academy            │ (Sunborn)    │ • Red-Flame Dragon lineages and    │
│                    │              │   destructive breath arts.         │
├────────────────────┼──────────────┼────────────────────────────────────┤
│ **Azirith Dragon** │ Dragon       │ • **3rd-Ranked Dragon Academy.**   │
│ Academy            │ (Sunborn)    │ • Heavy defense draconic hybrids   │
│                    │              │   and fortress territorial control.│
└────────────────────┴──────────────┴────────────────────────────────────┘
```

#### Inter-Academy Competition Rules & Phases:

1. **Phase 1 (Elimination Clashes):** Direct confrontations in shifting realm biomes where academies clash to eliminate opposing teams.
2. **Phase 2 (Stronghold Conquest & Leaderboards):** Academies construct defensive strongholds; points are scored by destroying enemy strongholds and claiming their spirit beacons.
3. **Phase 3 (Apex Stronghold Finale):** The final surviving elite academies battle across converged secret realm domains for continental dominion.

---

### 8.7 Hunter Guilds & Wild Danger Classifications

- **Beast Tamer Associations / Hunter Guilds:** Administer hunting licences, manage bounty commissions, and categorize wilderness zones:
  - **Safe Zones:** Fortified city perimeters protected by patrol knights.
  - **Green Zones:** Low 1★ to Mid 1★ beast populations suitable for novice tamers.
  - **Yellow Zones:** High 1★ to Low 2★ predator habitats requiring organized parties.
  - **Red Zones:** High 2★ to Peak 3★ Calamity beast domains; requires elite academy squads or Knight Commanders.
  - **Black Zones:** Unexplored rift valleys, 4★+ Lord/Monarch habitats, and active Demon/Abyss infiltration hotspots.

---

## 9. Canon Bestiary Reference (Story Companions)

### 1. Shyra (Obsidian Panther Cub $\longrightarrow$ Shadow Panther)

- **Lineage:** Obsidian Panther Line _(Noble Bloodline)_
- **Current Rank:** High 2★ (Starting: Low 1★)
- **Bloodline Potential:** ★★★★★★ (6★, rare chance of 7★)
- **Bond:** Chain Bond $\to$ Blood Bond $\to$ Soul Bond (100%)
- **Specialties:**
  - _Obsidian Hide:_ Extreme physical damage mitigation and blade deflection.
  - _Feline Agility:_ Superior balance, reflex speed, and spatial reaction.
  - _Explosive Power:_ Sudden bursts of lethal physical kinetic force.
  - _Silent Predator:_ Natural optical and acoustic stealth.
- **Skills:** `[Stealth]` (Master), `[Shadow Strike]`, `[Critical Strike]`.

---

### 2. Primordial Dryad

- **Lineage:** Primordial Grove Line _(Royal Bloodline)_
- **Current Rank:** High 2★
- **Bloodline Potential:** ★★★★★★★★ (8★ Potential)
- **Bond:** Direct Blood Bond from birth $\to$ Soul Bond
- **Specialties:**
  - _Fast Regeneration:_ Constantly heals physical/spiritual wounds using ambient mana.
  - _Tough Body:_ Bark skin immune to elemental erosion and physical slicing.
  - _Half-Spirit:_ Immune to toxins, paralysis, and soul-based curses.
  - _High Mana Regeneration:_ Rapid environmental mana drawing.
- **Unique Produce:** _Dryad Soul Petals_ (can be consumed by tamers to ascend their Soul Rank).

---

### 3. Agnivar (Flame Wyvern - Male)

- **Lineage:** Hoarding Wyvern _(Super Bloodline - 76% Purity)_
- **Current Rank:** Peak 2★
- **Bloodline Potential:** ★★★★★★ (6★ Potential)
- **Bond:** Soul Bond
- **Specialties:**
  - _Lesser Draconic Physique:_ Massive natural muscle density and scale durability.
  - _Infernal Core:_ Converts ambient energy into concentrated draconic fire.
  - _Lesser Dragon Soul:_ Natural resistance to fear, illusions, and mental curses.
  - _Lesser Draconic Majesty:_ Passive fear and oppression aura on lower bloodlines.
  - _Draconic Wisdom:_ Accelerated tactical comprehension and learning.
- **Skills:** `[Inferno Breath]` (Intermediate), `[Magma Claw]`.

---

### 4. Ashira (Flame Wyvern - Female)

- **Lineage:** Hoarding Wyvern _(Super Bloodline - 76% Purity)_
- **Current Rank:** High 2★
- **Bloodline Potential:** ★★★★★ (5★, rare 6★)
- **Bond:** Chain Bond (68%)
- **Innate Talent:** `[Cradle of Cinders]` (6★ Support Aura)
- **Specialties:** _Lesser Draconic Physique, Infernal Core, Lesser Draconic Circulation, Draconic Wisdom_.
- **Skills:** `[Inferno Breath]` (Low).

---

### 5. Krik (Kobolt)

- **Lineage:** Ordinary Bloodline (35% Purity) with `[Faint Draconic Bloodline]`
- **Current Rank:** Low 1★
- **Bloodline Potential:** ★ (Rare chance of 2★)
- **Bond:** Chain Bond (31%)
- **Specialties:** _Darkvision, Keen Smell, Pack Instinct, Faint Draconic Bloodline_.

---

### 6. Lily's Contracted Spirits

- **Talent:** `[Spirit Caller]` (8★)
- **Key Spirits:** _Windbreath Hound Spirit_, _Wolf Spirits_.
- **Passive Synergies:** Grants Lily **+50% of the Spirits' physical stats** (`VIT`, `STR`, `AGI`, `STA`) and **+100% of the Spirits' Intelligence**, creating a massive personal mana reserve.

---

## 10. Companion App Data Architecture & Schemas

The following TypeScript schemas represent the exact data models required to build a full-featured companion app based on these mechanics.

---

_Document compiled and structured for the Absolute Beast Dominion Companion App project._
