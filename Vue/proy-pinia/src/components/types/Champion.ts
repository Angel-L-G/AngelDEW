export type Champion = {
  name: string
  stats: number
  experience: number
  level: number
  role: string
}

export const mockCampions: Champion[] = [
  {
    name: "Arthas",
    stats: 85,
    experience: 1200,
    level: 10,
    role: "Tank",
  },
  {
    name: "Sylvanas",
    stats: 70,
    experience: 1500,
    level: 12,
    role: "Assassin",
  },
  {
    name: "Jaina",
    stats: 65,
    experience: 1000,
    level: 8,
    role: "Mage",
  },
  {
    name: "Thrall",
    stats: 75,
    experience: 1800,
    level: 15,
    role: "Support",
  },
  {
    name: "Illidan",
    stats: 90,
    experience: 2000,
    level: 18,
    role: "Duelist",
  },
  {
    name: "Gul'dan",
    stats: 60,
    experience: 900,
    level: 7,
    role: "Warlock",
  },
  {
    name: "Anduin",
    stats: 50,
    experience: 1100,
    level: 9,
    role: "Healer",
  },
  {
    name: "Garrosh",
    stats: 80,
    experience: 1400,
    level: 11,
    role: "Tank",
  },
  {
    name: "Valeera",
    stats: 85,
    experience: 1900,
    level: 17,
    role: "Assassin",
  },
  {
    name: "Kael'thas",
    stats: 75,
    experience: 1300,
    level: 10,
    role: "Mage",
  },
];
