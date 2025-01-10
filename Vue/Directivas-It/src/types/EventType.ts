export interface Event {
  title: string;
  type: EventType;
  date: Date;
  description: string;
  victimas: number;
}

export enum EventType {
  DESAPARICIONES = 'DESAPARICIONES',
  AVISTAMIENTOS = 'AVISTAMIENTOS',
  FENOMENOS = 'FENOMENOS',
}
