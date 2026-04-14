"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { MobileFilterDrawer } from "./MobileFilterDrawer";

export function FilterButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex h-11 items-center gap-2 rounded-xl border border-[#d1d0d0] bg-white px-4 text-[15px] font-bold text-[#323131] xl:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </button>
      <MobileFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
