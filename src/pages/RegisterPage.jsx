import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      navigate("/app/dashboard", { replace: true });
    } catch {
      setError("Registration failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <Card className="w-full max-w-md">
        <p className="text-2xl font-bold">Create Account</p>
        <p className="mb-4 text-sm text-white/70">Start tracking trades with Journex.</p>
        <form onSubmit={onSubmit}>
          <Input label="First Name" value={form.first_name} onChange={(e) => setField("first_name", e.target.value)} />
          <Input label="Last Name" value={form.last_name} onChange={(e) => setField("last_name", e.target.value)} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setField("password", e.target.value)} required />
          {error ? <p className="mb-2 text-sm text-jx-red">{error}</p> : null}
          <Button type="submit" variant="success" disabled={submitting}>
            {submitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-white/70">
          Already have an account?{" "}
          <Link className="text-jx-green" to="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}

