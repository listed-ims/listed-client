import { AlertFilledSmall, Button } from "@listed-components/atoms";
import { ModalContent } from "@listed-types";
import { toTitleCase } from "@listed-utils";
import { Column, Modal, Row, Text } from "native-base";
import { InterfaceModalProps } from "native-base/lib/typescript/components/composites/Modal/types";

interface CheckoutModalProps extends InterfaceModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CheckoutModal = ({
  onCancel,
  onConfirm,
  ...props
}: CheckoutModalProps) => (
  <Modal {...props} paddingX="4" onClose={onCancel} closeOnOverlayClick>
    <Modal.Content width="full">
      <Modal.Header alignItems="center">
        <Column alignItems="center" space={4}>
          <AlertFilledSmall />
          <Text fontSize="md" fontWeight="bold">
            Confirm Checkout
          </Text>
        </Column>
      </Modal.Header>
      <Modal.Body>
        <Text textAlign="center">
          You are about to proceed with the checkout. Do you wish to continue?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Row width="full" justifyContent="center" space={4}>
          <Button flex="1" variant="subtle" onPress={onConfirm}>
            CHECKOUT
          </Button>
          <Button flex="1" variant="unstyled" onPress={onCancel}>
            CANCEL
          </Button>
        </Row>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
);

export default CheckoutModal;
