import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Hero = ({
  onLogin,
  onLearnMore,
}: {
  onLogin: () => void;
  onLearnMore: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <section style={{ padding: "64px 24px", background: "#f7fbff" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          gap: 24,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 420px" }}>
          <h1 style={{ fontSize: 36, margin: "0 0 12px", color: "#0b4270" }}>
            {t("homeHeroTitle")}
          </h1>
          <p style={{ fontSize: 16, margin: "0 0 20px", color: "#334155" }}>
            {t("homeHeroDescription")}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={onLogin}
              style={{
                background: "#006aa7",
                color: "#fff",
                border: "none",
                padding: "12px 18px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {t("homeGetStarted")}
            </button>
            <button
              onClick={onLearnMore}
              style={{
                background: "transparent",
                color: "#006aa7",
                border: "1px solid #cfe7ff",
                padding: "10px 16px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {t("homeLearnMore")}
            </button>
          </div>
        </div>
        <div
          style={{
            flex: "1 1 420px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 420,
              height: 300,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 6px 18px rgba(16,24,40,0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 12,
                borderBottom: "1px solid #eef3fb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 600, color: "#0b4270" }}>
                Tetra Pak Forms — Designer
              </div>
              <div
                style={{
                  width: 28,
                  height: 18,
                  background: "#e6f2ff",
                  borderRadius: 4,
                }}
              />
            </div>
            <div style={{ padding: 16, display: "flex", gap: 12 }}>
              <div
                style={{
                  width: 96,
                  background: "#f5f9ff",
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <div
                  style={{
                    height: 28,
                    background: "#eaf6ff",
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{
                    height: 28,
                    background: "#f0f6fb",
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{ height: 28, background: "#f0f6fb", borderRadius: 6 }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  background: "#ffffff",
                  borderRadius: 8,
                  border: "1px dashed #e6eef8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                Canvas mockup
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ onLogin }: { onLogin: () => void }) => {
  const { t } = useTranslation();
  return (
    <header
      style={{
        padding: "16px 24px",
        borderBottom: "1px solid #eef2f7",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              background: "#006aa7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            TP
          </div>
          <div style={{ fontWeight: 700, color: "#0b4270" }}>
            Tetra Pak Forms
          </div>
        </div>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: 18,
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            <li style={{ color: "#334155" }}>{t("features")}</li>
            <li style={{ color: "#334155" }}>{t("howItWorks")}</li>
            <li style={{ color: "#334155" }}>{t("support")}</li>
            <li>
              <button
                onClick={onLogin}
                style={{
                  background: "transparent",
                  border: "1px solid #cfe7ff",
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const ValueProps = () => {
  const { t } = useTranslation();
  return (
    <section style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ color: "#0b4270" }}>{t("homeHeroTitle")}</h2>
        <p style={{ color: "#64748b" }}>{t("homeHeroDescription")}</p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 28,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 300,
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: 22, color: "#0b4270", marginBottom: 8 }}>
              {t("visualFormDesigner")}
            </div>
            <div style={{ color: "#475569" }}>
              {t("visualFormDesignerDescription")}
            </div>
          </div>
          <div
            style={{
              width: 300,
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: 22, color: "#0b4270", marginBottom: 8 }}>
              {t("endToEndLifecycleManagement")}
            </div>
            <div style={{ color: "#475569" }}>
              {t("endToEndLifecycleManagementDescription")}
            </div>
          </div>
          <div
            style={{
              width: 300,
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: 22, color: "#0b4270", marginBottom: 8 }}>
              {t("reportingAndDataCollection")}
            </div>
            <div style={{ color: "#475569" }}>
              {t("reportingAndDataCollectionDescription")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <section style={{ padding: "36px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ color: "#0b4270" }}>{t("howItWorks")}</h3>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 18,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 300,
              padding: 20,
              borderRadius: 10,
              background: "#f8fafc",
            }}
          >
            <div style={{ fontWeight: 700, color: "#0b4270" }}>
              1. {t("createTemplates")}
            </div>
            <div style={{ color: "#475569" }}>
              {t("createTemplatesDescription")}
            </div>
          </div>
          <div
            style={{
              width: 300,
              padding: 20,
              borderRadius: 10,
              background: "#f8fafc",
            }}
          >
            <div style={{ fontWeight: 700, color: "#0b4270" }}>
              2. {t("publishAndManageVersions")}
            </div>
            <div style={{ color: "#475569" }}>
              {t("publishAndManageVersionsDescription")}
            </div>
          </div>
          <div
            style={{
              width: 300,
              padding: 20,
              borderRadius: 10,
              background: "#f8fafc",
            }}
          >
            <div style={{ fontWeight: 700, color: "#0b4270" }}>
              3. {t("reportingAndDataCollection")}
            </div>
            <div style={{ color: "#475569" }}>
              {t("reportingAndDataCollectionDescription2")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => {
  const { t } = useTranslation();
  const features = [
    t("dragAndDropDesigner"),
    t("customComponents"),
    t("dynamicRulesAndValidations"),
    t("auditTrailAndVersionControl"),
    t("jsonBasedDataEngine"),
    t("realTimeValidation"),
    t("roleBasedAccessControl"),
    t("exportToPdfExcelApi"),
  ];

  return (
    <section style={{ padding: "36px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h3 style={{ color: "#0b4270", textAlign: "center" }}>
          {t("keyFeatures")}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginTop: 18,
          }}
        >
          {features.map((f) => (
            <div
              key={f}
              style={{
                background: "#fff",
                padding: 14,
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
              }}
            >
              <div
                style={{ fontWeight: 700, color: "#0b4270", marginBottom: 6 }}
              >
                {f}
              </div>
              <div style={{ color: "#64748b", fontSize: 13 }}>
                {t("industrialReadyFeature")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// const Integrations = () => (
//   <section style={{ padding: "28px 24px", background: "#f7fbff" }}>
//     <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
//       <h4 style={{ color: "#0b4270" }}>Integrations</h4>
//       <p style={{ color: "#64748b" }}>
//         Compatible with major industrial and enterprise systems.
//       </p>
//       <div
//         style={{
//           display: "flex",
//           gap: 20,
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 16,
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             width: 120,
//             height: 40,
//             background: "#fff",
//             borderRadius: 6,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
//           }}
//         >
//           AVEVA
//         </div>
//         <div
//           style={{
//             width: 120,
//             height: 40,
//             background: "#fff",
//             borderRadius: 6,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
//           }}
//         >
//           MES APIs
//         </div>
//         <div
//           style={{
//             width: 120,
//             height: 40,
//             background: "#fff",
//             borderRadius: 6,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
//           }}
//         >
//           SQL Server
//         </div>
//         <div
//           style={{
//             width: 120,
//             height: 40,
//             background: "#fff",
//             borderRadius: 6,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
//           }}
//         >
//           SharePoint
//         </div>
//       </div>
//     </div>
//   </section>
// );

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        padding: "28px 24px",
        borderTop: "1px solid #eef2f7",
        marginTop: 28,
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ color: "#64748b" }}>
          © 2026 Tetra Pak – All Rights Reserved
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#" style={{ color: "#0b4270" }}>
            {t("documentation")}
          </a>
          <a href="#" style={{ color: "#0b4270" }}>
            {t("helpCenter")}
          </a>
          <a href="#" style={{ color: "#0b4270" }}>
            {t("contact")}
          </a>
          <a href="#" style={{ color: "#0b4270" }}>
            {t("privacyPolicy")}
          </a>
          <a href="#" style={{ color: "#0b4270" }}>
            {t("cookies")}
          </a>
          <select
            aria-label="language"
            defaultValue="ES"
            style={{ padding: 6 }}
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="FR">FR</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
const LoginModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with real auth flow / redirect to Dashboard
    console.log("login", { email, password });
    onClose();
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 12px 40px rgba(2,6,23,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ fontWeight: 700, color: "#0b4270" }}>
            {t("loginToTetraPakForms")}
          </div>
          <button
            onClick={onClose}
            aria-label="close"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <label style={{ fontSize: 13, color: "#475569" }}>{t("email")}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e6eef8",
            }}
          />
          <label style={{ fontSize: 13, color: "#475569" }}>
            {t("password")}
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e6eef8",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a href="#" style={{ color: "#006aa7", fontSize: 13 }}>
              {t("forgotPassword")}
            </a>
            <button
              type="submit"
              style={{
                background: "#006aa7",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("login")}
            </button>
          </div>
          {/* <div style={{ textAlign: "center", marginTop: 6 }}>
            <button
              type="button"
              onClick={() => {
                console.log("SSO login");
              }}
              style={{
                background: "#2f6fbf",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Login with Microsoft
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { t } = useTranslation();

  const handleLearnMore = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        fontFamily:
          'Inter, Roboto, system-ui, -apple-system, "Segoe UI", sans-serif',
        color: "#0f172a",
      }}
    >
      <Navbar onLogin={() => setLoginOpen(true)} />
      <Hero onLogin={() => setLoginOpen(true)} onLearnMore={handleLearnMore} />
      <ValueProps />
      <HowItWorks />
      <div id="features">
        <FeaturesGrid />
      </div>
      {/* <Integrations /> */}
      <section
        style={{ padding: 24, display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: 420,
            background: "#fff",
            padding: 18,
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
          }}
        >
          <h4 style={{ margin: "0 0 8px", color: "#0b4270" }}>
            {t("readyToGetStarted")}?
          </h4>
          <p style={{ margin: "0 0 12px", color: "#64748b" }}>
            {t("useYourCorporateCredentials")}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setLoginOpen(true)}
              style={{
                flex: 1,
                background: "#006aa7",
                color: "#fff",
                padding: "10px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("login")}
            </button>
            <button
              onClick={() => handleLearnMore()}
              style={{
                flex: 1,
                background: "transparent",
                color: "#006aa7",
                border: "1px solid #cfe7ff",
                padding: "10px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {t("learnMore")}
            </button>
          </div>
        </div>
      </section>
      <Footer />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default memo(Home);
