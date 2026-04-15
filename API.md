# Slow Football — Game API Reference

Base URL: `https://slowfootball.club/api`

Auth headers (where marked **auth**): `Authorization: Bearer <token>`, `X-Club: Leverkusen`, `X-Role: manager`

---

## Auth

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/auth/login` | — | Body: `{username, password}` → `{token}` |

---

## Week / Season

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/fixtures/week` | open | `{currentWeek: 33}` — current game week |
| GET | `/fixtures` | open | All fixtures with results |
| GET | `/tables/from-fixtures` | open | League tables — `{north:[…], south:[…], meta:{asOfWeek}}` *(asOfWeek returns 0 — use `/fixtures/week` instead)* |
| GET | `/competitions` | open | `[{id, name, type, rounds}]` — e.g. League, SLOW Cup |

---

## Clubs & Managers

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/clubs` | open | `["Ajax","Arsenal",…]` — all 60 clubs |
| GET | `/admin/squads/public/clubs` | open | `{clubs:[…]}` — same list, object wrapper |
| GET | `/managers` | open | `{managers:[{username,name,role,club}]}` |
| GET | `/admin/managers` | open | `[{username,role,club,name}]` |
| GET | `/admin/profile/vacancies` | **auth** | `{ok,clubs:[…]}` — clubs with open manager applications |

---

## Squads & Players

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/squads` | **auth** | `{ClubName: [{Player,Position,Rating,TM Value,Club,Form,…}]}` — all clubs |
| GET | `/squads?club=Leverkusen` | **auth** | `{club,players:[…]}` — single club |
| GET | `/player-stats?player=NAME` | **auth** | Current-season stats — `{player,seasonStats:{goals,assists,apps,…}}` |
| GET | `/player-stats?player=NAME&history=true` | **auth** | + career totals, form/confidence/morale — `{career,seasonStats,form,confidence,morale}` |
| GET | `/agents/international-players` | **auth** | `[{Player,Nationality,Position,Rating,Value,…}]` — international scouting pool (~108 players) |

---

## Transfers

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/transfers/done` | **auth** | `{deals:[{playerName,seller,buyer,amount,…}]}` |
| GET | `/transfer-list` | **auth** | `{listings:[{id,player,ownerClub,position,askingPrice,…}]}` |

---

## Matches

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/matches?club=NAME&limit=N` | open | `{ok,matches:[{fixtureId,kickoff,gameweek,competition,home,away,…}]}` |
| GET | `/matches/:fixtureId` | open | Full match detail |

---

## Scouting

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/scouting/jobs?club=NAME` | **auth** | `{items:[…]}` — active scouting jobs |
| GET | `/scouting/jobs?club=NAME&status=rejected` | **auth** | Rejected jobs |
| GET | `/scouting/jobs?club=NAME&status=accepted` | **auth** | Accepted / completed jobs |

---

## Academy

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/academy?club=NAME` | **auth** | `{items:[{Player,Position,Rating,Age,…}]}` |

---

## Facilities

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/facilities?club=NAME` | **auth** | `{levels:{training,academy,scouting,medical,analytics,stadium}, project:{…}}` |
| GET | `/facilities/quote?club=NAME&key=TYPE` | **auth** | `{ok,key,from,to,baseCost,discount,discountPct,finalCost,days,canAfford}` — TYPE: training/academy/scouting/medical/analytics/stadium |

---

## Staff

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/staff?club=NAME` | **auth** | `{current:{CEO,Technical Director,Assistant,Physio}, openAds:[…], responsibilities:{…}}` |
| GET | `/staff/effects?club=NAME` | **auth** | `{ok,club,effects:{training,scouting,medical,finances,automation}}` |
| GET | `/staff/applicants?club=NAME` | open | `{applicants:[{id,club,role,name,rating,weeklyWage,contractWeeks,introducedWeek,expiresWeek}]}` |
| POST | `/staff/ads` | open | Body: `{club,roles:[…]}` → `{ok,openAds:[…]}` — sets which roles have live ads (empty array = unpost all) |
| POST | `/staff/applicants/reject` | open | Body: `{club,id}` → `{ok,removed:1}` |
| POST | `/staff/generate` | open | Body: `{club,week}` → `{applicants:[…]}` — generates new candidates for open ads; toggle ads off/on first to refresh |

**Staff week note:** Staff is generated for `currentWeek - 1`. Use `/fixtures/week` to get `currentWeek`.

---

## Finance / Budget

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/budgets?format=full` | **auth** | `{budgets:{ClubName: transferBudget, …}}` — all clubs' transfer budgets |

---

## Auctions

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/auctions` | **auth** | `{items:[…]}` — active player auctions |

---

## Negotiations

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/negotiations` | open | `{items:[{id,seller,buyer,player,fee,status,updatedAt,…}]}` |

---

## Submissions (Match lineups)

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/submissions?club=NAME&limit=N` | **auth** | `{items:[{submissionId,club,lineup,…}]}` |

---

## Training

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/training?club=NAME` | **auth** | `{plans:{PlayerName:{playerId,focus,weeks,startedAt}}}` |

---

## POST-only / Write endpoints

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/auth/login` | — | Credentials → token |
| POST | `/staff/ads` | open | Set live ads |
| POST | `/staff/applicants/reject` | open | Reject applicant by id |
| POST | `/staff/generate` | open | Generate new staff candidates |

---

## Not found (404)

These were tested and do not exist: `/api/game`, `/api/week`, `/api/weeks`, `/api/season`, `/api/standings`, `/api/injuries`, `/api/contracts`, `/api/wages`, `/api/finance`, `/api/inbox`, `/api/tactics`, `/api/lineup`, `/api/scouting/pool`, `/api/scouting/international`, `/api/profile`, `/api/me`, `/api/cups`
