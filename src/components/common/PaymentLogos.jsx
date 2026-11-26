/** Simple inline SVG marks for the footer payment strip (drawn here, no external image files). */
const Tile = ({ label, children }) => (
  <span
    role="img"
    aria-label={label}
    title={label}
    className="inline-flex items-center justify-center h-9 w-16 bg-white border border-gray-200 rounded-lg shadow-sm"
  >
    {children}
  </span>
);

export const VisaLogo = () => (
  <Tile label="Visa">
    <svg viewBox="0 0 60 20" className="h-5 w-auto">
      <text x="30" y="16" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="19" fill="#1A1F71">VISA</text>
    </svg>
  </Tile>
);

export const MastercardLogo = () => (
  <Tile label="Mastercard">
    <svg viewBox="0 0 40 26" className="h-6 w-auto">
      <circle cx="14" cy="13" r="10" fill="#EB001B" />
      <circle cx="26" cy="13" r="10" fill="#F79E1B" />
      <path d="M20 5.2a10 10 0 0 1 0 15.6a10 10 0 0 1 0-15.6z" fill="#FF5F00" />
    </svg>
  </Tile>
);

export const MeezaLogo = () => (
  <Tile label="Meeza">
    <svg viewBox="0 0 60 20" className="h-5 w-auto">
      <text x="30" y="15" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="14" fill="#00853E">meeza</text>
      <rect x="8" y="17" width="44" height="2" rx="1" fill="#E31E24" />
    </svg>
  </Tile>
);

const PaymentLogos = () => (
  <div className="flex items-center gap-2">
    <MeezaLogo />
    <VisaLogo />
    <MastercardLogo />
  </div>
);

export default PaymentLogos;
