import { Button, WarningIcon } from "@listed-components/atoms"
import { Column, Modal, Row, Text } from "native-base"
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";

interface RemoveCollaboratorModalProps extends InterfaceModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeclineInviteModal = ({
  onCancel,
  onConfirm,
  ...props
}: RemoveCollaboratorModalProps) => (
  <Modal {...props} paddingX="4"
    onClose={onCancel}
    closeOnOverlayClick>
    <Modal.Content width="full">
      <Modal.Header alignItems="center">
        <Column alignItems="center" space="4">
          <WarningIcon />
          <Text fontSize="md" fontWeight="bold">
            DECLINE INVITE
          </Text>
        </Column>
      </Modal.Header>
      <Modal.Body>
        <Text textAlign="center">
          This will remove your invitation from this store. Do you wish to proceed?
        </Text>
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
)

export default DeclineInviteModal