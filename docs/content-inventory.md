# SUKAYA Content Inventory — Phase 1 (Pre-Design)

**Status: DRAFT — awaiting approval. No visual/UI implementation has begun.**

**Source of truth:** `docs/sukaya-content.pdf` (20 pages, screenshots + product data exported from the live sukaya.com.au site and supplied by the client). Every fact below is transcribed from that PDF. Nothing here has been invented, paraphrased into new marketing copy, or supplemented from outside knowledge. Where the PDF did not contain something, it is listed under Section 6 (Verification Needed) rather than filled in.

Repository note: this repository had no prior commits and no `PROJECT_BRIEF.md`. The refurbishment brief was supplied as the task instructions rather than as a committed file — flagged in Section 6.

---

## 1. Content Inventory

### 1.1 Brand
- **Name:** SUKAYA
- **Tagline (logo lockup):** "Embrace The Beauty Naturally"
- **Location:** Melbourne VIC, Australia
- **Contact email:** enquiries@sukaya.com.au
- **Copyright line:** "Copyright © 2025 SUKAYA - All Rights Reserved"

### 1.2 Homepage — "About Sukaya"
**Our Philosophy** (verbatim):
> "At Sukaya, we believe in the power of nature. Our Hand crafted skincare products are designed to be natural, minimalistic, and potent. Our goal is to offer high-quality, natural, and organic skincare products without the unnecessary luxury price tags. Our Multitasking products are designed to streamline your routine while delivering real, effective skincare. We don't use harmful ingredients like parabens, phenoxyethanol, phthalates, propylene glycol, DEA,MEA,BHT, TEA etc. Our products are waterless & preservative free."

**Our Commitment** (verbatim):
> "At Sukaya, we prioritize the health of your skin while making your routine as easy, effective and enjoyable as possible. At the heart of our formulas are nature's most refined nutrients — untouched by synthetics and chosen for their potency and purity. Each application becomes more than skincare: it is a ritual of restoration, where vitality, balance, and timeless radiance are revealed. Most skincare products are 80% water but ours is 0%. That means our products are packed with 5x more vitamins, antioxidants, and essential fatty acids — giving your skin pure nourishment with less product, less waste, and more results."

### 1.3 Homepage — "Aromatherapy & Skincare"
> "Beyond simplicity, we also aim to incorporate aromatherapy into our products to enhance both your skincare regimen and overall well-being. Our founder, who has completed an Aromatherapy Practitioner Certificate including Specialist Certificate for Rejuvenating Skincare at the Australian College of Aromatherapy, understands the delicate balance of essential oils in skincare. Each essential oil is chosen with care, in precise & safe amounts, to deliver its unique benefits — nourishing your skin while uplifting your senses. Our facial products contain less than 1% essential oils, while body products use up to 2%. This careful balance ensures every formula is both safe and effective — delivering benefits without the risk of skin sensitisation."

Note: founder is referenced but **not named** anywhere in the supplied material.

### 1.4 Homepage — Hero Banner
A hero/carousel banner is present (`docs/assets/reference` extraction `img-001-000`, embedded in page 1 of the PDF) showing the product range against a dark background, with a "SHOP NOW" button. The banner's headline and subheadline text is present but rendered too small/low-resolution in the source screenshot to transcribe reliably — **flagged in Section 6, not guessed.**

### 1.5 Navigation (as visible in source)
Only visible in the hero screenshot header: **HOME**, **SHOP**, plus search and cart icons. No other nav items are visible in the supplied material. About/Aromatherapy/Contact/Subscribe appear to be **homepage sections**, not separate nav-level pages — flagged for confirmation in Section 6.

### 1.6 Gallery section
Heading: **"Explore Our Stunning Range Of Natural Beauty"** — a photo carousel of lifestyle/ingredient imagery (florals, raw ingredients, product jars). Six thumbnail dots are visible in the source (indicating 6 slides); only some frames are captured in the PDF (see Section 3, Image Inventory).

### 1.7 Contact Us
- Heading: "Contact Us" / "Questions or Comments"
- Body copy: "Are you looking for a specific item? Do you need recommendations? Do you have any Questions? Send us a message, and we will get back to you soon!"
- Address block: "SUKAYA / Melbourne VIC, Australia"
- Email: enquiries@sukaya.com.au
- An embedded Google Map centered on Melbourne CBD (a pin, not a street address — exact street address is not given anywhere in the PDF).

### 1.8 Newsletter / Subscribe
- Heading: "Subscribe"
- Field: "Email Address" + "Sign Up" button
- Incentive copy: "Get 10% off your first purchase when you sign up for our newsletter!"

### 1.9 Footer
- "Copyright © 2025 SUKAYA - All Rights Reserved"
- "Powered by" (platform name not legible/visible in source — likely a website-builder attribution that shouldn't be replicated on a rebuilt site regardless)
- Links present: **Privacy Policy**, **Terms and Conditions** (link labels only — **no policy body text supplied**, see Section 6)
- A banner reading: **"New services are coming soon!"**

### 1.10 Testimonials / Reviews / Certifications / Awards
**None present anywhere in the supplied PDF.** No customer quotes, review counts, star ratings, award badges, or certification logos appear. Ingredient callouts use a footnote marker (`^`) meaning "Certified Organic, Organic or Wild-Harvested" — this is an ingredient-sourcing note, not a product certification claim, and is the only certification-adjacent language present.

---

## 2. Product Inventory

10 distinct products/product groups were found. Prices are as printed (AUD). All copy is verbatim from the PDF — nothing paraphrased.

### Quick-reference table

| # | Product | Price (A$) | Size | Variants |
|---|---|---|---|---|
| 1 | Cleanser Exfoliator Mask – Pink Blush | 31.99 | 40 gm | — |
| 2 | Super Fruits Face Elixir | 36.99 | 30 ml | — |
| 3 | Berry Light Soothe Serum | 36.99 | 30 ml | — |
| 4 | Body Oils | 31.99 | *not specified — see Section 6* | Calming Body Oil / Uplifting Body Oil |
| 5 | Body Butters | 31.99 | 80 ml | Original Body Butter / Calming Body Butter |
| 6 | Patchouli Face Cleansing Oil | 31.99 | 50 ml | — |
| 7 | All in One Lavender Balm | 26.99 | 40 ml | — |
| 8 | Trial Collection (bundle) | ~~19.99~~ **15.99** (save $4.00 / 20%) | sample sizes | — |
| 9 | Geranium Lip Balm | From 5.99 | Tube 5 ml / Tin 10 ml | Size select: 5 ML / 10 ML |
| 10 | Rosewood Spoon (Handcrafted) | 2.99 | — | — |

---

### 2.1 Cleanser Exfoliator Mask – Pink Blush — A$31.99 (40 gm)
**Headline:** Detoxify, Brighten and Nourish

**Description:** "Our Pink Blush Cleanser Exfoliator Mask (40 gm) is a multi-functional 3-in-1 product designed to cleanse, exfoliate, and nourish your skin. This gentle yet effective formula brightens, soothes, and replenishes the skin with powerful antioxidants, enzymes, vitamins, and minerals, giving you a smooth, radiant complexion. Key ingredients like Hibiscus Powder (nature's botox) contains AHAs for exfoliation, Colloidal Oatmeal to hydrate and soothe, and Manuka Honey for its antimicrobial properties come together to deliver natural nourishment. Australian Pink Clay, Zeolite Minerals, and Rice Flour work together to purify and detoxify, leaving your skin refreshed and glowing. For extra hydration, simply add a few drops of our oil serum to the mask mixture to provide deep nourishment for dry skin."

**What It Does:**
- Gently exfoliates to promote skin renewal
- Hydrates and nourishes with natural enzymes and antioxidants
- Soothes irritation and reduces inflammation
- Brightens skin and enhances collagen production
- Detoxifies and purifies skin for a radiant glow

**Ingredients:**
- Australian Pink Clay – Purifies and detoxifies while providing gentle exfoliation
- Colloidal Oatmeal – Draws moisture into the skin and soothes irritation with anti-inflammatory properties
- Rice Flour – Gently exfoliates, removing dead skin cells for a smooth complexion
- Zeolite Mineral Clay – A natural detoxifier that absorbs impurities from the skin
- Aloe Vera Powder – Hydrates, soothes, and promotes skin healing
- Hibiscus Powder – Contains AHAs that exfoliate and support collagen production, known as nature's botox
- Manuka Honey Powder – Known for its antimicrobial and healing properties
- Papaya Powder – Contains enzymes that help dissolve dead skin cells for a fresh, glowing appearance
- Pineapple Powder – Packed with enzymes to brighten and exfoliate the skin

**Skin Type:** Suitable for all skin types, especially those in need of gentle exfoliation and nourishment.

**Aroma & Texture:** A soft powder with a slightly gritty texture and a natural floral aroma from hibiscus and clay.

**How to Use:** As a Cleanser & Exfoliator: Mix ¼ to ½ tsp of powder with a little water to apply on wet skin. Gently massage in circular motions and rinse off to cleanse and exfoliate. As a Mask: Mix 1 tsp or required amount of powder with water or rose water or yoghurt to form a paste. Apply to the face and neck, leave on for 5–10 minutes, then rinse off. For extra dry skin, mix a few drops of any of our oil serums into the paste before applying for added nourishment.

**Safety Notes:** Always perform a patch test before use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult a doctor before use.

*(This product's full detail appears twice in the source PDF — pages 3–4 and pages 13–14 — and is word-for-word identical both times, so there is no conflict to flag.)*

---

### 2.2 Body Oils — A$31.99 (fragrance select: Calming / Uplifting)

#### Calming Body Oil
**Tagline:** Nourish, Hydrate, Soothe

**Description:** "Treat your skin to the ultimate relaxation and hydration with our Calming Body Oil. A luxurious blend of six organic oils — sesame, almond, apricot, camellia, jojoba, and macadamia — deeply nourishes and hydrates the skin, leaving it soft, supple, and beautifully moisturized. Rich in phytonutrients, omega-6 fatty acids, and anti-inflammatory properties, this non-greasy oil provides long-lasting hydration and a calming sensation for your skin. Infused with organic lavender, bergamot, and patchouli essential oils, this body oil not only nourishes but also calms and soothes the senses, promoting relaxation and unwinding after a long day."

**Key Benefits:**
- Deeply Nourishing & Hydrating: Leaves skin soft, supple, and moisturized
- Calming & Relaxing: Helps unwind with soothing essential oils
- Anti-inflammatory: Rich in omega-6 fatty acids to calm irritated or dry skin

**Ingredients & Their Benefits:**
- Sesame Oil^ – Moisturizes and protects the skin, rich in antioxidants and essential fatty acids
- Almond Oil^ – Softens and nourishes the skin with vitamins and minerals
- Apricot Oil^ – Hydrates and revitalizes, helping to restore skin elasticity
- Camellia Oil^ – High in antioxidants, promotes smooth, healthy-looking skin
- Jojoba Oil^ – Hydrates and balances skin while supporting the skin's natural barrier
- Macadamia Oil^ – Rich in fatty acids, it helps repair and protect dry skin
- Vitamin E – Provides antioxidant protection and supports skin repair
- Lavender Essential Oil^ – Calms and soothes, promoting relaxation
- Bergamot Essential Oil^ – Uplifts mood and helps with stress relief
- Patchouli Essential Oil^ – Soothes and balances, calming the skin and senses
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Suitable for all skin types, especially dry or sensitive skin in need of hydration and relaxation.

**Aroma & Texture:** A smooth, non-greasy oil that absorbs easily into the skin, leaving a floral, citrus, and woody fragrance from the blend of lavender, bergamot, and patchouli.

**How to Use:** Take the desired amount of oil and massage it into the skin, focusing on dry or rough areas. For best results, apply after showering to lock in moisture. Reapply as needed to any part of the body that feels dry or in need of extra hydration.

**Safety Notes:** Perform a patch test before use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.

#### Uplifting Body Oil
**Tagline:** Nourish, Hydrate, Energize

**Description:** "Infuse your skin with the uplifting benefits of our Uplifting Body Oil, a rich yet non-greasy blend of six organic oils — sesame, almond, apricot, camellia, jojoba, and macadamia. This luxurious oil deeply nourishes and hydrates, leaving your skin feeling soft, supple, and beautifully moisturized. Packed with phytonutrients, omega-6 fatty acids, and anti-inflammatory properties, it provides lasting hydration and helps calm dry or irritated skin. The refreshing combination of sweet orange, palmarosa, and ylang ylang essential oils energizes and uplifts the senses, helping to balance and restore your mood while enhancing the feeling of well-being."

**Key Benefits:**
- Deep Hydration: Moisturizes and softens, leaving skin feeling silky smooth
- Nourishing: Packed with essential fatty acids and antioxidants to support healthy skin
- Energizing & Uplifting: The refreshing blend of essential oils boosts mood and refreshes the senses

**Ingredients & Their Benefits:**
- Sesame Oil^ – Deeply nourishes, rich in antioxidants, and promotes skin elasticity
- Almond Oil^ – Softens and nourishes, packed with vitamins and minerals
- Apricot Oil^ – Hydrates and revitalizes, helping to restore skin's smoothness
- Camellia Oil^ – A lightweight oil high in antioxidants, perfect for keeping skin soft and radiant
- Jojoba Oil^ – Balances moisture levels while supporting the skin's natural barrier
- Macadamia Oil^ – Rich in omega-7 and fatty acids, it helps protect and hydrate dry skin
- Vitamin E – Offers antioxidant protection and supports skin repair
- Sweet Orange Essential Oil^ – Energizing and uplifting, refreshes the mind and body
- Palmarosa Essential Oil^ – Balances and hydrates, restoring skin's natural glow
- Ylang Ylang Essential Oil^ – Uplifts and calms, promoting relaxation and mental clarity
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Suitable for all skin types, especially dry or stressed skin in need of nourishment and mood-lifting care.

**Aroma & Texture:** A smooth, lightweight oil with a refreshing floral and citrus fragrance from sweet orange, palmarosa, and ylang ylang — perfect for uplifting both your skin and your senses.

**How to Use:** Massage a generous amount of oil into your skin, focusing on dry or rough areas. For best results, apply after showering to lock in moisture. Reapply as needed to areas of the body that need extra hydration.

**Safety Notes:** Conduct a patch test before use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.

*Fill size in ml is not stated for Body Oils anywhere in the PDF — flagged in Section 6.*

---

### 2.3 Super Fruits Face Elixir — A$36.99 (30 ml)
**Tagline:** Restore, Repair & Hydrate for Glowing, Nourished Skin

**Description:** "Pamper your skin with the luxurious Super Fruit Facial Elixir (30ml), a deeply nourishing blend of 6 premium oils and 3 potent CO₂ extracts. This non-greasy, ultra-hydrating elixir is packed with vitamins, antioxidants, beta-carotene, and omega 2-3-5-6-7-9, making it ideal for even the most sensitive skin. Formulated without essential oils, it gently restores and protects, promoting collagen production, cellular regeneration, and skin elasticity. The vibrant orange hue comes from the high carotenoid content in Buriti oil, Seabuckthorn Pulp CO₂, and Rosehip CO₂, which work together to provide anti-inflammatory and anti-aging benefits. Whether you're looking to repair skin barriers, reduce fine lines, or boost radiance, this elixir will leave your skin soft, supple, and beautifully hydrated."

**What It Does:**
- Restores and repairs skin barrier
- Deeply hydrates and locks in moisture
- Boosts skin elasticity and collagen production
- Reduces the appearance of scars, wrinkles, and fine lines
- Promotes cellular regeneration, increases radiance and smoothness

**Ingredients (with Benefits):**
- Jojoba Oil^ – Balances skin's natural oils and deeply hydrates
- Camellia Oil^ – Soothes and provides intense moisture while preventing premature aging
- Argan Oil^ – Rich in vitamin E and antioxidants; helps repair and protect skin
- Chia Seed Oil – Deeply nourishing, rich in omega-3 and antioxidants
- Apple Seed Oil – Provides hydration and helps brighten skin with natural fruit acids
- Seabuckthorn Pulp CO₂ Extract^ – Full of beta-carotene and vitamin C to regenerate and repair skin
- Rosehip CO₂ Extract^ – Helps fade scars and improve skin texture
- Pomegranate CO₂ Extract – Rich in antioxidants, fights signs of aging and promotes collagen production
- Buriti Oil – High in carotenoids, promoting skin elasticity, protection, and radiance
- Vitamin E – Helps reduce scars and protects the skin from environmental stressors
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Normal, Dry, Combination, Aging/Mature, and Sensitive Skin

**Aroma & Texture:** A light to medium-weight oil with a natural fragrance, primarily from Rosehip, Apple Seed Oil and Pomegranate CO₂ Extract.

**How to Use:** Apply 3–5 drops (or half to one pump) to cleansed skin. Massage gently into your face and neck, both morning and night.

**Safety Notes:** Always perform a patch test before use. Discontinue if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.

---

### 2.4 Berry Light Soothe Serum — A$36.99 (30 ml)
**Description:** "Rejuvenate, Balance & Protect Your Skin — This lightweight, fast-absorbing oil serum is your go-to solution for glowing, healthy skin. Infused with a powerful blend of 8 non-comedogenic oils and 2 essential oils, it's packed with antioxidants, vitamins, and omegas to nurture and protect your skin. Berry Light Soothe Serum (30 ml) helps restore your skin's balance, reduce inflammation, and fight environmental stressors, leaving your skin plump, smooth, and visibly rejuvenated. Its anti-inflammatory and anti-aging properties promote cell regeneration, brighten complexion, and help reduce breakouts, fine lines, and scars."

**What It Does:** Hydrates and softens skin. Increases skin elasticity. Reduces fine lines, scars, and inflammation. Tightens and firms the skin. Balances skin and reduces breakouts. Protects against environmental damage.

**Ingredients (with Benefits):**
- Jojoba Oil^ – Balances skin's natural oils and deeply hydrates
- Acai Berry Seed Oil – Packed with antioxidants; rejuvenates and protects skin
- Strawberry Seed Oil – Rich in vitamin C, brightens and fights signs of aging
- Red Raspberry Seed Oil – Calms and soothes inflammation, rich in omega-3 and omega-6
- Squalane – It has the ability to boost skin elasticity
- Fractionated Coconut Oil^ – Lightweight and hydrating, absorbs easily
- Indian Gooseberry (Amla) Seed Oil – High in vitamin C; promotes skin regeneration
- Chia Seed Oil – Boosts hydration and helps reduce inflammation
- Sensolene (Olive derived) – It retains hydration and improves skin's barrier function
- Grapeseed Oil^ – Full of antioxidants; repairs and nourishes skin
- Vitamin E – Protects skin, helps reduce scars and stretch marks
- Essential Oils of Organic Geranium^ & Organic German Chamomile^ – Calm, balance, and soothe the skin
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Suitable for most skin types.

**Aroma & Texture:** A very light to lightweight oil with a delicate, fruity-floral fragrance from acai berry, strawberry seed oil, geranium, and chamomile.

**How to Use:** Apply 3–5 drops (or half to one pump) to cleansed skin. Massage gently into face and neck. Can be used both morning and night.

**Safety Notes:** Always perform a patch test before full use. Discontinue if irritation occurs. Contains essential oils in a concentration of less than 0.5%. If pregnant or under medical care for skin conditions, consult with a doctor before use.

---

### 2.5 Body Butters — A$31.99 (fragrance select: Original / Calming, 80 ml)

#### Original Body Butter
**Tagline:** Soothing, Healing & Hydrating — Rich in Vitamins, Antioxidants & Anti-Inflammatory Properties. Free from Essential Oils - Safe for Sensitive Skin & Babies. More than 90% certified Organic ingredients used.

**Description:** "Indulge in the nurturing care of our Original Body Butter (80 ml), specially formulated to hydrate, repair, and soothe dry and sensitive skin. Packed with Unrefined Shea Butter, Cocoa butter, and a blend of nourishing oils, it provides deep moisture without irritation. This rich, soothing butter is free from essential oils, making it ideal for those with sensitive skin, as well as safe for babies and young children. With the healing power of Calendula and Aloe infused oils, and the restorative benefits of Hemp seed and Camellia seed oils, this body butter works to nourish, protect, and soften skin while calming any irritation."

**Key Benefits:**
- Gentle & Soothing: No essential oils make this perfect for sensitive skin and safe for babies
- Healing & Repairing: Calendula and aloe oils help to calm and heal skin
- Deep Hydration: Shea butter and cocoa butter provide long-lasting moisture
- Rich in Nutrients: Packed with vitamins, antioxidants, and essential fatty acids to protect and restore skin
- Anti-Inflammatory: Helps reduce redness and irritation for smoother, healthier skin

**Ingredients & Their Benefits:**
- Unrefined Shea Butter^ – Rich in vitamins A, E, and F, it deeply hydrates and heals dry skin
- Cocoa Butter^ – High in antioxidants, it helps soothe and nourish, improving skin elasticity
- Jojoba Oil^ – A natural moisturizer that mimics skin's natural oils, leaving skin soft without clogging pores
- Calendula Infused in Olive^ & Glycine Soja Oil – Known for its healing properties, it calms inflammation and promotes skin repair
- Hemp Seed Oil^ – Rich in omega-3 and omega-6 fatty acids, it nourishes and balances the skin
- Aloe Infused in Sunflower Oil – Moisturizes and soothes irritated skin, providing hydration and calm
- Camellia Seed Oil^ – Lightweight and nourishing, it enhances skin elasticity and provides deep hydration
- Vitamin E – A potent antioxidant that protects against environmental stressors and supports skin regeneration
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Perfect for all skin types, especially sensitive skin, and suitable for babies and young children.

**Aroma & Texture:** A rich, creamy texture that absorbs easily into the skin, leaving it soft and deeply hydrated. It has a mild, natural scent from its nourishing ingredients, making it ideal for those sensitive to strong fragrances.

**How to Use:** Apply and massage gently into dry skin as needed for hydration. Focus on areas that need extra care, such as elbows, knees, and feet. Always use dry, clean fingers or a spatula to scoop out the product. A little goes a long way, so use sparingly.

**Safety Notes:** Perform a patch test before first use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult a doctor before use.

#### Calming Body Butter
**Tagline:** Nourish, Hydrate, Soothe — Rich in Vitamins & Antioxidants

**Description:** "Indulge your skin with our Calming Body Butter (80ml), a luxurious, deeply hydrating formula designed to nourish and restore dry, dehydrated skin. Enriched with Unrefined Shea Butter, Mango Butter, and a blend of nourishing organic oils such as Camellia, Almond, Argan, and Jojoba, this body butter provides essential vitamins, antioxidants, and fatty acids to soften and soothe the skin. The infusion of Lavender, Bergamot, and Patchouli essential oils creates a calming and soothing experience, promoting relaxation while leaving your skin deeply moisturized and revitalized."

**Key Benefits:**
- Deep Hydration: Rich, concentrated formula that deeply nourishes and softens skin
- Vitamins & Antioxidants: Packed with skin-loving nutrients to protect and revitalize
- Calming & Soothing: Lavender, bergamot, and patchouli essential oils relax and calm the senses

**Ingredients & Their Benefits:**
- Unrefined Shea Butter^ – Intense moisture and healing properties for dry, rough skin
- Mango Butter^ – Rich in antioxidants, it helps improve skin elasticity and moisture retention
- Camellia Oil^ – Lightweight and nourishing, it restores smoothness and protects the skin
- Almond Oil^ – Softens and hydrates, packed with vitamins and essential fatty acids
- Argan Oil^ – Rich in vitamin E and essential fatty acids, it rejuvenates and balances the skin
- Jojoba Oil^ – Moisturizes and soothes, mimicking the skin's natural oils for a healthy glow
- Aloe Infused in Sunflower Oil – Hydrates and calms irritated skin while providing antioxidants
- Vitamin E – Supports skin repair and provides antioxidant protection
- Lavender Essential Oil^ – Calms and soothes both the skin and senses
- Bergamot Essential Oil^ – Uplifts mood and helps relieve tension
- Patchouli Essential Oil^ – Soothes and balances, leaving a calming fragrance
- (^Certified Organic or Wild-Harvested)

**Skin Type:** Suitable for all skin types, particularly dry or sensitive skin in need of deep hydration and soothing care.

**Aroma & Texture:** A rich, creamy butter that melts into the skin with a calming floral, citrus, and earthy fragrance from lavender, bergamot, and patchouli essential oils.

**How to Use:** Apply and massage into dry, clean skin as needed for hydration. For best results, use after a shower to lock in moisture. A little goes a long way — use sparingly as this is a rich, concentrated product.

**Safety Notes:** Always use dry and clean fingers or a spatula to take out the product. Perform a patch test before first use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.

---

### 2.6 Patchouli Face Cleansing Oil — A$31.99 (50 ml)
**Tagline:** A Gentle, Hydrating Cleanse for Soft, Nourished Skin

**Description:** "Experience the most soothing way to cleanse your skin with our Patchouli Face Cleansing Oil (50 ml). Using the oil cleansing method, this formula effectively removes makeup, dirt, impurities, and excess sebum while leaving your skin soft, smooth, and hydrated. We've carefully chosen a blend of nourishing oils, including Castor Oil, which penetrates deeply into pores to cleanse them, along with Sesame, Jojoba, Grapeseed, and Apricot Oil to hydrate and restore the skin's natural balance. To enhance the experience, we've infused this cleanser with Patchouli, Lavender, Sweet Orange, and Palmarosa essential oils (less than 1%)— each contributing their own unique benefits for your skin, from calming inflammation to improving skin tone."

**What It Does:** Gently cleanses and removes makeup, dirt, and impurities. Deeply hydrates and nourishes the skin. Balances and softens, leaving skin smooth and glowing. Helps promote a calm, even skin tone.

**Ingredients (with Benefits):**
- Castor Oil^ – Deeply penetrates to clean pores and remove impurities
- Aloe Vera Infused in Sunflower Oil – Soothes, hydrates, and calms inflammation
- Sesame Oil^ – Rich in antioxidants, hydrates and promotes skin elasticity
- Grapeseed Oil^ – Light yet nourishing, rich in vitamins and antioxidants
- Jojoba Oil^ – Balances the skin's natural oils and supports hydration
- Apricot Oil^ – Softens and nourishes, rich in vitamins A and E
- Vitamin E – Antioxidant that helps repair and protect the skin
- Essential Oils of Lavender, Sweet Orange, Palmarosa & Patchouli^ – Provide a calming, balancing effect, reduce inflammation, and help improve skin tone
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Suitable for all skin types, including sensitive, dry, or combination skin.

**Aroma & Texture:** A liquid oil with a soothing floral and woody fragrance, dominated by Patchouli and Lavender.

**How to Use:** Apply the required amount of oil to dry skin. Gently massage in circular motions to melt makeup, dirt, and impurities. Remove the oil by pressing a warm, damp cloth to your face. Repeat as needed until your skin feels clean and balanced. As a Relaxing Massage: You can also use the oil as a nourishing facial massage oil, soothing your skin while encouraging blood circulation.

**Safety Notes:** Always perform a patch test before use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult a doctor before use.

---

### 2.7 All in One Lavender Balm — A$26.99 (40 ml)
**Tagline:** Nourish, Soothe, Simplify

**Description:** "Our All in One Lavender Balm (40 ml) is the ultimate multipurpose solution for dry, chapped skin. Made with organic unrefined shea butter, avocado oil, olive oil, and hempseed oil, this nourishing balm provides intense hydration and relief for even the driest skin. Whether you're traveling, on the go, or simply prefer a one-product routine, this balm is your all-in-one solution for lips, hands, face, or anywhere your skin needs extra care. Infused with a gentle touch of organic lavender and sweet orange essential oils (0.3%), it not only soothes and calms the skin but also delights the senses with a mild floral and citrus fragrance. A balm that melts on contact to leave your skin soft, smooth, and deeply nourished."

**What It Does:**
- Nourishes and Hydrates: Deeply moisturizes dry, rough, or cracked skin
- Soothes and Calms: Relieves irritation and discomfort from chapped skin
- Simplifies: One product for multiple uses – great for travel or minimalist skincare routines

**Ingredients (with Benefits):**
- Unrefined Shea Butter^ – Rich in vitamins A and E, deeply hydrates and helps repair damaged skin
- Beeswax – Locks in moisture and creates a protective barrier on the skin
- Extra Virgin Olive Oil^ – Moisturizes and nourishes the skin with antioxidants
- Avocado Oil^ – Rich in fatty acids, helps to soften and restore skin elasticity
- Hempseed Oil^ – Rich in essential fatty acids and vitamins, balances and rejuvenates skin
- Aloe Vera Infused in Sunflower Oil – Soothes and calms irritated skin while providing deep hydration
- Calendula Oil (Calendula CO2 Extract in Organic Olive Oil & Glycine Soja) – Known for its healing properties, helps soothe inflammation and accelerate skin repair
- Vitamin E – An antioxidant that supports skin repair and protects against free radicals
- Lavender Essential Oil^ – Calms and soothes skin, known for its anti-inflammatory properties
- Sweet Orange Essential Oil^ – Uplifting and soothing, helps promote relaxation while balancing the skin
- (^Certified Organic, Organic or Wild-Harvested)

**Skin Type:** Suitable for all skin types, especially dry or sensitive skin.

**Aroma & Texture:** A rich, melting balm with a mild floral and citrus fragrance from lavender and sweet orange, creating a calming experience.

**How to Use:** Take the required amount of balm with a clean dry spatula or fingers. Massage gently into any area of your body that feels dry, chapped, or irritated. Reapply as needed throughout the day for continuous hydration and soothing.

**Safety Notes:** Always perform a patch test before full use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use. Keep away from direct heat and light to preserve the product's integrity.

---

### 2.8 Trial Collection — ~~A$19.99~~ A$15.99 (save A$4.00 / 20%)
**Description:** "Discover Before You Commit — Our thoughtfully sized samples offer a luxurious way to experience each formula (enough to use 3-4 times) — its texture, aroma, and benefits — before choosing your full-sized ritual. Designed to help you find the perfect fit while reducing waste, they're a gentle introduction to skincare that truly nourishes both skin and senses.

This set Contains:
- **Pink Blush - Cleanser Exfoliator Mask:** Detoxify-Hydrate-Brighten: Cleans impurities, dissolves dead skin cells, exfoliates, minimises pores, rebalances oily congested skin, soothes and calms, hydrates, brightens, regenerates skin, enhances collagen production.
- **Berry Light Soothe Serum:** Light, soothing anti-inflammatory oil serum that hydrates, tightens & firms, soothes and balances skin with chamomile & geranium essential oil, brightens with vitamin C from Indian gooseberry / Amla & Strawberry seed oil. Contains omega 2-3-6-7-9 fatty acids and antioxidants to nourish and regenerate skin.
- **Super Fruits Face Elixir:** Rich & hydrating oil elixir with omega 2-3-5-6-7-9 fatty acids, potent Co2 extracts of rosehip, seabuckthorn, pomegranate to fade scars, reduce fine line/wrinkles & increase elasticity of skin; antioxidants to boost radiance and regenerate skin. Does not contain essential oils, hence suitable for sensitive skin.
- **Original Body Butter:** Versatile and deeply nourishing body butter useful to hydrate not only body but face as well. It contains deeply nourishing organic unrefined shea butter and cocoa butter as well as light/fast absorbing oils like Jojoba and Camellia seed oil. Does not contain essential oils; hence suitable for sensitive skin.

For detailed description and list of ingredients please refer to individual products."

*No sample fill sizes (ml/gm) are stated for the Trial Collection items — flagged in Section 6.*

---

### 2.9 Geranium Lip Balm — From A$5.99 (Tube 5 ml / Tin 10 ml)
**Tagline:** Hydrate, Nourish, Restore

**Description:** "Pamper your lips with our Geranium Lip Balm (Tube - 5ml and Tin - 10ml), a deeply nourishing formula that hydrates and repairs dry, chapped lips. Made with organic cocoa butter, unrefined shea butter, and a blend of organic oils like almond, macadamia, castor, and coconut oil, this balm provides rich moisture while protecting and softening. Infused with a subtle hint of organic geranium essential oil (0.3%), it gives your lips a sweet, floral fragrance, turning lip care into a luxurious experience naturally."

**Key Benefits:**
- Nourishes & Hydrates: Provides deep hydration and nourishment for dry, chapped lips
- Softens & Protects: Keeps lips feeling soft and smooth throughout the day
- Aromatherapy: The mild, sweet floral scent of geranium essential oil adds a therapeutic touch

**Ingredients & Their Benefits:**
- Unrefined Shea Butter^ – Rich in vitamins A and E, deeply moisturizes and heals dry lips
- Cocoa Butter^ – Hydrates and softens lips, while protecting against the elements
- Beeswax – Forms a natural barrier to lock in moisture and protect lips from dryness
- Cera Bellina Wax – Provides smooth texture, enhancing the balm's glide-on application
- Fractionated Coconut Oil^ – Lightweight, deeply hydrates, and soothes dry lips
- Almond Oil^ – Rich in fatty acids, softens and nourishes lips
- Macadamia Oil^ – Aids in repairing and soothing lips, leaving them smooth and supple
- Castor Oil^ – Known for its hydrating properties, it helps maintain lip moisture
- Alkanet Infused in Almond Oil – Adds a natural color and further nourishes dry skin
- Vitamin E – Provides antioxidant protection and supports skin repair
- Geranium Essential Oil^ – Soothes and offers a mild, sweet floral fragrance
- (^Certified Organic or Wild-Harvested)

**Skin Type:** Suitable for all skin types, especially dry or sensitive lips.

**Aroma & Texture:** A smooth balm that melts with contact on the skin, with a soft, sweet, and floral fragrance from geranium essential oil.

**How to Use:** Apply directly to dry, chapped lips as needed throughout the day. Reapply whenever your lips feel dry or in need of hydration.

**Safety Notes:** Perform a patch test before full use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.

*The 10 ml tin price is not stated anywhere in the PDF (only "From $5.99" and a bare size selector) — flagged in Section 6.*

---

### 2.10 Rosewood Spoon (Handcrafted) — A$2.99
**Description:** "Wooden Spoon (Rosewood) — A beautifully crafted Rosewood Spoon, perfect for hygienically scooping out your Pink Blush Cleanser Exfoliator Mask, Balms or Body Butters. This compact, durable spoon helps preserve your products by keeping them free from moisture and bacteria. A simple yet essential tool for your skincare ritual."

No further ingredient/skin-type/how-to-use fields apply (non-cosmetic accessory item).

---

## 3. Image Inventory

The PDF is a Word-exported set of website screenshots, so most images arrive as **composite page screenshots** (product photo + UI chrome + captions baked into one JPEG) rather than isolated product photography files. `pdfimages` was used to extract every embedded image at its original embedded resolution; results below. All extracted files are saved to `docs/assets/reference/` for internal design reference — **none of these are proposed as final production assets** without client confirmation of resolution/rights (see Section 4).

| Image | Type | Where it appears | Extracted file | Usable as final asset? |
|---|---|---|---|---|
| SUKAYA logo | Clean, isolated | Homepage brand mark, nav, footer | `logo-sukaya.jpg` | Low-res JPEG (442×239) — usable for layout reference; a vector/SVG or high-res PNG original is needed for production |
| Cleanser Exfoliator Mask – Pink Blush | Clean, isolated | Featured Products, PDP | `product-pink-blush-mask-clean.jpg` | Small (201×221) — placeholder-quality only |
| Geranium Lip Balm | Clean, isolated | Product grid, PDP | `product-geranium-lip-balm-clean.jpg` | Small (347×313) — placeholder-quality only |
| Lifestyle flatlay (lavender, lip balm tubes, honeycomb, butters) | Clean, isolated | "Explore Our Stunning Range" gallery | `lifestyle-flatlay-1.jpg` | Usable as reference (686×342) |
| Lifestyle photo (white jar, dried flowers, lavender, dropper) | Clean, isolated | Gallery | `lifestyle-flatlay-2.jpg` | Small (334×338) — placeholder-quality only |
| Lifestyle photo (Pink Blush mask, leaf, flower, spoon) | Clean, isolated | Gallery | `lifestyle-flatlay-pink-blush.jpg` | Small (266×356) — placeholder-quality only |
| Hero banner (product range on dark background + "SHOP NOW") | Composite screenshot | Homepage hero | not extracted separately (embedded page 1) | **No** — full-page screenshot with browser/site UI baked in |
| About section composite (florals flatlay + ingredients flatlay) | Composite screenshot | About Sukaya | not extracted separately | **No** — two source photos are visible but fused into one low-res screenshot |
| Aromatherapy lavender-oil-bottle photo | Composite screenshot | Aromatherapy & Skincare | not extracted separately | **No** — embedded within a text+image screenshot |
| Featured Products grid (Pink Blush jar, Rosewood spoon, Patchouli oil) | Composite screenshot, captions baked in | Homepage Featured Products | `grid-screenshot-products-1.jpg` (reference only) | **No** — text overlays baked into the photos |
| 6-up product grid (Super Fruits, Berry Light, Body Oils, Body Butters, Patchouli Oil, Pink Blush) | Composite screenshot | Shop grid | `grid-screenshot-products-1.jpg` | **No** — individual product photos exist only as ~180×180 px crops inside this JPEG; too low-res for a premium site |
| 4-up product grid (Lavender Balm, Trial Collection, Geranium Lip Balm, Rosewood Spoon) | Composite screenshot | Shop grid | `grid-screenshot-products-2.jpg` | **No** — same limitation |
| Trial Collection bundle photo | Composite screenshot | Trial Collection PDP | `grid-screenshot-trial-collection.jpg` | Product photo is clean within the crop but bundled with page text in the same JPEG |
| Contact/Map/Subscribe screenshot | Composite screenshot | Contact Us + Subscribe | `screenshot-contact-subscribe.jpg` | **No** — this is a screenshot of a live Google Maps embed, not a static asset; the rebuilt site should embed a live map, not reuse this image |

### Products with no standalone photo anywhere in the source
Super Fruits Face Elixir, Berry Light Soothe Serum, Body Oils (both variants), Body Butters (both variants), Patchouli Face Cleansing Oil, All in One Lavender Balm, Rosewood Spoon — each exists **only** as a small thumbnail inside a multi-product grid screenshot. See Section 4 for the requirements list.

---

## 4. Missing / Required Image Assets

Per the brief's Image Rule, no replacement, AI-generated, or stock photography may be substituted. The following are required from the client (ideally the original photo files, or a fresh export directly from the current sukaya.com.au site/media library, which will be far higher resolution than anything recoverable from this PDF):

| Product/Section | What the PDF shows | Where it's needed | Original asset required? |
|---|---|---|---|
| Super Fruits Face Elixir | ~180×180 px thumbnail only | Shop grid, PDP hero | **Yes** |
| Berry Light Soothe Serum | ~180×180 px thumbnail only | Shop grid, PDP hero | **Yes** |
| Calming Body Oil | ~180×180 px lifestyle thumbnail | Shop grid, PDP hero | **Yes** |
| Uplifting Body Oil | No image at all (only Calming Body Oil's lifestyle shot appears in the grid) | Shop grid, PDP hero | **Yes** |
| Original Body Butter | ~180×180 px thumbnail (Calming Body Butter jar shown, not confirmed which variant) | Shop grid, PDP hero | **Yes** |
| Calming Body Butter | Same ambiguity as above | Shop grid, PDP hero | **Yes** |
| Patchouli Face Cleansing Oil | ~180×180 px thumbnail only | Shop grid, PDP hero | **Yes**, higher-res version |
| Cleanser Exfoliator Mask – Pink Blush | One clean but small (201×221) shot | Shop grid, PDP hero, homepage feature | **Yes**, higher-res version |
| All in One Lavender Balm | ~180×180 px thumbnail only | Shop grid, PDP hero | **Yes** |
| Trial Collection | Clean bundle photo but embedded in a text screenshot | PDP hero | **Yes**, cropped/isolated version |
| Geranium Lip Balm | One clean but small (347×313) shot | Shop grid, PDP hero | **Yes**, higher-res version |
| Rosewood Spoon | ~180×180 px thumbnail only | Shop grid, PDP hero | **Yes** |
| SUKAYA logo | Small raster JPEG (442×239) | Header, footer, favicon | **Yes** — vector (SVG) or high-res PNG with transparent background |
| Hero banner imagery | Full-page screenshot only | Homepage hero | **Yes** — original banner photography |
| Gallery/"Explore Our Stunning Range" | 3 of 6 carousel frames captured (2 clean, 1 usable) | Homepage gallery carousel | Partial — 3 more frames needed to complete the 6-slide carousel indicated by the dots in the source |
| About Sukaya photography (florals flatlay, ingredients flatlay) | Only visible fused inside a composite screenshot | About section | **Yes**, isolated versions |
| Aromatherapy section photo (lavender + oil bottle) | Only visible fused inside a composite screenshot | Aromatherapy & Skincare section | **Yes**, isolated version |

---

## 5. Page / Section Inventory (as evidenced by the source)

Based on the nav (`HOME`, `SHOP`) and the content structure in the PDF, the current site appears to be:

- **Home** (single scrolling page containing):
  - Hero banner
  - Logo/brand mark
  - About Sukaya (Our Philosophy, Our Commitment)
  - Aromatherapy & Skincare
  - Featured Products (subset)
  - "Explore Our Stunning Range of Natural Beauty" gallery
  - Contact Us
  - Subscribe (newsletter)
  - "New services are coming soon" banner
  - Footer (copyright, Privacy Policy, Terms and Conditions)
- **Shop** — a product grid/catalog listing all 10 products, linking to individual PDPs
- **10 Product Detail Pages (PDPs)** — one per product/product group, each with the standard block: price → quantity/Buy Now/Add to Cart/Share → headline → description → What It Does/Key Benefits → Ingredients → Skin Type → Aroma & Texture → How to Use → Safety Notes
- **Privacy Policy** — link exists, page content not supplied
- **Terms and Conditions** — link exists, page content not supplied

No separate "About" or "Contact" nav-level pages were found — they appear to be homepage anchors only, per the two visible nav items.

---

## 6. Information Requiring Verification (flagged, not guessed)

1. **Hero banner headline/subtext** — present in the source but too low-resolution/blurred to transcribe accurately. Needs the exact wording from the client (or a fresh screenshot/export).
2. **Full navigation menu** — only HOME and SHOP are visible. Please confirm whether About/Contact/Subscribe are homepage anchors only, or should be dedicated nav items in the rebuild.
3. **Body Oils fill size (ml)** — price given ($31.99) but no ml/oz size stated for either Calming or Uplifting variant.
4. **Trial Collection sample sizes** — bundle contents are named but no individual sample fill sizes (ml/gm) are given.
5. **Geranium Lip Balm — 10 ml tin price** — only "From $5.99" is given with a bare 5 ML/10 ML selector; the tin's actual price isn't stated.
6. **Body Butter jar photography** — the grid thumbnail shows one butter jar (labeled "Calming Body Butter" in the visible crop); it's unclear whether a separate photo exists for "Original Body Butter" or whether one photo represents both fragrance variants.
7. **Privacy Policy and Terms & Conditions body copy** — link labels exist in the footer; the actual policy text was not included in the PDF. Cannot be recreated or rewritten by us — needs the source text or the client's confirmation that placeholder pages should be linked to the existing live URLs on sukaya.com.au for now.
8. **Founder's name** — the About section references "our founder" and their aromatherapy qualification, but no name is given.
9. **Street address** — only "Melbourne VIC, Australia" plus a map pin; no full street address is given (relevant if the rebuild should show a precise address rather than just a city/pin).
10. **Shipping/returns policy, stock levels, product variant swatches (if any beyond fragrance/size)** — none of this appears anywhere in the supplied material; nothing will be invented for these areas until the client supplies them.
11. **"Powered by" footer platform** — attribution text present but its target/name isn't legible; irrelevant to the rebuild regardless, noted only for completeness.
12. **`PROJECT_BRIEF.md`** — referenced in the task instructions as something to inspect, but no such file exists in the repository. The brief was supplied as chat instructions instead. Flagging in case the client intended to upload a separate brief file.
13. **E-commerce/checkout mechanism** — the PDF shows "Buy Now"/"Add to Cart"/"Quantity" UI (consistent with a Wix Stores-style setup) but includes no information about the payment processor, shipping rates, or order fulfillment flow currently in use. This is a decision point for the architecture (Section 7), not something inferable from content alone.

---

## 7. Recommended Website Architecture

*(Recommendation only — not started. Framework/stack choice needs sign-off before any code is written, per the brief's technical rules.)*

Since this repository was empty prior to this task, there is no existing codebase to preserve or extend — this is a from-scratch build using the content above as the single source of truth, styled to the premium/natural direction in the brief.

**Proposed stack:**
- **Next.js (App Router) + TypeScript** — file-based routing maps cleanly onto Home / Shop / 10 PDPs / Privacy / Terms; strong image optimization (`next/image`) and good Core Web Vitals out of the box, satisfying the brief's performance section.
- **Tailwind CSS** — utility-based design-token system, makes it straightforward to enforce one shared type/spacing/color/radius/shadow system across every page (brief Section 12).
- **Framer Motion** — for the restrained, GPU-friendly, `prefers-reduced-motion`-aware animation language the brief calls for.
- **Product content as structured local data** (TypeScript/JSON, generated directly from Section 2 of this inventory) rather than a headless CMS for phase 1 — every field ties directly back to a verified source, and it avoids introducing infrastructure the client hasn't asked for. Can be migrated to a CMS later if the client wants non-developer content editing.
- **Images** served from `/public`, lazy-loaded, responsive `srcset` via `next/image`, once real high-resolution assets are supplied per Section 4.

**Open decision — cart & checkout:** the source material shows "Add to Cart"/"Buy Now" UI but no information about what powers checkout today (Wix Stores, Shopify, a separate payment link, etc.). Options to choose between before implementation reaches the Shop/PDP pages:
- (a) Rebuild as a front-end-only catalog that links out to the existing live checkout on sukaya.com.au,
- (b) integrate a hosted commerce/checkout provider (e.g., Shopify Buy Button, Snipcart) against the current product catalog, or
- (c) build a full custom cart + payment integration.
This has real cost/scope implications and shouldn't be assumed — flagged for the client's decision, not guessed.

**Page map:**
```
/                    Home (hero, About, Philosophy, Commitment, Aromatherapy, 
                      Featured Products, Gallery, Contact, Subscribe)
/shop                Product grid (all 10 products/groups)
/shop/[slug]         10 individual PDPs
/privacy-policy       (pending real copy — Section 6.7)
/terms-and-conditions (pending real copy — Section 6.7)
```

---

## Next Step

This document is a **checkpoint** — per the brief, no visual/UI/design-system work has begun. Awaiting client approval on:
1. The content/product/image inventories above (accuracy check),
2. Answers to the 13 items in Section 6,
3. A decision on the cart/checkout architecture question in Section 7,

before proceeding to the design-system and UX phase.
