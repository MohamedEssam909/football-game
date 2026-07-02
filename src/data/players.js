// Player database for the MVP.
//
// Player photos come from PLAYER_IMAGES (see playerImages.js) — real Wikimedia
// Commons images fetched by Wikipedia article title, so the face always matches
// the named player. The inline `s(...)` SoFIFA URL below is only a legacy
// fallback for any id missing from that map; PlayerCard also shows an initials
// badge if an image URL fails, so a dead link never breaks the card.
//
// Stats are the six shown on the card: pace, shooting, passing, dribbling,
// defense, physical. `rating` is the overall. Per-line team ratings on the
// final screen are derived from each player's slot, not stored here.

import { PLAYER_IMAGES } from './playerImages.js'

const s = (path, v = 25) => `https://cdn.sofifa.net/players/${path}/${v}_120.png`

export const PLAYERS = [
  // ---------------- Goalkeepers ----------------
  { id: 'oblak', name: 'Jan Oblak', nationality: 'Slovenia', position: 'GK', secondaryPositions: [], club: 'Atlético Madrid', era: 'Modern', rating: 90, pace: 48, shooting: 25, passing: 55, dribbling: 52, defense: 90, physical: 86, rarity: 'Epic', image: s('200/389') },
  { id: 'courtois', name: 'Thibaut Courtois', nationality: 'Belgium', position: 'GK', secondaryPositions: [], club: 'Real Madrid', era: 'Modern', rating: 90, pace: 46, shooting: 25, passing: 58, dribbling: 50, defense: 90, physical: 88, rarity: 'Epic', image: s('192/119') },
  { id: 'alisson', name: 'Alisson', nationality: 'Brazil', position: 'GK', secondaryPositions: [], club: 'Liverpool', era: 'Modern', rating: 89, pace: 52, shooting: 25, passing: 62, dribbling: 55, defense: 89, physical: 87, rarity: 'Epic', image: s('212/831') },
  { id: 'neuer', name: 'Manuel Neuer', nationality: 'Germany', position: 'GK', secondaryPositions: [], club: 'Bayern München', era: 'Modern', rating: 87, pace: 55, shooting: 25, passing: 70, dribbling: 60, defense: 87, physical: 85, rarity: 'Epic', image: s('167/495') },
  { id: 'ederson', name: 'Ederson', nationality: 'Brazil', position: 'GK', secondaryPositions: [], club: 'Manchester City', era: 'Modern', rating: 88, pace: 54, shooting: 30, passing: 75, dribbling: 58, defense: 87, physical: 84, rarity: 'Rare', image: s('210/257') },
  { id: 'donnarumma', name: 'Gianluigi Donnarumma', nationality: 'Italy', position: 'GK', secondaryPositions: [], club: 'Paris SG', era: 'Modern', rating: 88, pace: 47, shooting: 25, passing: 55, dribbling: 48, defense: 88, physical: 86, rarity: 'Rare', image: s('230/621') },
  { id: 'terstegen', name: 'Marc-André ter Stegen', nationality: 'Germany', position: 'GK', secondaryPositions: [], club: 'Barcelona', era: 'Modern', rating: 88, pace: 46, shooting: 28, passing: 68, dribbling: 55, defense: 88, physical: 82, rarity: 'Rare', image: s('192/448') },
  { id: 'maignan', name: 'Mike Maignan', nationality: 'France', position: 'GK', secondaryPositions: [], club: 'AC Milan', era: 'Modern', rating: 86, pace: 50, shooting: 25, passing: 60, dribbling: 52, defense: 86, physical: 85, rarity: 'Rare', image: s('237/692') },
  { id: 'onana', name: 'André Onana', nationality: 'Cameroon', position: 'GK', secondaryPositions: [], club: 'Manchester United', era: 'Modern', rating: 84, pace: 51, shooting: 28, passing: 66, dribbling: 55, defense: 83, physical: 82, rarity: 'Common', image: s('234/396') },

  // ---------------- Right Backs ----------------
  { id: 'alexander_arnold', name: 'Trent Alexander-Arnold', nationality: 'England', position: 'RB', secondaryPositions: ['CM', 'RWB'], club: 'Liverpool', era: 'Modern', rating: 87, pace: 76, shooting: 72, passing: 89, dribbling: 80, defense: 80, physical: 71, rarity: 'Epic', image: s('231/281') },
  { id: 'hakimi', name: 'Achraf Hakimi', nationality: 'Morocco', position: 'RB', secondaryPositions: ['RWB', 'RM'], club: 'Paris SG', era: 'Modern', rating: 85, pace: 93, shooting: 72, passing: 80, dribbling: 84, defense: 78, physical: 76, rarity: 'Epic', image: s('235/212') },
  { id: 'walker', name: 'Kyle Walker', nationality: 'England', position: 'RB', secondaryPositions: ['RWB'], club: 'Manchester City', era: 'Modern', rating: 84, pace: 92, shooting: 60, passing: 74, dribbling: 76, defense: 82, physical: 82, rarity: 'Rare', image: s('188/377') },
  { id: 'trippier', name: 'Kieran Trippier', nationality: 'England', position: 'RB', secondaryPositions: ['RWB'], club: 'Newcastle United', era: 'Modern', rating: 84, pace: 74, shooting: 68, passing: 85, dribbling: 78, defense: 80, physical: 70, rarity: 'Rare', image: s('190/460') },
  { id: 'reece_james', name: 'Reece James', nationality: 'England', position: 'RB', secondaryPositions: ['RWB', 'CM'], club: 'Chelsea', era: 'Modern', rating: 84, pace: 82, shooting: 72, passing: 82, dribbling: 82, defense: 82, physical: 82, rarity: 'Rare', image: s('243/657') },
  { id: 'carvajal', name: 'Dani Carvajal', nationality: 'Spain', position: 'RB', secondaryPositions: ['RWB'], club: 'Real Madrid', era: 'Modern', rating: 85, pace: 79, shooting: 60, passing: 78, dribbling: 78, defense: 83, physical: 78, rarity: 'Rare', image: s('199/304') },
  { id: 'dumfries', name: 'Denzel Dumfries', nationality: 'Netherlands', position: 'RB', secondaryPositions: ['RWB'], club: 'Inter', era: 'Modern', rating: 82, pace: 85, shooting: 68, passing: 72, dribbling: 76, defense: 78, physical: 84, rarity: 'Common', image: s('235/805') },

  // ---------------- Center Backs ----------------
  { id: 'vandijk', name: 'Virgil van Dijk', nationality: 'Netherlands', position: 'CB', secondaryPositions: [], club: 'Liverpool', era: 'Modern', rating: 89, pace: 78, shooting: 60, passing: 71, dribbling: 72, defense: 89, physical: 86, rarity: 'Epic', image: s('203/376') },
  { id: 'ruben_dias', name: 'Rúben Dias', nationality: 'Portugal', position: 'CB', secondaryPositions: [], club: 'Manchester City', era: 'Modern', rating: 88, pace: 62, shooting: 40, passing: 70, dribbling: 68, defense: 89, physical: 87, rarity: 'Epic', image: s('239/818') },
  { id: 'marquinhos', name: 'Marquinhos', nationality: 'Brazil', position: 'CB', secondaryPositions: ['CDM'], club: 'Paris SG', era: 'Modern', rating: 87, pace: 76, shooting: 50, passing: 74, dribbling: 76, defense: 87, physical: 78, rarity: 'Rare', image: s('207/865') },
  { id: 'saliba', name: 'William Saliba', nationality: 'France', position: 'CB', secondaryPositions: [], club: 'Arsenal', era: 'Modern', rating: 85, pace: 82, shooting: 42, passing: 70, dribbling: 72, defense: 85, physical: 84, rarity: 'Rare', image: s('246/669') },
  { id: 'rudiger', name: 'Antonio Rüdiger', nationality: 'Germany', position: 'CB', secondaryPositions: [], club: 'Real Madrid', era: 'Modern', rating: 85, pace: 82, shooting: 45, passing: 70, dribbling: 70, defense: 85, physical: 85, rarity: 'Rare', image: s('205/452') },
  { id: 'sergio_ramos', name: 'Sergio Ramos', nationality: 'Spain', position: 'CB', secondaryPositions: ['CDM'], club: 'Sevilla', era: 'Modern', rating: 85, pace: 72, shooting: 65, passing: 72, dribbling: 72, defense: 86, physical: 85, rarity: 'Epic', image: s('155/862', 24) },
  { id: 'thiago_silva', name: 'Thiago Silva', nationality: 'Brazil', position: 'CB', secondaryPositions: [], club: 'Fluminense', era: 'Modern', rating: 84, pace: 66, shooting: 45, passing: 72, dribbling: 72, defense: 85, physical: 78, rarity: 'Rare', image: s('164/240', 24) },
  { id: 'kounde', name: 'Jules Koundé', nationality: 'France', position: 'CB', secondaryPositions: ['RB'], club: 'Barcelona', era: 'Modern', rating: 84, pace: 84, shooting: 45, passing: 72, dribbling: 76, defense: 84, physical: 78, rarity: 'Rare', image: s('241/486') },

  // ---------------- Left Backs ----------------
  { id: 'theo', name: 'Theo Hernández', nationality: 'France', position: 'LB', secondaryPositions: ['LWB'], club: 'AC Milan', era: 'Modern', rating: 85, pace: 92, shooting: 72, passing: 78, dribbling: 84, defense: 78, physical: 82, rarity: 'Epic', image: s('232/656') },
  { id: 'robertson', name: 'Andrew Robertson', nationality: 'Scotland', position: 'LB', secondaryPositions: ['LWB'], club: 'Liverpool', era: 'Modern', rating: 85, pace: 84, shooting: 62, passing: 80, dribbling: 80, defense: 80, physical: 76, rarity: 'Rare', image: s('216/267') },
  { id: 'davies', name: 'Alphonso Davies', nationality: 'Canada', position: 'LB', secondaryPositions: ['LWB', 'LM'], club: 'Bayern München', era: 'Modern', rating: 84, pace: 95, shooting: 65, passing: 76, dribbling: 84, defense: 74, physical: 78, rarity: 'Rare', image: s('234/236') },
  { id: 'cancelo', name: 'João Cancelo', nationality: 'Portugal', position: 'LB', secondaryPositions: ['RB', 'LWB', 'RWB'], club: 'Barcelona', era: 'Modern', rating: 84, pace: 85, shooting: 70, passing: 82, dribbling: 85, defense: 76, physical: 70, rarity: 'Rare', image: s('210/035') },
  { id: 'mendy', name: 'Ferland Mendy', nationality: 'France', position: 'LB', secondaryPositions: ['LWB'], club: 'Real Madrid', era: 'Modern', rating: 82, pace: 86, shooting: 50, passing: 70, dribbling: 76, defense: 80, physical: 80, rarity: 'Common', image: s('228/618') },

  // ---------------- Defensive Mids ----------------
  { id: 'rodri', name: 'Rodri', nationality: 'Spain', position: 'CDM', secondaryPositions: ['CM'], club: 'Manchester City', era: 'Modern', rating: 89, pace: 66, shooting: 78, passing: 86, dribbling: 82, defense: 84, physical: 84, rarity: 'Epic', image: s('212/622') },
  { id: 'casemiro', name: 'Casemiro', nationality: 'Brazil', position: 'CDM', secondaryPositions: ['CM'], club: 'Manchester United', era: 'Modern', rating: 85, pace: 62, shooting: 75, passing: 78, dribbling: 74, defense: 85, physical: 88, rarity: 'Epic', image: s('200/145') },
  { id: 'declan_rice', name: 'Declan Rice', nationality: 'England', position: 'CDM', secondaryPositions: ['CM'], club: 'Arsenal', era: 'Modern', rating: 86, pace: 74, shooting: 72, passing: 80, dribbling: 80, defense: 84, physical: 85, rarity: 'Rare', image: s('234/378') },
  { id: 'kante', name: "N'Golo Kanté", nationality: 'France', position: 'CDM', secondaryPositions: ['CM'], club: 'Al-Ittihad', era: 'Modern', rating: 84, pace: 78, shooting: 66, passing: 78, dribbling: 82, defense: 85, physical: 78, rarity: 'Rare', image: s('215/914') },
  { id: 'busquets', name: 'Sergio Busquets', nationality: 'Spain', position: 'CDM', secondaryPositions: ['CM'], club: 'Inter Miami', era: 'Modern', rating: 84, pace: 50, shooting: 65, passing: 84, dribbling: 80, defense: 82, physical: 76, rarity: 'Epic', image: s('189/332') },

  // ---------------- Central Mids ----------------
  { id: 'debruyne', name: 'Kevin De Bruyne', nationality: 'Belgium', position: 'CM', secondaryPositions: ['CAM'], club: 'Manchester City', era: 'Modern', rating: 91, pace: 72, shooting: 88, passing: 93, dribbling: 87, defense: 64, physical: 78, rarity: 'Epic', image: s('192/985') },
  { id: 'bellingham', name: 'Jude Bellingham', nationality: 'England', position: 'CM', secondaryPositions: ['CAM'], club: 'Real Madrid', era: 'Modern', rating: 90, pace: 80, shooting: 84, passing: 84, dribbling: 87, defense: 78, physical: 84, rarity: 'Epic', image: s('252/371') },
  { id: 'modric', name: 'Luka Modrić', nationality: 'Croatia', position: 'CM', secondaryPositions: ['CAM', 'CDM'], club: 'Real Madrid', era: 'Modern', rating: 87, pace: 72, shooting: 76, passing: 88, dribbling: 88, defense: 72, physical: 66, rarity: 'Epic', image: s('177/003') },
  { id: 'kroos', name: 'Toni Kroos', nationality: 'Germany', position: 'CM', secondaryPositions: ['CDM'], club: 'Real Madrid', era: 'Modern', rating: 88, pace: 52, shooting: 80, passing: 90, dribbling: 82, defense: 72, physical: 72, rarity: 'Epic', image: s('182/521', 24) },
  { id: 'valverde', name: 'Federico Valverde', nationality: 'Uruguay', position: 'CM', secondaryPositions: ['CDM', 'RW'], club: 'Real Madrid', era: 'Modern', rating: 88, pace: 84, shooting: 82, passing: 82, dribbling: 82, defense: 78, physical: 84, rarity: 'Rare', image: s('238/794') },
  { id: 'barella', name: 'Nicolò Barella', nationality: 'Italy', position: 'CM', secondaryPositions: ['CDM'], club: 'Inter', era: 'Modern', rating: 86, pace: 78, shooting: 76, passing: 82, dribbling: 82, defense: 76, physical: 78, rarity: 'Rare', image: s('224/232') },
  { id: 'pedri', name: 'Pedri', nationality: 'Spain', position: 'CM', secondaryPositions: ['CAM'], club: 'Barcelona', era: 'Modern', rating: 85, pace: 74, shooting: 72, passing: 85, dribbling: 86, defense: 66, physical: 66, rarity: 'Rare', image: s('251/854') },
  { id: 'thiago', name: 'Thiago Alcântara', nationality: 'Spain', position: 'CM', secondaryPositions: ['CDM'], club: 'Liverpool', era: 'Modern', rating: 84, pace: 66, shooting: 72, passing: 86, dribbling: 86, defense: 72, physical: 68, rarity: 'Common', image: s('189/513') },

  // ---------------- Attacking Mids ----------------
  { id: 'bruno', name: 'Bruno Fernandes', nationality: 'Portugal', position: 'CAM', secondaryPositions: ['CM'], club: 'Manchester United', era: 'Modern', rating: 88, pace: 76, shooting: 86, passing: 88, dribbling: 84, defense: 68, physical: 78, rarity: 'Epic', image: s('212/198') },
  { id: 'odegaard', name: 'Martin Ødegaard', nationality: 'Norway', position: 'CAM', secondaryPositions: ['CM'], club: 'Arsenal', era: 'Modern', rating: 87, pace: 76, shooting: 80, passing: 86, dribbling: 86, defense: 60, physical: 66, rarity: 'Rare', image: s('222/665') },
  { id: 'foden', name: 'Phil Foden', nationality: 'England', position: 'CAM', secondaryPositions: ['LW', 'CM'], club: 'Manchester City', era: 'Modern', rating: 87, pace: 82, shooting: 82, passing: 84, dribbling: 88, defense: 58, physical: 66, rarity: 'Rare', image: s('232/411') },
  { id: 'isco', name: 'Isco', nationality: 'Spain', position: 'CAM', secondaryPositions: ['CM'], club: 'Real Betis', era: 'Modern', rating: 82, pace: 68, shooting: 74, passing: 82, dribbling: 84, defense: 56, physical: 64, rarity: 'Common', image: s('197/781') },
  { id: 'james_rodriguez', name: 'James Rodríguez', nationality: 'Colombia', position: 'CAM', secondaryPositions: ['LW', 'CM'], club: 'Rayo Vallecano', era: 'Modern', rating: 80, pace: 68, shooting: 78, passing: 82, dribbling: 82, defense: 50, physical: 62, rarity: 'Common', image: s('201/153') },
  { id: 'coutinho', name: 'Philippe Coutinho', nationality: 'Brazil', position: 'CAM', secondaryPositions: ['LW', 'CM'], club: 'Vasco da Gama', era: 'Modern', rating: 80, pace: 74, shooting: 78, passing: 80, dribbling: 84, defense: 46, physical: 60, rarity: 'Common', image: s('189/242', 24) },

  // ---------------- Right Wings ----------------
  { id: 'salah', name: 'Mohamed Salah', nationality: 'Egypt', position: 'RW', secondaryPositions: ['ST', 'LW'], club: 'Liverpool', era: 'Modern', rating: 89, pace: 90, shooting: 87, passing: 82, dribbling: 88, defense: 45, physical: 76, rarity: 'Epic', image: s('209/331') },
  { id: 'messi', name: 'Lionel Messi', nationality: 'Argentina', position: 'RW', secondaryPositions: ['CAM', 'ST'], club: 'Inter Miami', era: 'Legend', rating: 90, pace: 80, shooting: 89, passing: 90, dribbling: 94, defense: 33, physical: 64, rarity: 'Icon', image: s('158/023') },
  { id: 'rodrygo', name: 'Rodrygo', nationality: 'Brazil', position: 'RW', secondaryPositions: ['LW', 'ST'], club: 'Real Madrid', era: 'Modern', rating: 86, pace: 89, shooting: 82, passing: 78, dribbling: 87, defense: 40, physical: 66, rarity: 'Rare', image: s('231/866') },
  { id: 'mahrez', name: 'Riyad Mahrez', nationality: 'Algeria', position: 'RW', secondaryPositions: ['LW'], club: 'Al-Ahli', era: 'Modern', rating: 84, pace: 80, shooting: 82, passing: 80, dribbling: 88, defense: 38, physical: 62, rarity: 'Rare', image: s('204/485') },
  { id: 'sterling', name: 'Raheem Sterling', nationality: 'England', position: 'RW', secondaryPositions: ['LW'], club: 'Chelsea', era: 'Modern', rating: 82, pace: 88, shooting: 76, passing: 76, dribbling: 84, defense: 40, physical: 66, rarity: 'Common', image: s('202/652') },
  { id: 'sancho', name: 'Jadon Sancho', nationality: 'England', position: 'RW', secondaryPositions: ['LW'], club: 'Borussia Dortmund', era: 'Modern', rating: 80, pace: 82, shooting: 72, passing: 78, dribbling: 84, defense: 38, physical: 62, rarity: 'Common', image: s('233/049') },

  // ---------------- Strikers ----------------
  { id: 'haaland', name: 'Erling Haaland', nationality: 'Norway', position: 'ST', secondaryPositions: [], club: 'Manchester City', era: 'Modern', rating: 91, pace: 89, shooting: 93, passing: 66, dribbling: 80, defense: 45, physical: 88, rarity: 'Epic', image: s('239/085') },
  { id: 'mbappe', name: 'Kylian Mbappé', nationality: 'France', position: 'ST', secondaryPositions: ['LW'], club: 'Real Madrid', era: 'Modern', rating: 91, pace: 97, shooting: 90, passing: 80, dribbling: 92, defense: 36, physical: 78, rarity: 'Epic', image: s('231/747') },
  { id: 'kane', name: 'Harry Kane', nationality: 'England', position: 'ST', secondaryPositions: ['CAM'], club: 'Bayern München', era: 'Modern', rating: 90, pace: 68, shooting: 92, passing: 84, dribbling: 82, defense: 48, physical: 84, rarity: 'Epic', image: s('202/126') },
  { id: 'lewandowski', name: 'Robert Lewandowski', nationality: 'Poland', position: 'ST', secondaryPositions: [], club: 'Barcelona', era: 'Modern', rating: 89, pace: 76, shooting: 91, passing: 78, dribbling: 84, defense: 44, physical: 82, rarity: 'Epic', image: s('188/545') },
  { id: 'benzema', name: 'Karim Benzema', nationality: 'France', position: 'ST', secondaryPositions: ['CAM'], club: 'Al-Ittihad', era: 'Modern', rating: 88, pace: 76, shooting: 88, passing: 83, dribbling: 87, defense: 40, physical: 78, rarity: 'Epic', image: s('165/153') },
  { id: 'ronaldo_cr7', name: 'Cristiano Ronaldo', nationality: 'Portugal', position: 'ST', secondaryPositions: ['LW'], club: 'Al-Nassr', era: 'Legend', rating: 88, pace: 82, shooting: 92, passing: 78, dribbling: 84, defense: 34, physical: 82, rarity: 'Icon', image: s('020/801') },
  { id: 'suarez', name: 'Luis Suárez', nationality: 'Uruguay', position: 'ST', secondaryPositions: [], club: 'Inter Miami', era: 'Modern', rating: 84, pace: 64, shooting: 85, passing: 78, dribbling: 82, defense: 45, physical: 78, rarity: 'Rare', image: s('176/580') },
  { id: 'griezmann', name: 'Antoine Griezmann', nationality: 'France', position: 'ST', secondaryPositions: ['CAM', 'LW'], club: 'Atlético Madrid', era: 'Modern', rating: 87, pace: 78, shooting: 85, passing: 84, dribbling: 85, defense: 52, physical: 70, rarity: 'Rare', image: s('194/765') },

  // ---------------- Left Wings ----------------
  { id: 'neymar', name: 'Neymar Jr', nationality: 'Brazil', position: 'LW', secondaryPositions: ['CAM', 'ST'], club: 'Al-Hilal', era: 'Modern', rating: 87, pace: 85, shooting: 83, passing: 85, dribbling: 92, defense: 36, physical: 62, rarity: 'Epic', image: s('190/871') },
  { id: 'hazard', name: 'Eden Hazard', nationality: 'Belgium', position: 'LW', secondaryPositions: ['CAM'], club: 'Free Agent', era: 'Modern', rating: 82, pace: 80, shooting: 78, passing: 82, dribbling: 88, defense: 38, physical: 66, rarity: 'Common', image: s('183/277') },

  // ---------------- Legends (Icons) ----------------
  { id: 'pele', name: 'Pelé', nationality: 'Brazil', position: 'ST', secondaryPositions: ['CAM', 'LW'], club: 'Santos', era: 'Legend', rating: 98, pace: 90, shooting: 95, passing: 92, dribbling: 96, defense: 60, physical: 76, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_brasil_%28cropped%29.jpg/330px-Pele_con_brasil_%28cropped%29.jpg' },
  { id: 'maradona', name: 'Diego Maradona', nationality: 'Argentina', position: 'CAM', secondaryPositions: ['ST', 'LW'], club: 'Napoli', era: 'Legend', rating: 97, pace: 88, shooting: 90, passing: 91, dribbling: 97, defense: 45, physical: 70, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Argentina_celebrando_copa_%28cropped%29.jpg/330px-Argentina_celebrando_copa_%28cropped%29.jpg' },
  { id: 'zidane', name: 'Zinedine Zidane', nationality: 'France', position: 'CAM', secondaryPositions: ['CM'], club: 'Real Madrid', era: 'Legend', rating: 96, pace: 78, shooting: 84, passing: 92, dribbling: 95, defense: 60, physical: 82, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg/330px-Zinedine_Zidane_by_Tasnim_03.jpg' },
  { id: 'ronaldinho', name: 'Ronaldinho', nationality: 'Brazil', position: 'LW', secondaryPositions: ['CAM', 'RW'], club: 'Barcelona', era: 'Legend', rating: 95, pace: 88, shooting: 88, passing: 90, dribbling: 96, defense: 40, physical: 74, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/2019_-_Press_conferences_-_Day_1_ENX_6950_%2849019873887%29_%28cropped%29.jpg/330px-2019_-_Press_conferences_-_Day_1_ENX_6950_%2849019873887%29_%28cropped%29.jpg' },
  { id: 'r9', name: 'Ronaldo Nazário', nationality: 'Brazil', position: 'ST', secondaryPositions: ['RW'], club: 'Real Madrid', era: 'Legend', rating: 96, pace: 95, shooting: 95, passing: 80, dribbling: 94, defense: 40, physical: 82, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2019_%283x4_cropped%29.jpg/330px-Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2019_%283x4_cropped%29.jpg' },
  { id: 'henry', name: 'Thierry Henry', nationality: 'France', position: 'ST', secondaryPositions: ['LW'], club: 'Arsenal', era: 'Legend', rating: 94, pace: 94, shooting: 90, passing: 82, dribbling: 90, defense: 45, physical: 80, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Thierry_Henry_%2851649035951%29_%28cropped%29.jpg/330px-Thierry_Henry_%2851649035951%29_%28cropped%29.jpg' },
  { id: 'maldini', name: 'Paolo Maldini', nationality: 'Italy', position: 'CB', secondaryPositions: ['LB'], club: 'AC Milan', era: 'Legend', rating: 94, pace: 82, shooting: 55, passing: 78, dribbling: 80, defense: 94, physical: 86, rarity: 'Icon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Paolo_Maldini_AC_Milan_Technical_director_2018.jpg/330px-Paolo_Maldini_AC_Milan_Technical_director_2018.jpg' },

  // ---------------- Egyptian Legends ----------------
  { id: 'aboutrika', name: 'Mohamed Aboutrika', nationality: 'Egypt', position: 'CAM', secondaryPositions: ['ST'], club: 'Al Ahly', era: 'Legend', rating: 90, pace: 80, shooting: 84, passing: 88, dribbling: 89, defense: 55, physical: 74, rarity: 'Egyptian Legend', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Aboutrika2011.jpg' },
  { id: 'el_hadary', name: 'Essam El Hadary', nationality: 'Egypt', position: 'GK', secondaryPositions: [], club: 'Al Ahly', era: 'Legend', rating: 84, pace: 50, shooting: 25, passing: 55, dribbling: 50, defense: 85, physical: 82, rarity: 'Egyptian Legend', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Essam_El-Hadary.jpg/330px-Essam_El-Hadary.jpg' },
  { id: 'wael_gomaa', name: 'Wael Gomaa', nationality: 'Egypt', position: 'CB', secondaryPositions: [], club: 'Al Ahly', era: 'Legend', rating: 85, pace: 68, shooting: 40, passing: 68, dribbling: 66, defense: 86, physical: 82, rarity: 'Egyptian Legend', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Wael_Gomaa.jpg' },

  // ---------------- Expanded roster (photos from PLAYER_IMAGES) ----------------
  // Goalkeepers
  { id: 'emi_martinez', name: 'Emiliano Martínez', nationality: 'Argentina', position: 'GK', secondaryPositions: [], club: 'Aston Villa', era: 'Modern', rating: 85, pace: 46, shooting: 25, passing: 55, dribbling: 50, defense: 85, physical: 84, rarity: 'Rare' },
  { id: 'raya', name: 'David Raya', nationality: 'Spain', position: 'GK', secondaryPositions: [], club: 'Arsenal', era: 'Modern', rating: 83, pace: 45, shooting: 25, passing: 62, dribbling: 52, defense: 83, physical: 80, rarity: 'Common' },
  // Right Backs
  { id: 'frimpong', name: 'Jeremie Frimpong', nationality: 'Netherlands', position: 'RB', secondaryPositions: ['RWB', 'RW'], club: 'Liverpool', era: 'Modern', rating: 81, pace: 93, shooting: 62, passing: 70, dribbling: 82, defense: 72, physical: 70, rarity: 'Common' },
  { id: 'porro', name: 'Pedro Porro', nationality: 'Spain', position: 'RB', secondaryPositions: ['RWB'], club: 'Tottenham Hotspur', era: 'Modern', rating: 82, pace: 84, shooting: 68, passing: 80, dribbling: 80, defense: 76, physical: 72, rarity: 'Common' },
  // Center Backs
  { id: 'alaba', name: 'David Alaba', nationality: 'Austria', position: 'CB', secondaryPositions: ['LB', 'CDM'], club: 'Real Madrid', era: 'Modern', rating: 84, pace: 74, shooting: 62, passing: 80, dribbling: 78, defense: 84, physical: 76, rarity: 'Rare' },
  { id: 'gvardiol', name: 'Joško Gvardiol', nationality: 'Croatia', position: 'CB', secondaryPositions: ['LB'], club: 'Manchester City', era: 'Modern', rating: 84, pace: 84, shooting: 50, passing: 72, dribbling: 76, defense: 84, physical: 82, rarity: 'Rare' },
  { id: 'araujo', name: 'Ronald Araújo', nationality: 'Uruguay', position: 'CB', secondaryPositions: ['RB'], club: 'Barcelona', era: 'Modern', rating: 85, pace: 84, shooting: 45, passing: 68, dribbling: 72, defense: 85, physical: 86, rarity: 'Rare' },
  { id: 'lisandro', name: 'Lisandro Martínez', nationality: 'Argentina', position: 'CB', secondaryPositions: ['LB'], club: 'Manchester United', era: 'Modern', rating: 82, pace: 76, shooting: 45, passing: 74, dribbling: 74, defense: 83, physical: 74, rarity: 'Common' },
  // Left Backs
  { id: 'balde', name: 'Alejandro Balde', nationality: 'Spain', position: 'LB', secondaryPositions: ['LWB'], club: 'Barcelona', era: 'Modern', rating: 81, pace: 90, shooting: 55, passing: 72, dribbling: 80, defense: 74, physical: 70, rarity: 'Common' },
  { id: 'nuno_mendes', name: 'Nuno Mendes', nationality: 'Portugal', position: 'LB', secondaryPositions: ['LWB'], club: 'Paris SG', era: 'Modern', rating: 84, pace: 90, shooting: 60, passing: 76, dribbling: 82, defense: 79, physical: 78, rarity: 'Rare' },
  // Defensive Mids
  { id: 'tchouameni', name: 'Aurélien Tchouaméni', nationality: 'France', position: 'CDM', secondaryPositions: ['CM', 'CB'], club: 'Real Madrid', era: 'Modern', rating: 85, pace: 68, shooting: 72, passing: 80, dribbling: 78, defense: 84, physical: 85, rarity: 'Rare' },
  { id: 'camavinga', name: 'Eduardo Camavinga', nationality: 'France', position: 'CDM', secondaryPositions: ['CM', 'LB'], club: 'Real Madrid', era: 'Modern', rating: 83, pace: 82, shooting: 66, passing: 78, dribbling: 84, defense: 80, physical: 78, rarity: 'Common' },
  { id: 'kimmich', name: 'Joshua Kimmich', nationality: 'Germany', position: 'CDM', secondaryPositions: ['RB', 'CM'], club: 'Bayern München', era: 'Modern', rating: 88, pace: 68, shooting: 76, passing: 88, dribbling: 84, defense: 82, physical: 76, rarity: 'Epic' },
  // Central Mids
  { id: 'frenkie', name: 'Frenkie de Jong', nationality: 'Netherlands', position: 'CM', secondaryPositions: ['CDM'], club: 'Barcelona', era: 'Modern', rating: 87, pace: 78, shooting: 72, passing: 86, dribbling: 88, defense: 76, physical: 80, rarity: 'Rare' },
  { id: 'enzo', name: 'Enzo Fernández', nationality: 'Argentina', position: 'CM', secondaryPositions: ['CDM'], club: 'Chelsea', era: 'Modern', rating: 84, pace: 72, shooting: 76, passing: 84, dribbling: 80, defense: 76, physical: 78, rarity: 'Rare' },
  // Attacking Mids
  { id: 'palmer', name: 'Cole Palmer', nationality: 'England', position: 'CAM', secondaryPositions: ['RW', 'CM'], club: 'Chelsea', era: 'Modern', rating: 85, pace: 76, shooting: 82, passing: 82, dribbling: 85, defense: 48, physical: 68, rarity: 'Rare' },
  { id: 'szoboszlai', name: 'Dominik Szoboszlai', nationality: 'Hungary', position: 'CAM', secondaryPositions: ['CM', 'RW'], club: 'Liverpool', era: 'Modern', rating: 83, pace: 80, shooting: 80, passing: 80, dribbling: 80, defense: 60, physical: 76, rarity: 'Rare' },
  { id: 'mount', name: 'Mason Mount', nationality: 'England', position: 'CAM', secondaryPositions: ['CM'], club: 'Manchester United', era: 'Modern', rating: 80, pace: 74, shooting: 76, passing: 80, dribbling: 80, defense: 62, physical: 70, rarity: 'Common' },
  // Right Wings
  { id: 'saka', name: 'Bukayo Saka', nationality: 'England', position: 'RW', secondaryPositions: ['LW'], club: 'Arsenal', era: 'Modern', rating: 87, pace: 86, shooting: 82, passing: 82, dribbling: 87, defense: 54, physical: 70, rarity: 'Epic' },
  { id: 'chiesa', name: 'Federico Chiesa', nationality: 'Italy', position: 'RW', secondaryPositions: ['LW', 'ST'], club: 'Liverpool', era: 'Modern', rating: 82, pace: 88, shooting: 78, passing: 74, dribbling: 84, defense: 45, physical: 74, rarity: 'Common' },
  // Left Wings
  { id: 'sane', name: 'Leroy Sané', nationality: 'Germany', position: 'LW', secondaryPositions: ['RW'], club: 'Al-Nassr', era: 'Modern', rating: 84, pace: 92, shooting: 80, passing: 78, dribbling: 86, defense: 38, physical: 68, rarity: 'Rare' },
  { id: 'leao', name: 'Rafael Leão', nationality: 'Portugal', position: 'LW', secondaryPositions: ['ST'], club: 'AC Milan', era: 'Modern', rating: 85, pace: 93, shooting: 80, passing: 76, dribbling: 87, defense: 36, physical: 78, rarity: 'Rare' },
  { id: 'kvara', name: 'Khvicha Kvaratskhelia', nationality: 'Georgia', position: 'LW', secondaryPositions: ['RW'], club: 'Paris SG', era: 'Modern', rating: 86, pace: 86, shooting: 80, passing: 80, dribbling: 89, defense: 42, physical: 72, rarity: 'Rare' },
  { id: 'coman', name: 'Kingsley Coman', nationality: 'France', position: 'LW', secondaryPositions: ['RW'], club: 'Bayern München', era: 'Modern', rating: 83, pace: 92, shooting: 74, passing: 76, dribbling: 86, defense: 40, physical: 70, rarity: 'Common' },
  { id: 'rashford', name: 'Marcus Rashford', nationality: 'England', position: 'LW', secondaryPositions: ['ST'], club: 'Aston Villa', era: 'Modern', rating: 82, pace: 90, shooting: 80, passing: 72, dribbling: 82, defense: 40, physical: 74, rarity: 'Common' },
  // Strikers
  { id: 'osimhen', name: 'Victor Osimhen', nationality: 'Nigeria', position: 'ST', secondaryPositions: [], club: 'Galatasaray', era: 'Modern', rating: 88, pace: 90, shooting: 87, passing: 68, dribbling: 80, defense: 42, physical: 84, rarity: 'Epic' },
  { id: 'lautaro', name: 'Lautaro Martínez', nationality: 'Argentina', position: 'ST', secondaryPositions: [], club: 'Inter', era: 'Modern', rating: 87, pace: 84, shooting: 87, passing: 72, dribbling: 84, defense: 45, physical: 82, rarity: 'Epic' },
  { id: 'nunez', name: 'Darwin Núñez', nationality: 'Uruguay', position: 'ST', secondaryPositions: ['LW'], club: 'Liverpool', era: 'Modern', rating: 82, pace: 89, shooting: 82, passing: 66, dribbling: 78, defense: 40, physical: 84, rarity: 'Rare' },
  { id: 'isak', name: 'Alexander Isak', nationality: 'Sweden', position: 'ST', secondaryPositions: [], club: 'Newcastle United', era: 'Modern', rating: 84, pace: 84, shooting: 84, passing: 72, dribbling: 84, defense: 38, physical: 76, rarity: 'Common' },
  { id: 'gabriel_jesus', name: 'Gabriel Jesus', nationality: 'Brazil', position: 'ST', secondaryPositions: ['RW'], club: 'Arsenal', era: 'Modern', rating: 81, pace: 82, shooting: 78, passing: 76, dribbling: 84, defense: 45, physical: 72, rarity: 'Common' },
]

// Prefer the name-matched Wikipedia photo over the legacy inline URL.
for (const player of PLAYERS) {
  if (PLAYER_IMAGES[player.id]) player.image = PLAYER_IMAGES[player.id]
}

// Fast id -> player lookup for rebuilding squads and dedup checks.
export const PLAYERS_BY_ID = Object.fromEntries(PLAYERS.map((p) => [p.id, p]))
