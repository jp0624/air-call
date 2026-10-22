# Aircall / Workspace

A sharp-edged, responsive telecom-style call activity interface built with React, TypeScript, Vite and Tailwind CSS 4.

[Live workspace](https://15e27db3.vercel.app/)

## Features

- Activity feed and archive with individual and bulk archive/restore.
- Search by contact, company or number; filter by outcome, direction and local date.
- Full call details, selection controls, sorting, incremental loading and CSV export of the current view.
- Browser-persisted fictional demo records, with a reset action and clear storage-error messaging.
- Optional connection to the original exercise REST API. Requests time out, report failures and retain existing data.
- Bulk API updates use batches of four. Successful changes stay applied; failures remain unchanged and are reported. No per-item feed refetches.
- Responsive layouts from narrow phones to desktops, keyboard focus styles and reduced-motion support.
- No rounded corners. Tailwind 4 is integrated through the Vite plugin, with shared design tokens in `src/styles.css`.

## Development

Use Node 24:

```sh
npm ci
npm run dev
npm test
npm run build
```

The production output is `dist`. `vercel.json` declares the Vite build and frontend fallback route. Compiled bundles are not committed.

## Data and service boundaries

The default **Demo workspace** contains 32 fictional call records. Archive state persists only in this browser. No telephone calls, texts, recordings or real business metrics are created. Demo dates and metrics are generated from the sample records.

**Try original API** requests `https://aircall-api.onrender.com/activities`. The original external service returned HTTP 503 during this update; its availability is outside this repository. If connection fails, the demo remains usable and an error is displayed. If connection succeeds, the source label changes and archive operations use `PATCH /activities/:id` with `{is_archived:boolean}`. The legacy shared reset endpoint is not invoked.

To use another compatible API, set the public build variable `VITE_AIRCALL_API_URL`. Never put secrets in a Vite public variable.

CSV exports include only the filtered current folder, escape CSV quotes and guard against spreadsheet formula prefixes.

## Verification

`npm test` covers data normalization, duplicate/invalid records, formatting, HTTP failure/timeout, individual archive/restore, persistence, filtered bulk actions and partial API failure. Browser checks cover export, menus, mobile layout and square-edged controls.

## Project cleanup

The old Webpack/SCSS build, mixed Tailwind 3/4 configuration, unused UI wrappers and committed static bundles were replaced by one Vite/Tailwind 4 pipeline. This is an independent portfolio exercise inspired by Aircall, not an official Aircall product.
