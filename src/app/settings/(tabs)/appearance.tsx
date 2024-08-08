import ScrollView from "@/components/ScrollView";
import { setappearance, ThemeProps } from "@/features/slices/settingsSlice";
import { RootState } from "@/features/store";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  List,
  Portal,
  RadioButton,
  Switch,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function Appearance() {
  const dispatch = useDispatch();
  const { appearance } = useSelector((state: RootState) => state.settings);

  const [theme, settheme] = useState<ThemeProps>(appearance.colors.theme);
  const [isThemeDialogVisible, setisThemeDialogVisible] = useState(false);
  const showThemeDialog = () => setisThemeDialogVisible(true);
  const hideThemeDialog = () => setisThemeDialogVisible(false);

  const [isUsingSystemFont, setisUsingSystemFont] = useState<boolean>(
    appearance.typography.useSystemFont,
  );
  const toggleIsSystemFontEnabled = () => setisUsingSystemFont((prev) => !prev);

  useEffect(() => {
    dispatch(
      setappearance({
        colors: {
          theme,
        },
        typography: {
          useSystemFont: isUsingSystemFont,
        },
      }),
    );
  }, [theme, isUsingSystemFont]);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>COLORS</List.Subheader>
        <List.Item
          title="Theme"
          description={theme.slice(0, 1).toUpperCase() + theme.slice(1)}
          onPress={showThemeDialog}
        />

        <Portal>
          <Dialog visible={isThemeDialogVisible} onDismiss={hideThemeDialog}>
            <Dialog.Title>Theme</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                value={theme}
                onValueChange={(value: ThemeProps) => settheme(value)}
              >
                <RadioButton.Item label="System" value="system" />
                <RadioButton.Item label="Light" value="light" />
                <RadioButton.Item label="Dark" value="dark" />
                <RadioButton.Item label="Pure Black" value="pureBlack" />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideThemeDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>TYPOGRAPHY</List.Subheader>
        <List.Item
          title="Use System Font"
          right={() => (
            <Switch
              value={isUsingSystemFont}
              onChange={toggleIsSystemFontEnabled}
            />
          )}
        />
      </List.Section>
    </ScrollView>
  );
}
