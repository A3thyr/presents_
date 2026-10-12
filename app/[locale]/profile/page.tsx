"use client"

import { View } from "@/shared/layouts/view.layout";
import React from "react";
import { TransactionWrapper, RefferalWrapper, ProfileCard, RefferalLinkWrapper } from "@/widgets";




const ProfilePage = () => {
  return (
    <View className="pt-30">
      <div className="flex flex-col gap-4">
          <ProfileCard/>
          <RefferalWrapper/>
          <RefferalLinkWrapper/>
          <TransactionWrapper/>
      </div>
    </View>
  );
};

export default ProfilePage;
