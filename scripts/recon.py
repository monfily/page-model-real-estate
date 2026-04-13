from playwright.sync_api import sync_playwright
import json, os, re, hashlib, urllib.request, urllib.error

TARGET_URL = "https://www.chavesnamao.com.br/"
OUT_DIR = "clone-data"
os.makedirs(f"{OUT_DIR}/screenshots", exist_ok=True)
os.makedirs(f"{OUT_DIR}/components", exist_ok=True)
os.makedirs("public/images", exist_ok=True)
os.makedirs("public/videos", exist_ok=True)

CHROMIUM_PATH = "/home/runner/workspace/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome"

def extract_tokens(page, out_dir):
    tokens = page.evaluate("""
      () => {
        const body = document.body;
        const cs = getComputedStyle(body);
        const cssVars = [];
        try {
          for (const sheet of document.styleSheets) {
            try {
              for (const rule of sheet.cssRules) {
                if (rule.selectorText === ':root' || rule.selectorText === ':root, :host') {
                  for (const prop of rule.style) {
                    if (prop.startsWith('--')) {
                      cssVars.push([prop, rule.style.getPropertyValue(prop).trim()]);
                    }
                  }
                }
              }
            } catch(e) {}
          }
        } catch(e) {}

        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('h2');
        const h3 = document.querySelector('h3');
        const btn = document.querySelector('button, [class*="btn"], a[class*="button"]');
        const nav = document.querySelector('nav, header');
        const card = document.querySelector('[class*="card"], [class*="Card"]');

        function getStyles(el) {
          if (!el) return null;
          const s = getComputedStyle(el);
          return {
            fontSize: s.fontSize, fontWeight: s.fontWeight, fontFamily: s.fontFamily,
            lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, color: s.color,
            textTransform: s.textTransform, backgroundColor: s.backgroundColor,
            padding: s.padding, borderRadius: s.borderRadius, border: s.border
          };
        }

        return {
          body: {
            bgColor: cs.backgroundColor,
            textColor: cs.color,
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight
          },
          h1: getStyles(h1),
          h2: getStyles(h2),
          h3: getStyles(h3),
          button: getStyles(btn),
          nav: getStyles(nav),
          card: getStyles(card),
          cssVars: cssVars,
          fonts: [...document.querySelectorAll('link[href*="fonts.googleapis"], link[href*="fonts.gstatic"]')]
            .map(l => l.href),
          favicons: [...document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]')]
            .map(l => ({ href: l.href, rel: l.rel, sizes: l.sizes?.toString() || '' })),
          metaImages: [...document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')]
            .map(m => ({ property: m.getAttribute('property') || m.name, content: m.content })),
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.content || ''
        };
      }
    """)
    with open(f"{out_dir}/tokens.json", "w") as f:
        json.dump(tokens, f, indent=2, ensure_ascii=False)
    return tokens

def extract_content(page, out_dir):
    data = page.evaluate("""
      () => {
        const result = {};

        const banner = document.querySelector(
          '[class*="banner"], [class*="announcement"], [class*="promo-bar"], [class*="top-bar"], [class*="topbar"]'
        );
        if (banner && banner.offsetHeight > 0 && banner.offsetHeight < 100) {
          result.banner = {
            bgColor: getComputedStyle(banner).backgroundColor,
            text: banner.innerText.trim().slice(0, 500),
            height: banner.offsetHeight
          };
        }

        const header = document.querySelector('header') || document.querySelector('nav, [class*="header"], [class*="navbar"]');
        if (header) {
          const cs = getComputedStyle(header);
          result.header = {
            height: header.offsetHeight,
            bgColor: cs.backgroundColor,
            position: cs.position,
            borderBottom: cs.borderBottom,
            boxShadow: cs.boxShadow,
            logo: header.querySelector('img')?.src || header.querySelector('svg')?.outerHTML?.slice(0, 2000) || '',
            navLinks: [...header.querySelectorAll('a')].map(a => ({
              text: a.innerText.trim(),
              href: a.getAttribute('href') || ''
            })).filter(l => l.text && l.text.length < 60).slice(0, 30)
          };
        }

        const main = document.querySelector('main') || document.body;
        const children = main === document.body
          ? [...main.children].filter(c => c.tagName !== 'HEADER' && c.tagName !== 'FOOTER' && c.tagName !== 'NAV' && c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE')
          : [...main.children];

        result.sections = children.map((child, idx) => {
          const rect = child.getBoundingClientRect();
          if (rect.height < 20) return null;
          const cs = getComputedStyle(child);
          if (cs.display === 'none' || cs.visibility === 'hidden') return null;
          return {
            index: idx,
            tag: child.tagName.toLowerCase(),
            id: child.id || null,
            classes: child.className?.toString().slice(0, 300) || '',
            top: Math.round(rect.top + window.scrollY),
            height: Math.round(rect.height),
            bgColor: cs.backgroundColor,
            bgImage: cs.backgroundImage !== 'none' ? cs.backgroundImage : null,
            padding: cs.padding,
            maxWidth: cs.maxWidth,
            display: cs.display,
            text: child.innerText?.slice(0, 3000) || '',
            headings: [...child.querySelectorAll('h1, h2, h3, h4')].slice(0, 10).map(h => ({
              level: h.tagName.toLowerCase(),
              text: h.innerText.trim()
            })),
            images: [...child.querySelectorAll('img')].slice(0, 30).map(img => ({
              src: img.src,
              alt: img.alt,
              w: img.offsetWidth,
              h: img.offsetHeight
            })).filter(i => i.src && i.w > 30),
            links: [...child.querySelectorAll('a')].slice(0, 30).map(a => ({
              text: a.innerText.trim(),
              href: a.getAttribute('href') || ''
            })).filter(l => l.text),
            buttons: [...child.querySelectorAll('button, [role="button"], a[class*="btn"], a[class*="button"]')].slice(0, 10).map(b => ({
              text: b.innerText.trim(),
              classes: b.className?.toString().slice(0, 200) || ''
            })).filter(b => b.text)
          };
        }).filter(Boolean);

        const footer = document.querySelector('footer');
        if (footer) {
          result.footer = {
            bgColor: getComputedStyle(footer).backgroundColor,
            text: footer.innerText.trim().slice(0, 3000),
            columns: [...footer.querySelectorAll('div > ul, nav > ul, [class*="col"]')].slice(0, 8).map(col => ({
              heading: col.previousElementSibling?.innerText?.trim() || col.querySelector('h3, h4, h5, strong')?.innerText?.trim() || '',
              links: [...col.querySelectorAll('a')].map(a => ({
                text: a.innerText.trim(),
                href: a.getAttribute('href') || ''
              })).filter(l => l.text)
            })),
            socialLinks: [...footer.querySelectorAll(
              'a[href*="instagram"], a[href*="tiktok"], a[href*="twitter"], a[href*="facebook"], a[href*="youtube"], a[href*="linkedin"], a[href*="github"], a[href*="whatsapp"]'
            )].map(a => ({ href: a.href, platform: a.href.match(/(instagram|tiktok|twitter|facebook|youtube|linkedin|github|whatsapp)/)?.[1] || '' }))
          };
        }

        return result;
      }
    """)
    with open(f"{out_dir}/content.json", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    return data

def discover_assets(page):
    return page.evaluate("""
      () => {
        return {
          images: [...document.querySelectorAll('img')]
            .filter(img => img.offsetWidth > 30 && img.src)
            .map(img => ({
              src: img.src,
              srcset: img.srcset || '',
              alt: img.alt,
              w: img.offsetWidth,
              h: img.offsetHeight,
              parentClasses: img.parentElement?.className?.toString().slice(0, 100) || ''
            })),
          videos: [...document.querySelectorAll('video')].map(v => ({
            src: v.src || v.querySelector('source')?.src,
            poster: v.poster,
            autoplay: v.autoplay,
            loop: v.loop,
            muted: v.muted
          })).filter(v => v.src),
          backgroundImages: [...document.querySelectorAll('*')].filter(el => {
            const bg = getComputedStyle(el).backgroundImage;
            return bg && bg !== 'none' && bg.includes('url(');
          }).slice(0, 50).map(el => ({
            url: getComputedStyle(el).backgroundImage,
            element: el.tagName + (el.className ? '.' + el.className.toString().split(' ')[0] : '')
          })),
          svgs: [...document.querySelectorAll('svg')].slice(0, 30).map((svg, i) => ({
            index: i,
            viewBox: svg.getAttribute('viewBox') || '',
            width: svg.getAttribute('width') || svg.offsetWidth,
            height: svg.getAttribute('height') || svg.offsetHeight,
            html: svg.outerHTML.length < 5000 ? svg.outerHTML : '[TOO_LARGE]',
            parentText: svg.parentElement?.innerText?.trim().slice(0, 50) || '',
            ariaLabel: svg.getAttribute('aria-label') || ''
          })),
          fonts: [...new Set(
            [...document.querySelectorAll('*')].slice(0, 300)
              .map(el => getComputedStyle(el).fontFamily)
          )],
          fontLinks: [...document.querySelectorAll('link[href*="fonts"]')].map(l => l.href)
        };
      }
    """)

def download_assets(assets, out_dir="public"):
    downloaded = {}
    img_dir = f"{out_dir}/images"
    vid_dir = f"{out_dir}/videos"
    os.makedirs(img_dir, exist_ok=True)
    os.makedirs(vid_dir, exist_ok=True)

    for img in assets.get("images", []):
        url = img["src"]
        if not url or url.startswith("data:"):
            continue
        ext = re.search(r'\.(png|jpg|jpeg|webp|gif|svg|avif)', url.lower())
        ext = ext.group(0) if ext else ".webp"
        name_hash = hashlib.md5(url.encode()).hexdigest()[:10]
        alt_slug = re.sub(r'[^a-z0-9]', '-', (img.get("alt") or "img").lower())[:30]
        filename = f"{alt_slug}-{name_hash}{ext}"
        filepath = f"{img_dir}/{filename}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                with open(filepath, "wb") as f:
                    f.write(resp.read())
            downloaded[url] = f"/images/{filename}"
            print(f"OK: {filename}")
        except Exception as e:
            print(f"FAIL: {url[:60]} -> {e}")

    return downloaded

def extract_behaviors(page, out_dir):
    behaviors = {}
    # Check header behavior on scroll
    scroll_data = page.evaluate("""
      () => {
        const header = document.querySelector('header, [class*="header"], [class*="navbar"]');
        if (!header) return {};
        const cs = getComputedStyle(header);
        return {
          position: cs.position,
          top: cs.top,
          zIndex: cs.zIndex,
          transition: cs.transition,
          backgroundColor: cs.backgroundColor,
          backdropFilter: cs.backdropFilter
        };
      }
    """)
    behaviors['header_initial'] = scroll_data

    # Extract mobile menu at 390px
    page.set_viewport_size({"width": 390, "height": 844})
    page.wait_for_timeout(1000)
    mobile_data = page.evaluate("""
      () => {
        const hamburger = document.querySelector(
          '[class*="hamburger"], [class*="menu-btn"], [class*="mobile-menu"], button[aria-label*="menu"], button[aria-label*="Menu"], [class*="toggle"]'
        );
        const nav = document.querySelector('nav, header');
        return {
          hamburgerFound: !!hamburger,
          hamburgerClass: hamburger?.className?.toString().slice(0, 200) || '',
          hamburgerAriaLabel: hamburger?.getAttribute('aria-label') || '',
          viewportWidth: window.innerWidth,
          navVisible: nav ? getComputedStyle(nav).display !== 'none' : false
        };
      }
    """)
    behaviors['mobile'] = mobile_data
    page.screenshot(path=f"{out_dir}/screenshots/mobile-full.png", full_page=True)

    # Reset to desktop
    page.set_viewport_size({"width": 1440, "height": 900})
    page.wait_for_timeout(500)

    with open(f"{out_dir}/behaviors.json", "w") as f:
        json.dump(behaviors, f, indent=2)
    return behaviors

print("Starting recon for:", TARGET_URL)
with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path=CHROMIUM_PATH,
        args=["--no-sandbox", "--disable-setuid-sandbox"]
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    print("Navigating...")
    page.goto(TARGET_URL, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(5000)

    # Scroll to trigger lazy loading
    for _ in range(15):
        page.evaluate("window.scrollBy(0, 600)")
        page.wait_for_timeout(400)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(1500)

    # Desktop screenshot
    page.screenshot(path=f"{OUT_DIR}/screenshots/desktop-full.png", full_page=True)
    print("Desktop screenshot saved")

    # Tablet screenshot
    page.set_viewport_size({"width": 768, "height": 1024})
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{OUT_DIR}/screenshots/tablet-full.png", full_page=True)
    print("Tablet screenshot saved")

    # Reset to desktop for extraction
    page.set_viewport_size({"width": 1440, "height": 900})
    page.wait_for_timeout(500)

    print("Extracting tokens...")
    tokens = extract_tokens(page, OUT_DIR)
    print("Extracting content...")
    content = extract_content(page, OUT_DIR)
    print("Discovering assets...")
    assets = discover_assets(page)
    with open(f"{OUT_DIR}/assets.json", "w") as f:
        json.dump(assets, f, indent=2, ensure_ascii=False)
    print(f"Found {len(assets.get('images', []))} images, {len(assets.get('videos', []))} videos")
    print("Extracting behaviors...")
    behaviors = extract_behaviors(page, OUT_DIR)

    browser.close()

print("\nDownloading assets...")
downloaded = download_assets(assets)
with open(f"{OUT_DIR}/downloaded.json", "w") as f:
    json.dump(downloaded, f, indent=2)

print(f"\nRecon complete! Downloaded {len(downloaded)} assets")
print(f"Title: {tokens.get('title', 'N/A')}")
print(f"Sections found: {len(content.get('sections', []))}")
