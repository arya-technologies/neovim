import { RootState } from "@/features/store";
import ScrollView from "@/components/ScrollView";
import React, { useEffect, useState } from "react";
import { Button, Dialog, List, Portal, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setstorage } from "@/features/slices/settingsSlice";

export default function Storage() {
  const dispatch = useDispatch();
  const { storage } = useSelector((state: RootState) => state.settings);

  const [isImageCacheDialogVisible, setisImageCacheDialogVisible] =
    useState(false);
  const showImageCacheDialog = () => setisImageCacheDialogVisible(true);
  const hideImageCacheDialog = () => setisImageCacheDialogVisible(false);

  const [isSongCacheDialogVisible, setisSongCacheDialogVisible] =
    useState(false);
  const showSongCacheDialog = () => setisSongCacheDialogVisible(true);
  const hideSongCacheDialog = () => setisSongCacheDialogVisible(false);

  useEffect(() => {
    dispatch(setstorage({}));
  }, []);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>IMAGE CACHE</List.Subheader>
        <List.Item title="Max Size" onPress={showImageCacheDialog} />
        <Portal>
          <Dialog
            visible={isImageCacheDialogVisible}
            onDismiss={hideImageCacheDialog}
          >
            <Dialog.Title>Max Cache</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={hideImageCacheDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>SONG CACHE</List.Subheader>
        <List.Item title="Max Size" onPress={showSongCacheDialog} />
        <Portal>
          <Dialog
            visible={isSongCacheDialogVisible}
            onDismiss={hideSongCacheDialog}
          >
            <Dialog.Title>Max Cache</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={hideSongCacheDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>BACKUP</List.Subheader>
        <List.Item
          title="Backup"
          description="Export the data to external storage"
        />
      </List.Section>

      <List.Section>
        <List.Subheader>RESTORE</List.Subheader>
        <List.Item
          title="Restore"
          description="Backup the database from external storage"
        />
      </List.Section>

      <List.Section>
        <List.Subheader>RESET</List.Subheader>
        <List.Item title="Reset all" description="Delete all app data" />
      </List.Section>
    </ScrollView>
  );
}
