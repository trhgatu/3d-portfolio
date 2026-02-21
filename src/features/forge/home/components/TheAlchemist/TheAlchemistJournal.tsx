"use client";
import Image from "next/image";
import { TheAlchemistCard } from "./TheAlchemistCard";

export function TheAlchemistJournal() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center relative overflow-visible group">
        <div className="text-left space-y-4 order-2 md:order-1">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Nigredo: The Void
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              T
            </span>
            he work begins in darkness—the blank editor, the chaotic influx of fragmented
            requirements. This is <span className="italic text-neutral-800">Nigredo</span>, the
            blackening. It is the necessary destruction of preconceptions, reducing a complex
            problem into its most fundamental, untamed logic before creation can even begin.
          </p>
        </div>
        <div className="relative h-64 overflow-visible order-1 md:order-2 flex justify-center">
          <div className="absolute top-1/2 left-[50%] md:left-[70%] -translate-x-1/2 -translate-y-1/2 z-50 scale-140 overflow-visible w-64 md:w-80">
            <TheAlchemistCard />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group">
        <div className="flex justify-center opacity-20 mix-blend-multiply order-1">
          <div className="relative w-48 h-48">
            <Image
              src="/assets/images/craftings/transmutation_circle.png"
              alt="Ouroboros"
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
        <div className="text-left space-y-4 order-2">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Albedo: Purification
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              F
            </span>
            rom the ashes of initial drafts emerges{" "}
            <span className="italic text-neutral-800">Albedo</span>, the whitening. Here, the code
            is washed clean. Architectures are refined, unnecessary dependencies are purged, and the
            logic is scrubbed until it is pristine, performant, and perfectly legible. Clarity over
            cleverness.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-center group">
        <div className="text-left space-y-4 order-2 md:order-1">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Citrinitas: Awakening
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              S
            </span>
            uddenly, the static lines spark to life. This is{" "}
            <span className="italic text-neutral-800">Citrinitas</span>, the yellowing. The system
            awakens. Data flows seamlessly across boundaries, components react with fluid grace, and
            what was once a rigid script becomes a breathing, dynamic digital entity.
          </p>
        </div>
        <div className="flex justify-center order-1 md:order-2 opacity-60 mix-blend-multiply">
          <div className="relative w-48 h-48">
            <Image
              src="/assets/images/craftings/symbols/squared_circle.svg"
              alt="Philosopher's Stone"
              fill
              className="object-contain animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 items-center group">
        <div className="flex justify-center opacity-60 mix-blend-multiply order-1">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <Image
              src="/assets/images/craftings/symbols/code_symbol.png"
              alt="Universal Solvent Symbol"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-left space-y-4 order-2">
          <h3 className="text-3xl font-kings text-neutral-800 tracking-wide border-b border-neutral-400/30 pb-2 inline-block">
            Rubedo: Realization
          </h3>
          <p className="font-bilbo text-xl md:text-2xl leading-relaxed text-neutral-600 text-justify">
            <span className="float-left text-6xl font-kings text-neutral-800 mr-2 mt-[-8px] leading-none drop-shadow-sm">
              T
            </span>
            he final deployment. <span className="italic text-neutral-800">Rubedo</span>, the
            reddening, marks the culmination of the work. The software steps out of the local forge
            and into reality. It stands resilient, holding structure against the chaos of the web—a
            true testament to the alchemy of engineering.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 opacity-40">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-neutral-600 bg-neutral-600/20" />
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </div>
    </div>
  );
}
