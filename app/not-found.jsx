export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105"
      >
        Go Back Home
      </a>
    </div>
  );
}
