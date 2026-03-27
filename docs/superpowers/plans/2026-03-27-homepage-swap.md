# Homepage Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic portfolio homepage with the conversion-optimized Istanbul landing page, add a blog section, update SEO meta/structured data, and set up redirects.

**Architecture:** Move the landing page file to become the new `+page.svelte`, add a blog import and section, update structured data URLs and meta tags, add 301 redirects in hooks.server.ts, update sitemap, and remove the old CMS-dependent `+page.server.ts`.

**Tech Stack:** SvelteKit 2, Svelte 5, Tailwind CSS 4, OKLCH colors

---

### Task 1: Add Blog Section to Landing Page

**Files:**
- Modify: `src/routes/istanbul-web-design/+page.svelte` (add blog import + section)

- [ ] **Step 1: Add blogPosts import to script block**

After the existing `import { projects } from '$lib/data/projects';` line (line 9), add:

```svelte
import { blogPosts } from '$lib/data/blog-posts';
```

And after `const isEn = $derived(locale === 'en');` (line 12), add:

```typescript
const latestPosts = $derived(blogPosts.slice(0, 3));
```

- [ ] **Step 2: Add blog section between FAQ and Final CTA**

Insert after the FAQ section's closing `</Section>` and its divider (after line 1440), before the `<!-- FINAL CTA -->` comment:

```svelte
<!-- ====================================================
     BLOG — Latest articles
     ==================================================== -->
<Section class="bg-muted/30">
	<Container>
		<InView animation="fade-up">
			<div class="text-center mb-10">
				<Badge variant="outline" class="mb-6 border-primary/40 text-primary bg-primary/10 text-xs font-semibold uppercase tracking-wider">
					{isEn ? 'Blog' : 'Blog'}
				</Badge>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
					{isEn ? 'Latest Articles' : 'Son Yazılar'}
				</h2>
				<p class="text-muted-foreground mt-3 max-w-xl mx-auto">
					{isEn ? 'Tips, guides, and insights about web design and development' : 'Web tasarım ve geliştirme hakkında ipuçları, rehberler ve içgörüler'}
				</p>
			</div>
		</InView>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each latestPosts as post, i}
				<InView animation="fade-up" delay={i * 100}>
					<a href={getLocalePath(`/blog/${post.slug}/`)} class="group block bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden h-full">
						<div class="p-6">
							<div class="flex items-center gap-2 mb-3">
								<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{isEn ? post.category : post.categoryTr}</span>
								<span class="text-xs text-muted-foreground">{isEn ? post.readTime : post.readTimeTr}</span>
							</div>
							<h3 class="font-semibold leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
								{isEn ? post.title : post.titleTr}
							</h3>
							<p class="text-sm text-muted-foreground line-clamp-2">
								{isEn ? post.description : post.descriptionTr}
							</p>
							<div class="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
								{isEn ? 'Read more' : 'Devamını oku'}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
							</div>
						</div>
					</a>
				</InView>
			{/each}
		</div>
		<div class="text-center mt-8">
			<a href={getLocalePath('/blog/')} class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
				{isEn ? 'View all articles' : 'Tüm yazıları görüntüle'}
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
	</Container>
</Section>

<div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
```

- [ ] **Step 3: Verify dev server shows blog section**

Visit http://localhost:5173/istanbul-web-design and confirm 3 blog post cards appear between FAQ and Final CTA.

---

### Task 2: Update SEO Meta Tags and Structured Data

**Files:**
- Modify: `src/routes/istanbul-web-design/+page.svelte` (meta tags + JSON-LD)

- [ ] **Step 1: Update English meta title**

Change the EN `<title>` from:
```
Web Designer Istanbul | Professional Website Design & Development
```
to:
```
Onur Haniffa | Web Designer Istanbul — Websites That Convert
```

Also update the matching `og:title` and `twitter:title`.

- [ ] **Step 2: Update structured data URL**

In the ProfessionalService JSON-LD, change:
```javascript
url: 'https://onurhaniffa.com/istanbul-web-design/',
```
to:
```javascript
url: 'https://onurhaniffa.com/',
```

- [ ] **Step 3: Verify meta tags render correctly**

View page source at http://localhost:5173/istanbul-web-design and confirm the updated title and structured data URL.

---

### Task 3: Swap the Files

**Files:**
- Move: `src/routes/istanbul-web-design/+page.svelte` → `src/routes/+page.svelte`
- Delete: `src/routes/+page.server.ts` (CMS loader no longer needed)

- [ ] **Step 1: Back up and replace**

```bash
# The old homepage depends on CMS — remove its server loader
rm src/routes/+page.server.ts

# Move the landing page to become the homepage
mv src/routes/istanbul-web-design/+page.svelte src/routes/+page.svelte

# Remove empty directory
rmdir src/routes/istanbul-web-design/
```

- [ ] **Step 2: Verify homepage loads**

Visit http://localhost:5173/ and confirm the landing page renders as the homepage.

---

### Task 4: Add 301 Redirects

**Files:**
- Modify: `src/hooks.server.ts`

- [ ] **Step 1: Add redirects for old landing page URLs**

Add to the `redirects` map:

```typescript
'/istanbul-web-design': '/',
'/istanbul-web-design/': '/',
'/tr/istanbul-web-design': '/tr/',
'/tr/istanbul-web-design/': '/tr/'
```

- [ ] **Step 2: Verify redirects work**

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}" http://localhost:5173/istanbul-web-design
```

Expected: `301` redirect to `/`

---

### Task 5: Update Sitemap

**Files:**
- Modify: `src/routes/sitemap.xml/+server.ts`

- [ ] **Step 1: Remove istanbul-web-design from sitemap pages**

Remove this line from the `pages` array:
```typescript
{ path: '/istanbul-web-design/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-02-15' },
```

- [ ] **Step 2: Update homepage lastmod date**

Change the homepage entry to:
```typescript
{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-03-27' },
```

- [ ] **Step 3: Verify sitemap**

Visit http://localhost:5173/sitemap.xml and confirm `/istanbul-web-design/` is gone and homepage has updated date.

---

### Task 6: Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors (warnings about state_referenced_locally and Resend are pre-existing and fine).

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Visit http://localhost:4173/ and verify:
- Homepage renders the landing page content
- Blog section shows 3 posts
- All WhatsApp links work
- `/istanbul-web-design` redirects to `/`
- Sitemap is correct

---

### Task 7: Commit

- [ ] **Step 1: Stage and commit all changes**

```bash
git add src/routes/+page.svelte src/routes/+page.server.ts src/routes/istanbul-web-design/ src/hooks.server.ts src/routes/sitemap.xml/+server.ts
git commit -m "feat: swap homepage with conversion-optimized landing page

- Replace generic portfolio homepage with Istanbul landing page
- Add blog section (3 latest posts) between FAQ and CTA
- Update SEO meta tags and structured data URL for homepage
- Add 301 redirects from /istanbul-web-design to /
- Remove CMS-dependent page server loader
- Update sitemap to remove old landing page route"
```
