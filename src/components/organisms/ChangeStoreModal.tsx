import { AlertFilledSmall, Button } from "@listed-components/atoms"
import { ModalContent } from "@listed-types";
import { Modal, VStack, Text, Row } from "native-base"
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";

interface RemoveCollaboratorModalProps extends InterfaceModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  modalContent: ModalContent
}

const ChangeStoreModal = ({
  onCancel,
  onConfirm,
  modalContent,
  ...props
}: RemoveCollaboratorModalProps) => {
  return (
    <Modal {...props} paddingX="4"
      onClose={onCancel}
      closeOnOverlayClick
    >
      <Modal.Content width="full">
        <Modal.Header alignItems="center">
          <VStack alignItems="center" space={4}>
            <AlertFilledSmall />
            <Text fontSize="md" fontWeight="bold">
              {modalContent.header}
            </Text>
          </VStack>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">
            {modalContent.body}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Row width="full" justifyContent="center" space={4}>
            <Button flex="1" variant="subtle" onPress={onConfirm}>
              CHANGE STORE
            </Button>
            <Button flex="1" variant="unstyled" onPress={onCancel}>
              CANCEL
            </Button>
          </Row>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ChangeStoreModal