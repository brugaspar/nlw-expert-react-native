import { useRef, useState } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";
import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store";

export default function Home() {
  const { products } = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = products.reduce((acc, product) => acc + product.quantity, 0);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

    sectionListRef.current?.scrollToLocation({
      animated: true,
      sectionIndex,
      itemIndex: 0,
    });
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton title={item} selected={item === category} onPress={() => handleCategorySelect(item)} />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
      />

      <View className="border-b-[0.5px] border-slate-700 mt-4" />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-4 mb-2">{title}</Text>
        )}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
