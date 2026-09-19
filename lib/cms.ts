import { getSupabaseAdmin } from "./supabaseAdmin";
import type { CMSItem, ContentType } from "./types";
import { fallbackItems } from "./fallbackContent";

function filterFallback(type?: ContentType, featured?: boolean) {
  return fallbackItems.filter((item) => {
    if (type && item.type !== type) return false;
    if (featured !== undefined && item.featured !== featured) return false;
    return true;
  });
}

export async function getPublishedItems(
  type?: ContentType,
  featured?: boolean
) {
  try {
    const supabase = getSupabaseAdmin();

    let query = supabase
      .from("cms_items")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (type) {
      query = query.eq("type", type);
    }

    if (featured !== undefined) {
      query = query.eq("featured", featured);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return filterFallback(type, featured);
    }

    return data as CMSItem[];
  } catch {
    return filterFallback(type, featured);
  }
}

export async function getItemBySlug(slug: string) {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("cms_items")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      return fallbackItems.find((item) => item.slug === slug) || null;
    }

    return data as CMSItem;
  } catch {
    return fallbackItems.find((item) => item.slug === slug) || null;
  }
}

export async function getSiteContent(
  page: string,
  section: string
): Promise<Record<string, string>> {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("page", page)
      .eq("section", section)
      .single();

    if (error || !data?.content) {
      return {};
    }

    return data.content as Record<string, string>;
  } catch {
    return {};
  }
}