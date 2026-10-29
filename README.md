# Shiba Wants Another Pump ($SWAP)

A complete single-page static website inspired by the **layout principles** of dogecoin.com, using independently created Shiba artwork and an Ethereum identity. All illustrations are new $SWAP assets; no Dogecoin brand assets or source code are included.

## Launch locally

Open `index.html` directly in a browser. To serve with a local web server:

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Live site

**GitHub Pages:** https://neversmile0825.github.io/SWAP/

Pushes to `main` republish automatically (Pages deploys from the repository root).

## Deployment

**GitHub Pages:** This repo deploys from the `main` branch root. All asset URLs are relative and work under `/SWAP/`.

**Netlify:** Drag the entire website directory onto Netlify's manual deploy page, or connect the Git repository. No build command is needed.

**Other hosting:** Any static HTTPS host can serve this site.

## Things to update before launch

1. Edit `js/config.js` and replace `contractAddress: 'Coming Soon..'` with the verified deployed Ethereum token contract when published.
2. Add full `https://` links for `xUrl` and `telegramUrl` in `js/config.js`. Until then, the buttons give a Coming Soon message instead of leading to unrelated profiles.
3. Update tokenomics copy only after verification. **Uniswap V3 liquidity lock is currently planned, not verified.** Confirm the lock contract, NFT position ID, lock duration, and amount once live.
4. Verify any contract shown in social posts, swap UI, or third-party listings matches your own official deployment.
5. Optional: change the copyright and project details in `index.html`.

## Key behavior

- Responsive desktop, tablet, and mobile layout.
- Four huge Shiba-photo mosaic letters (S, W, A, P) in the iconic center-of-page showcase.
- The entire site is one scrollable page with working anchor navigation and an accessible mobile menu.
- Copy button copies the exact string in `contractAddress`, even while it is `Coming Soon..`.
- No Connect Wallet button or wallet-connection logic.
- Working official Uniswap informational link, but **no prelaunch buy links** pretending a contract is tradable.
- X and Telegram buttons are ready for official URLs, with safe Coming Soon behavior until configured.
- Cinematic illustrations, performance-optimized WebP files, and original PNG source art retained in `source-art/` for future editing.

## Folder structure

```text
index.html
css/style.css
js/config.js
js/main.js
assets/             # optimized WebP site assets and favicon
source-art/         # original full-resolution AI artwork (PNG)
README.md
```

## Disclosures

This is an independent fictional/meme project. It is not affiliated with Dogecoin, the Shiba Inu project, or the Ethereum Foundation. Meme storytelling and chart imagery are illustrative, not guarantees of price performance.
