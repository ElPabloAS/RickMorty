import type { Origin } from './origin';
import type { Location } from './location';

export interface Character {
    id: number;
    name: string ;
    status: string | null;
    species: string | null;
    type: string | null;
    gender: string | null;
    origin: Origin;
    location: Location;
    image?: string | null;
    episode: string[];
    url: string | null;
    created: string | null;
}