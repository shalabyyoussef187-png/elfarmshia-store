// Neutral "no photo" image (inline, no stock photo, no network).
const svg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>" +
  "<rect width='400' height='400' fill='#f1f5f4'/>" +
  "<g fill='none' stroke='#9bb5ae' stroke-width='10' stroke-linecap='round'>" +
  "<rect x='140' y='120' width='120' height='160' rx='18'/><path d='M170 120v-24h60v24M200 170v60M170 200h60'/></g></svg>";
export const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
