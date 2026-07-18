# Admin Authentication & Dashboard — Implementation Tracker

## Phase 1–5 (Approved)
- [ ] Update `prisma/schema.prisma` to match approved spec (Admin.role enum, Contact isRead/readAt, ensure timestamps/fields are correct)
- [ ] Create and run Prisma migration + `prisma generate`
- [ ] Add Prisma seed script (`prisma/seed.ts`) to create first admin only if missing (bcrypt-hashed)
- [ ] Implement `/admin/login` UI (React Hook Form + Zod + password visibility + toasts + animations; no reCAPTCHA, no rate limiting)
- [ ] Implement authentication (verify bcrypt, create secure session, redirect to `/admin/dashboard`)
- [ ] Add middleware to protect `/admin/*` dashboard routes and redirect unauthenticated users to `/admin/login`
- [ ] Ensure public routes remain accessible and existing Contact/Feedback APIs are not broken
- [ ] Run tests: `npm run build` and `npm run lint`; verify contact/feedback submission flows and basic admin login flow

## Stop Point
- [ ] Stop after Phase 5 (do not start reCAPTCHA/rate limiting/security hardening beyond Phase 5)

---

# Portfolio UI Responsive + Styling — Implementation Tracker

## Planned changes
- [x] Fix hero profile picture rendering + responsiveness

- [x] Make navbar fully responsive with mobile menu + accessible behavior

- [x] Unify hero/text color palette across the site (consistent gold/accent)

- [ ] Run `npm run lint` and `npm run build` to verify no TS/ESLint issues

