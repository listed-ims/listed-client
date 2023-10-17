import { Button, WarningIcon } from "@listed-components/atoms";
import { ModalContent } from "@listed-types";
import { Column, Modal, Row, Text } from "native-base";
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";

interface LogoutModalProps extends InterfaceModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  modalContent: ModalContent;
}

const LogoutModal = ({
  onCancel,
  onConfirm,
  modalContent,
  ...props
}: LogoutModalProps) => {
  return (
    <Modal {...props} paddingX="4" onClose={onCancel} closeOnOverlayClick>
      <Modal.Content width="full">
        <Modal.Header alignItems="center">
          <Column alignItems="center" space="4">
            <WarningIcon />
            <Text fontSize="md" fontWeight="bold">
              {modalContent.header}
            </Text>
          </Column>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">{modalContent.body}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Row width="full" justifyContent="center" space={4}>
            <Button flex="1" variant="warnSubtle" onPress={onConfirm}>
              CONFIRM
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

export default LogoutModal;
