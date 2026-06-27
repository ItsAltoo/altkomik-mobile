import { useEffect, useRef, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useAutoSlide = (
  dataLength: number, 
  isLoading: boolean, 
  autoPlay: boolean,
  itemWidth: number
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / itemWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (isLoading || !autoPlay || dataLength === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % dataLength;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [activeIndex, autoPlay, dataLength, isLoading]);

  return { activeIndex, flatListRef, onScroll };
};
