import { View } from "@/shared/layouts/view.layout";
import { Inventory } from "@/widgets";
import React from "react";

const InventoryPage = () => {
  return (
    <View className="h-screen overflow-y-hidden px-8 pt-30">
      <Inventory />
    </View>
  );
};

export default InventoryPage;
