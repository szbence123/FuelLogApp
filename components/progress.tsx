import { useEffect, useState } from "react";
import type { SizeTokens } from "tamagui";
import { Progress, Slider, XStack, YStack } from "tamagui";
import { styles } from "../styles/global";

export function ProgressBar() {
  const [size, setSize] = useState(4);
  const [progress, setProgress] = useState(10);
  const sizeProp = `$${size}` as SizeTokens;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress < 100) {
          return currentProgress + 10;
        } else {
          return 0;
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <YStack height={60} alignItems="center">
        <Progress margin={30} size={sizeProp} value={progress}>
          <Progress.Indicator
            animation="bouncy"
            backgroundColor={styles.primary.backgroundColor}
          />
        </Progress>
      </YStack>

      <XStack
        alignItems="center"
        space
        position="absolute"
        bottom="$3"
        left="$4"
        $xxs={{ display: "none" }}
      >
        <Slider
          size="$2"
          width={130}
          defaultValue={[4]}
          min={2}
          max={6}
          step={1}
          onValueChange={([val]) => {
            setSize(val);
          }}
        >
          <Slider.Track borderWidth={1} borderColor="$color5">
            <Slider.TrackActive />
          </Slider.Track>
        </Slider>
      </XStack>
    </>
  );
}
