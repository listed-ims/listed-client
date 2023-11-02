import { Button, WarningIcon } from "@listed-components/atoms"
import { Column, Modal, Row, Text } from "native-base"
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";

interface RemoveCollaboratorModalProps extends InterfaceModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  modalContent: {
    header: string;
    body: string;
    type: "REMOVE" | "DECLINE";
  }
}

const RemoveCollaboratorModal = ({
  onCancel,
  onConfirm,
  modalContent,
  ...props
}: RemoveCollaboratorModalProps) => {

  return (
    <Modal {...props} paddingX="4"
      onClose={onCancel}
      closeOnOverlayClick>
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
          <Text textAlign="center">
            {modalContent.body} Do you wish to proceed?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Row width="full" justifyContent="center" space={4}>
            <Button flex="1" variant="warnSubtle" onPress={onConfirm}>
              {modalContent.type === "REMOVE" ? "REMOVE" : "CANCEL INVITE"}
            </Button>
            <Button flex="1" variant="warnUnstyled" onPress={onCancel}>
              CANCEL
            </Button>
          </Row>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default RemoveCollaboratorModal