# TYPOGRAPHY & SPACING SPEC — Clone từ haravan.com
# Áp dụng cho: KOCHub Agency (và bất kỳ website nào muốn layout tương tự)
# Đo trực tiếp bằng DevTools từ haravan.com — March 2026

---

## ❌ VẤN ĐỀ CỦA WEBSITE HIỆN TẠI (nhìn vào ảnh KOCHub)

1. Font chữ quá nhỏ và không có hierarchy rõ ràng
2. Heading "Cần booking KOC cho chiến dịch tiếp theo?" quá lớn/nhỏ không đúng scale
3. Body text size không nhất quán
4. Spacing giữa các section không đủ "thở"
5. Card/form không có đủ padding
6. Blog cards font size sai
7. Màu chữ và weight không đúng hierarchy

---

## ✅ TYPOGRAPHY SYSTEM ĐÚNG CHUẨN (đo từ Haravan)

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
/* Haravan dùng Inter — không phải Be Vietnam Pro */
```

### Type Scale

```css
/* ── HEADING 1 — Hero title (to nhất trang) ── */
h1, .hero-title {
  font-size: 48px;
  font-weight: 500;          /* KHÔNG phải 700/800/900 — Haravan dùng 500 */
  line-height: 1.2;          /* 57.6px / 48px = 1.2 */
  letter-spacing: normal;
  color: #111827;            /* hoặc #fff nếu trên nền tối */
}

/* ── HEADING 2 — Section headings ── */
h2, .section-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  color: #111827;
}

/* ── HEADING 3 — Feature item titles, card titles ── */
h3, .feature-title, .card-title {
  font-size: 28px;
  font-weight: 500;
  line-height: 1.2;          /* 33.6px / 28px */
  color: #111827;
}

/* ── TAB NAVIGATION PILLS ── */
.tab-btn, .tab-pill {
  font-size: 18px;
  font-weight: 400;
  padding: 12px 16px;
  border-radius: 50px;       /* pill shape */
}
.tab-btn.active {
  background: #2463EB;
  color: #ffffff;
  border: 1px solid #2463EB;
}
.tab-btn:not(.active) {
  background: transparent;
  color: #111827;
  border: 1px solid #2463EB;
}

/* ── BODY TEXT / PARAGRAPH ── */
p, .body-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;          /* 20.8px / 16px */
  color: #4B5563;
}

/* ── SMALL / CAPTION ── */
.caption, .small-text, label {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  color: #4B5563;
}

/* ── EYEBROW / LABEL trên heading ── */
.eyebrow, .section-label {
  font-size: 15px;
  font-weight: 400;          /* Haravan dùng 400, không bold */
  letter-spacing: normal;
  text-transform: uppercase;
  color: #2463EB;
}

/* ── NAV LINKS ── */
.nav-link {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;
  color: #111827;
}
.nav-link:hover {
  color: #2463EB;
}

/* ── FOOTER ── */
footer a, .footer-link {
  font-size: 16px;
  font-weight: 400;
  color: #007BFF;            /* Haravan footer links: #007BFF */
}
footer h3, footer h4, .footer-heading {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}
```

---

## ✅ BUTTON SPECS

```css
/* Primary button (filled blue) */
.btn-primary {
  font-size: 16px;
  font-weight: 400;          /* Haravan: 400, không bold */
  height: 48px;
  padding: 0 24px;
  border-radius: 64px;       /* = pill */
  background: #2463EB;
  color: #ffffff;
  border: none;
}

/* Outline button (Đăng nhập) */
.btn-outline {
  font-size: 16px;
  font-weight: 400;
  height: 48px;
  padding: 0 16px;
  border-radius: 64px;
  background: transparent;
  color: #111827;
  border: 1px solid #111827;
}

/* CTA với arrow icon (Bắt đầu miễn phí ↗) */
.btn-cta {
  font-size: 16px;
  font-weight: 400;
  height: 48px;
  padding: 0 24px;
  border-radius: 64px;
  background: #2463EB;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

---

## ✅ SPACING / LAYOUT SYSTEM

```css
/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;           /* horizontal padding */
}

/* Navbar */
.navbar {
  height: 80px;              /* Haravan: 80px, KHÔNG phải 64px */
  padding: 0 40px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Section padding — đây là điểm khác biệt lớn nhất */
.section {
  padding-top: 80px;
  padding-bottom: 125px;
}
/* Haravan dùng padding-bottom: 125px — KHÔNG phải 80px hay 96px */

/* Section với background light blue */
.section-light {
  background: #E1F3FE;       /* Haravan blue light: rgb(225,243,254) */
  padding: 80px 0 125px;
}

/* Section với background navy/blue */
.section-dark {
  background: #1D4FD7;       /* rgb(29,79,215) */
  padding: 80px 0 125px;
}

/* Section với background gray */
.section-gray {
  background: #F9FAFB;       /* rgb(249,250,251) */
}

/* Gap giữa section heading và content */
.section-header {
  margin-bottom: 48px;
}

/* Gap giữa eyebrow label và heading */
.section-eyebrow {
  margin-bottom: 12px;
}
```

---

## ✅ CARD SPECS

```css
/* Feature/Service cards */
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E5E7EB;
}
.card:hover {
  border-color: #2463EB;
  box-shadow: 0 8px 32px rgba(36,99,235,0.12);
}

/* Tab feature item (list bên phải khi click tab) */
.feature-item {
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
}
.feature-item.active,
.feature-item:hover {
  background: #EFF6FF;
  border-color: #2463EB;
}
.feature-item h3 {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 8px;
}
.feature-item p {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.5;
}
```

---

## ✅ COLOR SYSTEM

```css
:root {
  /* Primary */
  --blue-primary:   #2463EB;   /* rgb(36,99,235) — Haravan main blue */
  --blue-dark:      #1D4FD7;   /* rgb(29,79,215) — sections dark */
  --blue-light:     #E1F3FE;   /* rgb(225,243,254) — sections light */
  --blue-link:      #007BFF;   /* links và highlights */

  /* Text */
  --text-primary:   #111827;   /* rgb(17,24,39) — headings */
  --text-secondary: #4B5563;   /* rgb(75,85,99) — body */
  --text-muted:     #9CA3AF;   /* placeholders, captions */

  /* Backgrounds */
  --bg-white:       #FFFFFF;
  --bg-light:       #F9FAFB;   /* rgb(249,250,251) */
  --bg-blue-light:  #E1F3FE;
  --bg-blue-dark:   #1D4FD7;
  --bg-navy:        #0A2240;   /* footer và deep sections */
}
```

---

## ✅ ÁP DỤNG VÀO KOCHUB AGENCY CỤ THỂ

Nhìn vào ảnh KOCHub, đây là những gì cần fix:

### 1. HERO SECTION
```css
/* "Cần booking KOC cho chiến dịch tiếp theo?" */
.hero h1 {
  font-size: 48px;           /* Đổi về 48px */
  font-weight: 500;          /* Đổi về 500, không phải 700 */
  line-height: 1.2;
  color: #111827;
}

/* "Tư vấn miễn phí trong 24h..." */
.hero p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #4B5563;
}

/* Checkmark list items */
.hero-checklist li {
  font-size: 16px;
  font-weight: 400;
  color: #111827;
  line-height: 1.5;
}
```

### 2. EYEBROW LABELS
```css
/* "DÀNH CHO BRAND", "DÀNH CHO KOC", "KIẾN THỨC NGÀNH" */
.eyebrow {
  font-size: 12px;           /* nhỏ hơn, không to bằng body */
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2463EB;
}
```

### 3. FORM SECTION (bên phải)
```css
.form-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E5E7EB;
}
.form-card h2 {
  font-size: 28px;           /* "Đăng ký nhận brand deal" */
  font-weight: 500;
  margin-bottom: 8px;
}
.form-card p {
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 20px;
}
.form-card input {
  font-size: 16px;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 12px;
}
.form-card button {
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  background: #2463EB;
  color: white;
  border-radius: 8px;
  width: 100%;
}
```

### 4. BLOG SECTION
```css
/* "Blog & Cẩm nang" */
.blog-section h2 {
  font-size: 48px;
  font-weight: 500;
}

/* "Cẩm nang TikTok", "Tips cho Brand" — category tags */
.blog-tag {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #2463EB;
}

/* Blog card title */
.blog-card h3 {
  font-size: 18px;           /* KHÔNG phải 28px — blog cards nhỏ hơn */
  font-weight: 600;
  line-height: 1.4;
  color: #111827;
}

/* Blog card excerpt */
.blog-card p {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
}

/* Blog card meta (ngày + thời gian đọc) */
.blog-card .meta {
  font-size: 12px;
  color: #9CA3AF;
}
```

### 5. CTA BOTTOM SECTION ("Bắt đầu campaign KOC đầu tiên")
```css
.cta-section {
  padding: 80px 0 125px;     /* Đúng spacing Haravan */
  background: #1D4FD7;
}
.cta-section h2 {
  font-size: 48px;
  font-weight: 500;
  color: #ffffff;
}
.cta-section p {
  font-size: 16px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 32px;
}
```

### 6. FOOTER
```css
footer {
  background: #0A2240;
  padding: 64px 0 32px;
}
.footer-brand-name {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}
.footer-brand-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
}
.footer-col-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.footer-col a {
  font-size: 14px;           /* Haravan đo được 16px, nhưng footer thường 14px */
  color: rgba(255,255,255,0.6);
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
}
.footer-col a:hover {
  color: #ffffff;
}
```

---

## ✅ GRID / COLUMN LAYOUT

```css
/* 2-column hero layout (text left + form right) */
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  align-items: start;
}

/* Blog grid (3 equal columns) */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Services grid (3 columns) */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Feature tabs (tabs left side vertical OR top horizontal) */
/* Haravan: horizontal tabs + 2-col panel (image left, features right) */
.feature-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
```

---

## ✅ RESPONSIVE (mobile breakpoints)

```css
@media (max-width: 768px) {
  /* Scale down headings */
  h1, h2, .section-title { font-size: 32px; }
  h3, .feature-title { font-size: 22px; }

  /* Stack grids */
  .hero-grid,
  .blog-grid,
  .services-grid,
  .feature-panel { grid-template-columns: 1fr; }

  /* Reduce section padding */
  .section { padding: 48px 0 64px; }

  /* Container horizontal padding */
  .container { padding: 0 20px; }
}

@media (max-width: 480px) {
  h1, h2, .section-title { font-size: 28px; }
  .section { padding: 40px 0 56px; }
}
```

---

## ✅ PROMPT ĐỂ GỬI CHO AI CODE

Paste đoạn này vào Claude Code / Cursor:

```
Refactor toàn bộ CSS typography và spacing của website theo các thông số sau
(đo chính xác từ haravan.com):

FONT FAMILY: Inter (không phải Be Vietnam Pro hay Roboto)

FONT SIZES:
- Hero H1: 48px / weight 500 / line-height 1.2
- Section H2: 48px / weight 500 / line-height 1.2  
- Feature H3: 28px / weight 500 / line-height 1.2
- Tab pill text: 18px / weight 400
- Body/paragraph: 16px / weight 400 / line-height 1.3
- Nav links: 16px / weight 400
- Buttons: 16px / weight 400
- Small/caption: 14px / weight 400
- Eyebrow labels: 12px / weight 600 / uppercase / letter-spacing 0.08em
- Blog card titles: 18px / weight 600
- Footer links: 14px / weight 400

HEIGHTS:
- Navbar: 80px (KHÔNG phải 64px)
- Buttons: 48px height
- Form inputs: 48px height

SPACING:
- Section padding: 80px top, 125px bottom (KHÔNG phải 96px)
- Container max-width: 1280px, padding-x: 40px
- Card padding: 32px
- Gap giữa grid items: 24px (blog), 20px (services)

COLORS:
- Blue primary: #2463EB
- Blue dark (sections): #1D4FD7
- Blue light (sections): #E1F3FE
- Text primary: #111827
- Text secondary: #4B5563
- Background gray: #F9FAFB

BORDER RADIUS:
- Buttons: 64px (pill)
- Tab pills: 50px
- Cards: 16px
- Inputs: 8px

Giữ nguyên tất cả nội dung và HTML structure, chỉ thay đổi CSS values.
```
