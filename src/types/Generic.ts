export enum MoteType {
  PERSONAL = 'personal',
  PERIPHERAL = 'peripheral',
}

export enum DamageType {
  BASHING = 'bashing',
  LETHAL = 'lethal',
  AGGRAVATED = 'aggravated',
}
export const damageLevelKeys: (string | number)[] = [0, 1, 2, 4, 'I'];

export enum Attribute {
  STRENGTH = 'strength',
  DEXTERITY = 'dexterity',
  STAMINA = 'stamina',

  PERCEPTION = 'perception',
  INTELLIGENCE = 'intelligence',
  WITS = 'wits',

  CHARISMA = 'charisma',
  MANIPULATION = 'manipulation',
  APPEARANCE = 'appearance',
}

export enum Ability {
  ARCHERY = 'archery',
  ATHLETICS = 'athletics',
  AWARENESS = 'awareness',
  BRAWL = 'brawl',
  BUREAUCRACY = 'bureaucracy',
  CRAFT = 'craft',
  DODGE = 'dodge',
  INTEGRITY = 'integrity',
  INVESTIGATION = 'investigation',
  LARCENY = 'larceny',
  LINGUISTICS = 'linguistics',
  LORE = 'lore',
  MARTIAL_ARTS = 'martialArts',
  MEDICINE = 'medicine',
  MELEE = 'melee',
  OCCULT = 'occult',
  PERFORMANCE = 'performance',
  PRESENCE = 'presence',
  RESISTANCE = 'resistance',
  RIDE = 'ride',
  SAIL = 'sail',
  SOCIALIZE = 'socialize',
  STEALTH = 'stealth',
  SURVIVAL = 'survival',
  THROWN = 'thrown',
  WAR = 'war',
}

export interface Merit {
  name: string;
  description: string;
  dots: 1 | 2 | 3 | 4 | 5 | 'N/A';
}
