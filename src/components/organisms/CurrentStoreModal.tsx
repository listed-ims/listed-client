import React from "react";
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";
import { Checkbox, Modal, Row, Text, VStack } from "native-base";
import { Button } from "@listed-components/atoms";

interface CurrentStoreModalProps extends InterfaceModalProps {
  name?: string;
  onClose: () => void;
}

const CurrentStoreModal: React.FC<CurrentStoreModalProps> = ({
  name,
  onClose,
  ...props
}) => {
  return (
    <Modal {...props} paddingX="4" onClose={onClose}>
      <Modal.Content width="full">
        <Modal.Header alignItems="center">
          <VStack alignItems="center" space={4}>
            <Checkbox
              aria-label="make current store success"
              colorScheme="success"
              size="sm"
              defaultIsChecked
              value=""
              borderRadius="full"
            />
            <Text fontSize="md" fontWeight="bold">
              Success
            </Text>
          </VStack>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">You have successfully changed your current store to <Text fontWeight="bold">{name}.</Text></Text>
        </Modal.Body>
        <Modal.Footer>
          <Row width="full" justifyContent="center">
            <Button flex="1" variant="subtle" onPress={onClose}>
              OK
            </Button>
          </Row>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CurrentStoreModal;
