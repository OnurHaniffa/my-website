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
  curl -s -X POST "$url" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$body" 2>/dev/null || true
}

# Helper: PATCH JSON to Directus
patch_json() {
  local url="$1"
  local body="$2"
  curl -s -X PATCH "$url" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$body" 2>/dev/null || true
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
  why_me_section_title why_me_section_subtitle; do
  create_field "site_settings" "$field" "string" "input"
done

create_collection "header_settings" "true" "web"
create_field "header_settings" "logo_text" "string" "input"
create_field "header_settings" "logo_subtitle" "string" "input"
create_field "header_settings" "cta_text" "string" "input"
create_field "header_settings" "cta_href" "string" "input"

create_collection "footer_settings" "true" "call_to_action"
create_field "footer_settings" "cta_heading" "string" "input"
create_field "footer_settings" "cta_highlight" "string" "input"
create_field "footer_settings" "cta_description" "text" "input-multiline"
create_field "footer_settings" "tagline" "text" "input-multiline"
create_field "footer_settings" "email" "string" "input"
create_field "footer_settings" "location" "string" "input"
create_field "footer_settings" "response_time" "string" "input"

create_collection "services_page_settings" "true" "design_services"
create_field "services_page_settings" "hero_heading" "string" "input"
create_field "services_page_settings" "hero_highlight" "string" "input"
create_field "services_page_settings" "hero_description" "text" "input-multiline"
create_field "services_page_settings" "testimonial_quote" "text" "input-multiline"
create_field "services_page_settings" "testimonial_author" "string" "input"
create_field "services_page_settings" "testimonial_role" "string" "input"
create_field "services_page_settings" "testimonial_initial" "string" "input"
create_field "services_page_settings" "faq_heading" "string" "input"

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

create_collection "contact_page_settings" "true" "contact_mail"
create_field "contact_page_settings" "hero_badge" "string" "input"
create_field "contact_page_settings" "hero_heading" "string" "input"
create_field "contact_page_settings" "hero_highlight" "string" "input"
create_field "contact_page_settings" "hero_description" "text" "input-multiline"
create_field "contact_page_settings" "email" "string" "input"
create_field "contact_page_settings" "response_time" "string" "input"
create_field "contact_page_settings" "availability" "string" "input"
create_field "contact_page_settings" "faq_heading" "string" "input"

create_collection "work_page_settings" "true" "work"
create_field "work_page_settings" "hero_heading" "string" "input"
create_field "work_page_settings" "hero_highlight" "string" "input"
create_field "work_page_settings" "hero_description" "text" "input-multiline"
create_field "work_page_settings" "cta_number" "string" "input"
create_field "work_page_settings" "cta_heading" "string" "input"
create_field "work_page_settings" "cta_description" "text" "input-multiline"

create_collection "privacy_page_settings" "true" "privacy_tip"
create_field "privacy_page_settings" "title" "string" "input"
create_field "privacy_page_settings" "last_updated" "string" "input"
create_field "privacy_page_settings" "content" "text" "input-rich-text-html"

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
create_field "services" "icon" "string" "input"
create_field "services" "features" "json" "tags"
create_field "services" "color_class" "string" "input"

create_collection "why_me_points" "false" "thumb_up"
create_sort_field "why_me_points"
create_field "why_me_points" "title" "string" "input"
create_field "why_me_points" "description" "text" "input-multiline"
create_field "why_me_points" "icon" "string" "input"
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
create_field "philosophy_cards" "icon" "string" "input"

create_collection "tool_groups" "false" "construction"
create_sort_field "tool_groups"
create_field "tool_groups" "label" "string" "input"
create_field "tool_groups" "tools" "json" "input-code" '{"language":"json"}'

create_collection "quick_facts" "false" "info"
create_sort_field "quick_facts"
create_field "quick_facts" "icon" "string" "input"
create_field "quick_facts" "label" "string" "input"
create_field "quick_facts" "value" "string" "input"
create_field "quick_facts" "bg" "string" "input"
create_field "quick_facts" "color" "string" "input"
create_field "quick_facts" "border" "string" "input"

create_collection "academic_roles" "false" "school"
create_sort_field "academic_roles"
create_field "academic_roles" "icon" "string" "input"
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
  "cta_href": "/contact"
}'

seed_singleton "footer_settings" '{
  "cta_heading": "Ready to",
  "cta_highlight": "stand out",
  "cta_description": "Lets talk about your project. No pressure, no sales pitch - just a friendly conversation to see if we are a good fit.",
  "tagline": "Crafting beautiful websites that turn curious visitors into loyal customers.",
  "email": "contact@onurhaniffa.com",
  "location": "Based in Europe",
  "response_time": "Replies within 24h"
}'

seed_singleton "services_page_settings" '{
  "hero_heading": "Websites that",
  "hero_highlight": "work",
  "hero_description": "Custom builds, strategic redesigns, and ongoing support. No templates, no hourly billing - just results.",
  "testimonial_quote": "Onur did an excellent job on my website. He was great to communicate with and delivered on every point needed for my website.",
  "testimonial_author": "Joe",
  "testimonial_role": "Fan Artist",
  "testimonial_initial": "J",
  "faq_heading": "FAQ"
}'

seed_singleton "contact_page_settings" '{
  "hero_badge": "Lets Talk",
  "hero_heading": "Start a",
  "hero_highlight": "conversation",
  "hero_description": "Tell me about your project and goals. I will get back to you within 24 hours with thoughts on how we can work together.",
  "email": "contact@onurhaniffa.com",
  "response_time": "Within 24 hours",
  "availability": "European time zones (CET/CEST)",
  "faq_heading": "Common Questions"
}'

seed_singleton "work_page_settings" '{
  "hero_heading": "that",
  "hero_highlight": "speaks",
  "hero_description": "A mix of client work and passion projects, each built with the same care and attention to detail.",
  "cta_number": "03",
  "cta_heading": "Have a project in mind?",
  "cta_description": "I would love to hear about it and explore how we can bring your vision to life together."
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
  "availability_location": "Based in Europe, working worldwide"
}'

seed_singleton "privacy_page_settings" '{
  "title": "Privacy Policy",
  "last_updated": "December 2024",
  "content": ""
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
  "why_me_section_subtitle": "No agencies, no hand-offs - just direct communication and dedicated attention."
}'

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
