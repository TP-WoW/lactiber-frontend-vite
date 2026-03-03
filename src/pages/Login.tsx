import { loginUser } from "@/actions/loginActions";
import { useUser } from "@/hooks/use-user";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const { t } = useTranslation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError(t("pleaseEnterEmailAndPassword"));
      return;
    }
    // basic email check
    const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailValid) {
      setError(t("pleaseEnterValidEmail"));
      return;
    }

    // TODO: replace with real authentication call
    console.log("Login submit", { email });

    try {
      const response = await loginUser(email, password);
      console.log("Login response in UserProvider:", response);
      if (!response) {
        throw new Error("Login failed: No response received.");
      }
      setUser({
        id: response.id || "",
        userName: response.userName || "",
        email: response.email || "",
        displayName: response.displayName || "",
        isActive: response.isActive || false,
        roleId: response.roleId || "",
        roleName: response.roleName || "",
        roleDescription: response.roleDescription || "",
        permissionsJson: response.permissionsJson || "",
        avatar: response.avatar || "",
      });
    } catch (error) {
      console.error("Login error:", error);
      setError(t("loginFailed"));
      return;
    }

    // on success navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold">
            TP
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Tetra Pak Forms
            </h1>
            <p className="text-sm text-slate-500">
             {t("welcomeBackPleaseLoginToYourAccount")}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-slate-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-slate-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder={t("yourPassword")}
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-blue-600">
              {t("forgotPassword")}
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-md"
            >
              {t("login")}
            </button>
          </div>
        </form>

        <div className="mt-6 text-xs text-slate-400 text-center">
          {t("signupNotAllowed")}
        </div>
      </div>
    </div>
  );
};

export default Login;
