/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-dark">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-dark">
        Product Not Found
      </h2>
      <p className="mt-2 text-gray">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/products" className="mt-8">
        <Button variant="primary">Back to Products</Button>
      </Link>
    </div>
  );
}
