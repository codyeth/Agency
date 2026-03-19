# PROMPT FIX GIAO DIỆN — KOCHub Agency vs Haravan.com
# Tạo từ so sánh trực tiếp 2 website (March 2026)

---

## TÓM TẮT VẤN ĐỀ

Sau khi so sánh trực tiếp agency-delta-rose.vercel.app với haravan.com,
phát hiện **7 nhóm vấn đề** cần sửa. Dưới đây là prompt hoàn chỉnh để paste vào AI.

---

## PROMPT ĐỂ GỬI CHO AI (paste toàn bộ phần này)

---

Refactor toàn bộ giao diện website theo đúng design system của haravan.com.
Đây là danh sách vấn đề cụ thể cần sửa, theo thứ tự ưu tiên:

---

### VẤN ĐỀ 1 — NAVBAR: Logo quá to, nav links thiếu gap

**Hiện tại:**
- Logo "KOCHub Agency": font-size 20px, font-weight 600 → QUÁ TO và QUÁ ĐẬM
- Nav links (Dịch vụ, KOC Network...): các link dính sát nhau, không có gap đủ
- Nav links color: mặc định sai (đang là blue #2463EB thay vì #111827)

**Cần sửa thành:**
```css
/* Logo text */
.nav-logo-text {
  font-size: 16px;       /* giảm từ 20px xuống 16px */
  font-weight: 700;
  color: #111827;
}

/* Nav links container */
.nav-links-wrapper {
  display: flex;
  gap: 8px;              /* gap giữa các link items */
  align-items: center;
}

/* Nav links */
.nav-link {
  font-size: 16px;
  font-weight: 400;      /* KHÔNG phải 600 */
  color: #111827;        /* dark text, không phải blue */
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.15s;
}
.nav-link:hover {
  background: #EEF5FF;
  color: #2463EB;
}

/* Navbar height */
.navbar {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

---

### VẤN ĐỀ 2 — HERO: Quá nhiều khoảng trắng phía dưới stats card

**Hiện tại:**
- Hero section có `min-h-[680px]` nhưng nội dung chỉ chiếm ~420px → còn ~260px trống phía dưới
- Stats card (500+ / 10M+ / 95%) bị đẩy quá thấp
- Confetti particles bay dưới màn hình không thấy được

**Cần sửa thành:**
```
- Giảm min-height hero xuống còn fit-content hoặc min-h-[560px]
- Stats card: margin-top auto hoặc đặt sát dưới hero content
- Padding top của hero: 80px (từ dưới navbar)
- Padding bottom của hero: 0 (stats card overlap vào section tiếp theo)
- Stats card: margin-bottom: -52px để overlap

Haravan pattern:
  Hero section height: ~580px total
  Content center: padding-top 72px từ top of hero
  Promo card: overlap 52px vào section bên dưới
```

---

### VẤN ĐỀ 3 — SECTIONS: Spacing không hiển thị (BUG NGHIÊM TRỌNG)

**Hiện tại:**
- Các section có class `pt-[80px] pb-[125px]` nhưng computed padding = 0px
- Nguyên nhân: Tailwind arbitrary values `pt-[80px]` có thể không được compile
- Hệ quả: tất cả sections dính vào nhau, không có breathing room

**Cần sửa thành:**
```
OPTION A — Nếu dùng Tailwind v3: Thêm vào tailwind.config.js
  content: ['./src/**/*.{js,ts,jsx,tsx}']  ← đảm bảo scan đúng files

OPTION B — Thay thế Tailwind arbitrary bằng utility classes chuẩn:
  Thay pt-[80px]  → pt-20  (= 80px)
  Thay pb-[125px] → pb-32  (= 128px, gần với 125px)
  Thay px-10      → px-10  (= 40px, ok)

OPTION C — Dùng inline style hoặc CSS module:
  style={{ paddingTop: '80px', paddingBottom: '125px', paddingLeft: '40px', paddingRight: '40px' }}

Spacing chuẩn Haravan:
  Section padding-top:    80px
  Section padding-bottom: 125px
  Section padding-x:      40px (left + right)
  Container max-width:    1280px
  Container margin:       0 auto
```

---

### VẤN ĐỀ 4 — TYPOGRAPHY HIERARCHY: Không có sự phân cấp rõ ràng

**Hiện tại:**
- H2 "Mọi thứ bạn cần cho KOC campaign": 48px ✓ (đúng)
- H2 "Blog & Cẩm nang": cũng 48px nhưng nội dung không xứng tầm
- H3 feature items "Tìm & Match KOC phù hợp": cần kiểm tra size
- Blog card titles: chưa đo được nhưng nhìn quá nhỏ

**Cần sửa thành:**
```css
/* H1 - Hero title */
h1 {
  font-size: 48px;
  font-weight: 500;    /* Haravan: 500, không phải 700/800 */
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* H2 - Section headings */
h2 {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* H3 - Feature items, card titles */
h3 {
  font-size: 28px;     /* Haravan đo: 28px */
  font-weight: 500;
  line-height: 1.2;
}

/* Body text */
p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #4B5563;
}

/* Blog card title - KHÁC với H3 thường */
.blog-card-title {
  font-size: 18px;     /* nhỏ hơn H3 vì là card compact */
  font-weight: 600;
  line-height: 1.4;
  color: #111827;
}

/* Blog card excerpt */
.blog-card-excerpt {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Blog card meta */
.blog-card-meta {
  font-size: 12px;
  color: #9CA3AF;
}
```

---

### VẤN ĐỀ 5 — SERVICES SECTION: Layout bị vỡ / thiếu grid

**Hiện tại (nhìn từ screenshot):**
- "KOC Booking", "Campaign Mgmt"... bị stack dọc thay vì grid ngang
- Text "Kết nối brand với KOC phù hợp..." bị rớt xuống dưới icon mà không wrap đúng

**Cần sửa thành:**
```css
/* Services grid - 3 cột */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
}

/* Service card */
.service-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E5E7EB;
  transition: all 0.2s;
}
.service-card:hover {
  border-color: #2463EB;
  box-shadow: 0 8px 32px rgba(36,99,235,0.12);
  transform: translateY(-4px);
}

/* Service icon */
.service-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* Service title */
.service-title {
  font-size: 20px;     /* giữa H3(28px) và body(16px) */
  font-weight: 600;
  margin-bottom: 10px;
  color: #111827;
}

/* Service tags */
.service-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.service-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
  background: #EEF5FF;
  color: #2463EB;
}
```

---

### VẤN ĐỀ 6 — DUAL COLUMN SECTION (Booking + Form): Tỷ lệ sai, form thiếu style

**Hiện tại:**
- Left column (text) và Right column (form) chưa balance đúng
- Form inputs quá nhỏ, thiếu padding
- Button "Gửi đăng ký" màu đúng nhưng có thể chưa đủ height

**Cần sửa thành:**
```css
/* 2-column layout */
.dual-col {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 64px;
  align-items: start;
}

/* Left: H2 heading */
.dual-col h2 {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;
}

/* Left: body text */
.dual-col p {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Left: checklist */
.checklist li {
  font-size: 16px;
  font-weight: 400;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

/* Right: form card */
.form-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 36px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}

/* Form card heading */
.form-card h3 {
  font-size: 24px;     /* KHÔNG phải 28px — form card nhỏ hơn */
  font-weight: 600;
  margin-bottom: 8px;
}

/* Form card sub */
.form-card p {
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 24px;
  line-height: 1.5;
}

/* Inputs */
.form-card input {
  width: 100%;
  height: 48px;         /* Haravan: 48px height */
  padding: 0 16px;
  font-size: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin-bottom: 12px;
  outline: none;
  transition: border-color 0.15s;
}
.form-card input:focus {
  border-color: #2463EB;
}
.form-card input::placeholder {
  color: #9CA3AF;
}

/* Submit button */
.form-card button[type="submit"] {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  background: #2463EB;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s;
}
.form-card button:hover {
  background: #1D4FD7;
}
```

---

### VẤN ĐỀ 7 — CTA SECTION + FOOTER: Padding và font chưa đúng

**Hiện tại:**
- CTA "Bắt đầu campaign KOC đầu tiên" — cần kiểm tra padding
- Footer background color chưa đủ đậm, font links chưa đúng size

**Cần sửa thành:**
```css
/* CTA section */
.cta-section {
  padding: 80px 40px 125px;
  background: linear-gradient(155deg, #2463EB 0%, #0A2240 100%);
  text-align: center;
}

.cta-section h2 {
  font-size: 48px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;
}

.cta-section p {
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  margin-bottom: 36px;
}

.cta-section .btn-group {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* CTA buttons */
.btn-cta-white {
  height: 48px;
  padding: 0 28px;
  border-radius: 64px;
  background: #ffffff;
  color: #2463EB;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-cta-outline {
  height: 48px;
  padding: 0 28px;
  border-radius: 64px;
  background: rgba(255,255,255,0.12);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  border: 1.5px solid rgba(255,255,255,0.35);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* Footer */
footer {
  background: #060F1E;    /* dark navy — đậm hơn */
  padding: 64px 40px 32px;
}

.footer-logo {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
}

.footer-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 240px;
  margin-bottom: 24px;
}

.footer-col-title {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffffff;
  margin-bottom: 16px;
}

.footer-col a {
  display: block;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.15s;
}
.footer-col a:hover {
  color: #ffffff;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 24px;
  margin-top: 48px;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## TỔNG HỢP: THỨ TỰ SỬA (ưu tiên cao → thấp)

```
1. [CRITICAL] Fix sections padding không apply (VĐ 3)
   → Đây là root cause làm layout trông "xẹp"
   → Thay pt-[80px] bằng pt-20 hoặc inline style

2. [HIGH] Fix hero khoảng trắng thừa phía dưới (VĐ 2)
   → Giảm min-height, căn stats card sát nội dung

3. [HIGH] Fix services grid bị vỡ (VĐ 5)
   → Đảm bảo grid-template-columns: repeat(3,1fr) apply

4. [MEDIUM] Fix navbar logo size + nav link spacing (VĐ 1)
   → Logo text: 16px weight 700
   → Nav links: color #111827, gap 8px

5. [MEDIUM] Fix typography hierarchy (VĐ 4)
   → Blog card title: 18px weight 600
   → Feature H3: 28px weight 500

6. [MEDIUM] Fix dual column form card (VĐ 6)
   → Form card heading: 24px
   → Input height: 48px

7. [LOW] Fix CTA + Footer styling (VĐ 7)
   → Footer bg: #060F1E
   → Footer links: 13px
```

---

## QUICK FIX — CSS Override (nếu cần patch nhanh)

Nếu không muốn sửa từng component, add đoạn này vào globals.css:

```css
/* ===== HARAVAN-MATCHED OVERRIDES ===== */

/* Sections spacing */
section {
  padding-top: 80px !important;
  padding-bottom: 125px !important;
}
section.hero-section {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: 560px !important;
}

/* Typography */
h1 { font-size: 48px !important; font-weight: 500 !important; line-height: 1.2 !important; }
h2 { font-size: 48px !important; font-weight: 500 !important; line-height: 1.2 !important; }
h3 { font-size: 28px !important; font-weight: 500 !important; line-height: 1.2 !important; }
p  { font-size: 16px !important; line-height: 1.5 !important; }

/* Nav */
nav a:not([class*="logo"]) {
  font-size: 16px !important;
  font-weight: 400 !important;
  color: #111827 !important;
}

/* Buttons */
button, .btn, [class*="btn"] {
  height: 48px;
  border-radius: 64px;
  font-size: 16px;
}

/* Container */
.container, [class*="max-w-"] {
  max-width: 1280px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
```

---

*So sánh trực tiếp: agency-delta-rose.vercel.app vs haravan.com*
*Generated: March 2026*
