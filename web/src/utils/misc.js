export const isEnvBrowser = () => !window.invokeNative;

export const noop = () => { };

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const emulateGameEvent = (event, timer) => {
  if (!isEnvBrowser()) return null;
  setTimeout(() => window.dispatchEvent(new MessageEvent('message', { data: { action: event.action, data: event.data } })), timer || 0);
};

export const mockConfig = {
  maxPlayersCount: 36,
  playerName: "test",
  playerServerId: 3,
  locale: {
    lang: "cs",
    ui_footer_serverid: "Tvé server ID",
    ui_footer_playercount: "Počet hráčů",
    ui_tab_players: "Players",
    ui_tab_players_disconnected: "Disconnected players",
    ui_tab_societies: "Societies",
    ui_tab_filter_players: 'Filter by name or server id',
    ui_tab_filter_societies: 'Filter by company\'s name or it\'s initials',
  },
  drawerProps: {
    position: 'left',
    offset: 8,
    radius: "md"
  },
  withOverlay: true,
  overlayProps: {},
  robberies: {
  }
}

const namePool = [
  "Jake Thompson", "Emily Carter", "Liam Brooks", "Sophia Reyes", "Mason Clark",
  "Ava Bennett", "Logan Hayes", "Chloe Ross", "Ethan Cooper", "Zoe Murphy",
  "Noah Ramirez", "Lily Henderson", "Lucas Parker", "Grace Miller", "Jayden Scott",
  "Layla Rivera", "Owen Peterson", "Scarlett Foster", "Elijah Barnes", "Aria Collins",
  "Aiden Wright", "Nora Hughes", "Daniel Green", "Maya Simmons", "Caleb Howard",
  "Hailey Ward", "Henry Patterson", "Ellie Mitchell", "Isaac Kelly", "Brooklyn Flores",
  "Julian Cox", "Camila Watson", "Nathan Bryant", "Sadie Cruz", "Aaron Long",
  "Ruby Jenkins", "Hunter Gray", "Paisley Sanders", "Dominic Butler", "Stella Kim",
  "Levi Bell", "Violet Morrison", "Christian Johnston", "Claire Bishop", "Grayson Lane",
  "Penelope Pierce", "Sebastian Armstrong", "Aurora Boyd", "Miles Steele", "Naomi West"
];
const tagsPool = ["admin", "vip", "moderator", "friend"]
const colorsPool = ["red", "green", "#00baff", "yellow", "orange", "blue"];
function getRandomName() {
  const index = Math.floor(Math.random() * namePool.length);
  return namePool[index];
}

export const mockPlayers = Array.from({ length: 9874 }, (_, i) => ({
  serverId: i + 1,
  name: i % 2 === 0 ? getRandomName() : null,
  username: getRandomName(),
  ping: Math.floor(Math.random() * 200),
  tags: Array.from({ length: Math.floor(Math.random() * 4) }, (_, j) => ({
    label: tagsPool[Math.floor(Math.random() * tagsPool.length)],
    //color: colorsPool[Math.floor(Math.random() * colorsPool.length)],
  })),
  ...(i === Math.floor(Math.random() * 163) ? { localPlayer: true } : {})
}));

export const mockDroppedPlayers = Array.from({ length: 487 }, (_, i) => ({
  serverId: i,
  name: `Player ${i}`,
  tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
    label: "vip" + j,
    color: "green",
  })),
}));


const societyPool = [
  "Los Santos Police Department", "LEO Services", "Staff"
];
export const mockGroups = Array.from({ length: societyPool.length }, (_, i) => ({
  label: societyPool[i],
  playerCount: i > 0 ? 0 : 5,
}));