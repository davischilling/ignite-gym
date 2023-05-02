import { FlatList } from "native-base";
import { Group } from "./Group";

type Props = {
  groups: string[];
  groupSelected: string;
  setGroupSelected: (name: string) => void;
};

export const GroupList = ({
  groups,
  groupSelected,
  setGroupSelected,
}: Props) => (
  <FlatList
    data={groups}
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <Group
        name={item}
        isActive={groupSelected.toLowerCase() === item.toLowerCase()}
        onPress={() => setGroupSelected(item)}
      />
    )}
    horizontal
    showsHorizontalScrollIndicator={false}
    _contentContainerStyle={{ px: 4 }}
    my={8}
    maxH={10}
  />
);
