// lib/data.ts

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface TabFeature {
  icon: string
  title: string
  desc: string
}

export interface TabBadge {
  position: 'top-right' | 'bottom-left' | 'middle-left'
  icon: string
  value: string
  label: string
  color: 'green' | 'blue'
}

export interface TabMetric {
  value: string
  label: string
}

export interface FeatureTab {
  id: string
  label: string
  features: TabFeature[]
  badges: TabBadge[]
  metrics: TabMetric[]
}

export interface Service {
  icon: string
  bg: string
  title: string
  desc: string
  tags: string[]
}

export interface Step {
  step: string
  title: string
  desc: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  gradient: string
}

export interface BlogPost {
  tag: string
  title: string
  desc: string
  date: string
  readTime: string
}

export const SITE = {
  name: 'KOCHub Agency',
  tagline: 'Kết nối KOC đúng ngách. Đúng brand. Đúng kết quả.',
  description: 'Agency chuyên kết nối KOC/KOL ngách Home & Living với các nhãn hàng gia dụng, tẩy rửa, trang trí nhà cửa tại Việt Nam.',
  phone: '0708 789 886',
  email: 'hello@kochub.vn',
  zalo: 'https://zalo.me/kochub',
}

export const STATS = [
  { value: 500,  suffix: '+', label: 'KOC trong network' },
  { value: 50,   suffix: '+', label: 'Campaigns đã chạy' },
  { value: 10,   suffix: 'M+', label: 'Tổng reach đạt được' },
  { value: 30,   suffix: '+', label: 'Nhãn hàng tin dùng' },
]

export const FEATURE_TABS = [
  {
    id: 'booking',
    label: '🤝 KOC Booking',
    features: [
      { icon: '🔍', title: 'Tìm & Match KOC phù hợp', desc: 'Lọc KOC theo ngách, follower, engagement rate, giá — đúng profile brand cần không lãng phí ngân sách.' },
      { icon: '📋', title: 'Brief & Onboarding', desc: 'Soạn brief chuẩn, gửi sample, xác nhận terms — KOC sẵn sàng làm content trong 48h.' },
      { icon: '📊', title: 'Tracking & Báo cáo', desc: 'Theo dõi views, engagement, link click real-time. Báo cáo sau campaign trong 7 ngày.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '📈', value: '+320%', label: 'Engagement tăng', color: 'green' },
      { position: 'bottom-left' as const, icon: '🤝', value: '48h', label: 'Onboard KOC', color: 'blue' },
      { position: 'middle-left' as const, icon: '⭐', value: '4.9★', label: 'Đánh giá brand', color: 'blue' },
    ],
    metrics: [
      { value: '500+', label: 'KOC sẵn sàng' },
      { value: '4.9★', label: 'Brand rating' },
      { value: '48h', label: 'Turn-around' },
      { value: '100%', label: 'Compliant' },
    ],
  },
  {
    id: 'campaign',
    label: '🎯 Campaign Mgmt',
    features: [
      { icon: '🗓', title: 'Lên kế hoạch chiến dịch', desc: 'Xác định KPI, timeline, ngân sách — roadmap chi tiết từ A đến Z trước khi bắt đầu.' },
      { icon: '🎬', title: 'Vận hành content', desc: 'Theo dõi KOC đăng bài đúng hạn, đúng brief. Feedback nhanh, không bỏ sót nội dung.' },
      { icon: '📈', title: 'Tối ưu & Scale', desc: 'Phân tích KOC nào hiệu quả nhất, tăng ngân sách cho creator top performer.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '🎯', value: 'KPI', label: 'Cam kết trong HĐ', color: 'green' },
      { position: 'bottom-left' as const, icon: '⚡', value: '24h', label: 'Phản hồi tối đa', color: 'blue' },
      { position: 'middle-left' as const, icon: '📊', value: 'Live', label: 'Dashboard real-time', color: 'blue' },
    ],
    metrics: [
      { value: '50+', label: 'Campaigns' },
      { value: '95%', label: 'Đúng KPI' },
      { value: '7 ngày', label: 'Báo cáo sau' },
      { value: '24/7', label: 'Support' },
    ],
  },
  {
    id: 'tiktok',
    label: '🎵 TikTok',
    features: [
      { icon: '🔥', title: 'KOC TikTok ngách nhà/vệ sinh', desc: 'Pool 300+ KOC chuyên "clean with me", review sản phẩm gia dụng, before/after — content native, không gượng.' },
      { icon: '🛒', title: 'TikTok Shop Affiliate', desc: 'KOC gắn link sản phẩm trực tiếp, brand theo dõi đơn hàng thực tế từng creator.' },
      { icon: '📡', title: 'Livestream Integration', desc: 'Kết hợp KOC làm co-host trong phiên live của brand — tăng trust, tăng chuyển đổi.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '🎵', value: '300+', label: 'KOC TikTok', color: 'green' },
      { position: 'bottom-left' as const, icon: '🛒', value: '15%', label: 'Commission avg', color: 'blue' },
      { position: 'middle-left' as const, icon: '👁', value: '5M+', label: 'TikTok reach/tháng', color: 'blue' },
    ],
    metrics: [
      { value: '300+', label: 'KOC TikTok' },
      { value: '5M+', label: 'Reach/tháng' },
      { value: '70%', label: 'Completion avg' },
      { value: '15%', label: 'Commission avg' },
    ],
  },
  {
    id: 'analytics',
    label: '📊 Analytics',
    features: [
      { icon: '📉', title: 'Dashboard campaign thực tế', desc: 'CPR, CPV, engagement rate, orders — từng KOC, từng video, real-time.' },
      { icon: '🔬', title: 'So sánh KOC performance', desc: 'Xếp hạng creator theo ROI, biết ai nên hợp tác lần sau.' },
      { icon: '📑', title: 'Báo cáo PDF sau campaign', desc: 'Report đầy đủ trong 7 ngày sau campaign — dùng cho case study và pitching nội bộ.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '📊', value: '≤50đ', label: 'CPR benchmark', color: 'green' },
      { position: 'bottom-left' as const, icon: '🏆', value: 'Top', label: 'KOC ranking', color: 'blue' },
      { position: 'middle-left' as const, icon: '📄', value: 'PDF', label: 'Full report', color: 'blue' },
    ],
    metrics: [
      { value: '≤50đ', label: 'CPR' },
      { value: '≥5%', label: 'Eng. Rate' },
      { value: '7 ngày', label: 'Báo cáo' },
      { value: '200%+', label: 'ROI avg' },
    ],
  },
]

export const SERVICES = [
  { icon: '🤝', bg: '#EEF5FF', title: 'KOC Booking', desc: 'Kết nối brand với KOC phù hợp — đúng ngách Home & Living, đúng follower tier, đúng ngân sách.', tags: ['TikTok', 'Instagram', 'Facebook'] },
  { icon: '🎯', bg: '#FEF3C7', title: 'Campaign Management', desc: 'Vận hành chiến dịch từ A–Z: brief, matching, tracking, báo cáo — cam kết KPI trong hợp đồng.', tags: ['Multi-KOC', 'KPI Cam kết', 'Tracking'] },
  { icon: '📊', bg: '#DCFCE7', title: 'Analytics & Báo cáo', desc: 'Dashboard real-time theo dõi CPR, views, engagement, đơn hàng — minh bạch từng con số.', tags: ['CPR', 'ROI', 'Dashboard'] },
  { icon: '📋', bg: '#FCE7F3', title: 'Brief Consulting', desc: 'Tư vấn viết brief chuẩn, set KPI thực tế, chiến lược KOC phù hợp với từng ngành hàng.', tags: ['Consulting', 'Strategy', 'Brief'] },
  { icon: '🏠', bg: '#EDE9FE', title: 'Home & Living Specialist', desc: 'Pool KOC chuyên biệt: dọn nhà, review gia dụng, before/after tẩy rửa — content authentic, không gượng.', tags: ['Home & Living', 'Niche KOC', 'Authentic'] },
  { icon: '⚖️', bg: '#FEF2F2', title: 'Pháp lý & Compliance', desc: 'Đảm bảo KOC gắn nhãn quảng cáo đúng Luật QC 2026 — brand an toàn pháp lý, không rủi ro.', tags: ['Luật QC 2026', 'Compliance', 'Safe'] },
]

export const STEPS = [
  { step: '01', title: 'Brief & Tư vấn', desc: 'Gặp 1:1, phân tích sản phẩm, xác định tệp KOC phù hợp và KPI campaign.' },
  { step: '02', title: 'Match KOC', desc: 'Lọc từ database 500+ KOC theo ngách, tier, engagement — present shortlist trong 48h.' },
  { step: '03', title: 'Vận hành', desc: 'Onboard KOC, gửi brief & sample, theo dõi content, đảm bảo đúng hạn đúng chuẩn.' },
  { step: '04', title: 'Report & Tối ưu', desc: 'Báo cáo đầy đủ sau campaign, lưu KOC hiệu quả cho lần sau.' },
]

export const LOGOS = [
  '🧴 Clean & Care', '🏠 HomeHaven VN', '🪣 ProClean', '🌿 EcoHome',
  '✨ ShineMax', '🧽 KitchenPro', '🪴 GreenNest', '🛁 BathBliss',
  '🧹 FloorKing', '🪟 ClearView', '🏡 CozyLife', '🍳 KitchenLove',
]

export const TESTIMONIALS = [
  {
    quote: 'Sau 1 campaign với 15 KOC Home & Living, sản phẩm tẩy kính của chúng tôi đạt 2.3M views TikTok. Agency matching rất chính xác, KOC làm content natural không gượng chút nào.',
    name: 'Trần Minh Khoa', role: 'Brand Manager · CleanPro Vietnam',
    gradient: 'linear-gradient(135deg, #1B6DEA, #0A2240)',
  },
  {
    quote: 'Lần đầu làm KOC campaign, agency hỗ trợ từ brief đến báo cáo. CPR chỉ 38đ/người — thấp hơn nhiều so với chạy ads. Sẽ tiếp tục hợp tác dài hạn.',
    name: 'Nguyễn Thu Hà', role: 'Owner · HomeDecor Shop',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
  },
  {
    quote: 'Điều tôi thích nhất là dashboard real-time — xem được KOC nào hiệu quả ngay trong ngày đăng. Báo cáo PDF sau campaign rất chuyên nghiệp, dùng để thuyết phục sếp dễ lắm.',
    name: 'Lê Thanh Bình', role: 'Marketing Director · EcoHome VN',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
  },
]

export const BLOG_POSTS = [
  {
    tag: 'Cẩm nang TikTok',
    title: 'Thuật toán TikTok 2026: Tất cả những gì bạn cần biết',
    desc: 'Completion rate, CHR, tín hiệu xếp hạng mới — cập nhật đầy đủ nhất cho creator và brand.',
    date: '15/03/2026',
    readTime: '8 phút',
  },
  {
    tag: 'Tips cho Brand',
    title: 'Cách viết brief KOC hiệu quả — 5 điều brand hay bỏ qua',
    desc: 'Brief quá cứng nhắc giết chết authentic content. Đây là công thức brief đúng chuẩn.',
    date: '12/03/2026',
    readTime: '5 phút',
  },
  {
    tag: 'Tips cho KOC',
    title: 'Luật Quảng cáo 2026: KOC cần biết gì để không bị phạt',
    desc: 'Gắn nhãn như thế nào, khai báo thu nhập ra sao — tổng hợp đầy đủ cho creator.',
    date: '10/03/2026',
    readTime: '6 phút',
  },
]
