import AuthButton from "./auth-btn";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
  return (
    <div className="flex w-full justify-between">
      <div className="mb-4 flex gap-3">
        <span>navbar</span>
        <ThemeSwitcher />
      </div>
      <AuthButton />
    </div>
  );
}
