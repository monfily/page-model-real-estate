from playwright.sync_api import sync_playwright
import json, os

TARGET_URL = "https://www.chavesnamao.com.br/"
CHROMIUM_PATH = "/home/runner/workspace/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome"

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path=CHROMIUM_PATH,
        args=["--no-sandbox", "--disable-setuid-sandbox"]
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(TARGET_URL, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(5000)

    # Scroll to load lazy content
    for _ in range(20):
        page.evaluate("window.scrollBy(0, 400)")
        page.wait_for_timeout(300)

    data = page.evaluate("""
      () => {
        // Get full logo SVG
        const header = document.querySelector('header');
        const logoSvg = header?.querySelector('svg')?.outerHTML || '';
        const logoImg = header?.querySelector('img')?.src || '';
        
        // Get full footer content
        const footer = document.querySelector('footer');
        const footerHtml = footer?.innerHTML?.slice(0, 10000) || '';
        const footerText = footer?.innerText?.trim() || '';

        // Get the full page text to understand sections
        const article = document.querySelector('article');
        const sections = article ? [...article.querySelectorAll('section, div[class*="Section"], div[class*="section"]')].slice(0, 20).map(s => ({
          tag: s.tagName,
          classes: s.className?.toString().slice(0, 200) || '',
          headings: [...s.querySelectorAll('h1,h2,h3')].map(h => h.innerText.trim()).slice(0, 3),
          text: s.innerText?.slice(0, 500) || '',
          height: s.offsetHeight
        })).filter(s => s.height > 50) : [];

        // Get hero section specifically
        const hero = document.querySelector('[class*="hero"], [class*="Hero"]');
        const heroData = hero ? {
          classes: hero.className?.toString(),
          bgImage: getComputedStyle(hero).backgroundImage,
          height: hero.offsetHeight,
          text: hero.innerText?.slice(0, 500),
          img: hero.querySelector('img')?.src
        } : null;

        // Get the announce/ads section
        const adsSection = document.querySelector('[class*="ads"], [class*="Ads"], [class*="anunci"]');

        // Get vehicle section
        const vehicleSection = document.querySelector('[class*="vehicle"], [class*="Vehicle"], [class*="veicul"]');

        // Get app section
        const appSection = document.querySelector('[class*="app"], [class*="App"]');
        const appData = appSection ? {
          classes: appSection.className?.toString().slice(0, 200),
          text: appSection.innerText?.trim().slice(0, 500),
          images: [...appSection.querySelectorAll('img')].map(i => ({src: i.src, alt: i.alt}))
        } : null;

        // Get all section headings in order 
        const allHeadings = [...document.querySelectorAll('h1, h2, h3')].map(h => ({
          level: h.tagName,
          text: h.innerText.trim(),
          parentClass: h.parentElement?.className?.toString().slice(0, 100) || ''
        }));

        // Get nav buttons/links in header more carefully
        const navItems = [...(document.querySelectorAll('header nav a, header a') || [])].map(a => ({
          text: a.innerText.trim(),
          href: a.getAttribute('href') || ''
        })).filter(l => l.text.length > 0 && l.text.length < 50);

        // Get all buttons
        const buttons = [...document.querySelectorAll('button')].slice(0, 20).map(b => ({
          text: b.innerText.trim(),
          classes: b.className?.toString().slice(0, 100) || ''
        })).filter(b => b.text);

        return {
          logoSvg: logoSvg.slice(0, 50000),
          logoImg,
          footerText,
          sections,
          heroData,
          appData,
          allHeadings,
          navItems,
          buttons
        };
      }
    """)
    
    with open("clone-data/extra.json", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    browser.close()

print("Done!")
print("Logo SVG length:", len(data.get('logoSvg', '')))
print("Footer text length:", len(data.get('footerText', '')))
print("Sections found:", len(data.get('sections', [])))
print("All headings:", [(h['level'], h['text'][:50]) for h in data.get('allHeadings', [])])
print("Buttons:", [(b['text'][:30]) for b in data.get('buttons', [])])
