import { useEffect, useRef } from "react";
import { MAP_LAT, MAP_LNG } from "../data/about.data";
import { MapPin, X } from "lucide-react";

declare global { interface Window { L: any } }
interface MapModalProps { open: boolean; onClose: () => void; }

export default function MapModal({ open, onClose }: MapModalProps) {
  const mapRef  = useRef<HTMLDivElement>(null);
  const mapInst = useRef<any>(null);

  useEffect(() => {
    if (!open) return;
    function initMap() {
      if (!mapRef.current || mapInst.current) return;
      const L   = window.L;
      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([MAP_LAT, MAP_LNG], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" }).addTo(map);
      const icon = L.divIcon({
        html: `<div style="width:44px;height:44px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,#00875A,#00C07A);border:3px solid #fff;box-shadow:0 6px 20px rgba(0,135,90,.5);display:flex;align-items:center;justify-content:center;transform:rotate(-45deg)"><svg width="18" height="18" viewBox="0 0 24 24" fill="white" style="transform:rotate(45deg)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
        className: "", iconSize: [44, 44], iconAnchor: [22, 44],
      });
      L.marker([MAP_LAT, MAP_LNG], { icon }).addTo(map)
        .bindPopup(`<div dir="rtl" style="font-family:'Cairo',sans-serif;font-weight:800;font-size:13px;color:#0D1B14;padding:3px 1px">الفرماشيه<br/><span style="font-weight:400;font-size:11px;color:#4A6358">بورسعيد — مصر</span></div>`, { offset: [0, -40] })
        .openPopup();
      mapInst.current = map;
    }
    if (window.L) { setTimeout(initMap, 80); }
    else {
      if (!document.getElementById("lf-css")) {
        const link = document.createElement("link"); link.id="lf-css"; link.rel="stylesheet";
        link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
      }
      const s = document.createElement("script"); s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.onload = () => setTimeout(initMap, 80); document.head.appendChild(s);
    }
    return () => { if (mapInst.current) { mapInst.current.remove(); mapInst.current = null; } };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="bg-[rgba(13,27,20,0.55)] backdrop-blur-[12px] fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* bottom-sheet mobile / centered modal sm+ */}
      <div
        className="bg-[rgba(250,255,254,0.88)] backdrop-blur-[24px] border border-white/70 shadow-[0_30px_80px_rgba(0,0,0,0.25),0_2px_0_rgba(255,255,255,0.9)_inset] w-full sm:max-w-lg overflow-hidden rounded-t-3xl sm:rounded-3xl"
        style={{ animation: "popIn .4s cubic-bezier(.34,1.56,.64,1)" }}
      >
        <div
          className="px-6 md:px-8 pt-6 md:pt-7 pb-4 md:pb-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(200,230,218,.4)" }}
        >
          <div className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#00875A,#00C07A)", boxShadow: "0 4px 14px rgba(0,135,90,.35)" }}
            >
              <MapPin size={18} color="white" />
            </div>
            <div>
              <div className="font-[Cairo] font-black text-[#0D1B14] text-base md:text-lg">موقع الفرماشيه</div>
              <div className="text-xs text-[#4A6358]">بورسعيد، مصر</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-solid transition-all text-gray-500 hover:bg-white/68"
          >
            <X size={16} />
          </button>
        </div>

        <div ref={mapRef} style={{ height: 260 }} />

        <div className="px-6 md:px-8 py-4 md:py-5">
          <a
            href={`https://maps.google.com/?q=${MAP_LAT},${MAP_LNG}`}
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full text-white font-[Cairo] font-bold rounded-2xl py-3.5 text-base no-underline transition-all"
            style={{ background: "linear-gradient(135deg,#00875A,#00C07A)", boxShadow: "0 4px 18px rgba(0,135,90,.3),0 1px 0 rgba(255,255,255,.2) inset" }}
          >
            <MapPin size={16} /> افتح في خرائط جوجل
          </a>
        </div>
      </div>
    </div>
  );
}
