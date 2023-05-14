import { Header } from "@/presentation/components/Header";
import { UserPhoto } from "@/presentation/components/UserPhoto";
import { Center, ScrollView, useToast, VStack } from "native-base";
import React, { useState } from "react";
import { ChangePhoto } from "./components/ChangePhoto";
import { FormInputs } from "./components/FormInputs";
import { PhotoSkeleton } from "./components/PhotoSkeleton";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";


const PHOTO_SIZE = 33;

export const Profile = () => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [photo, setPhoto] = useState("https://avatars.githubusercontent.com/u/60005589?v=4");
  const toast = useToast();

  const handleSelectImage = async () => {
    setIsPhotoLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 4],
      });
      if (photoSelected.canceled) return;
      if (photoSelected.assets[0].uri) {
        const photoInfo: any = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 0.1) {
          return toast.show({
            title: "A imagem deve ter no máximo 1MB",
            bgColor: "red.500",
            placement: "top",
            marginTop: 10,
          });
        }
        setPhoto(photoSelected.assets[0].uri);
      }
    } catch(e) {
      console.log(e);
    } finally {
      setIsPhotoLoading(false);
    }
  };

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
                uri: photo,
              }}
              alt="Foto do usuário"
            />
          )}
          <ChangePhoto text="Alterar foto" onPress={handleSelectImage} />
          <FormInputs />
        </Center>
      </ScrollView>
    </VStack>
  );
};
