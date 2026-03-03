import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch {
      setError("Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <Card className="w-full max-w-md">
        <p className="text-2xl font-bold">Sign In</p>
        <p className="mb-4 text-sm text-white/70">Access your Journex trading workspace.</p>
        <form onSubmit={onSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error ? <p className="mb-2 text-sm text-jx-red">{error}</p> : null}
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-white/70">
          New here?{" "}
          <Link className="text-jx-green" to="/register">
            Create account
          </Link>
        </p>
      </Card>
    </div>
  );
}

