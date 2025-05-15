import Image from "next/image";

import CoinTable from "./components/Table";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_20px] items-center justify-items-center px-4  font-[family-name:var(--font-geist-sans)] light">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CoinTable></CoinTable>
      </main>
    </div>
  );
}
