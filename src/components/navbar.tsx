import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="py-3 container border-b border-dashed"
      data-testid="navbar"
    >
      <h1 className="font-bold text-center text-2xl flex items-center justify-center gap-2">
        <Github size={24} /> Github Lite
      </h1>
    </header>
  );
}
