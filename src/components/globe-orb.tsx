export function GlobeOrb({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`globe-orb relative inline-block shrink-0 overflow-hidden rounded-full ${className}`}
    >
      <span className="globe-map absolute inset-0 flex blur-[1.5px]">
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 360 180"
            preserveAspectRatio="none"
            className="h-full w-full shrink-0 text-foreground/60 dark:text-foreground/75"
          >
            <g fill="currentColor">
              <path d="M12 25 L40 20 L85 18 L100 20 L125 38 L120 45 L105 48 L98 65 L90 75 L75 70 L60 58 L55 40 L30 30 Z" /><path d="M100 80 L120 82 L130 90 L145 98 L140 110 L125 125 L115 145 L110 130 L108 110 L110 95 Z" /><path d="M163 75 L175 85 L188 85 L188 95 L195 115 L205 124 L220 110 L222 95 L230 78 L215 75 L210 58 L190 55 L172 58 Z" /><path d="M170 54 L178 42 L188 36 L200 34 L210 30 L220 40 L208 50 L190 52 Z" /><path d="M220 40 L240 30 L270 18 L320 20 L325 45 L302 60 L285 80 L275 75 L255 82 L248 65 L230 50 Z" /><path d="M293 110 L310 102 L325 105 L330 120 L315 128 L295 123 Z" /><path d="M135 30 L160 20 L155 8 L130 10 Z" />
            </g>
          </svg>
        ))}
      </span>
      <span className="globe-shade absolute inset-0 rounded-full" />
      <span className="globe-glass absolute inset-0 rounded-full" />
    </span>
  );
}
