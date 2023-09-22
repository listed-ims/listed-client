import React from "react";
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";
import { Column, Modal, Row, Text } from "native-base";
import { Button, WarningIcon } from "@listed-components/atoms";

interface DeleteProductModalProps extends InterfaceModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  onDelete,
  onCancel,
  ...props
}) => {
  return (
    <Modal {...props} paddingX="4" onClose={onCancel}>
      <Modal.Content width="full">
        <Modal.Header alignItems="center">
          <Column alignItems="center" space={4}>
            <WarningIcon />
            <Text fontSize="md" fontWeight="bold">
              DELETE PRODUCT
            </Text>
          </Column>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">
            Are you Sure you want to delete this product?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Row width="full" justifyContent="center" space={4}>
            <Button flex="1" variant="warnSubtle" onPress={onDelete}>
              DELETE
            </Button>
            <Button flex="1" variant="warnUnstyled" onPress={onCancel}>
              CANCEL
            </Button>
          </Row>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteProductModal;
