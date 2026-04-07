import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { login, persistAuth } from "../services/api/auth";

const BG_URL =  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&q=80";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
@keyframes bgDrift  { 0%{transform:scale(1.06)} 50%{transform:scale(1.1) translateX(-10px)} 100%{transform:scale(1.06)} }
@keyframes cardIn   { from{opacity:0;transform:translateY(40px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes logoIn   { from{opacity:0;transform:translateY(-20px);filter:blur(4px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes floatL   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
@keyframes fieldIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0 )} }
@keyframes ripple   { 0%{transform:scale(0);opacity:.45} 100%{transform:scale(5);opacity:0} }
@keyframes shine    { 0%{background-position:200% center} 100%{background-position:-200% center} }
`;

const glass = {
  background: "rgba(255,255,255,0.09)",
  backdropFilter: "blur(28px) saturate(1.4)",
  WebkitBackdropFilter: "blur(28px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.16)",
};

export default function LoginPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showP, setShowP] = useState(false);
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rKey, setRKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);

  const isRTL = language === "ar";

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setRKey((k) => k + 1);
    const trimmed = email.trim();
    if (!trimmed || !pass) {
      setError(t("auth.emailRequired") + " & " + t("auth.passwordRequired"));
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await login({ email: trimmed, password: pass });
      persistAuth(data);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ position: "relative", minHeight: "100vh", fontFamily: "'Tajawal',sans-serif", overflow: "hidden" }}>
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${BG_URL})`, backgroundSize: "cover", backgroundPosition: "center", animation: "bgDrift 20s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,20,15,.7) 0%,rgba(0,10,8,.5) 100%)" }} />

        {/* Logo */}
        <Link to="/" style={{ position: "absolute", top: 20, left: isRTL ? "auto" : 24, right: isRTL ? 24 : "auto", zIndex: 10, display: "flex", alignItems: "center", gap: 10, animation: "logoIn .9s cubic-bezier(.22,1,.36,1) both", textDecoration: "none" }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center", animation: "floatL 3.5s ease-in-out infinite", boxShadow: "0 0 20px rgba(0,200,120,.15)" }}>
            <svg width="26" height="26" viewBox="0 0 56 56" fill="none">
              <rect x="4" y="18" width="48" height="20" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <rect x="4" y="18" width="24" height="20" rx="10" fill="rgba(100,230,170,0.75)" />
              <rect x="35" y="25" width="10" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
              <rect x="39" y="21" width="2" height="10" rx="1" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: 0.5, background: "linear-gradient(90deg,#a8f0d0,#ffffff,#6ee7b7,#ffffff,#a8f0d0)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shine 4s linear infinite", lineHeight: 1.1 }}>
              {isRTL ? "الفرماشية" : "AL-FARMASHIA"}
            </div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,.35)", letterSpacing: 2.5, marginTop: 1 }}>
              {isRTL ? "AL-FARMASHIA +" : "PHARMACY +"}
            </div>
          </div>
        </Link>

        {/* Login Card */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ width: 340, ...glass, borderRadius: 24, padding: "28px 26px 22px", boxShadow: "0 20px 60px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.18)", animation: mounted ? "cardIn .8s cubic-bezier(.22,1,.36,1) .1s both" : "none" }}>
            <h2 style={{ color: "#fff", textAlign: "center", fontSize: 19, fontWeight: 800, marginBottom: 3, textShadow: "0 2px 8px rgba(0,0,0,.4)" }}>
              {t("auth.loginTitle")}
            </h2>
            <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 20 }}>
              {isRTL ? "مرحباً بعودتك إلى الفرماشية +" : "Welcome back to Al-Farmashia +"}
            </p>

            {error && (
              <div role="alert" style={{ marginBottom: 14, padding: "10px 12px", borderRadius: 12, background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,120,120,.35)", color: "rgba(255,200,200,.95)", fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
                {error}
              </div>
            )}

            <form onSubmit={submit} dir={isRTL ? "rtl" : "ltr"}>
              {/* Email */}
              <div style={{ marginBottom: 13, animation: "fieldIn .5s ease .05s both" }}>
                <label style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>
                  {t("auth.email")}
                </label>
                <div style={{ borderRadius: 12, background: focus === "em" ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.1)", border: `1px solid ${focus === "em" ? "rgba(255,255,255,.4)" : "rgba(255,255,255,.15)"}`, transition: "all .3s" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocus("em")}
                    onBlur={() => setFocus(null)}
                    placeholder={t("auth.enterEmail")}
                    style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "12px 13px", color: "#fff", fontSize: 13, fontFamily: "'Tajawal',sans-serif" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 6, animation: "fieldIn .5s ease .12s both" }}>
                <label style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>
                  {t("auth.password")}
                </label>
                <div style={{ borderRadius: 12, background: focus === "pw" ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.1)", border: `1px solid ${focus === "pw" ? "rgba(255,255,255,.4)" : "rgba(255,255,255,.15)"}`, display: "flex", alignItems: "center", transition: "all .3s" }}>
                  <input
                    type={showP ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    onFocus={() => setFocus("pw")}
                    onBlur={() => setFocus(null)}
                    placeholder="••••••••"
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "12px 13px", color: "#fff", fontSize: 13, fontFamily: "'Tajawal',sans-serif" }}
                  />
                  <button type="button" onClick={() => setShowP(!showP)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.45)", fontSize: 10, cursor: "pointer", padding: "0 12px", fontFamily: "'Tajawal',sans-serif" }}>
                    {showP ? (isRTL ? "إخفاء" : "Hide") : (isRTL ? "إظهار" : "Show")}
                  </button>
                </div>
                <div style={{ textAlign: isRTL ? "left" : "right", marginTop: 5 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,.35)", cursor: "pointer", textDecoration: "underline" }}>
                    {t("auth.forgotPassword")}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{ width: "100%", padding: 13, borderRadius: 12, background: "rgba(100,230,170,.18)", border: "1px solid rgba(100,230,170,.4)", color: "#fff", fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Tajawal',sans-serif", marginTop: 14, transition: "all .3s", boxShadow: "inset 0 1px 0 rgba(255,255,255,.15),0 6px 20px rgba(0,0,0,.25)", opacity: loading ? 0.7 : 1 }}>
                {loading ? t("auth.signingIn") : t("auth.loginButton")}
              </button>
            </form>

            {/* Register Link */}
            <div style={{ textAlign: "center", marginTop: 20, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, marginBottom: 8 }}>
                {t("auth.noAccount")}
              </p>
              <Link to="/register" style={{ color: "rgba(100,230,170,.9)", fontSize: 12, fontWeight: 700, textDecoration: "none", display: "inline-block", transition: "all .2s" }}>
                {t("auth.registerButton")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
