import {
  Trophy,
  BadgeCheck,
  Lock,
  Phone,
  Eye,
  Lightbulb,
  Rocket,
  Search,
  Link2,
  Package,
  ShieldCheck,
  Zap,
  Handshake,
  Heart,
  Pill,
  Hospital,
  Clock,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

// ─── MAP CONFIG ────────────────────────────────────────────────────────────
export const MAP_LAT = 31.2653;
export const MAP_LNG = 32.3019;

// ─── NAVIGATION ────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "الرئيسية",   href: "#" },
  { label: "الأدوية",    href: "#" },
  { label: "من نحن",     href: "#" },
  { label: "تواصل معنا", href: "#" },
];

// ─── TRUST BADGES ──────────────────────────────────────────────────────────
export interface TrustItem {
  icon: LucideIcon;
  text: string;
}
export const TRUST: TrustItem[] = [
  { icon: Trophy,      text: "أفضل سعر مضمون" },
  { icon: BadgeCheck,  text: "منتجات معتمدة" },
  { icon: Lock,        text: "بيانات آمنة 100%" },
  { icon: Phone,       text: "دعم على مدار اليوم" },
];

// ─── TICKER ────────────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  "أدوية موثوقة", "توصيل سريع", "أسعار شفافة",
  "صيدليات شريكة", "مصادر معتمدة", "خدمة مستمرة",
];

// ─── STORY TIMELINE ────────────────────────────────────────────────────────
export interface TimelineItem {
  tag: string;
  title: string;
  body: string;
  icon: LucideIcon;
}
export const TIMELINE: TimelineItem[] = [
  {
    tag:   "المشكلة",
    title: "كنا بنشوف الناس تتعب وهي بتدور",
    body:  "مريض محتاج دواء بعينه، يمشي صيدلية ورا صيدلية، ويرجع خايب. المشكلة مش في الدواء — المشكلة في المعلومة.",
    icon:  Eye,
  },
  {
    tag:   "الفكرة",
    title: "الحل مش دليل — الحل وسيط ذكي",
    body:  "قررنا نعمل حاجة مختلفة: منصة تربط المريض بالصيدلية بالموّرد في خط واحد مباشر، من غير تضييع وقت.",
    icon:  Lightbulb,
  },
  {
    tag:   "الحاضر",
    title: "منظومة كاملة وشغّالة",
    body:  "+500 منتج، صيدليات شريكة، وتوريد مباشر — كل ده في مكان واحد مع ضمان الجودة والسعر العادل.",
    icon:  Rocket,
  },
];

// ─── HOW WE WORK (PILLARS) ─────────────────────────────────────────────────
export interface PillarItem {
  num: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
}
export const PILLARS: PillarItem[] = [
  {
    num:   "01",
    icon:  Search,
    title: "ابحث بثقة",
    body:  "ادخل اسم الدواء أو المادة الفعّالة — هتلاقي كل المعلومات الطبية، البدائل المتاحة، والصيدليات القريبة منك فوراً.",
    tag:   "للمريض",
  },
  {
    num:   "02",
    icon:  Link2,
    title: "وصل بسرعة",
    body:  "منصتنا بتوصّلك بالصيدلية اللي عندها الدواء مباشرة — من غير ما تمشي في دوامة محلات فاضية.",
    tag:   "للجميع",
  },
  {
    num:   "03",
    icon:  Package,
    title: "وفّر للصيدلية",
    body:  "الصيدليات بتطلب احتياجاتها منّا مباشرة — مصادر موثوقة، أسعار الجملة، توصيل منتظم لبابهم.",
    tag:   "للصيدليات",
  },
];

// ─── VALUES ────────────────────────────────────────────────────────────────
export interface ValueItem {
  icon: LucideIcon;
  title: string;
  body: string;
}
export const VALUES: ValueItem[] = [
  { icon: ShieldCheck, title: "الموثوقية أولاً",        body: "كل منتج بيتحقق منه قبل ما يدخل منصتنا. مش بنسيّب أي حاجة من غير مصدر موثوق ومعتمد." },
  { icon: Zap,         title: "السرعة مش رفاهية",        body: "في الصحة، التأخير له تمن. بنشتغل على إن الدواء يوصل لصاحبه في أسرع وقت ممكن." },
  { icon: Handshake,   title: "الشفافية من غير مجاملة", body: "السعر واضح، المصدر واضح، المعلومة صح. مفيش كلام فارغ أو تضليل." },
  { icon: Heart,       title: "المريض مش عميل",          body: "بنتعامل مع كل حالة على إنها إنسان محتاج مساعدة — مش رقم في فاتورة." },
];

// ─── STATS ─────────────────────────────────────────────────────────────────
export const STATS = [
  { num: 500, suffix: "+", label: "منتج دوائي",  sub: "في قاعدة البيانات" },
  { num: 100, suffix: "%", label: "جودة مضمونة", sub: "مصادر موثوقة ومعتمدة" },
  { num: 24,  suffix: "h", label: "توصيل سريع",  sub: "متوسط وقت التوريد" },
  { num: 3,   suffix: "+", label: "سنوات خبرة",  sub: "في السوق الدوائي" },
];

// ─── AUDIENCE ──────────────────────────────────────────────────────────────
export interface AudienceItem {
  icon: LucideIcon;
  title: string;
  lines: string[];
  cta: string;
}
export const AUDIENCE: AudienceItem[] = [
  {
    icon:  Users,
    title: "المريض والأهل",
    lines: ["ابحث بالاسم أو المادة الفعّالة", "شوف البدائل المتاحة فوراً", "اعرف أقرب صيدلية عندها الدواء"],
    cta:   "ابدأ البحث",
  },
  {
    icon:  Hospital,
    title: "الصيدلية الشريكة",
    lines: ["اطلب احتياجاتك بضغطة واحدة", "أسعار الجملة من المصدر مباشرة", "توصيل منتظم لباب الصيدلية"],
    cta:   "انضم كصيدلية",
  },
];

// ─── FOUNDER MINI STATS ────────────────────────────────────────────────────
export interface FounderStat {
  icon: LucideIcon;
  val: string;
  txt: string;
}
export const FOUNDER_STATS: FounderStat[] = [
  { icon: Pill,     val: "+500", txt: "منتج دوائي موثوق" },
  { icon: Hospital, val: "+50",  txt: "صيدلية شريكة" },
  { icon: Clock,    val: "24h",  txt: "متوسط وقت التوريد" },
  { icon: Star,     val: "98%",  txt: "رضا العملاء" },
];
