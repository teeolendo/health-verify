import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { useConnect } from "wagmi";

export type SelectWalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function SelectWalletModal({
  isOpen,
  closeModal,
}: SelectWalletModalProps) {
  const { data } = useConnect();
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            {activeConnector && <div>Connected to {activeConnector.name}</div>}
            {connectors.map((connector) => (
              <Button
                variant="outline"
                key={connector.id}
                disabled={!connector.ready}
                onClick={() => {
                  connect(connector);
                  closeModal();
                }}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Text>{connector.name} {isConnecting && pendingConnector?.id === connector.id && ' (connecting)'}</Text>
                </HStack>
              </Button>
            ))}
            {error && <Text>{error.message}</Text>}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
