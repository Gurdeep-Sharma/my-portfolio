export type Vec3 = [number, number, number]

export type DeskObject = 'monitor' | 'calendar' | 'books' | 'polaroid' | 'coffee' | 'phone'

// Each clickable desk object jumps to a page section. `anchor` is where the
// hover tag sits.
export const DESK_OBJECTS: Record<DeskObject, { section: string; label: string; anchor: Vec3 }> = {
  monitor: { section: 'work', label: 'Work', anchor: [0, 1.95, -0.6] },
  calendar: { section: 'experience', label: 'Experience', anchor: [1.6, 0.62, -1.0] },
  books: { section: 'skills', label: 'Skills', anchor: [-1.6, 0.66, 0.15] },
  polaroid: { section: 'about', label: 'About', anchor: [-1.8, 0.95, -0.6] },
  coffee: { section: 'about', label: 'About', anchor: [1.8, 0.72, -0.4] },
  phone: { section: 'contact', label: 'Contact', anchor: [0.75, 0.42, 0.85] },
}
