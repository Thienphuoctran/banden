export interface Player {
  id: string;
  name: string;
  score: number;
  avatarColor: string;
  turnOrder: number | null; // Thứ tự đánh sau khi bốc thăm (1, 2, 3...)
}

export interface ScoreHistoryEntry {
  id: string;
  playerId: string;
  playerName: string;
  delta: number;
  scoreBefore: number;
  scoreAfter: number;
  timestamp: number;
  note?: string;
}

export interface GameSettings {
  pricePerPoint: number; // Đơn giá VNĐ trên mỗi điểm (mặc định 3.000đ, 5.000đ, 10.000đ...)
  tableName: string;
  unit: string;
}
