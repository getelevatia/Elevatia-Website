Pages kept but not served. Nothing under `src/archive` is a route: the app
router only reads `src/app`. To bring one back, `git mv` its folder into
`src/app` and restore its links in `MainNav` and `Footer`.

- `team/`: the Team page, archived 2026-09-30 at the founder's request.
