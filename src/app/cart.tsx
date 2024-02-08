import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5545999962223";

export default function Cart() {
  const navigation = useNavigation();
  const { products, remove, clear } = useCartStore();

  const [address, setAddress] = useState("");

  const total = formatCurrency(products.reduce((acc, product) => acc + product.price, 0));

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => remove(product.id),
      },
    ]);
  }

  function handleSendOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe o endereço de entrega para enviar o pedido");
    }

    const productsMessage = products.map((product) => `\nx${product.quantity} ${product.title}`).join("");
    const message = `
      🍔 NOVO PEDIDO
      \nEntregar em: ${address}

      ${productsMessage}

      \nValor total: ${total}
    `;

    Linking.openURL(`whatsapp://send?phone=${PHONE_NUMBER}&text=${message}`);

    clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <View className="border-b-[0.5px] border-slate-700 mt-4" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraHeight={100}>
        <ScrollView>
          <View className="p-5 flex-1">
            {products.length > 0 ? (
              <View className="border-b border-slate-700">
                {products.map((product) => (
                  <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio</Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
              onChangeText={setAddress}
              onSubmitEditing={handleSendOrder}
              returnKeyType="go"
              blurOnSubmit
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-4 space-y-5 border-t border-slate-700">
        <Button onPress={handleSendOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
