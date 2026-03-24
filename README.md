# Pet Paradise Makeover

A match-3 puzzle game with a pet renovation meta-game built with React Native (Expo).

## Features

- **Match-3 gameplay** — 8x8 grid, swap adjacent tiles, match 3+ in a row/column
- **Power-ups** — Rockets (clear row/column), Bombs (3x3 area), Rainbows (clear tile type)
- **20 handcrafted levels** across 2 areas (Entry Garden & Pet Parlor), plus procedural generation beyond
- **Obstacles** — Boxes, Cages, and Stone tiles with hit points
- **Renovation meta-game** — Spend stars to renovate areas, choose between style options
- **Lives system** — 5 lives, regenerates 1 every 30 minutes
- **Shop** — Lives, Boosters, Stars, and Bundles (IAP stubs ready to wire up)
- **Persistent progress** via AsyncStorage
- **Audio system** — BGM and SFX hooks (stub until real assets added)
- iOS & Android via Expo Go

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native (Expo ~49) |
| Navigation | @react-navigation/stack |
| State | useReducer + Context API |
| Storage | @react-native-async-storage/async-storage |
| Audio | expo-av (stub) |
| Haptics | expo-haptics |

## Project Structure

```
pet-paradise-makeover/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── screens/          # 7 screens
    ├── components/       # Reusable UI components
    │   └── modals/       # Level complete / failed dialogs
    ├── game/             # Pure game logic (no React)
    ├── data/             # Static data: levels, areas, characters
    ├── services/         # Audio, Storage, Ad & IAP stubs
    ├── context/          # GameContext (global state)
    └── utils/            # Animations, helpers, LifeManager
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Expo dev server
npx expo start

# 3. Open on device
#    - Scan QR with Expo Go app (iOS / Android)
#    - Press 'i' for iOS Simulator
#    - Press 'a' for Android Emulator
```

## Adding Real Assets

### Sound Effects
Place `.mp3` files under `src/assets/sounds/`:
- `click.mp3` — tile select
- `whoosh.mp3` — tile swap
- `ding.mp3` — match
- `powerup.mp3` — power-up activation
- `victory.mp3` — level complete
- `fail.mp3` — level failed
- `twinkle.mp3` — star earned

Then un-comment the `Audio.Sound.createAsync(...)` calls in `src/services/AudioManager.js`.

### Background Music
Place `.mp3` loops under `src/assets/music/`:
- `menu.mp3`
- `gameplay.mp3`
- `renovation.mp3`

## Monetisation Wiring

| Feature | Stub file | Real library |
|---|---|---|
| In-App Purchases | `src/services/IAPService.js` | `expo-in-app-purchases` or `react-native-iap` |
| Rewarded Ads | `src/services/AdService.js` | AdMob / Unity Ads / AppLovin |

## Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Android APK / AAB
eas build --platform android

# iOS IPA
eas build --platform ios
```

## Level Design

Levels 1-20 are hand-crafted in `src/data/levels.js`. Beyond level 20, `src/game/LevelGenerator.js` generates levels procedurally with increasing difficulty.

## Testing Checklist

- [ ] Tile selection highlights tile
- [ ] Only adjacent tiles swap
- [ ] Non-adjacent tap changes selection
- [ ] Horizontal 3+ match detected and cleared
- [ ] Vertical 3+ match detected and cleared
- [ ] Score increments on match
- [ ] Cascade matches score with multiplier
- [ ] Tiles fall with gravity after clearing
- [ ] New tiles fill from top
- [ ] Move counter decrements
- [ ] 4-match creates Rocket power-up
- [ ] 5-match creates Bomb power-up
- [ ] Power-ups activate when swapped
- [ ] Level completes when all objectives met
- [ ] Level fails at 0 moves
- [ ] Lives decrease on fail
- [ ] Stars calculated 1-3
- [ ] Shop purchases update inventory
- [ ] Renovation stars deducted correctly
- [ ] Progress persists across restarts
