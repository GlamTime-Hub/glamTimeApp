import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";

const ITEM_HEIGHT = 30;
const VISIBLE_ITEMS = 3;

// Convierte 13.5 → "1:30 PM", 8 → "8:00 AM"
const formatDecimalToTime = (decimal: number) => {
  const hour24 = Math.floor(decimal);
  const minutes = decimal % 1 === 0.5 ? "30" : "00";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const ampm = hour24 < 12 ? "AM" : "PM";
  return `${hour12}:${minutes} ${ampm}`;
};

// Genera array de horas decimales entre min y max
const generateTimeSlots = (min: number, max: number) => {
  const times = [];
  for (let t = min; t <= max; t += 0.5) {
    times.push(t);
  }
  return times;
};

export const WheelTimePicker = ({
  minTime = 0,
  maxTime = 23.5,
  onChange,
  initialTime = null,
}: any) => {
  const times = generateTimeSlots(minTime, maxTime);
  const formattedTimes = times.map((t) => ({
    label: formatDecimalToTime(t),
    value: t,
  }));

  const defaultIndex = initialTime
    ? Math.max(
        0,
        times.findIndex((t) => t === initialTime)
      )
    : 0;

  const [selected, setSelected] = useState(formattedTimes[defaultIndex]);
  const scrollRef = useRef<any>(null);

  const styles = StyleSheet.create({
    container: {
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
      alignItems: "center",
      justifyContent: "center",
    },
    list: {
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
    },
    listContainer: {
      paddingVertical: ITEM_HEIGHT,
    },
    item: {
      height: ITEM_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
    itemText: {
      fontSize: 18,
      color: "#999",
    },
    selectedItem: {
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "#ccc",
    },
    scrollView: {
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
    },
    selectedText: {
      fontSize: 20,
      color: "#9f8ac2",
    },
  });

  useEffect(() => {
    onChange?.(selected.value);
  }, [selected]);

  const onScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const item = formattedTimes[index];
    if (item) setSelected(item);
  };

  const Item = ({ item }: any) => (
    <View
      style={[
        styles.item,
        item.value === selected.value && styles.selectedItem,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          item.value === selected.value && styles.selectedText,
        ]}
      >
        {item.label}
      </Text>
    </View>
  );

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: defaultIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [defaultIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToOffsets={formattedTimes.map((_, i) => i * ITEM_HEIGHT)}
          snapToAlignment="start"
          decelerationRate="fast"
          onMomentumScrollEnd={onScrollEnd}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
          style={styles.scrollView}
        >
          {formattedTimes.map((item) => (
            <Item key={item.label} item={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
