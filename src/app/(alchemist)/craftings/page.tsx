// app/forge/page.tsx
import CraftingsPage from "@/features/alchemist/craftings/pages/page";

export const revalidate = 60;

export default function Page() {
  return <CraftingsPage />;
}
