import { Box, Button, Flex, Select } from "@chakra-ui/react";
import React from "react";
import Webcam from "react-webcam";
import useMediaDevices from "./useMediaDevice";

export const PictureCamera: React.FC<{
  pictureFileName: string;
}> = ({ pictureFileName }) => {
  const [cameraMode, setCameraMode] = React.useState<"user" | "environment">(
    "user"
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useMediaDevices();

  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    undefined
  );
  const [imgSource, setImgSource] = React.useState<string | null>(null);

  const webcamReference = React.useRef<Webcam | null>(null);
  const capture = React.useCallback(async () => {
    if (webcamReference.current === null) return;
    const imageSource = webcamReference.current.getScreenshot();
    if (imageSource === null) return;
    const response = await fetch(imageSource);
    const blob = await response.blob();
    const file = new File([blob], pictureFileName, {
      type: "image/png",
    });
    console.log(file);
    setImgSource(imageSource);
  }, [webcamReference, pictureFileName]);

  console.log(state);

  return (
    <>
      <Select placeholder="Select option">
        {state.devices
          ?.filter((d: { kind: string }) => d.kind === "videoinput")
          .map((device: { deviceId: "string"; label: string }) => (
            <option
              value="option1"
              onClick={() => setSelectedId(device.deviceId)}
            >
              {device.label}
            </option>
          ))}
      </Select>
      <Flex flexDirection="column" flex={1} justifyContent="space-between">
        <Flex
          w="100%"
          maxH="10%"
          position="relative"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {imgSource ? (
            <img
              src={imgSource}
              height="500"
              width="889"
              alt="team-picture"
              style={{ borderRadius: "1rem" }}
            />
          ) : (
            <Webcam
              audio={false}
              height={500}
              ref={webcamReference}
              screenshotFormat="image/jpeg"
              width={889}
              videoConstraints={{
                width: 889,
                height: 500,
                facingMode: cameraMode,
                deviceId: selectedId,
              }}
              screenshotQuality={1}
              style={{ borderRadius: "1rem" }}
              mirrored={true}
            />
          )}

          <Box position="absolute" bottom={0}>
            <Box padding={2} border="2px solid white" rounded="full">
              <Button
                size="xl"
                padding={8}
                onClick={async () => {
                  if (imgSource) {
                    setImgSource(null);
                  } else {
                    await capture();
                  }
                }}
                rounded="full"
              ></Button>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Button
        onClick={() => {
          if (cameraMode === "user") {
            setCameraMode("environment");
          } else {
            setCameraMode("user");
          }
        }}
      >
        {cameraMode === "user" ? "Switch to Environment" : "Switch to User"}
      </Button>
      <Box py={12}>
        <a
          href="https://webrtc.github.io/samples/src/content/devices/input-output/"
          target="_blank"
        >
          devices/input-output
        </a>
      </Box>
      <Box>
        <a href="https://webcamtests.com/" target="_blank">
          https://webcamtests.com/
        </a>
      </Box>
    </>
  );
};
