/**
 * Long-form product detail content — verbatim from docs/content-inventory.md
 * §2 (itself transcribed from docs/sukaya-content.pdf). Deferred out of
 * content/products.ts in Phase 3A pending the phase that actually builds
 * PDPs (docs/phase-3-foundation-report.md §7) — this is that phase.
 *
 * Every string below is quoted exactly as sourced. Nothing is paraphrased,
 * summarized, or improved. Where the source used a different heading
 * ("What It Does" vs "Key Benefits"), that exact heading is preserved via
 * `benefitsHeading` rather than normalized away.
 */

export interface Ingredient {
  name: string;
  benefit: string;
}

export interface ProductDetail {
  tagline?: string;
  description: string;
  benefitsHeading?: "What It Does" | "Key Benefits";
  benefits?: string[];
  ingredients?: Ingredient[];
  skinType?: string;
  aromaAndTexture?: string;
  howToUse?: string;
  safetyNotes?: string;
}

export interface BundleItem {
  name: string;
  blurb: string;
}

export interface ProductDetailEntry {
  /** Single-variant products. */
  details?: ProductDetail;
  /** Multi-variant products (Body Oils, Body Butters) — each with its own full content. */
  variantDetails?: { variantName: string; detail: ProductDetail }[];
  /** Trial Collection only. */
  bundleContents?: BundleItem[];
  bundleNote?: string;
}

export const productDetails: Record<string, ProductDetailEntry> = {
  "cleanser-exfoliator-mask---pink-blush": {
    details: {
      tagline: "Detoxify, Brighten and Nourish",
      description:
        "Our Pink Blush Cleanser Exfoliator Mask (40 gm) is a multi-functional 3-in-1 product designed to cleanse, exfoliate, and nourish your skin. This gentle yet effective formula brightens, soothes, and replenishes the skin with powerful antioxidants, enzymes, vitamins, and minerals, giving you a smooth, radiant complexion. Key ingredients like Hibiscus Powder (nature's botox) contains AHAs for exfoliation, Colloidal Oatmeal to hydrate and soothe, and Manuka Honey for its antimicrobial properties come together to deliver natural nourishment. Australian Pink Clay, Zeolite Minerals, and Rice Flour work together to purify and detoxify, leaving your skin refreshed and glowing. For extra hydration, simply add a few drops of our oil serum to the mask mixture to provide deep nourishment for dry skin.",
      benefitsHeading: "What It Does",
      benefits: [
        "Gently exfoliates to promote skin renewal",
        "Hydrates and nourishes with natural enzymes and antioxidants",
        "Soothes irritation and reduces inflammation",
        "Brightens skin and enhances collagen production",
        "Detoxifies and purifies skin for a radiant glow",
      ],
      ingredients: [
        { name: "Australian Pink Clay", benefit: "Purifies and detoxifies while providing gentle exfoliation" },
        { name: "Colloidal Oatmeal", benefit: "Draws moisture into the skin and soothes irritation with anti-inflammatory properties" },
        { name: "Rice Flour", benefit: "Gently exfoliates, removing dead skin cells for a smooth complexion" },
        { name: "Zeolite Mineral Clay", benefit: "A natural detoxifier that absorbs impurities from the skin" },
        { name: "Aloe Vera Powder", benefit: "Hydrates, soothes, and promotes skin healing" },
        { name: "Hibiscus Powder", benefit: "Contains AHAs that exfoliate and support collagen production, known as nature's botox" },
        { name: "Manuka Honey Powder", benefit: "Known for its antimicrobial and healing properties" },
        { name: "Papaya Powder", benefit: "Contains enzymes that help dissolve dead skin cells for a fresh, glowing appearance" },
        { name: "Pineapple Powder", benefit: "Packed with enzymes to brighten and exfoliate the skin" },
      ],
      skinType: "Suitable for all skin types, especially those in need of gentle exfoliation and nourishment.",
      aromaAndTexture: "A soft powder with a slightly gritty texture and a natural floral aroma from hibiscus and clay.",
      howToUse:
        "As a Cleanser & Exfoliator: Mix ¼ to ½ tsp of powder with a little water to apply on wet skin. Gently massage in circular motions and rinse off to cleanse and exfoliate. As a Mask: Mix 1 tsp or required amount of powder with water or rose water or yoghurt to form a paste. Apply to the face and neck, leave on for 5–10 minutes, then rinse off. For extra dry skin, mix a few drops of any of our oil serums into the paste before applying for added nourishment.",
      safetyNotes:
        "Always perform a patch test before use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult a doctor before use.",
    },
  },

  "body-oil": {
    variantDetails: [
      {
        variantName: "Calming Body Oil",
        detail: {
          tagline: "Nourish, Hydrate, Soothe",
          description:
            "Treat your skin to the ultimate relaxation and hydration with our Calming Body Oil. A luxurious blend of six organic oils — sesame, almond, apricot, camellia, jojoba, and macadamia — deeply nourishes and hydrates the skin, leaving it soft, supple, and beautifully moisturized. Rich in phytonutrients, omega-6 fatty acids, and anti-inflammatory properties, this non-greasy oil provides long-lasting hydration and a calming sensation for your skin. Infused with organic lavender, bergamot, and patchouli essential oils, this body oil not only nourishes but also calms and soothes the senses, promoting relaxation and unwinding after a long day.",
          benefitsHeading: "Key Benefits",
          benefits: [
            "Deeply Nourishing & Hydrating: Leaves skin soft, supple, and moisturized",
            "Calming & Relaxing: Helps unwind with soothing essential oils",
            "Anti-inflammatory: Rich in omega-6 fatty acids to calm irritated or dry skin",
          ],
          ingredients: [
            { name: "Sesame Oil^", benefit: "Moisturizes and protects the skin, rich in antioxidants and essential fatty acids" },
            { name: "Almond Oil^", benefit: "Softens and nourishes the skin with vitamins and minerals" },
            { name: "Apricot Oil^", benefit: "Hydrates and revitalizes, helping to restore skin elasticity" },
            { name: "Camellia Oil^", benefit: "High in antioxidants, promotes smooth, healthy-looking skin" },
            { name: "Jojoba Oil^", benefit: "Hydrates and balances skin while supporting the skin's natural barrier" },
            { name: "Macadamia Oil^", benefit: "Rich in fatty acids, it helps repair and protect dry skin" },
            { name: "Vitamin E", benefit: "Provides antioxidant protection and supports skin repair" },
            { name: "Lavender Essential Oil^", benefit: "Calms and soothes, promoting relaxation" },
            { name: "Bergamot Essential Oil^", benefit: "Uplifts mood and helps with stress relief" },
            { name: "Patchouli Essential Oil^", benefit: "Soothes and balances, calming the skin and senses" },
          ],
          skinType: "Suitable for all skin types, especially dry or sensitive skin in need of hydration and relaxation.",
          aromaAndTexture:
            "A smooth, non-greasy oil that absorbs easily into the skin, leaving a floral, citrus, and woody fragrance from the blend of lavender, bergamot, and patchouli.",
          howToUse:
            "Take the desired amount of oil and massage it into the skin, focusing on dry or rough areas. For best results, apply after showering to lock in moisture. Reapply as needed to any part of the body that feels dry or in need of extra hydration.",
          safetyNotes:
            "Perform a patch test before use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.",
        },
      },
      {
        variantName: "Uplifting Body Oil",
        detail: {
          tagline: "Nourish, Hydrate, Energize",
          description:
            "Infuse your skin with the uplifting benefits of our Uplifting Body Oil, a rich yet non-greasy blend of six organic oils — sesame, almond, apricot, camellia, jojoba, and macadamia. This luxurious oil deeply nourishes and hydrates, leaving your skin feeling soft, supple, and beautifully moisturized. Packed with phytonutrients, omega-6 fatty acids, and anti-inflammatory properties, it provides lasting hydration and helps calm dry or irritated skin. The refreshing combination of sweet orange, palmarosa, and ylang ylang essential oils energizes and uplifts the senses, helping to balance and restore your mood while enhancing the feeling of well-being.",
          benefitsHeading: "Key Benefits",
          benefits: [
            "Deep Hydration: Moisturizes and softens, leaving skin feeling silky smooth",
            "Nourishing: Packed with essential fatty acids and antioxidants to support healthy skin",
            "Energizing & Uplifting: The refreshing blend of essential oils boosts mood and refreshes the senses",
          ],
          ingredients: [
            { name: "Sesame Oil^", benefit: "Deeply nourishes, rich in antioxidants, and promotes skin elasticity" },
            { name: "Almond Oil^", benefit: "Softens and nourishes, packed with vitamins and minerals" },
            { name: "Apricot Oil^", benefit: "Hydrates and revitalizes, helping to restore skin's smoothness" },
            { name: "Camellia Oil^", benefit: "A lightweight oil high in antioxidants, perfect for keeping skin soft and radiant" },
            { name: "Jojoba Oil^", benefit: "Balances moisture levels while supporting the skin's natural barrier" },
            { name: "Macadamia Oil^", benefit: "Rich in omega-7 and fatty acids, it helps protect and hydrate dry skin" },
            { name: "Vitamin E", benefit: "Offers antioxidant protection and supports skin repair" },
            { name: "Sweet Orange Essential Oil^", benefit: "Energizing and uplifting, refreshes the mind and body" },
            { name: "Palmarosa Essential Oil^", benefit: "Balances and hydrates, restoring skin's natural glow" },
            { name: "Ylang Ylang Essential Oil^", benefit: "Uplifts and calms, promoting relaxation and mental clarity" },
          ],
          skinType: "Suitable for all skin types, especially dry or stressed skin in need of nourishment and mood-lifting care.",
          aromaAndTexture:
            "A smooth, lightweight oil with a refreshing floral and citrus fragrance from sweet orange, palmarosa, and ylang ylang — perfect for uplifting both your skin and your senses.",
          howToUse:
            "Massage a generous amount of oil into your skin, focusing on dry or rough areas. For best results, apply after showering to lock in moisture. Reapply as needed to areas of the body that need extra hydration.",
          safetyNotes:
            "Conduct a patch test before use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.",
        },
      },
    ],
  },

  "super-fruits-face-elixir": {
    details: {
      tagline: "Restore, Repair & Hydrate for Glowing, Nourished Skin",
      description:
        "Pamper your skin with the luxurious Super Fruit Facial Elixir (30ml), a deeply nourishing blend of 6 premium oils and 3 potent CO₂ extracts. This non-greasy, ultra-hydrating elixir is packed with vitamins, antioxidants, beta-carotene, and omega 2-3-5-6-7-9, making it ideal for even the most sensitive skin. Formulated without essential oils, it gently restores and protects, promoting collagen production, cellular regeneration, and skin elasticity. The vibrant orange hue comes from the high carotenoid content in Buriti oil, Seabuckthorn Pulp CO₂, and Rosehip CO₂, which work together to provide anti-inflammatory and anti-aging benefits. Whether you're looking to repair skin barriers, reduce fine lines, or boost radiance, this elixir will leave your skin soft, supple, and beautifully hydrated.",
      benefitsHeading: "What It Does",
      benefits: [
        "Restores and repairs skin barrier",
        "Deeply hydrates and locks in moisture",
        "Boosts skin elasticity and collagen production",
        "Reduces the appearance of scars, wrinkles, and fine lines",
        "Promotes cellular regeneration, increases radiance and smoothness",
      ],
      ingredients: [
        { name: "Jojoba Oil^", benefit: "Balances skin's natural oils and deeply hydrates" },
        { name: "Camellia Oil^", benefit: "Soothes and provides intense moisture while preventing premature aging" },
        { name: "Argan Oil^", benefit: "Rich in vitamin E and antioxidants; helps repair and protect skin" },
        { name: "Chia Seed Oil", benefit: "Deeply nourishing, rich in omega-3 and antioxidants" },
        { name: "Apple Seed Oil", benefit: "Provides hydration and helps brighten skin with natural fruit acids" },
        { name: "Seabuckthorn Pulp CO₂ Extract^", benefit: "Full of beta-carotene and vitamin C to regenerate and repair skin" },
        { name: "Rosehip CO₂ Extract^", benefit: "Helps fade scars and improve skin texture" },
        { name: "Pomegranate CO₂ Extract", benefit: "Rich in antioxidants, fights signs of aging and promotes collagen production" },
        { name: "Buriti Oil", benefit: "High in carotenoids, promoting skin elasticity, protection, and radiance" },
        { name: "Vitamin E", benefit: "Helps reduce scars and protects the skin from environmental stressors" },
      ],
      skinType: "Normal, Dry, Combination, Aging/Mature, and Sensitive Skin",
      aromaAndTexture:
        "A light to medium-weight oil with a natural fragrance, primarily from Rosehip, Apple Seed Oil and Pomegranate CO₂ Extract.",
      howToUse: "Apply 3–5 drops (or half to one pump) to cleansed skin. Massage gently into your face and neck, both morning and night.",
      safetyNotes:
        "Always perform a patch test before use. Discontinue if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.",
    },
  },

  "berry-light-soothe-serum": {
    details: {
      description:
        "Rejuvenate, Balance & Protect Your Skin — This lightweight, fast-absorbing oil serum is your go-to solution for glowing, healthy skin. Infused with a powerful blend of 8 non-comedogenic oils and 2 essential oils, it's packed with antioxidants, vitamins, and omegas to nurture and protect your skin. Berry Light Soothe Serum (30 ml) helps restore your skin's balance, reduce inflammation, and fight environmental stressors, leaving your skin plump, smooth, and visibly rejuvenated. Its anti-inflammatory and anti-aging properties promote cell regeneration, brighten complexion, and help reduce breakouts, fine lines, and scars.",
      benefitsHeading: "What It Does",
      benefits: [
        "Hydrates and softens skin",
        "Increases skin elasticity",
        "Reduces fine lines, scars, and inflammation",
        "Tightens and firms the skin",
        "Balances skin and reduces breakouts",
        "Protects against environmental damage",
      ],
      ingredients: [
        { name: "Jojoba Oil^", benefit: "Balances skin's natural oils and deeply hydrates" },
        { name: "Acai Berry Seed Oil", benefit: "Packed with antioxidants; rejuvenates and protects skin" },
        { name: "Strawberry Seed Oil", benefit: "Rich in vitamin C, brightens and fights signs of aging" },
        { name: "Red Raspberry Seed Oil", benefit: "Calms and soothes inflammation, rich in omega-3 and omega-6" },
        { name: "Squalane", benefit: "It has the ability to boost skin elasticity" },
        { name: "Fractionated Coconut Oil^", benefit: "Lightweight and hydrating, absorbs easily" },
        { name: "Indian Gooseberry (Amla) Seed Oil", benefit: "High in vitamin C; promotes skin regeneration" },
        { name: "Chia Seed Oil", benefit: "Boosts hydration and helps reduce inflammation" },
        { name: "Sensolene (Olive derived)", benefit: "It retains hydration and improves skin's barrier function" },
        { name: "Grapeseed Oil^", benefit: "Full of antioxidants; repairs and nourishes skin" },
        { name: "Vitamin E", benefit: "Protects skin, helps reduce scars and stretch marks" },
        { name: "Essential Oils of Organic Geranium^ & Organic German Chamomile^", benefit: "Calm, balance, and soothe the skin" },
      ],
      skinType: "Suitable for most skin types.",
      aromaAndTexture:
        "A very light to lightweight oil with a delicate, fruity-floral fragrance from acai berry, strawberry seed oil, geranium, and chamomile.",
      howToUse: "Apply 3–5 drops (or half to one pump) to cleansed skin. Massage gently into face and neck. Can be used both morning and night.",
      safetyNotes:
        "Always perform a patch test before full use. Discontinue if irritation occurs. Contains essential oils in a concentration of less than 0.5%. If pregnant or under medical care for skin conditions, consult with a doctor before use.",
    },
  },

  "original-body-butter": {
    variantDetails: [
      {
        variantName: "Original Body Butter",
        detail: {
          tagline:
            "Soothing, Healing & Hydrating — Rich in Vitamins, Antioxidants & Anti-Inflammatory Properties. Free from Essential Oils - Safe for Sensitive Skin & Babies. More than 90% certified Organic ingredients used.",
          description:
            "Indulge in the nurturing care of our Original Body Butter (80 ml), specially formulated to hydrate, repair, and soothe dry and sensitive skin. Packed with Unrefined Shea Butter, Cocoa butter, and a blend of nourishing oils, it provides deep moisture without irritation. This rich, soothing butter is free from essential oils, making it ideal for those with sensitive skin, as well as safe for babies and young children. With the healing power of Calendula and Aloe infused oils, and the restorative benefits of Hemp seed and Camellia seed oils, this body butter works to nourish, protect, and soften skin while calming any irritation.",
          benefitsHeading: "Key Benefits",
          benefits: [
            "Gentle & Soothing: No essential oils make this perfect for sensitive skin and safe for babies",
            "Healing & Repairing: Calendula and aloe oils help to calm and heal skin",
            "Deep Hydration: Shea butter and cocoa butter provide long-lasting moisture",
            "Rich in Nutrients: Packed with vitamins, antioxidants, and essential fatty acids to protect and restore skin",
            "Anti-Inflammatory: Helps reduce redness and irritation for smoother, healthier skin",
          ],
          ingredients: [
            { name: "Unrefined Shea Butter^", benefit: "Rich in vitamins A, E, and F, it deeply hydrates and heals dry skin" },
            { name: "Cocoa Butter^", benefit: "High in antioxidants, it helps soothe and nourish, improving skin elasticity" },
            { name: "Jojoba Oil^", benefit: "A natural moisturizer that mimics skin's natural oils, leaving skin soft without clogging pores" },
            { name: "Calendula Infused in Olive^ & Glycine Soja Oil", benefit: "Known for its healing properties, it calms inflammation and promotes skin repair" },
            { name: "Hemp Seed Oil^", benefit: "Rich in omega-3 and omega-6 fatty acids, it nourishes and balances the skin" },
            { name: "Aloe Infused in Sunflower Oil", benefit: "Moisturizes and soothes irritated skin, providing hydration and calm" },
            { name: "Camellia Seed Oil^", benefit: "Lightweight and nourishing, it enhances skin elasticity and provides deep hydration" },
            { name: "Vitamin E", benefit: "A potent antioxidant that protects against environmental stressors and supports skin regeneration" },
          ],
          skinType: "Perfect for all skin types, especially sensitive skin, and suitable for babies and young children.",
          aromaAndTexture:
            "A rich, creamy texture that absorbs easily into the skin, leaving it soft and deeply hydrated. It has a mild, natural scent from its nourishing ingredients, making it ideal for those sensitive to strong fragrances.",
          howToUse:
            "Apply and massage gently into dry skin as needed for hydration. Focus on areas that need extra care, such as elbows, knees, and feet. Always use dry, clean fingers or a spatula to scoop out the product. A little goes a long way, so use sparingly.",
          safetyNotes:
            "Perform a patch test before first use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult a doctor before use.",
        },
      },
      {
        variantName: "Calming Body Butter",
        detail: {
          tagline: "Nourish, Hydrate, Soothe — Rich in Vitamins & Antioxidants",
          description:
            "Indulge your skin with our Calming Body Butter (80ml), a luxurious, deeply hydrating formula designed to nourish and restore dry, dehydrated skin. Enriched with Unrefined Shea Butter, Mango Butter, and a blend of nourishing organic oils such as Camellia, Almond, Argan, and Jojoba, this body butter provides essential vitamins, antioxidants, and fatty acids to soften and soothe the skin. The infusion of Lavender, Bergamot, and Patchouli essential oils creates a calming and soothing experience, promoting relaxation while leaving your skin deeply moisturized and revitalized.",
          benefitsHeading: "Key Benefits",
          benefits: [
            "Deep Hydration: Rich, concentrated formula that deeply nourishes and softens skin",
            "Vitamins & Antioxidants: Packed with skin-loving nutrients to protect and revitalize",
            "Calming & Soothing: Lavender, bergamot, and patchouli essential oils relax and calm the senses",
          ],
          ingredients: [
            { name: "Unrefined Shea Butter^", benefit: "Intense moisture and healing properties for dry, rough skin" },
            { name: "Mango Butter^", benefit: "Rich in antioxidants, it helps improve skin elasticity and moisture retention" },
            { name: "Camellia Oil^", benefit: "Lightweight and nourishing, it restores smoothness and protects the skin" },
            { name: "Almond Oil^", benefit: "Softens and hydrates, packed with vitamins and essential fatty acids" },
            { name: "Argan Oil^", benefit: "Rich in vitamin E and essential fatty acids, it rejuvenates and balances the skin" },
            { name: "Jojoba Oil^", benefit: "Moisturizes and soothes, mimicking the skin's natural oils for a healthy glow" },
            { name: "Aloe Infused in Sunflower Oil", benefit: "Hydrates and calms irritated skin while providing antioxidants" },
            { name: "Vitamin E", benefit: "Supports skin repair and provides antioxidant protection" },
            { name: "Lavender Essential Oil^", benefit: "Calms and soothes both the skin and senses" },
            { name: "Bergamot Essential Oil^", benefit: "Uplifts mood and helps relieve tension" },
            { name: "Patchouli Essential Oil^", benefit: "Soothes and balances, leaving a calming fragrance" },
          ],
          skinType: "Suitable for all skin types, particularly dry or sensitive skin in need of deep hydration and soothing care.",
          aromaAndTexture:
            "A rich, creamy butter that melts into the skin with a calming floral, citrus, and earthy fragrance from lavender, bergamot, and patchouli essential oils.",
          howToUse:
            "Apply and massage into dry, clean skin as needed for hydration. For best results, use after a shower to lock in moisture. A little goes a long way — use sparingly as this is a rich, concentrated product.",
          safetyNotes:
            "Always use dry and clean fingers or a spatula to take out the product. Perform a patch test before first use to ensure compatibility with your skin. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.",
        },
      },
    ],
  },

  "patchouli-face-cleansing-oil": {
    details: {
      tagline: "A Gentle, Hydrating Cleanse for Soft, Nourished Skin",
      description:
        "Experience the most soothing way to cleanse your skin with our Patchouli Face Cleansing Oil (50 ml). Using the oil cleansing method, this formula effectively removes makeup, dirt, impurities, and excess sebum while leaving your skin soft, smooth, and hydrated. We've carefully chosen a blend of nourishing oils, including Castor Oil, which penetrates deeply into pores to cleanse them, along with Sesame, Jojoba, Grapeseed, and Apricot Oil to hydrate and restore the skin's natural balance. To enhance the experience, we've infused this cleanser with Patchouli, Lavender, Sweet Orange, and Palmarosa essential oils (less than 1%)— each contributing their own unique benefits for your skin, from calming inflammation to improving skin tone.",
      benefitsHeading: "What It Does",
      benefits: [
        "Gently cleanses and removes makeup, dirt, and impurities",
        "Deeply hydrates and nourishes the skin",
        "Balances and softens, leaving skin smooth and glowing",
        "Helps promote a calm, even skin tone",
      ],
      ingredients: [
        { name: "Castor Oil^", benefit: "Deeply penetrates to clean pores and remove impurities" },
        { name: "Aloe Vera Infused in Sunflower Oil", benefit: "Soothes, hydrates, and calms inflammation" },
        { name: "Sesame Oil^", benefit: "Rich in antioxidants, hydrates and promotes skin elasticity" },
        { name: "Grapeseed Oil^", benefit: "Light yet nourishing, rich in vitamins and antioxidants" },
        { name: "Jojoba Oil^", benefit: "Balances the skin's natural oils and supports hydration" },
        { name: "Apricot Oil^", benefit: "Softens and nourishes, rich in vitamins A and E" },
        { name: "Vitamin E", benefit: "Antioxidant that helps repair and protect the skin" },
        { name: "Essential Oils of Lavender, Sweet Orange, Palmarosa & Patchouli^", benefit: "Provide a calming, balancing effect, reduce inflammation, and help improve skin tone" },
      ],
      skinType: "Suitable for all skin types, including sensitive, dry, or combination skin.",
      aromaAndTexture: "A liquid oil with a soothing floral and woody fragrance, dominated by Patchouli and Lavender.",
      howToUse:
        "Apply the required amount of oil to dry skin. Gently massage in circular motions to melt makeup, dirt, and impurities. Remove the oil by pressing a warm, damp cloth to your face. Repeat as needed until your skin feels clean and balanced. As a Relaxing Massage: You can also use the oil as a nourishing facial massage oil, soothing your skin while encouraging blood circulation.",
      safetyNotes:
        "Always perform a patch test before use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult a doctor before use.",
    },
  },

  "all-in-one-lavender-balm": {
    details: {
      tagline: "Nourish, Soothe, Simplify",
      description:
        "Our All in One Lavender Balm (40 ml) is the ultimate multipurpose solution for dry, chapped skin. Made with organic unrefined shea butter, avocado oil, olive oil, and hempseed oil, this nourishing balm provides intense hydration and relief for even the driest skin. Whether you're traveling, on the go, or simply prefer a one-product routine, this balm is your all-in-one solution for lips, hands, face, or anywhere your skin needs extra care. Infused with a gentle touch of organic lavender and sweet orange essential oils (0.3%), it not only soothes and calms the skin but also delights the senses with a mild floral and citrus fragrance. A balm that melts on contact to leave your skin soft, smooth, and deeply nourished.",
      benefitsHeading: "What It Does",
      benefits: [
        "Nourishes and Hydrates: Deeply moisturizes dry, rough, or cracked skin",
        "Soothes and Calms: Relieves irritation and discomfort from chapped skin",
        "Simplifies: One product for multiple uses – great for travel or minimalist skincare routines",
      ],
      ingredients: [
        { name: "Unrefined Shea Butter^", benefit: "Rich in vitamins A and E, deeply hydrates and helps repair damaged skin" },
        { name: "Beeswax", benefit: "Locks in moisture and creates a protective barrier on the skin" },
        { name: "Extra Virgin Olive Oil^", benefit: "Moisturizes and nourishes the skin with antioxidants" },
        { name: "Avocado Oil^", benefit: "Rich in fatty acids, helps to soften and restore skin elasticity" },
        { name: "Hempseed Oil^", benefit: "Rich in essential fatty acids and vitamins, balances and rejuvenates skin" },
        { name: "Aloe Vera Infused in Sunflower Oil", benefit: "Soothes and calms irritated skin while providing deep hydration" },
        { name: "Calendula Oil (Calendula CO2 Extract in Organic Olive Oil & Glycine Soja)", benefit: "Known for its healing properties, helps soothe inflammation and accelerate skin repair" },
        { name: "Vitamin E", benefit: "An antioxidant that supports skin repair and protects against free radicals" },
        { name: "Lavender Essential Oil^", benefit: "Calms and soothes skin, known for its anti-inflammatory properties" },
        { name: "Sweet Orange Essential Oil^", benefit: "Uplifting and soothing, helps promote relaxation while balancing the skin" },
      ],
      skinType: "Suitable for all skin types, especially dry or sensitive skin.",
      aromaAndTexture:
        "A rich, melting balm with a mild floral and citrus fragrance from lavender and sweet orange, creating a calming experience.",
      howToUse:
        "Take the required amount of balm with a clean dry spatula or fingers. Massage gently into any area of your body that feels dry, chapped, or irritated. Reapply as needed throughout the day for continuous hydration and soothing.",
      safetyNotes:
        "Always perform a patch test before full use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use. Keep away from direct heat and light to preserve the product's integrity.",
    },
  },

  "trial-collection": {
    bundleNote:
      "Discover Before You Commit — Our thoughtfully sized samples offer a luxurious way to experience each formula (enough to use 3-4 times) — its texture, aroma, and benefits — before choosing your full-sized ritual. Designed to help you find the perfect fit while reducing waste, they're a gentle introduction to skincare that truly nourishes both skin and senses.",
    bundleContents: [
      {
        name: "Pink Blush - Cleanser Exfoliator Mask",
        blurb:
          "Detoxify-Hydrate-Brighten: Cleans impurities, dissolves dead skin cells, exfoliates, minimises pores, rebalances oily congested skin, soothes and calms, hydrates, brightens, regenerates skin, enhances collagen production.",
      },
      {
        name: "Berry Light Soothe Serum",
        blurb:
          "Light, soothing anti-inflammatory oil serum that hydrates, tightens & firms, soothes and balances skin with chamomile & geranium essential oil, brightens with vitamin C from Indian gooseberry / Amla & Strawberry seed oil. Contains omega 2-3-6-7-9 fatty acids and antioxidants to nourish and regenerate skin.",
      },
      {
        name: "Super Fruits Face Elixir",
        blurb:
          "Rich & hydrating oil elixir with omega 2-3-5-6-7-9 fatty acids, potent Co2 extracts of rosehip, seabuckthorn, pomegranate to fade scars, reduce fine line/wrinkles & increase elasticity of skin; antioxidants to boost radiance and regenerate skin. Does not contain essential oils, hence suitable for sensitive skin.",
      },
      {
        name: "Original Body Butter",
        blurb:
          "Versatile and deeply nourishing body butter useful to hydrate not only body but face as well. It contains deeply nourishing organic unrefined shea butter and cocoa butter as well as light/fast absorbing oils like Jojoba and Camellia seed oil. Does not contain essential oils; hence suitable for sensitive skin.",
      },
    ],
  },

  "geranium-lip-balm": {
    details: {
      tagline: "Hydrate, Nourish, Restore",
      description:
        "Pamper your lips with our Geranium Lip Balm (Tube - 5ml and Tin - 10ml), a deeply nourishing formula that hydrates and repairs dry, chapped lips. Made with organic cocoa butter, unrefined shea butter, and a blend of organic oils like almond, macadamia, castor, and coconut oil, this balm provides rich moisture while protecting and softening. Infused with a subtle hint of organic geranium essential oil (0.3%), it gives your lips a sweet, floral fragrance, turning lip care into a luxurious experience naturally.",
      benefitsHeading: "Key Benefits",
      benefits: [
        "Nourishes & Hydrates: Provides deep hydration and nourishment for dry, chapped lips",
        "Softens & Protects: Keeps lips feeling soft and smooth throughout the day",
        "Aromatherapy: The mild, sweet floral scent of geranium essential oil adds a therapeutic touch",
      ],
      ingredients: [
        { name: "Unrefined Shea Butter^", benefit: "Rich in vitamins A and E, deeply moisturizes and heals dry lips" },
        { name: "Cocoa Butter^", benefit: "Hydrates and softens lips, while protecting against the elements" },
        { name: "Beeswax", benefit: "Forms a natural barrier to lock in moisture and protect lips from dryness" },
        { name: "Cera Bellina Wax", benefit: "Provides smooth texture, enhancing the balm's glide-on application" },
        { name: "Fractionated Coconut Oil^", benefit: "Lightweight, deeply hydrates, and soothes dry lips" },
        { name: "Almond Oil^", benefit: "Rich in fatty acids, softens and nourishes lips" },
        { name: "Macadamia Oil^", benefit: "Aids in repairing and soothing lips, leaving them smooth and supple" },
        { name: "Castor Oil^", benefit: "Known for its hydrating properties, it helps maintain lip moisture" },
        { name: "Alkanet Infused in Almond Oil", benefit: "Adds a natural color and further nourishes dry skin" },
        { name: "Vitamin E", benefit: "Provides antioxidant protection and supports skin repair" },
        { name: "Geranium Essential Oil^", benefit: "Soothes and offers a mild, sweet floral fragrance" },
      ],
      skinType: "Suitable for all skin types, especially dry or sensitive lips.",
      aromaAndTexture: "A smooth balm that melts with contact on the skin, with a soft, sweet, and floral fragrance from geranium essential oil.",
      howToUse: "Apply directly to dry, chapped lips as needed throughout the day. Reapply whenever your lips feel dry or in need of hydration.",
      safetyNotes:
        "Perform a patch test before full use. Discontinue use if irritation occurs. If pregnant or under medical care for skin conditions, consult your doctor before use.",
    },
  },

  "rosewood-spoon": {
    details: {
      description:
        "Wooden Spoon (Rosewood) — A beautifully crafted Rosewood Spoon, perfect for hygienically scooping out your Pink Blush Cleanser Exfoliator Mask, Balms or Body Butters. This compact, durable spoon helps preserve your products by keeping them free from moisture and bacteria. A simple yet essential tool for your skincare ritual.",
      // No ingredients/skin type/how-to-use/safety-notes fields apply to
      // this non-cosmetic accessory item (docs/content-inventory.md §2.10).
    },
  },
};

export function getProductDetail(slug: string): ProductDetailEntry | undefined {
  return productDetails[slug];
}
