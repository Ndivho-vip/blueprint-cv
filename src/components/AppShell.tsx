import { ReactNode } from "react";
import { FileText, Settings, HelpCircle } from "lucide-react";

export default function AppShell({
  children,
  statusText,
  actions,
}: {
  children: ReactNode;
  statusText?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ─── Title Bar ─── */}
      <header className="h-10 bg-secondary flex items-center justify-between px-3 select-none shrink-0 no-print">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-secondary-foreground tracking-wide uppercase">
            CV Builder Pro
          </span>
          <span className="text-[10px] text-secondary-foreground/50 ml-1">v1.0</span>
        </div>
        <div className="flex items-center gap-1">
          {actions}
          <button className="p-1.5 rounded hover:bg-secondary-foreground/10 text-secondary-foreground/60">
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-secondary-foreground/10 text-secondary-foreground/60">
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* ─── Status Bar ─── */}
      <footer className="h-6 bg-primary flex items-center px-3 shrink-0 no-print">
        <span className="text-[10px] text-primary-foreground/80 font-medium">
          {statusText || "Ready"}
        </span>
        <span className="ml-auto text-[10px] text-primary-foreground/60">
          🔒 All data stays in your browser
        </span>
      </footer>
    </div>
  );
}
