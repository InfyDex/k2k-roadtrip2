export interface TripStop {
  day: number;
  place: string;
  state: string;
  region: string;
  notes?: string;
  lat: number;
  lng: number;
}

export interface TripRegion {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  stops: TripStop[];
  image: string;
  stats: { label: string; value: string }[];
}

export const TEAM_MEMBERS = [
  {
    name: "Rajnish",
    role: "Lead Navigator & Vlogger",
    emoji: "🎬",
    bio: "Full-stack dev who maps routes better than Google",
  },
  {
    name: "Tushar",
    role: "Cinematographer",
    emoji: "📷",
    bio: "Turns every sunset into a cinematic masterpiece",
  },
  {
    name: "Anwar",
    role: "Driver & Mechanic",
    emoji: "🚗",
    bio: "Can fix anything with duct tape and determination",
  },
  {
    name: "Puneet",
    role: "Sound & Music",
    emoji: "🎵",
    bio: "Creates the perfect playlist for every terrain",
  },
];

export const REGIONS: TripRegion[] = [
  {
    id: "north",
    name: "The North",
    subtitle: "Where the journey begins",
    description:
      "From the bustling streets of Delhi to the snow-capped peaks of Kashmir, through the golden fields of Punjab and the vast deserts of Rajasthan. The north sets the tone — epic, diverse, and unforgettable.",
    bgColor: "#0F1B2D",
    textColor: "#F0F4FF",
    accentColor: "#7EB8DA",
    image: "",
    stops: [
      { day: 1, place: "Delhi", state: "Delhi", region: "north", lat: 28.6139, lng: 77.209 },
      { day: 2, place: "Srinagar", state: "J&K", region: "north", lat: 34.0837, lng: 74.7973 },
      { day: 3, place: "Srinagar", state: "J&K", region: "north", lat: 34.0837, lng: 74.7973 },
      { day: 4, place: "Amritsar", state: "Punjab", region: "north", lat: 31.634, lng: 74.8723 },
      { day: 5, place: "Bikaner", state: "Rajasthan", region: "north", lat: 28.0229, lng: 73.3119 },
    ],
    stats: [
      { label: "Days", value: "5" },
      { label: "States", value: "4" },
      { label: "Highlight", value: "Kashmir" },
    ],
  },
  {
    id: "west",
    name: "The West Coast",
    subtitle: "Sun, sand & sea",
    description:
      "Cruising down through Gujarat's heritage, the coastal charm of Daman, the electric energy of Mumbai, and into the paradise beaches of Goa. Three days of sun, surf, and stories.",
    bgColor: "#D4A574",
    textColor: "#1A1008",
    accentColor: "#8B4513",
    image: "",
    stops: [
      { day: 6, place: "Palanpur", state: "Gujarat", region: "west", lat: 24.1725, lng: 72.4384 },
      { day: 7, place: "Daman", state: "Daman", region: "west", lat: 20.397, lng: 72.8328 },
      { day: 8, place: "Daman", state: "Daman", region: "west", lat: 20.397, lng: 72.8328 },
      { day: 9, place: "Thane", state: "Maharashtra", region: "west", lat: 19.2183, lng: 72.9781 },
      { day: 10, place: "Goa", state: "Goa", region: "west", lat: 15.2993, lng: 74.124 },
      { day: 11, place: "Goa", state: "Goa", region: "west", lat: 15.2993, lng: 74.124 },
      { day: 12, place: "Goa", state: "Goa", region: "west", lat: 15.2993, lng: 74.124 },
    ],
    stats: [
      { label: "Days", value: "7" },
      { label: "States", value: "4" },
      { label: "Highlight", value: "Goa" },
    ],
  },
  {
    id: "south",
    name: "The Deep South",
    subtitle: "To the tip of India",
    description:
      "Through the temple towns of Karnataka, the serene backwaters of Kerala, and finally to Kanyakumari — where three oceans meet at the southernmost tip of the Indian subcontinent. The emotional climax of the journey.",
    bgColor: "#1B4332",
    textColor: "#E8F5E9",
    accentColor: "#66BB6A",
    image: "",
    stops: [
      { day: 13, place: "Udupi", state: "Karnataka", region: "south", lat: 13.3409, lng: 74.7421 },
      { day: 14, place: "Kozhikode", state: "Kerala", region: "south", lat: 11.2588, lng: 75.7804 },
      { day: 15, place: "Alleppey", state: "Kerala", region: "south", lat: 9.4981, lng: 76.3388 },
      { day: 16, place: "Kochi", state: "Kerala", region: "south", lat: 9.9312, lng: 76.2673 },
      { day: 17, place: "Trivandrum", state: "Kerala", region: "south", lat: 8.5241, lng: 76.9366 },
      { day: 18, place: "Kanyakumari", state: "Tamil Nadu", region: "south", lat: 8.0883, lng: 77.5385 },
      { day: 19, place: "Kanyakumari", state: "Tamil Nadu", region: "south", lat: 8.0883, lng: 77.5385 },
    ],
    stats: [
      { label: "Days", value: "7" },
      { label: "States", value: "3" },
      { label: "Highlight", value: "Kanyakumari" },
    ],
  },
  {
    id: "east",
    name: "The East Coast",
    subtitle: "Temples, coasts & culture",
    description:
      "Rameshwaram's sacred shores, the grand temples of Thanjavur, French-colonial Puducherry, the tech hub of Chennai, and up through the stunning coastline of Andhra and Odisha to the cultural capital of Kolkata.",
    bgColor: "#1A1A2E",
    textColor: "#E8E8F0",
    accentColor: "#E94560",
    image: "",
    stops: [
      { day: 20, place: "Rameshwaram", state: "Tamil Nadu", region: "east", lat: 9.2876, lng: 79.3129 },
      { day: 21, place: "Rameshwaram", state: "Tamil Nadu", region: "east", lat: 9.2876, lng: 79.3129 },
      { day: 22, place: "Thanjavur", state: "Tamil Nadu", region: "east", lat: 10.787, lng: 79.1378 },
      { day: 23, place: "Puducherry", state: "Puducherry", region: "east", lat: 11.9416, lng: 79.8083 },
      { day: 24, place: "Chennai", state: "Tamil Nadu", region: "east", lat: 13.0827, lng: 80.2707 },
      { day: 25, place: "Chennai", state: "Tamil Nadu", region: "east", lat: 13.0827, lng: 80.2707 },
      { day: 26, place: "Vijayawada", state: "Andhra Pradesh", region: "east", lat: 16.5062, lng: 80.648 },
      { day: 27, place: "Visakhapatnam", state: "Andhra Pradesh", region: "east", lat: 17.6868, lng: 83.2185 },
      { day: 28, place: "Visakhapatnam", state: "Andhra Pradesh", region: "east", notes: "Araku Valley", lat: 17.6868, lng: 83.2185 },
      { day: 29, place: "Brahmapur", state: "Odisha", region: "east", notes: "Maybe Puri", lat: 19.3115, lng: 84.7941 },
      { day: 30, place: "Cuttack", state: "Odisha", region: "east", lat: 20.4625, lng: 85.883 },
    ],
    stats: [
      { label: "Days", value: "11" },
      { label: "States", value: "4" },
      { label: "Highlight", value: "Rameshwaram" },
    ],
  },
  {
    id: "return",
    name: "The Return",
    subtitle: "Coming full circle",
    description:
      "Through the cultural heartland of India — the City of Joy, Kolkata, the spiritual capital Varanasi, the historic grandeur of Lucknow, and finally back to Delhi. The road that started in the mountains ends where it began.",
    bgColor: "#2D1B0E",
    textColor: "#F5E6D3",
    accentColor: "#FF9800",
    image: "",
    stops: [
      { day: 31, place: "Kolkata", state: "West Bengal", region: "return", lat: 22.5726, lng: 88.3639 },
      { day: 32, place: "Kolkata", state: "West Bengal", region: "return", lat: 22.5726, lng: 88.3639 },
      { day: 33, place: "Kolkata", state: "West Bengal", region: "return", lat: 22.5726, lng: 88.3639 },
      { day: 34, place: "Dhanbad", state: "Jharkhand", region: "return", lat: 23.7957, lng: 86.4304 },
      { day: 35, place: "Varanasi", state: "UP", region: "return", lat: 25.3176, lng: 82.9739 },
      { day: 36, place: "Lucknow", state: "UP", region: "return", lat: 26.8467, lng: 80.9462 },
      { day: 37, place: "Delhi", state: "Delhi", region: "return", lat: 28.6139, lng: 77.209 },
    ],
    stats: [
      { label: "Days", value: "7" },
      { label: "States", value: "4" },
      { label: "Highlight", value: "Varanasi" },
    ],
  },
];

export const ALL_STOPS = REGIONS.flatMap((r) => r.stops);
