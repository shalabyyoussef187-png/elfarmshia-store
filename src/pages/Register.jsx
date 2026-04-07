import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { persistAuth, register } from "../services/api/auth";

function normalizeEgyptPhone(raw) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  const rest = digits.startsWith("0")
    ? digits.slice(1)
    : digits.replace(/^20/, "");
  return `+20${rest}`;
}

const BG_URL =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&q=80";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
@keyframes bgDrift  { 0%{transform:scale(1.06)} 50%{transform:scale(1.1) translateX(-10px)} 100%{transform:scale(1.06)} }
@keyframes cardIn   { from{opacity:0;transform:translateY(40px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes logoIn   { from{opacity:0;transform:translateY(-20px);filter:blur(4px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes floatL   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
@keyframes fieldIn  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes ripple   { 0%{transform:scale(0);opacity:.45} 100%{transform:scale(5);opacity:0} }
@keyframes shine    { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.3)} 100%{transform:scale(1)} }
@keyframes stepIn   { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes successPop { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
`;

const glass = {
  background: "rgba(255,255,255,0.09)",
  backdropFilter: "blur(28px) saturate(1.4)",
  WebkitBackdropFilter: "blur(28px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.16)",
};

const fieldWrap = (focused) => ({
  borderRadius: 12,
  background: focused ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.1)",
  border: `1px solid ${focused ? "rgba(255,255,255,.4)" : "rgba(255,255,255,.15)"}`,
  transition: "all .3s",
});

const inputStyle = {
  background: "transparent",
  border: "none",
  outline: "none",
  padding: "11px 13px",
  color: "#fff",
  fontSize: 12,
  fontFamily: "'Tajawal',sans-serif",
  width: "100%",
};

const btnPrimary = {
  flex: 2,
  padding: 13,
  borderRadius: 12,
  background: "rgba(100,230,170,.18)",
  border: "1px solid rgba(100,230,170,.4)",
  color: "#fff",
  fontSize: 13,
  fontWeight: 800,
  cursor: "pointer",
  fontFamily: "'Tajawal',sans-serif",
  position: "relative",
  overflow: "hidden",
  transition: "all .3s",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.15)",
};

const btnSecondary = {
  flex: 1,
  padding: 13,
  borderRadius: 12,
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.18)",
  color: "rgba(255,255,255,.7)",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "'Tajawal',sans-serif",
  transition: "all .3s",
};

function getStrength(val, t) {
  let score = 0;
  if (val.length >= 6) score++;
  if (val.length >= 10) score++;
  if (/[A-Za-z]/.test(val)) score++;
  if (/[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val)) score++;
  const labels = [
    t("auth.weakPassword"),
    t("auth.weakPassword"),
    t("auth.goodPassword"),
    t("auth.strongPassword"),
  ];
  const colors = [
    "rgba(255,80,80,.8)",
    "rgba(255,170,50,.8)",
    "rgba(80,200,150,.8)",
    "rgba(100,230,170,1)",
  ];
  return {
    score,
    label: labels[score - 1] || labels[0],
    color: colors[score - 1] || colors[0],
  };
}

function StepDot({ num, current, t }) {
  const done = num < current;
  const active = num === current;
  const labels = [t("auth.personalInfo"), t("auth.security"), t("auth.finish")];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: done
            ? "rgba(100,230,170,.5)"
            : active
              ? "rgba(100,230,170,.3)"
              : "rgba(255,255,255,.08)",
          border: `1.5px solid ${
            done || active ? "rgba(100,230,170,.8)" : "rgba(255,255,255,.2)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 800,
          color: done || active ? "#fff" : "rgba(255,255,255,.4)",
          transition: "all .4s",
        }}
      >
        {done ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7l3 3L11.5 4"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          num
        )}
      </div>
      <span
        style={{
          fontSize: 9,
          color:
            done || active ? "rgba(100,230,170,.8)" : "rgba(255,255,255,.3)",
          transition: "color .4s",
        }}
      >
        {labels[num - 1]}
      </span>
    </div>
  );
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const isRTL = language === "ar";

  // Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showP, setShowP] = useState(false);

  // Step 3
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rKey, setRKey] = useState(0);
  const [error, setError] = useState(null);

  // Focus state
  const [focus, setFocus] = useState(null);

  const strength = pass.length > 0 ? getStrength(pass, t) : null;
  const passMatch = confirm.length > 0 ? pass === confirm : null;

  useEffect(() => {
    if (step !== 3) setError(null);
  }, [step]);

  const handleRegister = async () => {
    setRKey((k) => k + 1);
    if (!terms) {
      setError(
        isRTL
          ? "يجب الموافقة على الشروط وسياسة الخصوصية."
          : "You must agree to terms and privacy policy.",
      );
      return;
    }
    if (pass !== confirm) {
      setError(t("auth.passwordsMatch"));
      return;
    }
    const em = email.trim();
    if (!em) {
      setError(t("auth.emailRequired"));
      return;
    }
    if (pass.length < 6) {
      setError(
        isRTL
          ? "كلمة المرور يجب ألا تقل عن 6 أحرف."
          : "Password must be at least 6 characters.",
      );
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const phoneArg = normalizeEgyptPhone(phone);
      const data = await register({
        email: em,
        password: pass,
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        phone: phoneArg,
      });
      persistAuth(data);
      setStep(4);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : isRTL
            ? "تعذّر إنشاء الحساب."
            : "Failed to create account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          fontFamily: "'Tajawal',sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "bgDrift 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(0,20,15,.75) 0%,rgba(0,10,8,.55) 100%)",
          }}
        />

        {/* Logo Top Left */}
        <Link
          to="/"
          style={{
            position: "absolute",
            top: 20,
            left: isRTL ? "auto" : 24,
            right: isRTL ? 24 : "auto",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "logoIn .9s cubic-bezier(.22,1,.36,1) both",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(255,255,255,.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "floatL 3.5s ease-in-out infinite",
              boxShadow: "0 0 20px rgba(0,200,120,.15)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 56 56" fill="none">
              <rect
                x="4"
                y="18"
                width="48"
                height="20"
                rx="10"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <rect
                x="4"
                y="18"
                width="24"
                height="20"
                rx="10"
                fill="rgba(100,230,170,0.75)"
              />
              <rect
                x="28"
                y="18"
                width="24"
                height="20"
                rx="10"
                fill="rgba(255,255,255,0.15)"
              />
              <line
                x1="28"
                y1="18"
                x2="28"
                y2="38"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <rect
                x="35"
                y="25"
                width="10"
                height="2"
                rx="1"
                fill="rgba(255,255,255,0.8)"
              />
              <rect
                x="39"
                y="21"
                width="2"
                height="10"
                rx="1"
                fill="rgba(255,255,255,0.8)"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: 0.5,
                background:
                  "linear-gradient(90deg,#a8f0d0,#ffffff,#6ee7b7,#ffffff,#a8f0d0)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shine 4s linear infinite",
                lineHeight: 1.1,
              }}
            >
              {isRTL ? "الفرماشية" : "AL-FARMASHIA"}
            </div>
            <div
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,.35)",
                letterSpacing: 2.5,
                marginTop: 1,
              }}
            >
              {isRTL ? "AL-FARMASHIA" : "PHARMACY"}{" "}
              <span style={{ color: "rgba(100,230,170,.6)" }}>+</span>
            </div>
          </div>
        </Link>

        {/* Card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "70px 16px 24px",
          }}
        >
          <div
            style={{
              width: 360,
              ...glass,
              borderRadius: 24,
              padding: "26px 24px 22px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.18)",
              animation: "cardIn .8s cubic-bezier(.22,1,.36,1) .1s both",
            }}
          >
            {/* Step Indicator */}
            {step < 4 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                }}
              >
                <StepDot num={1} current={step} t={t} />
                <div
                  style={{
                    width: 48,
                    height: 2,
                    background:
                      step > 1
                        ? "rgba(100,230,170,.5)"
                        : "rgba(255,255,255,.15)",
                    margin: "0 0 14px",
                    transition: "background .4s",
                  }}
                />
                <StepDot num={2} current={step} t={t} />
                <div
                  style={{
                    width: 48,
                    height: 2,
                    background:
                      step > 2
                        ? "rgba(100,230,170,.5)"
                        : "rgba(255,255,255,.15)",
                    margin: "0 0 14px",
                    transition: "background .4s",
                  }}
                />
                <StepDot num={3} current={step} t={t} />
              </div>
            )}

            {/* STEP 1: Your Info */}
            {step === 1 && (
              <div style={{ animation: "stepIn .4s ease both" }}>
                <h2
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    marginBottom: 3,
                  }}
                >
                  {isRTL ? "من أنت؟" : "Who are you?"}
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: "rgba(255,255,255,.4)",
                    marginBottom: 18,
                  }}
                >
                  {isRTL
                    ? "ابدأ بمعلوماتك الأساسية"
                    : "Start with your basic information"}
                </p>
                <div dir={isRTL ? "rtl" : "ltr"}>
                  {/* Name Fields */}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 11,
                      animation: "fieldIn .4s ease .05s both",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 10,
                          color: "rgba(255,255,255,.5)",
                          marginBottom: 4,
                        }}
                      >
                        {isRTL ? "الاسم الأول" : "First Name"}
                      </label>
                      <div style={fieldWrap(focus === "fn")}>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          onFocus={() => setFocus("fn")}
                          onBlur={() => setFocus(null)}
                          placeholder={isRTL ? "أحمد" : "Ahmed"}
                          style={{ ...inputStyle, padding: "11px 12px" }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 10,
                          color: "rgba(255,255,255,.5)",
                          marginBottom: 4,
                        }}
                      >
                        {isRTL ? "الاسم الأخير" : "Last Name"}
                      </label>
                      <div style={fieldWrap(focus === "ln")}>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          onFocus={() => setFocus("ln")}
                          onBlur={() => setFocus(null)}
                          placeholder={isRTL ? "محمد" : "Mohamed"}
                          style={{ ...inputStyle, padding: "11px 12px" }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div
                    style={{
                      marginBottom: 11,
                      animation: "fieldIn .4s ease .1s both",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontSize: 10,
                        color: "rgba(255,255,255,.5)",
                        marginBottom: 4,
                      }}
                    >
                      {t("auth.email")}
                    </label>
                    <div style={fieldWrap(focus === "em")}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocus("em")}
                        onBlur={() => setFocus(null)}
                        placeholder="example@mail.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  {/* Phone */}
                  <div
                    style={{
                      marginBottom: 18,
                      animation: "fieldIn .4s ease .15s both",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontSize: 10,
                        color: "rgba(255,255,255,.5)",
                        marginBottom: 4,
                      }}
                    >
                      {t("auth.phone")}
                    </label>
                    <div
                      style={{
                        ...fieldWrap(focus === "ph"),
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          padding: "0 10px 0 4px",
                          fontSize: 11,
                          color: "rgba(255,255,255,.45)",
                          borderLeft: "1px solid rgba(255,255,255,.15)",
                          margin: "8px 0",
                          lineHeight: 1.8,
                        }}
                      >
                        +20
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setFocus("ph")}
                        onBlur={() => setFocus(null)}
                        placeholder="01xxxxxxxxx"
                        style={{ ...inputStyle, flex: 1, padding: "11px 10px" }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    style={{ ...btnPrimary, flex: "unset", width: "100%" }}
                  >
                    {isRTL ? "التالي ←" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Security */}
            {step === 2 && (
              <div style={{ animation: "stepIn .4s ease both" }}>
                <h2
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    marginBottom: 3,
                  }}
                >
                  {t("auth.password")}
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: "rgba(255,255,255,.4)",
                    marginBottom: 18,
                  }}
                >
                  {isRTL
                    ? "اختر كلمة مرور قوية لحماية حسابك"
                    : "Choose a strong password to protect your account"}
                </p>
                <div dir={isRTL ? "rtl" : "ltr"}>
                  {/* Password */}
                  <div
                    style={{
                      marginBottom: 11,
                      animation: "fieldIn .4s ease .05s both",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontSize: 10,
                        color: "rgba(255,255,255,.5)",
                        marginBottom: 4,
                      }}
                    >
                      {t("auth.password")}
                    </label>
                    <div
                      style={{
                        ...fieldWrap(focus === "pw"),
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type={showP ? "text" : "password"}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        onFocus={() => setFocus("pw")}
                        onBlur={() => setFocus(null)}
                        placeholder="••••••••"
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowP(!showP)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,.45)",
                          fontSize: 10,
                          cursor: "pointer",
                          padding: "0 12px",
                          fontFamily: "'Tajawal',sans-serif",
                        }}
                      >
                        {showP
                          ? isRTL
                            ? "إخفاء"
                            : "Hide"
                          : isRTL
                            ? "إظهار"
                            : "Show"}
                      </button>
                    </div>
                    {strength && pass.length > 0 && (
                      <>
                        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              style={{
                                flex: 1,
                                height: 3,
                                borderRadius: 4,
                                background:
                                  i < strength.score
                                    ? strength.color
                                    : "rgba(255,255,255,.12)",
                                transition: "background .3s",
                              }}
                            />
                          ))}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: strength.color,
                            marginTop: 3,
                          }}
                        >
                          {t("auth.passwordStrength")}: {strength.label}
                        </div>
                      </>
                    )}
                  </div>
                  {/* Confirm */}
                  <div
                    style={{
                      marginBottom: 18,
                      animation: "fieldIn .4s ease .1s both",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontSize: 10,
                        color: "rgba(255,255,255,.5)",
                        marginBottom: 4,
                      }}
                    >
                      {t("auth.confirmPassword")}
                    </label>
                    <div
                      style={{
                        ...fieldWrap(focus === "cf"),
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        onFocus={() => setFocus("cf")}
                        onBlur={() => setFocus(null)}
                        placeholder="••••••••"
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      {passMatch !== null && (
                        <span
                          style={{
                            padding: "0 12px",
                            fontSize: 14,
                            color: passMatch
                              ? "rgba(100,230,170,.9)"
                              : "rgba(255,100,100,.9)",
                          }}
                        >
                          {passMatch ? "✓" : "✗"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setStep(1)} style={btnSecondary}>
                      {isRTL ? "→ رجوع" : "← Back"}
                    </button>
                    <button onClick={() => setStep(3)} style={btnPrimary}>
                      {isRTL ? "التالي ←" : "Next →"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <div style={{ animation: "stepIn .4s ease both" }}>
                <h2
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    marginBottom: 3,
                  }}
                >
                  {isRTL ? "تأكيد البيانات" : "Confirm Data"}
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: "rgba(255,255,255,.4)",
                    marginBottom: 16,
                  }}
                >
                  {isRTL
                    ? "راجع معلوماتك قبل الإنشاء"
                    : "Review your information before creating"}
                </p>
                <div dir={isRTL ? "rtl" : "ltr"}>
                  {/* Summary */}
                  <div
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: 14,
                      padding: "14px 16px",
                      marginBottom: 14,
                      animation: "fieldIn .4s ease .05s both",
                    }}
                  >
                    {[
                      {
                        label: isRTL ? "الاسم" : "Name",
                        value: `${firstName} ${lastName}`.trim() || "—",
                      },
                      {
                        label: isRTL ? "البريد" : "Email",
                        value: email || "—",
                      },
                      {
                        label: isRTL ? "الهاتف" : "Phone",
                        value: phone ? `+20 ${phone}` : "—",
                      },
                    ].map((row, i, arr) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "6px 0",
                          borderBottom:
                            i < arr.length - 1
                              ? "1px solid rgba(255,255,255,.08)"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255,.4)",
                          }}
                        >
                          {row.label}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Error */}
                  {error && (
                    <div
                      role="alert"
                      style={{
                        marginBottom: 12,
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: "rgba(255,80,80,.12)",
                        border: "1px solid rgba(255,120,120,.35)",
                        color: "rgba(255,200,200,.95)",
                        fontSize: 10,
                        textAlign: "center",
                        lineHeight: 1.5,
                        animation: "fieldIn .4s ease .08s both",
                      }}
                    >
                      {error}
                    </div>
                  )}
                  {/* Terms */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 16,
                      animation: "fieldIn .4s ease .1s both",
                    }}
                  >
                    <div
                      onClick={() => setTerms(!terms)}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        border: terms
                          ? "1px solid rgba(100,230,170,.7)"
                          : "1px solid rgba(255,255,255,.3)",
                        background: terms
                          ? "rgba(100,230,170,.4)"
                          : "rgba(255,255,255,.08)",
                        flexShrink: 0,
                        marginTop: 1,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .2s",
                        animation: terms ? "checkPop .3s ease" : "none",
                      }}
                    >
                      {terms && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5l2.5 2.5L8 3"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,.4)",
                        lineHeight: 1.6,
                      }}
                    >
                      {isRTL ? (
                        <>
                          أوافق على{" "}
                          <a
                            href="#"
                            style={{
                              color: "rgba(100,230,170,.8)",
                              textDecoration: "underline",
                            }}
                          >
                            شروط الاستخدام
                          </a>{" "}
                          و
                          <a
                            href="#"
                            style={{
                              color: "rgba(100,230,170,.8)",
                              textDecoration: "underline",
                            }}
                          >
                            سياسة الخصوصية
                          </a>
                        </>
                      ) : (
                        <>
                          I agree to{" "}
                          <a
                            href="#"
                            style={{
                              color: "rgba(100,230,170,.8)",
                              textDecoration: "underline",
                            }}
                          >
                            Terms of Use
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            style={{
                              color: "rgba(100,230,170,.8)",
                              textDecoration: "underline",
                            }}
                          >
                            Privacy Policy
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setStep(2)} style={btnSecondary}>
                      {isRTL ? "→ رجوع" : "← Back"}
                    </button>
                    <button
                      onClick={handleRegister}
                      disabled={loading}
                      style={btnPrimary}
                    >
                      {loading
                        ? t("auth.creatingAccount")
                        : isRTL
                          ? "إنشاء الحساب ✓"
                          : "Create Account ✓"}
                      <span
                        key={rKey}
                        style={{
                          position: "absolute",
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.2)",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%) scale(0)",
                          pointerEvents: "none",
                          animation: rKey
                            ? "ripple .6s ease-out forwards"
                            : "none",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {step === 4 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "10px 0",
                  animation: "successPop .5s cubic-bezier(.22,1,.36,1) both",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "rgba(100,230,170,.2)",
                    border: "2px solid rgba(100,230,170,.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M6 16l7 7L26 9"
                      stroke="rgba(100,230,170,1)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 900,
                    marginBottom: 6,
                  }}
                >
                  {isRTL ? "تم إنشاء حسابك!" : "Account Created!"}
                </h2>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.45)",
                    marginBottom: 20,
                  }}
                >
                  {isRTL
                    ? "أهلاً بك في الفرماشية +"
                    : "Welcome to Al-Farmashia +"}
                </p>
                <Link
                  to="/"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: "rgba(100,230,170,.2)",
                    border: "1px solid rgba(100,230,170,.5)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 800,
                    textDecoration: "none",
                    fontFamily: "'Tajawal',sans-serif",
                  }}
                >
                  {isRTL ? "الانتقال للصفحة الرئيسية →" : "← Go to Home"}
                </Link>
              </div>
            )}

            {step < 4 && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  color: "rgba(255,255,255,.3)",
                  marginTop: 14,
                }}
              >
                {isRTL ? "عندك حساب؟" : "Already have an account?"}{" "}
                <Link
                  to="/login"
                  style={{
                    color: "rgba(100,230,170,.8)",
                    textDecoration: "underline",
                    fontWeight: 700,
                  }}
                >
                  {isRTL ? "سجل دخولك" : "Sign In"}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
