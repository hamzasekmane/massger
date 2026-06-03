import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 text-center">
      <div>
        <div className="text-7xl font-bold tracking-[-0.03em]">404</div>
        <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-[#6b6b6b]">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block mt-6">
          <Button size="lg">Take me home</Button>
        </Link>
      </div>
    </div>
  );
}
