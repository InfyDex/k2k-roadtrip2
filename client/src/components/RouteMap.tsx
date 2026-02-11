import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";
import { ALL_STOPS } from "@/lib/tripData";

gsap.registerPlugin(ScrollTrigger);

// Convert lat/lng to SVG coordinates (simplified projection for India)
function toSVG(lat: number, lng: number): { x: number; y: number } {
  const minLat = 7, maxLat = 36;
  const minLng = 68, maxLng = 90;
  const svgW = 500, svgH = 600;
  const padding = 40;

  const x = padding + ((lng - minLng) / (maxLng - minLng)) * (svgW - 2 * padding);
  const y = padding + ((maxLat - lat) / (maxLat - minLat)) * (svgH - 2 * padding);
  return { x, y };
}

// Deduplicate stops by place name for the map
const uniqueStops = ALL_STOPS.filter(
  (stop, idx, arr) => arr.findIndex((s) => s.place === stop.place) === idx
);

// Build the route path
const pathPoints = uniqueStops.map((s) => toSVG(s.lat, s.lng));
const pathD = pathPoints
  .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
  .join(" ");

// Key cities to label
const labeledCities = ["Delhi", "Srinagar", "Bikaner", "Goa", "Kanyakumari", "Chennai", "Kolkata", "Varanasi"];

export default function RouteMap() {
  const { ref: sectionRef, isInView } = useInView(0.1);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!isInView || !pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;
    
    // Animate path drawing over 2.5 seconds
    const animation = pathRef.current.animate(
      [
        { strokeDashoffset: `${length}` },
        { strokeDashoffset: "0" },
      ],
      { duration: 2500, fill: "forwards", easing: "ease-in-out" }
    );

    return () => animation.cancel();
  }, [isInView]);

  return (
    <section
      id="route"
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,184,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#FFB800]" />
            <span className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase">
              The Route
            </span>
            <div className="w-10 h-[2px] bg-[#FFB800]" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-4">
            8,000+ Kilometers
          </h2>
          <p className="font-body text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            A massive clockwise loop around India — from the Himalayas to the Indian Ocean and back.
          </p>
        </div>

        {/* SVG Map */}
        <div className={`relative max-w-lg mx-auto transition-all duration-1000 delay-200 ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <svg
            viewBox="0 0 500 600"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,184,0,0.1))" }}
          >
            {/* Route shadow path */}
            <path
              d={pathD}
              fill="none"
              stroke="#FFB800"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.1"
            />

            {/* Route Path (animated) */}
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#FFB800"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* City Dots & Labels */}
            {uniqueStops.map((stop, idx) => {
              const { x, y } = toSVG(stop.lat, stop.lng);
              const showLabel = labeledCities.includes(stop.place);
              const isStart = stop.place === "Delhi" && stop.day === 1;
              const isEnd = stop.place === "Kanyakumari";

              return (
                <g
                  key={`${stop.day}-${stop.place}`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.5 + idx * 0.06}s`,
                    transformOrigin: `${x}px ${y}px`,
                  }}
                >
                  {/* Glow for start/end */}
                  {(isStart || isEnd) && (
                    <circle cx={x} cy={y} r="12" fill={isStart ? "#FFB800" : "#E94560"} opacity="0.15" />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isStart || isEnd ? 5 : 3}
                    fill={isStart ? "#FFB800" : isEnd ? "#E94560" : "#FFB800"}
                    stroke={isStart || isEnd ? "#fff" : "none"}
                    strokeWidth={isStart || isEnd ? 1.5 : 0}
                  />
                  {showLabel && (
                    <text
                      x={x + (x > 300 ? -8 : 8)}
                      y={y + (y > 300 ? -8 : 4)}
                      textAnchor={x > 300 ? "end" : "start"}
                      className="font-mono-custom"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="9"
                    >
                      {stop.place}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Start/End Markers */}
            <text
              x={toSVG(28.6139, 77.209).x + 12}
              y={toSVG(28.6139, 77.209).y - 12}
              fill="#FFB800"
              fontSize="10"
              fontWeight="bold"
              className="font-display"
              style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.6s ease 1s" }}
            >
              START
            </text>
            <text
              x={toSVG(8.0883, 77.5385).x + 12}
              y={toSVG(8.0883, 77.5385).y + 16}
              fill="#E94560"
              fontSize="10"
              fontWeight="bold"
              className="font-display"
              style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.6s ease 2s" }}
            >
              K2K
            </text>
          </svg>
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-3xl mx-auto">
          {[
            { value: "37", label: "Travel Days", icon: "📅" },
            { value: "15+", label: "States & UTs", icon: "🗺️" },
            { value: "8K+", label: "Kilometers", icon: "🛣️" },
            { value: "₹5.3L", label: "Total Budget", icon: "💰" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center p-4 sm:p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${1200 + i * 100}ms` }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-counter text-2xl sm:text-3xl text-[#FFB800]">{stat.value}</div>
              <div className="font-mono-custom text-[10px] text-white/50 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
