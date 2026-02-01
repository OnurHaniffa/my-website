#!/bin/bash
# Directus CMS Schema Setup Script (Directus 11+)
# Creates all collections, fields, permissions, and seeds initial content.
# Uses the policy-based permission model introduced in Directus 11.

set -e

DIRECTUS_URL="${DIRECTUS_URL:-http://localhost:8055}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@example.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin}"

echo "=== Directus Schema Setup ==="
echo "URL: $DIRECTUS_URL"

# Authenticate
echo "Authenticating..."
AUTH_RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"'"$ADMIN_EMAIL"'","password":"'"$ADMIN_PASSWORD"'"}')

TOKEN=$(echo "$AUTH_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['access_token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "ERROR: Failed to authenticate. Is Directus running at $DIRECTUS_URL?"
  echo "Response: $AUTH_RESPONSE"
  exit 1
fi

echo "Authenticated successfully."

# Helper: POST JSON to Directus
post_json() {
  local url="$1"
  local body="$2"
  printf '%s' "$body" | curl -s -X POST "$url" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d @- 2>/dev/null || true
}

# Helper: PATCH JSON to Directus
patch_json() {
  local url="$1"
  local body="$2"
  printf '%s' "$body" | curl -s -X PATCH "$url" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d @- 2>/dev/null || true
}

# Helper: create a collection
create_collection() {
  local name="$1"
  local singleton="$2"
  local icon="${3:-article}"
  echo "  Creating collection: $name (singleton=$singleton)"
  post_json "$DIRECTUS_URL/collections" \
    '{"collection":"'"$name"'","schema":{},"meta":{"singleton":'"$singleton"',"icon":"'"$icon"'"}}' > /dev/null
}

# Helper: create a field
create_field() {
  local collection="$1"
  local field="$2"
  local type="$3"
  local iface="$4"
  local options="$5"

  local body
  if [ -n "$options" ]; then
    body='{"field":"'"$field"'","type":"'"$type"'","schema":{},"meta":{"interface":"'"$iface"'","options":'"$options"'}}'
  else
    body='{"field":"'"$field"'","type":"'"$type"'","schema":{},"meta":{"interface":"'"$iface"'"}}'
  fi
  post_json "$DIRECTUS_URL/fields/$collection" "$body" > /dev/null
}

# Helper: create sort field
create_sort_field() {
  local collection="$1"
  post_json "$DIRECTUS_URL/fields/$collection" \
    '{"field":"sort","type":"integer","schema":{},"meta":{"interface":"input","hidden":true}}' > /dev/null
}

# ============================================
# Create Singleton Collections
# ============================================

echo ""
echo "=== Creating Singleton Collections ==="

create_collection "site_settings" "true" "settings"
for field in site_title site_description hero_badge_text hero_headline hero_highlight_word hero_description \
  stat_1_value stat_1_label stat_2_value stat_2_label stat_3_value stat_3_label \
  services_section_title services_section_subtitle portfolio_section_title portfolio_section_subtitle \
  why_me_section_title why_me_section_subtitle \
  site_url theme_color og_image linkedin_url \
  services_badge portfolio_badge why_me_badge \
  view_work_button lets_talk_button explore_services_button view_all_work_button learn_more_button; do
  create_field "site_settings" "$field" "string" "input"
done

create_collection "header_settings" "true" "web"
create_field "header_settings" "logo_text" "string" "input"
create_field "header_settings" "logo_subtitle" "string" "input"
create_field "header_settings" "cta_text" "string" "input"
create_field "header_settings" "cta_href" "string" "input"
create_field "header_settings" "nav_items" "json" "input-code" '{"language":"json"}'

create_collection "footer_settings" "true" "call_to_action"
create_field "footer_settings" "cta_heading" "string" "input"
create_field "footer_settings" "cta_highlight" "string" "input"
create_field "footer_settings" "cta_description" "text" "input-multiline"
create_field "footer_settings" "tagline" "text" "input-multiline"
create_field "footer_settings" "email" "string" "input"
create_field "footer_settings" "location" "string" "input"
create_field "footer_settings" "response_time" "string" "input"
create_field "footer_settings" "linkedin_url" "string" "input"
create_field "footer_settings" "brand_name" "string" "input"
create_field "footer_settings" "brand_subtitle" "string" "input"
create_field "footer_settings" "bottom_tagline" "string" "input"
create_field "footer_settings" "cta_button_text" "string" "input"
create_field "footer_settings" "pages_heading" "string" "input"
create_field "footer_settings" "contact_heading" "string" "input"

create_collection "services_page_settings" "true" "design_services"
create_field "services_page_settings" "hero_heading" "string" "input"
create_field "services_page_settings" "hero_highlight" "string" "input"
create_field "services_page_settings" "hero_description" "text" "input-multiline"
create_field "services_page_settings" "testimonial_quote" "text" "input-multiline"
create_field "services_page_settings" "testimonial_author" "string" "input"
create_field "services_page_settings" "testimonial_role" "string" "input"
create_field "services_page_settings" "testimonial_initial" "string" "input"
create_field "services_page_settings" "faq_heading" "string" "input"
create_field "services_page_settings" "meta_title" "string" "input"
create_field "services_page_settings" "meta_description" "text" "input-multiline"

create_collection "about_page_settings" "true" "person"
create_field "about_page_settings" "hero_heading" "string" "input"
create_field "about_page_settings" "hero_name" "string" "input"
create_field "about_page_settings" "hero_description_1" "text" "input-multiline"
create_field "about_page_settings" "hero_description_2" "text" "input-multiline"
create_field "about_page_settings" "philosophy_badge" "string" "input"
create_field "about_page_settings" "philosophy_heading" "string" "input"
create_field "about_page_settings" "philosophy_subheading" "string" "input"
create_field "about_page_settings" "tools_badge" "string" "input"
create_field "about_page_settings" "tools_heading" "string" "input"
create_field "about_page_settings" "tools_description" "text" "input-multiline"
create_field "about_page_settings" "facts_badge" "string" "input"
create_field "about_page_settings" "facts_heading" "string" "input"
create_field "about_page_settings" "facts_subheading" "string" "input"
create_field "about_page_settings" "availability_text" "string" "input"
create_field "about_page_settings" "availability_location" "string" "input"
create_field "about_page_settings" "meta_title" "string" "input"
create_field "about_page_settings" "meta_description" "text" "input-multiline"

create_collection "contact_page_settings" "true" "contact_mail"
create_field "contact_page_settings" "hero_badge" "string" "input"
create_field "contact_page_settings" "hero_heading" "string" "input"
create_field "contact_page_settings" "hero_highlight" "string" "input"
create_field "contact_page_settings" "hero_description" "text" "input-multiline"
create_field "contact_page_settings" "email" "string" "input"
create_field "contact_page_settings" "response_time" "string" "input"
create_field "contact_page_settings" "availability" "string" "input"
create_field "contact_page_settings" "faq_heading" "string" "input"
create_field "contact_page_settings" "meta_title" "string" "input"
create_field "contact_page_settings" "meta_description" "text" "input-multiline"

create_collection "work_page_settings" "true" "work"
create_field "work_page_settings" "hero_heading" "string" "input"
create_field "work_page_settings" "hero_highlight" "string" "input"
create_field "work_page_settings" "hero_description" "text" "input-multiline"
create_field "work_page_settings" "cta_number" "string" "input"
create_field "work_page_settings" "cta_heading" "string" "input"
create_field "work_page_settings" "cta_description" "text" "input-multiline"
create_field "work_page_settings" "meta_title" "string" "input"
create_field "work_page_settings" "meta_description" "text" "input-multiline"
create_field "work_page_settings" "filter_concept_label" "string" "input"
create_field "work_page_settings" "filter_client_label" "string" "input"
create_field "work_page_settings" "challenge_heading" "string" "input"
create_field "work_page_settings" "solution_heading" "string" "input"
create_field "work_page_settings" "preview_label" "string" "input"
create_field "work_page_settings" "preview_heading" "string" "input"
create_field "work_page_settings" "load_demo_text" "string" "input"
create_field "work_page_settings" "pearl_pull_quote" "text" "input-multiline"

create_collection "privacy_page_settings" "true" "privacy_tip"
create_field "privacy_page_settings" "title" "string" "input"
create_field "privacy_page_settings" "last_updated" "string" "input"
create_field "privacy_page_settings" "content" "text" "input-rich-text-html"
create_field "privacy_page_settings" "meta_title" "string" "input"
create_field "privacy_page_settings" "meta_description" "text" "input-multiline"

# ============================================
# Create Regular Collections
# ============================================

echo ""
echo "=== Creating Regular Collections ==="

create_collection "projects" "false" "folder"
create_sort_field "projects"
create_field "projects" "status" "string" "select-dropdown" '{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]}'
create_field "projects" "slug" "string" "input"
create_field "projects" "title" "string" "input"
create_field "projects" "tagline" "string" "input"
create_field "projects" "description" "text" "input-multiline"
create_field "projects" "thumbnail" "string" "input"
create_field "projects" "screenshot_desktop" "string" "input"
create_field "projects" "screenshot_mobile" "string" "input"
create_field "projects" "industry" "string" "input"
create_field "projects" "services" "json" "tags"
create_field "projects" "year" "string" "input"
create_field "projects" "challenge" "text" "input-multiline"
create_field "projects" "solution" "text" "input-multiline"
create_field "projects" "results" "json" "tags"
create_field "projects" "testimonial_quote" "text" "input-multiline"
create_field "projects" "testimonial_author" "string" "input"
create_field "projects" "testimonial_role" "string" "input"
create_field "projects" "images" "json" "tags"
create_field "projects" "live_url" "string" "input"
create_field "projects" "is_client_work" "boolean" "boolean"
create_field "projects" "showcase_type" "string" "input"
create_field "projects" "enable_live_demo" "boolean" "boolean"

create_collection "services" "false" "miscellaneous_services"
create_sort_field "services"
create_field "services" "title" "string" "input"
create_field "services" "description" "text" "input-multiline"
create_field "services" "icon" "text" "input-code" '{"language":"html"}'
create_field "services" "features" "json" "tags"
create_field "services" "color_class" "string" "input"

create_collection "why_me_points" "false" "thumb_up"
create_sort_field "why_me_points"
create_field "why_me_points" "title" "string" "input"
create_field "why_me_points" "description" "text" "input-multiline"
create_field "why_me_points" "icon" "text" "input-code" '{"language":"html"}'
create_field "why_me_points" "color_class" "string" "input"

create_collection "services_detailed" "false" "build"
create_sort_field "services_detailed"
create_field "services_detailed" "title" "string" "input"
create_field "services_detailed" "short_title" "string" "input"
create_field "services_detailed" "description" "text" "input-multiline"
create_field "services_detailed" "icon" "text" "input-multiline"
create_field "services_detailed" "color" "string" "input"
create_field "services_detailed" "light_color" "string" "input"
create_field "services_detailed" "process" "json" "tags"
create_field "services_detailed" "deliverables" "json" "tags"
create_field "services_detailed" "timeline" "string" "input"

create_collection "services_faqs" "false" "quiz"
create_sort_field "services_faqs"
create_field "services_faqs" "question" "string" "input"
create_field "services_faqs" "answer" "text" "input-multiline"

create_collection "philosophy_cards" "false" "lightbulb"
create_sort_field "philosophy_cards"
create_field "philosophy_cards" "number" "string" "input"
create_field "philosophy_cards" "title" "string" "input"
create_field "philosophy_cards" "description" "text" "input-multiline"
create_field "philosophy_cards" "gradient" "string" "input"
create_field "philosophy_cards" "accent" "string" "input"
create_field "philosophy_cards" "icon_bg" "string" "input"
create_field "philosophy_cards" "icon" "text" "input-code" '{"language":"html"}'

create_collection "tool_groups" "false" "construction"
create_sort_field "tool_groups"
create_field "tool_groups" "label" "string" "input"
create_field "tool_groups" "tools" "json" "input-code" '{"language":"json"}'

create_collection "quick_facts" "false" "info"
create_sort_field "quick_facts"
create_field "quick_facts" "icon" "text" "input-code" '{"language":"html"}'
create_field "quick_facts" "label" "string" "input"
create_field "quick_facts" "value" "string" "input"
create_field "quick_facts" "bg" "string" "input"
create_field "quick_facts" "color" "string" "input"
create_field "quick_facts" "border" "string" "input"

create_collection "academic_roles" "false" "school"
create_sort_field "academic_roles"
create_field "academic_roles" "icon" "text" "input-code" '{"language":"html"}'
create_field "academic_roles" "role" "string" "input"
create_field "academic_roles" "place" "string" "input"
create_field "academic_roles" "description" "text" "input-multiline"

create_collection "contact_faqs" "false" "help"
create_sort_field "contact_faqs"
create_field "contact_faqs" "question" "string" "input"
create_field "contact_faqs" "answer" "text" "input-multiline"

# ============================================
# Public Read Permissions (Directus 11 policy model)
# ============================================

echo ""
echo "=== Setting up public read permissions ==="

# Get the public policy ID
PUBLIC_POLICY_ID=$(curl -s "$DIRECTUS_URL/policies" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "
import sys,json
policies = json.load(sys.stdin)['data']
for p in policies:
    if p.get('name') == '\$t:public_label' or 'public' in p.get('name','').lower():
        print(p['id'])
        break
" 2>/dev/null)

if [ -z "$PUBLIC_POLICY_ID" ]; then
  echo "  WARNING: Could not find public policy. Creating one..."
  POLICY_RESP=$(post_json "$DIRECTUS_URL/policies" \
    '{"name":"Public","icon":"public","admin_access":false,"app_access":false}')
  PUBLIC_POLICY_ID=$(echo "$POLICY_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)
fi

echo "  Public policy ID: $PUBLIC_POLICY_ID"

ALL_COLLECTIONS="site_settings header_settings footer_settings services_page_settings about_page_settings contact_page_settings work_page_settings privacy_page_settings projects services why_me_points services_detailed services_faqs philosophy_cards tool_groups quick_facts academic_roles contact_faqs"

for collection in $ALL_COLLECTIONS; do
  echo "  Public read: $collection"
  post_json "$DIRECTUS_URL/permissions" \
    '{"policy":"'"$PUBLIC_POLICY_ID"'","collection":"'"$collection"'","action":"read","fields":["*"]}' > /dev/null
done

# ============================================
# Create Editor Role + Policy (Directus 11)
# ============================================

echo ""
echo "=== Creating Editor role ==="

ROLE_RESPONSE=$(post_json "$DIRECTUS_URL/roles" \
  '{"name":"Editor","icon":"edit","description":"Can read and update all content. Cannot modify schema."}')

EDITOR_ROLE_ID=$(echo "$ROLE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)

if [ -n "$EDITOR_ROLE_ID" ]; then
  echo "  Editor role created: $EDITOR_ROLE_ID"

  # Create a policy for the Editor role
  EDITOR_POLICY_RESP=$(post_json "$DIRECTUS_URL/policies" \
    '{"name":"Editor Policy","icon":"edit","admin_access":false,"app_access":true}')
  EDITOR_POLICY_ID=$(echo "$EDITOR_POLICY_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)

  if [ -n "$EDITOR_POLICY_ID" ]; then
    echo "  Editor policy created: $EDITOR_POLICY_ID"

    # Link policy to role via access table
    post_json "$DIRECTUS_URL/access" \
      '{"role":"'"$EDITOR_ROLE_ID"'","policy":"'"$EDITOR_POLICY_ID"'","user":null}' > /dev/null

    # Create permissions
    for collection in $ALL_COLLECTIONS; do
      for action in read update; do
        post_json "$DIRECTUS_URL/permissions" \
          '{"policy":"'"$EDITOR_POLICY_ID"'","collection":"'"$collection"'","action":"'"$action"'","fields":["*"]}' > /dev/null
      done
      case "$collection" in
        *_settings) ;;
        *)
          for action in create delete; do
            post_json "$DIRECTUS_URL/permissions" \
              '{"policy":"'"$EDITOR_POLICY_ID"'","collection":"'"$collection"'","action":"'"$action"'","fields":["*"]}' > /dev/null
          done
          ;;
      esac
    done

    # File upload permissions
    for action in read create update; do
      post_json "$DIRECTUS_URL/permissions" \
        '{"policy":"'"$EDITOR_POLICY_ID"'","collection":"directus_files","action":"'"$action"'","fields":["*"]}' > /dev/null
    done

    echo "  Editor permissions configured."
  else
    echo "  WARNING: Could not create Editor policy"
  fi
else
  echo "  WARNING: Could not create Editor role (may already exist)"
fi

# ============================================
# Seed Initial Content (PATCH for singletons)
# ============================================

echo ""
echo "=== Seeding initial content ==="

seed_singleton() {
  local collection="$1"
  local json="$2"
  echo "  Seeding $collection..."
  patch_json "$DIRECTUS_URL/items/$collection" "$json" > /dev/null
}

seed_singleton "header_settings" '{
  "logo_text": "Onur Haniffa",
  "logo_subtitle": "Est. 2025",
  "cta_text": "Lets Talk",
  "cta_href": "/contact",
  "nav_items": [
    {"href": "/", "label": "Home"},
    {"href": "/work", "label": "Work"},
    {"href": "/services", "label": "Services"},
    {"href": "/about", "label": "About"}
  ]
}'

seed_singleton "footer_settings" '{
  "cta_heading": "Ready to",
  "cta_highlight": "stand out",
  "cta_description": "Lets talk about your project. No pressure, no sales pitch - just a friendly conversation to see if we are a good fit.",
  "tagline": "Crafting beautiful websites that turn curious visitors into loyal customers.",
  "email": "contact@onurhaniffa.com",
  "location": "Based in Europe",
  "response_time": "Replies within 24h",
  "linkedin_url": "https://www.linkedin.com/in/onurhaniffa/",
  "brand_name": "Onur Haniffa",
  "brand_subtitle": "Est. 2025",
  "bottom_tagline": "Designed with passion",
  "cta_button_text": "Start a project",
  "pages_heading": "Explore",
  "contact_heading": "Contact"
}'

seed_singleton "services_page_settings" '{
  "hero_heading": "Websites that",
  "hero_highlight": "work",
  "hero_description": "Custom builds, strategic redesigns, and ongoing support. No templates, no hourly billing - just results.",
  "testimonial_quote": "Onur did an excellent job on my website. He was great to communicate with and delivered on every point needed for my website.",
  "testimonial_author": "Joe",
  "testimonial_role": "Fan Artist",
  "testimonial_initial": "J",
  "faq_heading": "FAQ",
  "meta_title": "Services | Onur Haniffa",
  "meta_description": "Professional web design and development services. From complete website builds to redesigns and ongoing support. Fast, modern, SEO-optimized."
}'

seed_singleton "contact_page_settings" '{
  "hero_badge": "Lets Talk",
  "hero_heading": "Start a",
  "hero_highlight": "conversation",
  "hero_description": "Tell me about your project and goals. I will get back to you within 24 hours with thoughts on how we can work together.",
  "email": "contact@onurhaniffa.com",
  "response_time": "Within 24 hours",
  "availability": "European time zones (CET/CEST)",
  "faq_heading": "Common Questions",
  "meta_title": "Contact | Onur Haniffa",
  "meta_description": "Lets talk about your project. Get in touch for a free consultation about your web design and development needs. Quick response guaranteed."
}'

seed_singleton "work_page_settings" '{
  "hero_heading": "that",
  "hero_highlight": "speaks",
  "hero_description": "A mix of client work and passion projects, each built with the same care and attention to detail.",
  "cta_number": "03",
  "cta_heading": "Have a project in mind?",
  "cta_description": "I would love to hear about it and explore how we can bring your vision to life together.",
  "meta_title": "Work | Onur Haniffa",
  "meta_description": "Selected projects showcasing strategy, design, and real results. See how I help businesses succeed online with modern web design.",
  "filter_concept_label": "Concept Build",
  "filter_client_label": "Live Project",
  "challenge_heading": "The Challenge",
  "solution_heading": "The Solution",
  "preview_label": "Interactive Preview",
  "preview_heading": "Experience it live",
  "load_demo_text": "Load Interactive Demo",
  "pearl_pull_quote": "The goal was simple: make patients feel welcome before they even walk through the door."
}'

seed_singleton "about_page_settings" '{
  "hero_heading": "Hey, I am",
  "hero_name": "Onur",
  "hero_description_1": "I design and build websites that are fast, clean, and built to convert.",
  "hero_description_2": "I work with SvelteKit and modern UI tools to create sites that load instantly, feel smooth, and make it easy for people to contact you or book. My background in computer engineering means I am particular about performance, clarity, and clean implementation.",
  "philosophy_badge": "How I approach projects",
  "philosophy_heading": "Design philosophy",
  "philosophy_subheading": "The principles behind everything I build.",
  "tools_badge": "My stack",
  "tools_heading": "Tools & tech",
  "tools_description": "The right tools make all the difference. I have built my stack around speed, reliability, and clean code - so your site loads fast and stays easy to maintain.",
  "facts_badge": "The essentials",
  "facts_heading": "Quick facts",
  "facts_subheading": "A few things that make me, me.",
  "availability_text": "Currently available for new projects",
  "availability_location": "Based in Europe, working worldwide",
  "meta_title": "About | Onur Haniffa",
  "meta_description": "I am Onur, a web designer and developer creating fast, modern websites with SvelteKit. Based in Europe, working with clients worldwide."
}'

seed_singleton "privacy_page_settings" '{
  "title": "Privacy Policy",
  "last_updated": "December 2024",
  "content": "",
  "meta_title": "Privacy Policy | Onur Haniffa",
  "meta_description": "Privacy Policy for Onur Haniffa Web Design. Learn how I collect, use, and protect your personal information."
}'

seed_singleton "site_settings" '{
  "site_title": "Onur Haniffa | Web Designer & Developer",
  "site_description": "I design and build websites that turn visitors into customers. Modern, professional web design and development with strategy and clarity. Based in Europe.",
  "hero_badge_text": "Available for Projects",
  "hero_headline": "I build websites that turn visitors into",
  "hero_highlight_word": "customers",
  "hero_description": "From first click to final conversion - I design and develop websites that do not just look good, they deliver real business results.",
  "services_section_title": "What I do",
  "services_section_subtitle": "End-to-end web solutions tailored to help your business succeed online.",
  "portfolio_section_title": "Recent Projects",
  "portfolio_section_subtitle": "Real projects, real results. See what I can do for you.",
  "why_me_section_title": "Why work with me",
  "why_me_section_subtitle": "No agencies, no hand-offs - just direct communication and dedicated attention.",
  "site_url": "https://onurhaniffa.com",
  "theme_color": "#3b82f6",
  "og_image": "/og-image.png",
  "linkedin_url": "https://www.linkedin.com/in/onurhaniffa/",
  "services_badge": "Services",
  "portfolio_badge": "Portfolio",
  "why_me_badge": "Why Me",
  "view_work_button": "View My Work",
  "lets_talk_button": "Lets Talk",
  "explore_services_button": "Explore All Services",
  "view_all_work_button": "View All Work",
  "learn_more_button": "Learn More About Me"
}'

# ============================================
# Seed Regular Collections (POST arrays)
# ============================================

echo ""
echo "=== Seeding regular collections ==="

seed_collection() {
  local collection="$1"
  local json="$2"
  echo "  Seeding $collection..."
  post_json "$DIRECTUS_URL/items/$collection" "$json" > /dev/null
}

# --- Services (homepage) ---
seed_collection "services" '[
  {
    "sort": 1,
    "title": "Website Design",
    "description": "Strategic design that converts visitors into customers. Clean, modern, and built entirely around your goals.",
    "icon": "<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/>",
    "features": ["User research & strategy", "Custom UI/UX design", "Mobile-first approach"],
    "color_class": "primary"
  },
  {
    "sort": 2,
    "title": "Development",
    "description": "Fast, accessible websites that search engines love. Built with modern technology that scales.",
    "icon": "<path d=\"m18 16 4-4-4-4\"/><path d=\"m6 8-4 4 4 4\"/><path d=\"m14.5 4-5 16\"/>",
    "features": ["Lightning-fast loading", "SEO best practices", "Accessible to everyone"],
    "color_class": "accent"
  },
  {
    "sort": 3,
    "title": "Ongoing Support",
    "description": "Peace of mind after launch. Regular updates, security monitoring, and priority support.",
    "icon": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10\"/><path d=\"m9 12 2 2 4-4\"/>",
    "features": ["Regular updates", "Security monitoring", "Priority support"],
    "color_class": "green"
  }
]'

# --- Why Me Points (homepage) ---
seed_collection "why_me_points" '[
  {
    "sort": 1,
    "title": "Clear Communication",
    "description": "No jargon, no fluff. I keep you in the loop with straightforward updates so you always know where your project stands.",
    "icon": "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>",
    "color_class": "primary"
  },
  {
    "sort": 2,
    "title": "Results-Focused",
    "description": "Every design decision is made with your goals in mind. I care about how your website performs, not just how it looks.",
    "icon": "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\"/>",
    "color_class": "accent"
  },
  {
    "sort": 3,
    "title": "Fast Delivery",
    "description": "Most projects launch within 2-3 weeks. You get a quality website without the endless wait times.",
    "icon": "<path d=\"M13 2L3 14h9l-1 8 10-12h-9l1-8z\"/>",
    "color_class": "primary"
  },
  {
    "sort": 4,
    "title": "Full Ownership",
    "description": "Your website, your code, your content. No lock-ins or hidden fees - you own everything when we are done.",
    "icon": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10\"/><path d=\"m9 12 2 2 4-4\"/>",
    "color_class": "green"
  }
]'

# --- Services Detailed (services page speedometer) ---
seed_collection "services_detailed" '[
  {
    "sort": 1,
    "title": "Design & Development",
    "short_title": "D&D",
    "description": "Custom websites built to convert visitors into customers. Strategy-first, performance-obsessed.",
    "icon": "<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/>",
    "color": "#e11d48",
    "light_color": "#fecdd3",
    "process": ["Discovery Call", "Design & Iterate", "Build & Test"],
    "deliverables": ["Custom Design", "Responsive Code", "SEO Foundation"],
    "timeline": "2-6 weeks"
  },
  {
    "sort": 2,
    "title": "Website Redesign",
    "short_title": "Redesign",
    "description": "Transform your underperforming site into a conversion machine. Keep what works, fix what doesn'\''t.",
    "icon": "<path d=\"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16\"/><path d=\"M16 16h5v5\"/>",
    "color": "#2563eb",
    "light_color": "#bfdbfe",
    "process": ["Site Audit", "Strategy Plan", "Redesign & Build"],
    "deliverables": ["Performance Boost", "Modern Stack", "Fresh Design"],
    "timeline": "2-6 weeks"
  },
  {
    "sort": 3,
    "title": "Ongoing Support",
    "short_title": "Support",
    "description": "Your site stays fast, secure, and up-to-date. I handle the tech so you can focus on your business.",
    "icon": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10\"/><path d=\"m9 12 2 2 4-4\"/>",
    "color": "#059669",
    "light_color": "#a7f3d0",
    "process": ["Monitor 24/7", "Update Monthly", "Fix Priority"],
    "deliverables": ["Security Patches", "Performance Tuning", "Content Updates"],
    "timeline": "Monthly retainer"
  }
]'

# --- Services FAQs ---
seed_collection "services_faqs" '[
  {
    "sort": 1,
    "question": "How much does a website cost?",
    "answer": "Every project is different. After our discovery call, I will provide a fixed quote based on your specific needs - no hourly surprises or hidden fees."
  },
  {
    "sort": 2,
    "question": "Do I need to provide content and images?",
    "answer": "I can work with what you have or help source professional copy and imagery. We will figure out what works best during our initial call."
  },
  {
    "sort": 3,
    "question": "What do you need from me to get started?",
    "answer": "Just a conversation. We will hop on a call to discuss your goals, and I will guide you through what is needed - whether that is content, branding assets, or just your ideas."
  },
  {
    "sort": 4,
    "question": "What if I need changes after launch?",
    "answer": "I offer ongoing support packages, or you can reach out for one-off updates. Either way, I am here when you need me."
  }
]'

# --- Philosophy Cards (about page) ---
seed_collection "philosophy_cards" '[
  {
    "sort": 1,
    "number": "01",
    "title": "Design with intent",
    "description": "Every element has a purpose. If it doesn'\''t help your visitor take action, it doesn'\''t belong.",
    "gradient": "from-primary/20 via-primary/5 to-transparent",
    "accent": "bg-primary",
    "icon_bg": "bg-primary/10",
    "icon": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
  },
  {
    "sort": 2,
    "number": "02",
    "title": "Speed is a feature",
    "description": "If a site feels slow, people leave. I build for real-world performance.",
    "gradient": "from-accent/20 via-accent/5 to-transparent",
    "accent": "bg-accent",
    "icon_bg": "bg-accent/10",
    "icon": "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
  },
  {
    "sort": 3,
    "number": "03",
    "title": "Own what you build",
    "description": "Your site, your code - you own everything. I handle hosting and updates so you don'\''t have to worry about the technical side.",
    "gradient": "from-emerald-500/20 via-emerald-500/5 to-transparent",
    "accent": "bg-emerald-500",
    "icon_bg": "bg-emerald-500/10",
    "icon": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
  }
]'

# --- Tool Groups (about page) ---
seed_collection "tool_groups" '[
  {
    "sort": 1,
    "label": "BUILD",
    "tools": [
      {"name": "SvelteKit", "badge": "Primary", "icon": "svelte"},
      {"name": "Svelte 5", "icon": "svelte"},
      {"name": "TypeScript", "icon": "typescript"}
    ]
  },
  {
    "sort": 2,
    "label": "STYLE",
    "tools": [
      {"name": "Tailwind CSS", "icon": "tailwind"},
      {"name": "shadcn/ui", "icon": "shadcn"},
      {"name": "Figma", "icon": "figma"}
    ]
  },
  {
    "sort": 3,
    "label": "SHIP",
    "tools": [
      {"name": "Vercel", "icon": "vercel"},
      {"name": "Git", "icon": "git"}
    ]
  }
]'

# --- Quick Facts (about page) ---
seed_collection "quick_facts" '[
  {
    "sort": 1,
    "icon": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Zm-8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    "label": "Based in",
    "value": "Europe",
    "bg": "bg-gradient-to-br from-blue-500/10 to-blue-500/5",
    "color": "text-blue-500",
    "border": "border-t-blue-500"
  },
  {
    "sort": 2,
    "icon": "M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-6 7 3-3 2 2 4-4",
    "label": "Design in",
    "value": "Figma",
    "bg": "bg-gradient-to-br from-purple-500/10 to-purple-500/5",
    "color": "text-purple-500",
    "border": "border-t-purple-500"
  },
  {
    "sort": 3,
    "icon": "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
    "label": "Build with",
    "value": "SvelteKit",
    "bg": "bg-gradient-to-br from-orange-500/10 to-orange-500/5",
    "color": "text-orange-500",
    "border": "border-t-orange-500"
  },
  {
    "sort": 4,
    "icon": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
    "label": "Work best",
    "value": "At night",
    "bg": "bg-gradient-to-br from-indigo-500/10 to-indigo-500/5",
    "color": "text-indigo-500",
    "border": "border-t-indigo-500"
  },
  {
    "sort": 5,
    "icon": "M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 6v7m-5 4h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z",
    "label": "Enjoy",
    "value": "Gaming",
    "bg": "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5",
    "color": "text-emerald-500",
    "border": "border-t-emerald-500"
  },
  {
    "sort": 6,
    "icon": "M22 10v6M2 10l10-5 10 5-10 5-10-5ZM6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5M12 7v15",
    "label": "Major in",
    "value": "Computer & Biomedical Eng",
    "bg": "bg-gradient-to-br from-rose-500/10 to-rose-500/5",
    "color": "text-rose-500",
    "border": "border-t-rose-500"
  }
]'

# --- Academic Roles (about page) ---
seed_collection "academic_roles" '[
  {
    "sort": 1,
    "icon": "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.591.659H9.061a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2.5",
    "role": "Researcher",
    "place": "BukemLab",
    "description": "Researching quantum dots for next-generation biomedical applications"
  },
  {
    "sort": 2,
    "icon": "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
    "role": "Teaching Assistant",
    "place": "Acibadem University",
    "description": "Helping students break down complex engineering concepts"
  }
]'

# --- Contact FAQs ---
seed_collection "contact_faqs" '[
  {
    "sort": 1,
    "question": "What information should I include in my message?",
    "answer": "Share your project goals, timeline, and any specific requirements. The more context you provide, the better I can understand how to help."
  },
  {
    "sort": 2,
    "question": "How quickly will you respond?",
    "answer": "I typically respond within 24 hours during business days. For urgent matters, mention it in your message and I will prioritize accordingly."
  },
  {
    "sort": 3,
    "question": "Do you offer free consultations?",
    "answer": "Yes! Our initial conversation is always free. It is an opportunity for both of us to see if we are a good fit for working together."
  }
]'

# --- Projects ---
seed_collection "projects" '[
  {
    "sort": 1,
    "status": "published",
    "slug": "joe",
    "title": "Designs by Joe",
    "tagline": "Fan art for the fans",
    "description": "Portfolio website for a fan artist and illustrator specializing in pin designs, trading cards, logos, and stickers inspired by popular fandoms.",
    "thumbnail": "/images/projects/designsbyjoe-thumb.jpg",
    "screenshot_desktop": "/images/projects/joe-screenshot-light.png",
    "screenshot_mobile": "/images/projects/designsbyjoe-mobile.png",
    "industry": "Fan Art & Illustration",
    "services": ["Web Design", "Development", "Branding"],
    "year": "2025",
    "challenge": "Joe needed a bold, eye-catching portfolio to showcase 200+ artworks and attract commission clients from various fandoms. The site needed to feel premium while staying true to the creative, fan-driven nature of the work.",
    "solution": "I designed a dark, immersive portfolio with smooth animations that puts the artwork front and center. The layout features a striking hero section and intuitive navigation between portfolio pieces and commission information.",
    "results": ["Professional online presence established", "Increased commission inquiries", "Sub-2 second load times", "Mobile-optimized experience"],
    "testimonial_quote": "Onur did an excellent job on my website. He was great to communicate with and delivered on every point needed for my website.",
    "testimonial_author": "Joe",
    "testimonial_role": "Fan Artist & Illustrator",
    "images": ["/images/projects/designsbyjoe-hero.jpg", "/images/projects/designsbyjoe-mobile.jpg", "/images/projects/designsbyjoe-detail.jpg"],
    "live_url": "https://designsbyjoe.net",
    "is_client_work": true,
    "showcase_type": "magazine",
    "enable_live_demo": false
  },
  {
    "sort": 2,
    "status": "published",
    "slug": "pearl-dental",
    "title": "Pearl Dental",
    "tagline": "Modern dental care, designed for you",
    "description": "A warm, trustworthy website for a dental practice featuring same-week appointments, service showcases, and easy booking flows.",
    "thumbnail": "/images/projects/dental-thumb.jpg",
    "screenshot_desktop": "/images/projects/dentist-screenshot.jpg",
    "screenshot_mobile": "/images/projects/dental-mobile.png",
    "industry": "Healthcare",
    "services": ["UI/UX Design", "Frontend Development", "Template Design"],
    "year": "2025",
    "challenge": "Healthcare websites often feel clinical and cold, or outdated and unprofessional. The goal was to create a site that builds trust while remaining warm and approachable.",
    "solution": "I designed a clean, modern dental website with trust-building elements like reviews, years of expertise, and clear service presentation. The warm color palette and friendly imagery balance professionalism with approachability.",
    "results": ["Conversion-optimized layout", "Trust-building design elements", "Fully responsive design", "Accessible and WCAG compliant"],
    "testimonial_quote": null,
    "testimonial_author": null,
    "testimonial_role": null,
    "images": ["/images/projects/dental-hero.jpg", "/images/projects/dental-services.jpg", "/images/projects/dental-booking.jpg"],
    "live_url": "https://dentist-template-h0hor3804-onurhaniffas-projects.vercel.app",
    "is_client_work": false,
    "showcase_type": "live-demo",
    "enable_live_demo": true
  }
]'

# ============================================
# Create Directus Dashboard
# ============================================

echo ""
echo "=== Creating Directus Dashboard ==="

# Create dashboard
DASHBOARD_RESP=$(post_json "$DIRECTUS_URL/dashboards" \
  '{"name":"Website Overview","icon":"dashboard","note":"Overview of all website content managed via Directus CMS.","color":"#6644FF"}')

DASHBOARD_ID=$(echo "$DASHBOARD_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)

if [ -n "$DASHBOARD_ID" ]; then
  echo "  Dashboard created: $DASHBOARD_ID"

  # Panel: Total Projects
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Total Projects",
    "icon": "folder",
    "color": "#2563EB",
    "type": "metric",
    "position_x": 1,
    "position_y": 1,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "projects",
      "function": "count",
      "filter": {"status":{"_eq":"published"}}
    }
  }' > /dev/null

  # Panel: Total Services
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Services",
    "icon": "miscellaneous_services",
    "color": "#E11D48",
    "type": "metric",
    "position_x": 7,
    "position_y": 1,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "services",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Why Me Points
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Why Me Points",
    "icon": "thumb_up",
    "color": "#059669",
    "type": "metric",
    "position_x": 13,
    "position_y": 1,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "why_me_points",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Total FAQs
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Total FAQs",
    "icon": "quiz",
    "color": "#F59E0B",
    "type": "metric",
    "position_x": 19,
    "position_y": 1,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "services_faqs",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Projects List
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Published Projects",
    "icon": "list",
    "color": "#2563EB",
    "type": "list",
    "position_x": 1,
    "position_y": 7,
    "width": 12,
    "height": 12,
    "options": {
      "collection": "projects",
      "filter": {"status":{"_eq":"published"}},
      "fields": ["title","industry","year","is_client_work"],
      "sort": "sort"
    }
  }' > /dev/null

  # Panel: Contact FAQs count
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Contact FAQs",
    "icon": "help",
    "color": "#10B981",
    "type": "metric",
    "position_x": 19,
    "position_y": 7,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "contact_faqs",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Philosophy Cards count
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Philosophy Cards",
    "icon": "lightbulb",
    "color": "#8B5CF6",
    "type": "metric",
    "position_x": 1,
    "position_y": 7,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "philosophy_cards",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Tool Groups count
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Tool Groups",
    "icon": "construction",
    "color": "#EC4899",
    "type": "metric",
    "position_x": 7,
    "position_y": 7,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "tool_groups",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Quick Facts count
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Quick Facts",
    "icon": "info",
    "color": "#F97316",
    "type": "metric",
    "position_x": 13,
    "position_y": 7,
    "width": 6,
    "height": 6,
    "options": {
      "collection": "quick_facts",
      "function": "count"
    }
  }' > /dev/null

  # Panel: Content Guide
  post_json "$DIRECTUS_URL/panels" '{
    "dashboard": "'"$DASHBOARD_ID"'",
    "name": "Content Guide",
    "icon": "menu_book",
    "color": "#6644FF",
    "type": "label",
    "position_x": 13,
    "position_y": 13,
    "width": 12,
    "height": 14,
    "options": {
      "text": "## How to Edit Your Website\n\n### Global Settings\n- **Site Settings** — Homepage content, SEO defaults, button labels, social links\n- **Header Settings** — Logo, navigation menu, CTA button\n- **Footer Settings** — CTA section, brand info, social links, nav labels\n\n### Page Settings (one per page)\n- **Services Page** — Hero text, testimonial, FAQ heading, SEO meta\n- **About Page** — Hero, philosophy, tools, facts sections, SEO meta\n- **Contact Page** — Hero, email, availability, FAQ heading, SEO meta\n- **Work Page** — Hero, filter labels, section headings, SEO meta\n- **Privacy Page** — Policy content (rich text), SEO meta\n\n### Content Collections (add/remove items)\n- **Projects** — Portfolio work shown on work page\n- **Services** — Service cards on homepage\n- **Why Me Points** — Benefits cards on homepage\n- **Services Detailed** — Speedometer gauge on services page\n- **Services FAQs / Contact FAQs** — FAQ sections\n- **Philosophy Cards** — Design philosophy on about page\n- **Tool Groups** — Tech stack on about page\n- **Quick Facts / Academic Roles** — About page details"
    }
  }' > /dev/null

  echo "  Dashboard panels created."
else
  echo "  WARNING: Could not create dashboard (may need Directus Pro/Cloud)"
fi

# ============================================
# Organize Collections into Folders
# ============================================

echo ""
echo "=== Organizing collections into folders ==="

# Create folder collections (virtual grouping containers)
for folder in global_settings page_settings content; do
  echo "  Creating folder: $folder"
  printf '%s' '{"collection":"'"$folder"'","schema":null,"meta":{"icon":"folder","color":"#6644FF"}}' | curl -s -X POST "$DIRECTUS_URL/collections" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d @- > /dev/null 2>&1 || true
done

# Move singletons into "Global Settings" folder
for col in site_settings header_settings footer_settings; do
  echo "  Moving $col -> Global Settings"
  printf '%s' '{"meta":{"group":"global_settings"}}' | curl -s -X PATCH "$DIRECTUS_URL/collections/$col" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d @- > /dev/null 2>&1 || true
done

# Move page settings into "Page Settings" folder
for col in services_page_settings about_page_settings contact_page_settings work_page_settings privacy_page_settings; do
  echo "  Moving $col -> Page Settings"
  printf '%s' '{"meta":{"group":"page_settings"}}' | curl -s -X PATCH "$DIRECTUS_URL/collections/$col" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d @- > /dev/null 2>&1 || true
done

# Move regular collections into "Content" folder
for col in projects services why_me_points services_detailed services_faqs philosophy_cards tool_groups quick_facts academic_roles contact_faqs; do
  echo "  Moving $col -> Content"
  printf '%s' '{"meta":{"group":"content"}}' | curl -s -X PATCH "$DIRECTUS_URL/collections/$col" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d @- > /dev/null 2>&1 || true
done

echo "  Collections organized."

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Visit $DIRECTUS_URL to log in as admin"
echo "     Email: $ADMIN_EMAIL"
echo "     Password: $ADMIN_PASSWORD"
echo "  2. Create editor users with the Editor role"
echo "  3. Start editing content in the Directus admin panel"
echo "  4. Content changes appear on the site after page refresh"
