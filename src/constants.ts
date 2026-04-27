export type Word = {
  id: string;
  text: string;
  ruby?: string;
  category: string;
};

export type GameStatus = "setup" | "playing" | "finished";
export type Difficulty = "easy" | "normal" | "hard";

export type GameState = {
  players: string[];
  scores: Record<string, number>;
  recentWordHistory: string[]; // IDs of words used in last 5 rounds
  wordHistory: Word[][]; // History of words per round for "back" functionality
  currentWords: Word[];
  round: number;
  maxRounds: number;
  timerSetting: number;
  difficulty: Difficulty;
  showRuby: boolean;
  gameStatus: GameStatus;
  isDarkMode: boolean;
};

export const INITIAL_WORD_POOL: Word[] = [
  // 時間
  { id: "t1", text: "春", ruby: "はる", category: "時間" },
  { id: "t2", text: "夏", ruby: "なつ", category: "時間" },
  { id: "t3", text: "秋", ruby: "あき", category: "時間" },
  { id: "t4", text: "冬", ruby: "ふゆ", category: "時間" },
  { id: "t5", text: "朝", ruby: "あさ", category: "時間" },
  { id: "t6", text: "夜", ruby: "よる", category: "時間" },
  { id: "t7", text: "休み", ruby: "やすみ", category: "時間" },
  { id: "t8", text: "イベント", category: "時間" },
  // 色
  { id: "c1", text: "赤", ruby: "あか", category: "色" },
  { id: "c2", text: "黒", ruby: "くろ", category: "色" },
  { id: "c3", text: "青", ruby: "あお", category: "色" },
  { id: "c4", text: "緑", ruby: "みどり", category: "色" },
  { id: "c5", text: "黄", ruby: "き", category: "色" },
  { id: "c6", text: "金", ruby: "きん", category: "色" },
  // 自然
  { id: "n1", text: "山", ruby: "やま", category: "自然" },
  { id: "n2", text: "海", ruby: "うみ", category: "自然" },
  { id: "n3", text: "魚", ruby: "さかな", category: "自然" },
  { id: "n4", text: "火", ruby: "ひ", category: "自然" },
  { id: "n5", text: "植物", ruby: "しょくぶつ", category: "自然" },
  { id: "n6", text: "動物", ruby: "どうぶつ", category: "自然" },
  // 食
  { id: "f1", text: "肉", ruby: "にく", category: "食" },
  { id: "f2", text: "食べ物", ruby: "たべもの", category: "食" },
  { id: "f3", text: "お菓子", ruby: "おかし", category: "食" },
  { id: "f4", text: "お酒", ruby: "おさけ", category: "食" },
  { id: "f5", text: "飲み物", ruby: "のみもの", category: "食" },
  { id: "f6", text: "あまい", category: "食" },
  { id: "f7", text: "うまい", category: "食" },
  // 文化
  { id: "cu1", text: "音楽", ruby: "おんがく", category: "文化" },
  { id: "cu2", text: "本", ruby: "ほん", category: "文化" },
  { id: "cu3", text: "映画", ruby: "えいが", category: "文化" },
  { id: "cu4", text: "マンガ", category: "文化" },
  { id: "cu5", text: "絵", ruby: "え", category: "文化" },
  { id: "cu6", text: "文字", ruby: "もじ", category: "文化" },
  // テクノロジー
  { id: "te1", text: "デジタル", category: "テクノロジー" },
  { id: "te2", text: "インターネット", category: "テクノロジー" },
  { id: "te3", text: "スマホ", category: "テクノロジー" },
  { id: "te4", text: "ゲーム", category: "テクノロジー" },
  { id: "te5", text: "機械", ruby: "きかい", category: "テクノロジー" },
  { id: "te6", text: "電気", ruby: "でんき", category: "テクノロジー" },
  { id: "te7", text: "テレビ", category: "テクノロジー" },
  { id: "te8", text: "動画", ruby: "どうが", category: "テクノロジー" },
  // 社会
  { id: "s1", text: "仕事", ruby: "しごと", category: "社会" },
  { id: "s2", text: "社会人", ruby: "しゃかいじん", category: "社会" },
  { id: "s3", text: "学び", ruby: "まなび", category: "社会" },
  { id: "s4", text: "日本", ruby: "にほん", category: "社会" },
  { id: "s5", text: "国", ruby: "くに", category: "社会" },
  { id: "s6", text: "ヨーロッパ", category: "社会" },
  { id: "s7", text: "アメリカ", category: "社会" },
  // 場所
  { id: "p1", text: "建物", ruby: "たてもの", category: "場所" },
  { id: "p2", text: "室内", ruby: "しつない", category: "場所" },
  { id: "p3", text: "田舎", ruby: "いなか", category: "場所" },
  { id: "p4", text: "都会", ruby: "とかい", category: "場所" },
  { id: "p5", text: "観光", ruby: "かんこう", category: "場所" },
  // 性質・形容
  { id: "pr1", text: "はやい", category: "性質・形容" },
  { id: "pr2", text: "おそい", category: "性質・形容" },
  { id: "pr3", text: "さむい", category: "性質・形容" },
  { id: "pr4", text: "つめたい", category: "性質・形容" },
  { id: "pr5", text: "こわい", category: "性質・形容" },
  { id: "pr6", text: "かわいい", category: "性質・形容" },
  { id: "pr7", text: "すごい", category: "性質・形容" },
  { id: "pr8", text: "えらい", category: "性質・形容" },
  { id: "pr9", text: "大きい", ruby: "おおきい", category: "性質・形容" },
  { id: "pr10", text: "小さい", ruby: "ちいさい", category: "性質・形容" },
  { id: "pr11", text: "高い", ruby: "たかい", category: "性質・形容" },
  { id: "pr12", text: "深い", ruby: "ふかい", category: "性質・形容" },
  { id: "pr13", text: "細い", ruby: "ほそい", category: "性質・形容" },
  { id: "pr14", text: "長い", ruby: "ながい", category: "性質・形容" },
  { id: "pr15", text: "強い", ruby: "つよい", category: "性質・形容" },
  { id: "pr16", text: "つらい", category: "性質・形容" },
  { id: "pr17", text: "かたい", category: "性質・形容" },
  { id: "pr18", text: "金属", ruby: "きんぞく", category: "性質・形容" },
  { id: "pr19", text: "やわらかい", category: "性質・形容" },
  { id: "pr20", text: "やさしい", category: "性質・形容" },
  { id: "pr21", text: "かっこいい", category: "性質・形容" },
  { id: "pr22", text: "めずらしい", category: "性質・形容" },
  { id: "pr23", text: "くらい", category: "性質・形容" },
  { id: "pr24", text: "あやしい", category: "性質・形容" },
  { id: "pr25", text: "危ない", ruby: "あぶない", category: "性質・形容" },
  { id: "pr26", text: "体にいい", ruby: "からだにいい", category: "性質・形容" },
  { id: "pr27", text: "古い", ruby: "ふるい", category: "性質・形容" },
  { id: "pr28", text: "なつかしい", category: "性質・形容" },
  { id: "pr29", text: "さわやか", category: "性質・形容" },
  { id: "pr30", text: "うるさい", category: "性質・形容" },
  { id: "pr31", text: "するどい", category: "性質・形容" },
  { id: "pr32", text: "丸い", ruby: "まるい", category: "性質・形容" },
  { id: "pr33", text: "人気", ruby: "にんき", category: "性質・形容" },
  { id: "pr34", text: "感動する", ruby: "かんどうする", category: "性質・形容" },
  { id: "pr35", text: "便利", ruby: "べんり", category: "性質・形容" },
  { id: "pr36", text: "役に立たない", ruby: "やくにたたない", category: "性質・形容" },
  { id: "pr37", text: "光ってる", ruby: "ひかってる", category: "性質・形容" },
  { id: "pr38", text: "派手", ruby: "はで", category: "性質・形容" },
  { id: "pr39", text: "無料", ruby: "むりょう", category: "性質・形容" },
  { id: "pr40", text: "安い", ruby: "やすい", category: "性質・形容" },
  { id: "pr41", text: "複雑", ruby: "ふくざつ", category: "性質・形容" },
  { id: "pr42", text: "穴が空いている", ruby: "あながあいている", category: "性質・形容" },
  { id: "pr43", text: "浮く", ruby: "うく", category: "性質・形容" },
  { id: "pr44", text: "持ち運べる", ruby: "もち運べる", category: "性質・形容" },
  // 人数
  { id: "nu1", text: "１人", ruby: "ひとり", category: "人数" },
];
