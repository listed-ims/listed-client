import React from "react";
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";
import { Modal, Row, Text, VStack } from "native-base";
import { Button, WarningIcon } from "@listed-components/atoms";

interface CloseStoreModalProps extends InterfaceModalProps {
  onCloseStore: () => void;
  onClose: () => void;
}

const CloseStoreModal: React.FC<CloseStoreModalProps> = ({
  onCloseStore,
  onClose,
  ...props
}) => {
  return (
    <Modal {...props} paddingX="4" onClose={onClose}>
      <Modal.Content width="full">
        <Modal.Header alignItems="center">
          <VStack alignItems="center" space={4}>
            <WarningIcon />
            <Text fontSize="md" fontWeight="bold">
              Close Store
            </Text>
          </VStack>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">
            You cannot reopen stores after they are closed. Do you wish to
            proceed?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Row width="full" justifyContent="center" space={4}>
            <Button flex="1" variant="warnSubtle" onPress={onCloseStore}>
              CLOSE STORE
            </Button>
            <Button flex="1" variant="warnUnstyled" onPress={onClose}>
              CANCEL
            </Button>
          </Row>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CloseStoreModal;
