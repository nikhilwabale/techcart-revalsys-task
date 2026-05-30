# TechCart — Rendering, Performance, SEO & Hydration

This document explains every concept implemented in this project.

---

## 1. Rendering Strategies

| Page | Strategy | Reason |
|---|---|---|
| `/` Home | **SSG** | Static content, built once at build time |
| `/products` | **SSG + CSR** | Page shell is static, filters run in browser |
| `/products/[id]` | **SSG** | All pages pre-built via generateStaticParams |
| `/cart` | **CSR** | Personal data from localStorage, no server access |
| `/login` `/signup` | **CSR** | Form interaction, localStorage auth |
| `/about` `/contact` | **SSG** | Fully static content |

---

## 2. SSR vs SSG vs CSR

### SSR — Server Side Rendering
Server builds complete HTML **on every request**.
```
User requests page → Server fetches data → Builds HTML → Sends to Browser
```
Use when: data changes per request (user-specific data, live prices)

### SSG — Static Site Generation ✅ Used in this project
Server builds HTML **once at build time**.
```
npm run build → Next.js reads JSON → Pre-builds all HTML → Done forever
User requests /products/5 → Instant static HTML served
```
Use when: data is the same for all users (product catalog, about page)

### CSR — Client Side Rendering
Browser receives minimal HTML, **JavaScript builds the page**.
```
Request → Empty HTML + JS bundle → Browser runs JS → Page appears
```
Use when: personal/interactive data (cart, auth, search filters)

---

## 3. Hydration — Most Important Concept

**Definition:** Hydration is React attaching event listeners to server-rendered HTML to make it interactive.

### Step by step:
```
Step 1: Server builds complete HTML → sends to browser
Step 2: Browser displays HTML immediately (fast, SEO-readable)
        BUT: buttons don't work yet, no React state, no animations
Step 3: React JS bundle downloads in background
Step 4: React "hydrates" — reads existing HTML, attaches event listeners
Step 5: Page is now fully interactive
```

### Real example in this project (AddToCartButton):
```
Before hydration: <button>Add to Cart</button>  ← visible but clicking does nothing
After hydration:  <button onClick={addToCart}>Add to Cart</button>  ← now works
```

### Hydration Mismatch Prevention (CartContext):
```
Server renders:  cart items = []   (server has no localStorage access)
Client has:      cart items = [laptop, mobile]  (from localStorage)

Without isLoaded flag → React sees mismatch → throws error
With isLoaded flag    → Both start with [] → then client loads real data → no error
```

---

## 4. Performance Optimizations

| Optimization | File | What it does |
|---|---|---|
| `React.memo` | `ProductCard.tsx` | Component only re-renders if product prop changes |
| `useMemo` (filter) | `ProductFilters.tsx` | Filtered list only recomputed when search/category changes |
| `useMemo` (totals) | `CartContext.tsx` | totalItems/totalPrice only recomputed when cart changes |
| `generateStaticParams` | `products/[id]/page.tsx` | All product pages pre-built at build time |
| `priority` on hero image | `page.tsx` | Browser preloads above-fold image → improves LCP |
| `sizes` on all images | All pages | Browser fetches correct image size for viewport |
| `Suspense` boundary | `products/page.tsx` | Streams page progressively, shows skeleton while loading |
| `loading.tsx` files | All routes | Skeleton UI shown during page navigation |
| `prefetch` on nav links | `Navbar.tsx`, pages | Next page pre-fetched in background before user clicks |
| `viewport: once: true` | `ProductCard.tsx` | Animation plays once, not on every scroll |
| `lg:sticky` on cart summary | `CartClient.tsx` | No re-render on scroll, CSS handles position |

---

## 5. SEO Implementation

| SEO Feature | Where | Why |
|---|---|---|
| `metadata` export | Every page | Injects `<title>` and `<meta description>` in `<head>` |
| `generateMetadata` | `/products/[id]` | Dynamic title/description per product |
| `openGraph` tags | All public pages | Social media preview cards (LinkedIn, WhatsApp) |
| `keywords` | Home, products, detail | Helps search engines understand page topic |
| `robots: noindex` | Cart, Login, Signup | Private pages not crawled by Google |
| `generateStaticParams` | `/products/[id]` | Pre-built HTML → crawlers see real content, not JS shell |
| `notFound()` | Product detail | Proper 404 HTTP status → prevents Google indexing broken URLs |
| One `h1` per page | All pages | Main heading for search engines |
| `h2` for sections | All pages | Section headings — correct hierarchy |
| `h3` in ProductCard | Product cards | Sub-heading inside article |
| `lang="en"` | `layout.tsx` | Tells crawlers and screen readers the page language |
| Semantic HTML | All pages | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` |
| `aria-label` | Sections, buttons | Accessibility — screen readers understand purpose |
| `sr-only` headings | Category section | Hidden heading for crawlers and screen readers |

---

## 6. What Happens When You Visit /products/5

```
1.  Browser requests /products/5
2.  Next.js serves pre-built static HTML (from npm run build)
3.  Browser displays: product name, image, price, description, features — INSTANTLY
4.  No server computation happened — it was already built
5.  React JS bundle loads in browser (background)
6.  React HYDRATES the page:
      - AddToCartButton gets onClick handler → cart button works
      - Framer Motion activates → hover effects, animations start
7.  User clicks "Add to Cart" → CartContext updates → localStorage saves
8.  Cart count in Navbar updates → React re-renders Navbar (client component)
9.  ProductCard is memoized → it does NOT re-render (product didn't change)
```

---

## 7. Server Components vs Client Components

| | Server Component | Client Component |
|---|---|---|
| Default in App Router | ✅ Yes | ❌ No — needs "use client" |
| Runs on | Server (build/request) | Browser (after hydration) |
| Can use hooks | ❌ No | ✅ Yes |
| Can access localStorage | ❌ No | ✅ Yes |
| Included in JS bundle | ❌ No (smaller bundle) | ✅ Yes |
| Good for SEO | ✅ Yes | ⚠️ Only if hydrated |
| Examples in this project | page.tsx files | Context, Navbar, ProductFilters |
