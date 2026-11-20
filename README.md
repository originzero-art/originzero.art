# originZero.Art

> **Curated Creator Platform & Sovereign Infrastructure for Human Creators**  
> An independent open-source initiative defending human painters, visual identity designers, and artisans from unconsented model extraction and algorithmic devaluation.

- **Live Platform:** [https://originzero.art](https://originzero.art)
- **Open Governance & Commons:** [https://originzero.art/commons](https://originzero.art/commons)
- **Organization Repositories:** [https://github.com/originzero-art](https://github.com/originzero-art)

---

## 1. Architectural Stack & Dual OSI Licensing

originZero.Art operates across three modular layers governed by Open Source Initiative (OSI) approved licenses tailored to their operational roles:

```text
+------------------------------------------------------------------------+
| Layer 3: Curated Creator Platform (originzero.art)                     |
| Public exhibition platform, zero sales commission, direct contact      |
| License: Apache License 2.0                                            |
+------------------------------------------------------------------------+
| Layer 2: Sovereign Creator Licensing & Provenance Specifications       |
| Machine-readable terms, portfolio defense metadata, C2PA declarations  |
| License: Apache License 2.0                                            |
+------------------------------------------------------------------------+
| Layer 1: zero-origin Edge Shield                                       |
| Self-hosted L7 reverse proxy & automated crawler mitigation engine     |
| License: GNU Affero General Public License v3.0 (AGPLv3)               |
+------------------------------------------------------------------------+
```

### Module License Demarcation
- **Apache License 2.0 (`LICENSE`):** Governs this repository (`originzero.art`), including the public web platform interface, the **Layer 2 Sovereign Creator Licensing specifications**, machine-readable portfolio policies, metadata schemas, and documentation. This ensures frictionless adoption across independent galleries, cultural institutions, and creator websites.
- **GNU Affero General Public License v3.0 / AGPLv3:** Governs the **Layer 1 `zero-origin` Edge Shield engine** (the self-hosted reverse proxy that intercepts unconsented training scrapers and cryptographically asserts human authorship). AGPLv3 guarantees that any network-accessible deployment or cloud service enhancing the defensive shield must publish its source code to the public commons.

---

## 2. Architectural Boundary: Open-Source Protocol vs. Private Artist Subdomains

originZero.Art enforces a strict, unambiguous boundary between the public open-source infrastructure and private or managed artist environments:

### 2.1 What IS Open Source (`github.com/originzero-art`)
- **`zero-origin` Standalone Edge Shield:** Reverse-proxy crawler mitigation engine, TLS fingerprinting, and local C2PA cryptographic provenance daemon (**GNU AGPLv3**, with copyright/CLA retained by the founder to permit commercial dual-licensing).
- **Sovereign Creator Licensing Protocol:** Open machine-readable creator autonomy specifications, TDM reservation headers (`ai.txt`, RFC 8288 Link headers), and manifest verification schemas (**Apache License 2.0**).
- **Public Governance & Platform Frontend:** Static web platform code and public documentation for the root domain `originzero.art` (**Apache License 2.0**).

### 2.2 What is STRICTLY PRIVATE & PROPRIETARY (Closed Source)
- **Creator Portfolios & Original Artwork:** 100% exclusive copyright and moral rights to all paintings, illustrations, visual identity marks, logos, and high-resolution assets hosted across the platform are strictly retained by each respective human creator.
- **Dedicated & Leased Artist Subdomains (`*.originzero.art`):** Dedicated artist spaces (such as `757.originzero.art`, `spartan.originzero.art`, `crimadezignz.originzero.art`) and future leased studio subdomains, including bespoke gallery templates, multi-tenant provisioning, billing, and Done-For-You hosting infrastructure, operate independently as closed-source proprietary systems.
- **Decoupled L7 Edge Operation:** `zero-origin` operates strictly as a decoupled Layer-7 edge proxy and provenance signer in front of web origins. Downstream creator websites, bespoke backends, and leased subdomains remain completely independent, modular, and closed-source.

---

## 3. Core Pillars

1. **Network Protection & Cryptographic Provenance (`zero-origin` / AGPLv3):** Intercepts automated training crawlers at the network layer and attaches C2PA-compatible cryptographic signatures of human provenance.
2. **Sovereign Creator Licensing (Apache 2.0):** Machine-readable rights assertions enabling artists to maintain legal autonomy and legally withhold training consent without forfeiting public discoverability.
3. **Living Creative Space:** A quiet, ad-free, algorithm-free web environment for independent creators to present original work directly to collectors with 0% platform sales fees.
4. **Transparent Governance:** Transitioning to public-ledger fiscal hosting via Open Collective Europe, with audited technical operations under European regulations.

---

## 4. Community & Economic Model

- **0% Platform Sales Commission:** Private transactions occur directly between artist and collector.
- **Transparent Public Ledger Distribution:**
  - **50% - Community Stipends & Commissions:** Distributed among active creators on the platform (excluding the donor).
  - **20% - Emerging Voices:** Dedicated to welcoming and supporting promising new artists, guided by community input.
  - **30% - Infrastructure & Engineering:** Sustaining servers, cryptographic services, edge protection, domain infrastructure, and lawful operations.

---

## 5. Local Development

The web platform frontend is built with vanilla semantic HTML5, modern CSS custom properties, and accessible vanilla JavaScript, ensuring zero build lock-in and instant static serving.

```bash
# Clone the repository
git clone https://github.com/originzero-art/originzero.art.git
cd originzero.art

# Start a local static HTTP server
python3 -m http.server 3000
```

Visit `http://localhost:3000` to preview the local environment.

---

## 6. Contact & Security

- **Official Inquiries:** [contact@originzero.art](mailto:contact@originzero.art)
- **Lead Architect:** Sebastian Paul Banszky ([banszky.men](https://banszky.men))
- **Security Disclosures:** Please send encrypted vulnerability reports to `contact@originzero.art`.

---

## 7. License

This repository is licensed under the [Apache License, Version 2.0](LICENSE).
