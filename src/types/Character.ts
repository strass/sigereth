import { Attribute, Ability, Merit } from './Generic';

interface Character {
  name: string;
  // player: string;
  // caste: string;
  concept: string;
  // anima: string;
  supernal: Ability;

  attributes: Record<Attribute, number>;
  abilities: Record<Ability, number>;
  specialties: Record<Ability, string>;
  merits: Record<string, Merit>;

  essence: number;
  motes: {};
  willpower: {
    permanent: number;
    temporary: number;
  };
  limit: number;

  experience: {
    regular: {
      current: number;
      total: number;
    };
    splat: {
      current: number;
      total: number;
    };
  };

  weapons: {};
  armor: {};
  naturalSoak: number;

  intimacies: {};
  charms: {};
}

export default Character;
