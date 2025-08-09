import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 kerala-gradient bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! This page got lost in transit 🧳</p>
        <p className="text-sm text-muted-foreground mb-6">Maybe it's wrapped in too much tape?</p>
        <a href="/" className="inline-flex items-center gap-2 kerala-gradient px-6 py-3 rounded-lg text-primary-foreground font-bold hover:scale-105 transform transition-all">
          🏠 Return to SuitcaseSaver 3000
        </a>
      </div>
    </div>
  );
};

export default NotFound;
