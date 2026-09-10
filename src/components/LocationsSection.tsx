import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, CheckCircle2, Bike, ExternalLink, Sparkles } from 'lucide-react';
import { LoadingButton } from './LoadingButton';

interface LocationsSectionProps {
  onOrderForPickup?: () => void;
  onOpenTrackOrder?: () => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onOrderForPickup,
  onOpenTrackOrder,
}) => {
  const [selectedHub, setSelectedHub] = useState('efg-nwaniba');

  const hubs = [
    {
      id: 'efg-nwaniba',
      shortName: 'EFG Nwaniba',
      name: 'EFG Nwaniba Road (EFG Mart)',
      tag: 'Main Partner Kitchen & Pickup Counter',
      address: '254 Nwaniba Road, by Ekpri Nsukara Junction, Anua Offot, Uyo, Akwa Ibom State',
      hours: 'Mon – Sun: 7:00 AM – 9:00 PM • Fast Delivery: 7:00 AM – 6:00 PM',
      phone: '0800 334 7687',
      status: 'Open Now • In-Store & Fast Delivery',
      pickupTime: '10-15 mins ready time',
      zones: ['Nwaniba Road', 'Ekpri Nsukara', 'Uniuyo Permanent Site', 'Anua Offot', 'Shelter Afrique'],
      googleMapsUrl: 'https://maps.app.goo.gl/sz8rf4BVznb5LsYJ7',
    },
    {
      id: 'metropolitan-oron',
      shortName: 'Metropolitan Oron Rd',
      name: 'Metropolitan Supermarket, Oron Road',
      tag: 'Central Uyo Retail & Pickup Hub',
      address: '78 Oron Road (The New Metropolitan Supermarket), Uyo, Akwa Ibom State',
      hours: 'Mon – Sat: 8:00 AM – 8:00 PM • Sun: 12:00 PM – 7:00 PM',
      phone: '+234 916 596 2948',
      status: 'Open Now • Central Parfait Cold Bar',
      pickupTime: '10-15 mins ready time',
      zones: ['Oron Road Axis', 'Ewet Housing Estate', 'Osongama Estate', '4 Lanes (Edet Akpan Ave)', 'Banking Axis'],
      googleMapsUrl: 'https://maps.app.goo.gl/kpXUStzcjwNCqYze6',
    },
    {
      id: 'efg-abak',
      shortName: 'EFG Max Abak Rd',
      name: 'EFG Max, Abak Road (EFG Mart)',
      tag: 'Secretariat Express Hub & Cold Bar',
      address: '153 Abak Road, Opposite Idongesit Nkanga Secretariat, Uyo, Akwa Ibom State',
      hours: 'Mon – Sun: 7:00 AM – 9:00 PM • Fast Delivery: 7:00 AM – 6:00 PM',
      phone: '0800 334 7687',
      status: 'Open Now • Secretariat & University Axis',
      pickupTime: '10-15 mins ready time',
      zones: ['Abak Road Axis', 'Idongesit Nkanga Secretariat', 'Federal Secretariat', 'Ikpa Road', 'Plaza Center'],
      googleMapsUrl: 'https://maps.app.goo.gl/eVFsVsHrtrFZEhai9',
    },
  ];

  const deliveryZones = [
    { name: 'Uyo LGA (Central, Oron Road, Shelter Afrique)', eta: '20-30 mins', fee: '₦1,500', highlight: 'Express Transit' },
    { name: 'Uyo LGA (Nwaniba, Uniuyo, 4 Lanes, Ewet)', eta: '25-35 mins', fee: '₦1,500', highlight: 'Cold Chain Pack' },
    { name: 'Itu & Uruan LGAs (Border Axis & Environs)', eta: '30-45 mins', fee: '₦1,800', highlight: 'Greater Uyo' },
    { name: 'Ibesikpo Asutan & Etinan LGAs', eta: '35-50 mins', fee: '₦2,000', highlight: 'Direct Rider' },
    { name: 'Abak & Ikot Ekpene LGAs', eta: '45-60 mins', fee: '₦2,500', highlight: 'Insulated Pack' },
    { name: 'Eket, Onna & Oron LGAs', eta: '50-70 mins', fee: '₦3,000', highlight: 'Prompt Express' },
  ];

  const activeHubData = hubs.find((h) => h.id === selectedHub) || hubs[0];

  return (
    <section id="locations" className="py-12 sm:py-18 lg:py-22 bg-[#FAF9F5] border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] text-[#173F2E] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#CCE2D3]">
            <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Retail Hubs & Pickup Network</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F2E] tracking-tight">
            Our Locations
          </h2>
          <p className="text-[#5D7A68] text-sm sm:text-base mt-2.5 leading-relaxed font-normal">
            Fresh Greek yogurt parfaits prepared and served at our partner retail hubs across Uyo, Akwa Ibom State. Order for express doorstep delivery or pick up directly at our counter.
          </p>
        </div>

        {/* Hubs Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {hubs.map((hub) => {
            const isActive = selectedHub === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#173F2E] text-white shadow-md scale-102'
                    : 'bg-white text-[#405B4B] border border-[#DDD7C8] hover:bg-[#F2ECE1]'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#74C69D]' : 'text-[#2D6A4F]'}`} />
                <span>{hub.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Hub Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E4DED0] shadow-xl mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5ED] text-[#1B4332] text-xs font-bold border border-[#C6E2CF]">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              <span>{activeHubData.status}</span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#2D6A4F] block mb-1">
                {activeHubData.tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F2E]">
                {activeHubData.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#3E5C4A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span className="font-medium">{activeHubData.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>{activeHubData.hours}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <a href={`tel:${activeHubData.phone}`} className="hover:underline font-semibold text-[#173F2E]">
                  {activeHubData.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Bike className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>
                  Counter pickup ready in <strong className="text-[#173F2E]">{activeHubData.pickupTime}</strong>
                </span>
              </div>
            </div>

            {/* Coverage zones pills */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#173F2E] block mb-2">
                Fast Delivery Coverage from this Hub:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeHubData.zones.map((z) => (
                  <span
                    key={z}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF7F0] text-[#1E4834] border border-[#E0D9C8]"
                  >
                    ✓ {z}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F2EDE2]">
              {onOrderForPickup && (
                <LoadingButton
                  variant="primary"
                  size="md"
                  onClick={onOrderForPickup}
                  className="font-bold text-xs sm:text-sm"
                >
                  Order for Pickup / Delivery
                </LoadingButton>
              )}

              <a
                href={activeHubData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-[#D5CFBF] hover:bg-[#F2EDE2] text-[#173F2E] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Right Visual / Map Graphic Card */}
          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-6 border border-[#E2DDD0] relative overflow-hidden text-center flex flex-col justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-[#173F2E] text-[#FAF9F5] flex items-center justify-center mb-4 shadow-md">
              <MapPin className="w-8 h-8 text-[#74C69D]" />
            </div>

            <h4 className="font-serif text-lg font-bold text-[#173F2E] mb-1">
              Cold-Chain Doorstep Dispatch
            </h4>
            <p className="text-xs text-[#52705E] max-w-xs mb-5">
              All deliveries are sealed in insulated thermal bags with ice packs to guarantee your Greek yogurt stays chilled and berries crisp.
            </p>

            <div className="w-full bg-white rounded-xl p-4 border border-[#E0DAC9] text-left space-y-2 text-xs">
              <div className="flex justify-between text-[#173F2E] font-semibold">
                <span>Average Dispatch:</span>
                <span className="text-[#2D6A4F] font-bold">30 – 45 mins</span>
              </div>
              <div className="flex justify-between text-[#173F2E] font-semibold">
                <span>Instant Guest Ordering:</span>
                <span className="text-[#2D6A4F] font-bold">No login needed</span>
              </div>
              <div className="flex justify-between text-[#173F2E] font-semibold">
                <span>Verification:</span>
                <span className="text-[#2D6A4F] font-bold">Direct Phone Number</span>
              </div>
            </div>

            {onOpenTrackOrder && (
              <button
                onClick={onOpenTrackOrder}
                className="mt-4 text-xs font-bold text-[#2D6A4F] hover:underline cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Track Order with Phone Number</span>
              </button>
            )}
          </div>
        </div>

        {/* Coverage Zones Grid */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#173F2E]">
              Express Delivery Coverage & Rates
            </h3>
            <p className="text-xs sm:text-sm text-[#607D6C] mt-1">
              Guaranteed fast dispatch across all major residential and office districts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryZones.map((zone) => (
              <div
                key={zone.name}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5DFD1] hover:border-[#173F2E] transition-all shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#23583E]">
                      {zone.highlight}
                    </span>
                    <span className="text-xs font-bold text-[#173F2E] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2D6A4F]" />
                      {zone.eta}
                    </span>
                  </div>

                  <h4 className="font-bold text-[#173F2E] text-sm sm:text-base">
                    {zone.name}
                  </h4>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F2EDE2] flex items-center justify-between text-xs">
                  <span className="text-[#6D8A78]">Standard Delivery:</span>
                  <span className="font-bold text-[#173F2E]">{zone.fee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
