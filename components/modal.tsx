import {Adapt, Button, Dialog, Fieldset, Input, Sheet, Unspaced, XStack} from "tamagui";
import {Plus, Save, X} from "@tamagui/lucide-icons";
import {styles} from "../styles/global";
import {ModalProps} from "../typedefs/props";

export default function Modal(props: ModalProps) {
    return (
        <Dialog modal>
            <Dialog.Trigger asChild>
                {props.openBtn}
            </Dialog.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                    <Sheet.Frame padding="$4" gap="$4">
                        <Adapt.Contents />
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Dialog.Content
                    bordered
                    elevate
                    key="content"
                    animateOnly={['transform', 'opacity']}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    gap="$4"
                >
                    <Dialog.Title>
                        {props.title}
                    </Dialog.Title>

                    {props.body}
                    
                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position="absolute"
                                top="$3"
                                right="$3"
                                size="$2"
                                circular
                                icon={X}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}