import { array, boolean, number, object, string, tuple, z } from "zod";

export const Vector2 = tuple([number(), number()]);

export const Character = object({
  name: string(),
  description: string().optional(),
  imageUrl: string().url().optional(),
});

export const Room = object({
  name: string().min(1),
  textPosition: Vector2,
});

export const Cell = object({
  points: array(Vector2).min(3),
  neighbours: array(number()),
  shortcuts: array(number()).optional(),
  pawnPositions: array(Vector2).min(1),
});

export const Weapon = object({
  name: string(),
  description: string().optional(),
  imageUrl: string().url().optional(),
});

export const BoardData = object({
  backgroundUrl: string().url(),
  characters: array(Character).min(1),
  rooms: array(Room).min(1),
  cells: array(Cell),
  weapons: array(Weapon).min(1),
})
  .refine((bd) => bd.cells.length >= bd.rooms.length)
  .refine((bd) =>
    bd.cells.every(
      (c) =>
        c.neighbours.every((n) => bd.cells[n] !== undefined) &&
        (!c.shortcuts || c.shortcuts.every((s) => bd.cells[s] !== undefined))
    )
  );

export const BoardSettings = object({
  version: number().int().positive(),
  boardData: BoardData,
  maxPlayers: number().int().positive(),
  passThroughShortcuts: boolean(),
}).refine((bs) => bs.maxPlayers <= bs.boardData.characters.length);

export type Character = z.infer<typeof Character>;
export type Vector2 = z.infer<typeof Vector2>;
export type Room = z.infer<typeof Room>;
export type Cell = z.infer<typeof Cell>;
export type Weapon = z.infer<typeof Weapon>;
export type BoardData = z.infer<typeof BoardData>;
export type BoardSettings = z.infer<typeof BoardSettings>;
