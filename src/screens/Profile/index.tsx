import { Header } from "@/components/Header";
import { UserPhoto } from "@/components/UserPhoto";
import { Center, ScrollView, VStack } from "native-base";
import React, { useState } from "react";
import { ChangePhoto } from "./components/ChangePhoto";
import { Inputs } from "./components/Inputs";
import { PhotoSkeleton } from "./components/PhotoSkeleton";

const PHOTO_SIZE = 33;

export const Profile = () => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  return (
    <VStack flex={1}>
      <Header title="Perfil" />
      <ScrollView>
        <Center my={6} px={10}>
          {isPhotoLoading ? (
            <PhotoSkeleton h={PHOTO_SIZE} w={PHOTO_SIZE} />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              source={{
                uri: "https://avatars.githubusercontent.com/u/60005589?v=4",
              }}
              alt="Foto do usuário"
            />
          )}
          <ChangePhoto text="Alterar foto" />
          <Inputs />
        </Center>
      </ScrollView>
    </VStack>
  );
};
