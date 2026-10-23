export interface LocaleText {
  en: string;
  fa: string;
}

export interface Resource {
  /** Display name (kept as in source; some entries are Persian) */
  name: string;
  /** Best-effort link */
  url?: string;
  /** Extra annotation, e.g. "~1000 questions" */
  note?: string;
  /** Resource is primarily in Persian */
  fa?: boolean;
  /** Sub-group label (used by the "Question Banks" category) */
  group?: LocaleText;
}

export type CategoryIcon =
  | "target"
  | "globe"
  | "braces"
  | "atom"
  | "monitor"
  | "server"
  | "database"
  | "binary"
  | "network"
  | "shield"
  | "flask"
  | "gauge"
  | "container"
  | "messages"
  | "map"
  | "book"
  | "smartphone"
  | "sparkles"
  | "layers"
  | "cpu"
  | "boxes"
  | "code2"
  | "brainCircuit"
  | "graduation"
  | "lockKeyhole"
  | "briefcase"
  | "gamepad"
  | "palette"
  | "blocks"
  | "listChecks"
  | "heartHandshake"
  | "rocket";

export type Hue =
  | "emerald"
  | "teal"
  | "amber"
  | "violet"
  | "rose"
  | "orange"
  | "lime"
  | "pink"
  | "cyan"
  | "sky"
  | "indigo"
  | "red"
  | "fuchsia";

export interface Category {
  id: string;
  icon: CategoryIcon;
  hue: Hue;
  name: LocaleText;
  desc: LocaleText;
  resources: Resource[];
  /** Optional extra practice note shown in the category view */
  practiceNote?: LocaleText;
}
