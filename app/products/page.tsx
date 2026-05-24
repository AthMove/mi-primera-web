"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");

  const [productos, setProductos] = useState<any[]>([]);
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSearch, setSavingSearch] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showSold, setShowSold] = useState(false);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toUpperCase());
    } else {
      setSelectedCategory("ALL");
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
    loadSavedSearches();
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setProductos([]);
      setLoading(false);
      return;
    }

    setProductos(data || []);
    setLoading(false);
  };

  const loadSavedSearches = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("saved_searches")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setSavedSearches(data || []);
  };

  const saveCurrentSearch = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const title =
      search || selectedBrand !== "ALL"
        ? `${selectedBrand !== "ALL" ? selectedBrand : ""} ${search}`.trim()
        : selectedCategory !== "ALL"
        ? selectedCategory
        : "Saved search";

    try {
      setSavingSearch(true);

      const { error } = await supabase.from("saved_searches").insert([
        {
          user_id: user.id,
          title,
          search,
          category: selectedCategory,
          brand: selectedBrand,
          min_price: minPrice,
          max_price: maxPrice,
          show_sold: showSold,
          sort,
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      await loadSavedSearches();
      alert("Search saved");
    } finally {
      setSavingSearch(false);
    }
  };

  const applySavedSearch = (item: any) => {
    setSearch(item.search || "");
    setSelectedCategory(item.category || "ALL");
    setSelectedBrand(item.brand || "ALL");
    setMinPrice(item.min_price || "");
    setMaxPrice(item.max_price || "");
    setShowSold(!!item.show_sold);
    setSort(item.sort || "newest");
  };

  const deleteSavedSearch = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();

    const confirmDelete = confirm("Delete saved search?");
    if (!confirmDelete) return;

    await supabase.from("saved_searches").delete().eq("id", id);
    await loadSavedSearches();
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("ALL");
    setSelectedBrand("ALL");
    setMinPrice("");
    setMaxPrice("");
    setShowSold(false);
    setSort("newest");
  };

  const filteredProducts = useMemo(() => {
    return productos
      .filter((product) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
          !searchValue ||
          product.title?.toLowerCase().includes(searchValue) ||
          product.brand?.toLowerCase().includes(searchValue) ||
          product.category?.toLowerCase().includes(searchValue);

        const matchesCategory =
          selectedCategory === "ALL" ||
          product.category === selectedCategory;

        const matchesBrand =
          selectedBrand === "ALL" ||
          product.brand?.toLowerCase() ===
            selectedBrand.toLowerCase();

        const matchesMin =
          !minPrice || Number(product.price) >= Number(minPrice);

        const matchesMax =
          !maxPrice || Number(product.price) <= Number(maxPrice);

        const matchesSold = showSold ? true : !product.sold;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
          matchesMin &&
          matchesMax &&
          matchesSold
        );
      })
      .sort((a, b) => {
        if (sort === "price-low")
          return Number(a.price) - Number(b.price);

        if (sort === "price-high")
          return Number(b.price) - Number(a.price);

        if (sort === "popular")
          return Number(b.likes || 0) - Number(a.likes || 0);

        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      });
  }, [
    productos,
    search,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    showSold,
    sort,
  ]);

  const safeImage = (src: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  return (
    <main style={pageStyle}>
      <h1>Products</h1>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main style={pageStyle}>
          Loading products...
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f7f3",
  padding: "60px",
  fontFamily: "Inter, sans-serif",
};