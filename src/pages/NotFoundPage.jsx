import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center p-4 text-center">
      <div>
        <p className="text-6xl font-black text-jx-blue">404</p>
        <p className="mt-2 text-white/70">Page not found.</p>
        <Link to="/" className="mt-4 inline-block">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

